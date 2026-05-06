import mongoose from 'mongoose'

// ── Each item inside an order ───────────────────────────────────────
const orderItemSchema = new mongoose.Schema(
  {
    product: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Product',
      required: true,
    },
    name:     { type: String, required: true },  // snapshot at time of order
    price:    { type: Number, required: true },  // snapshot at time of order
    image:    { type: String, default: '' },     // first image snapshot
    quantity: { type: Number, required: true, min: 1 },
  },
  { _id: false }
)

// ── Shipping address snapshot (not linked to User.address) ──────────
const shippingAddressSchema = new mongoose.Schema(
  {
    fullName: { type: String, required: true },
    phone:    { type: String, required: true },
    street:   { type: String, required: true },
    city:     { type: String, required: true },
    state:    { type: String, required: true },
    pincode:  { type: String, required: true },
  },
  { _id: false }
)

// ── Main order schema ───────────────────────────────────────────────
const orderSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },

    items: {
      type: [orderItemSchema],
      required: true,
      validate: {
        validator: (v) => v.length > 0,
        message: 'Order must have at least one item',
      },
    },

    shippingAddress: {
      type: shippingAddressSchema,
      required: true,
    },

    // Prices
    itemsPrice:    { type: Number, required: true, default: 0 }, // subtotal
    shippingPrice: { type: Number, required: true, default: 0 },
    totalPrice:    { type: Number, required: true, default: 0 },

    // Payment
    paymentMethod: {
      type: String,
      enum: ['COD', 'UPI', 'Card'],
      default: 'COD',
    },
    isPaid:  { type: Boolean, default: false },
    paidAt:  { type: Date },

    // Delivery
    orderStatus: {
      type: String,
      enum: ['Pending', 'Processing', 'Shipped', 'Delivered', 'Cancelled'],
      default: 'Pending',
    },
    deliveredAt: { type: Date },
  },
  { timestamps: true }  // createdAt = order placed time
)

const Order = mongoose.model('Order', orderSchema)
export default Order