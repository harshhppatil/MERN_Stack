import Order from '../models/Order.js'
import Product from '../models/Product.js'

// ── @desc    Place a new order
// ── @route   POST /api/orders
// ── @access  Protected
export const placeOrder = async (req, res, next) => {
  try {
    const { items, shippingAddress, paymentMethod } = req.body

    if (!items || items.length === 0) {
      return res.status(400).json({ message: 'No items in order' })
    }

    // Verify each product exists and has enough stock, build order items
    const orderItems = []
    let itemsPrice = 0

    for (const item of items) {
      const product = await Product.findById(item.product)

      if (!product || !product.isActive) {
        return res.status(404).json({ message: `Product not found: ${item.product}` })
      }
      if (product.stock < item.quantity) {
        return res.status(400).json({ message: `Not enough stock for: ${product.name}` })
      }

      orderItems.push({
        product:  product._id,
        name:     product.name,
        price:    product.price,
        image:    product.images[0] || '',
        quantity: item.quantity,
      })

      itemsPrice += product.price * item.quantity

      // Deduct stock
      product.stock -= item.quantity
      await product.save()
    }

    // Free shipping above ₹999, else ₹99
    const shippingPrice = itemsPrice >= 999 ? 0 : 99
    const totalPrice    = itemsPrice + shippingPrice

    const order = await Order.create({
      user: req.user._id,
      items: orderItems,
      shippingAddress,
      paymentMethod: paymentMethod || 'COD',
      itemsPrice,
      shippingPrice,
      totalPrice,
    })

    res.status(201).json(order)
  } catch (error) {
    next(error)
  }
}

// ── @desc    Get logged-in user's orders
// ── @route   GET /api/orders/myorders
// ── @access  Protected
export const getMyOrders = async (req, res, next) => {
  try {
    const orders = await Order.find({ user: req.user._id })
      .sort({ createdAt: -1 })
      .populate('items.product', 'name images')

    res.json(orders)
  } catch (error) {
    next(error)
  }
}

// ── @desc    Get a single order by ID
// ── @route   GET /api/orders/:id
// ── @access  Protected (owner or admin)
export const getOrderById = async (req, res, next) => {
  try {
    const order = await Order.findById(req.params.id)
      .populate('user', 'name email')
      .populate('items.product', 'name images')

    if (!order) return res.status(404).json({ message: 'Order not found' })

    // only the owner or an admin can view it
    const isOwner = order.user._id.toString() === req.user._id.toString()
    if (!isOwner && req.user.role !== 'admin') {
      return res.status(403).json({ message: 'Not authorized' })
    }

    res.json(order)
  } catch (error) {
    next(error)
  }
}

// ── @desc    Get all orders (admin)
// ── @route   GET /api/orders
// ── @access  Admin
export const getAllOrders = async (req, res, next) => {
  try {
    const orders = await Order.find({})
      .sort({ createdAt: -1 })
      .populate('user', 'name email')

    // summary stats for admin dashboard
    const totalRevenue = orders
      .filter((o) => o.orderStatus !== 'Cancelled')
      .reduce((sum, o) => sum + o.totalPrice, 0)

    res.json({ orders, totalRevenue, totalOrders: orders.length })
  } catch (error) {
    next(error)
  }
}

// ── @desc    Update order status (admin)
// ── @route   PUT /api/orders/:id/status
// ── @access  Admin
export const updateOrderStatus = async (req, res, next) => {
  try {
    const { orderStatus } = req.body
    const validStatuses = ['Pending', 'Processing', 'Shipped', 'Delivered', 'Cancelled']

    if (!validStatuses.includes(orderStatus)) {
      return res.status(400).json({ message: 'Invalid order status' })
    }

    const order = await Order.findById(req.params.id)
    if (!order) return res.status(404).json({ message: 'Order not found' })

    // If cancelling, restore stock
    if (orderStatus === 'Cancelled' && order.orderStatus !== 'Cancelled') {
      for (const item of order.items) {
        const product = await Product.findById(item.product)
        if (product) {
          product.stock += item.quantity
          await product.save()
        }
      }
    }

    order.orderStatus = orderStatus
    if (orderStatus === 'Delivered') {
      order.isPaid      = true
      order.paidAt      = new Date()
      order.deliveredAt = new Date()
    }

    const updated = await order.save()
    res.json(updated)
  } catch (error) {
    next(error)
  }
}