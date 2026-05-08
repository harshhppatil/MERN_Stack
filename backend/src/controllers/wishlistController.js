import User from '../models/User.js'

export const getWishlist = async (req, res, next) => {
  try {
    const user = await User.findById(req.user._id)
      .populate('wishlist', 'name country category images tagline')
    res.json(user.wishlist)
  } catch (error) {
    next(error)
  }
}

export const toggleWishlist = async (req, res, next) => {
  try {
    const { destinationId } = req.body
    const user = await User.findById(req.user._id)

    const index = user.wishlist.indexOf(destinationId)
    if (index === -1) {
      user.wishlist.push(destinationId)
    } else {
      user.wishlist.splice(index, 1)
    }

    await user.save()
    res.json({
      wishlist: user.wishlist,
      added: index === -1,
    })
  } catch (error) {
    next(error)
  }
}