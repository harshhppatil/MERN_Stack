import Product from '../models/Product.js'

// ── @desc    Get all active products (with filter, search, sort)
// ── @route   GET /api/products
// ── @access  Public
export const getProducts = async (req, res, next) => {
  try {
    const { category, tag, search, sort } = req.query

    const filter = { isActive: true }

    if (category) filter.category = category
    if (tag)      filter.tag = tag
    if (search)   filter.name = { $regex: search, $options: 'i' }

    // sort options: newest | price_asc | price_desc | top_rated
    const sortMap = {
      newest:     { createdAt: -1 },
      price_asc:  { price:  1 },
      price_desc: { price: -1 },
      top_rated:  { avgRating: -1 },
    }
    const sortBy = sortMap[sort] || { createdAt: -1 }

    const products = await Product.find(filter).sort(sortBy)
    res.json(products)
  } catch (error) {
    next(error)
  }
}

// ── @desc    Get single product by ID
// ── @route   GET /api/products/:id
// ── @access  Public
export const getProductById = async (req, res, next) => {
  try {
    const product = await Product.findOne({ _id: req.params.id, isActive: true })
    if (!product) return res.status(404).json({ message: 'Product not found' })
    res.json(product)
  } catch (error) {
    next(error)
  }
}

// ── @desc    Create a new product
// ── @route   POST /api/products
// ── @access  Admin
export const createProduct = async (req, res, next) => {
  try {
    const { name, description, price, category, images, tag, stock } = req.body

    const product = await Product.create({
      name,
      description,
      price,
      category,
      images: images || [],
      tag:    tag    || '',
      stock:  stock  ?? 10,
    })

    res.status(201).json(product)
  } catch (error) {
    next(error)
  }
}

// ── @desc    Update a product
// ── @route   PUT /api/products/:id
// ── @access  Admin
export const updateProduct = async (req, res, next) => {
  try {
    const product = await Product.findById(req.params.id)
    if (!product) return res.status(404).json({ message: 'Product not found' })

    const fields = ['name', 'description', 'price', 'category', 'images', 'tag', 'stock', 'isActive']
    fields.forEach((f) => {
      if (req.body[f] !== undefined) product[f] = req.body[f]
    })

    const updated = await product.save()
    res.json(updated)
  } catch (error) {
    next(error)
  }
}

// ── @desc    Delete a product (soft delete — sets isActive: false)
// ── @route   DELETE /api/products/:id
// ── @access  Admin
export const deleteProduct = async (req, res, next) => {
  try {
    const product = await Product.findById(req.params.id)
    if (!product) return res.status(404).json({ message: 'Product not found' })

    product.isActive = false
    await product.save()

    res.json({ message: 'Product removed' })
  } catch (error) {
    next(error)
  }
}

// ── @desc    Add a review to a product
// ── @route   POST /api/products/:id/review
// ── @access  Protected (logged-in users)
export const addReview = async (req, res, next) => {
  try {
    const { rating, comment } = req.body

    if (!rating || !comment) {
      return res.status(400).json({ message: 'Rating and comment are required' })
    }

    const product = await Product.findById(req.params.id)
    if (!product) return res.status(404).json({ message: 'Product not found' })

    // prevent duplicate reviews from same user
    const alreadyReviewed = product.reviews.find(
      (r) => r.user.toString() === req.user._id.toString()
    )
    if (alreadyReviewed) {
      return res.status(400).json({ message: 'You have already reviewed this product' })
    }

    product.reviews.push({
      user:    req.user._id,
      name:    req.user.name,
      rating:  Number(rating),
      comment,
    })

    product.updateRatingStats()
    await product.save()

    res.status(201).json({ message: 'Review added' })
  } catch (error) {
    next(error)
  }
}