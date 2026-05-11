import mongoose from 'mongoose'
import dotenv from 'dotenv'
import { connectDB } from './config/db.js'
import Product from './models/Product.js'
import User from './models/User.js'

dotenv.config({ path: '../.env' })

const products = [
  {
    name: 'Daisy Chain Tote',
    description: 'Handwoven cotton tote with golden daisy motifs. Spacious, sturdy, and perfect for everyday use. Each piece is uniquely crafted by hand.',
    price: 849,
    category: 'Bags',
    tag: 'bestseller',
    stock: 15,
    images: ['/assets/Daisy_Chain_Tote.jpeg'],
  },
  {
    name: 'Blush Bloom Cardigan',
    description: 'Soft merino blend cardigan with delicate petal-edge detailing. Light enough for summer evenings, cozy enough for AC weather.',
    price: 1499,
    category: 'Clothing',
    tag: 'new',
    stock: 8,
    images: ['/assets/Blush_Bloom_Cardigan.jpeg'],
  },
  {
    name: 'Sage Bucket Hat',
    description: 'Summer-ready raffia texture in sage green. Adjustable fit, wide brim for sun protection. Your new favourite festival accessory.',
    price: 599,
    category: 'Accessories',
    tag: 'trending',
    stock: 20,
    images: ['/assets/Sage_Bucket_Hat.webp'],
  },
  {
    name: 'Ivory Cloud Shawl',
    description: 'Ultra-soft mohair blend wrap that feels like wearing a cloud. Featherlight yet warm — perfect for chilly evenings or AC offices.',
    price: 1199,
    category: 'Clothing',
    tag: 'bestseller',
    stock: 10,
    images: ['/assets/Ivory_Cloud_Shawl.jpeg'],
  },
  {
    name: 'Terracotta Market Bag',
    description: 'Earthy terracotta tones handwoven into a roomy market bag. Great for groceries, beach days, or just looking effortlessly cool.',
    price: 749,
    category: 'Bags',
    tag: 'new',
    stock: 12,
    images: ['/assets/Terracota_Market_Bag.jpeg'],
  },
  {
    name: 'Wildflower Headband',
    description: 'Delicate floral crochet headband in a boho chic style. Stretchy, comfortable, and adds the perfect finishing touch to any outfit.',
    price: 349,
    category: 'Accessories',
    tag: 'trending',
    stock: 25,
    images: ['/assets/Wild_Flower_Headband.jpeg'],
  },
  {
    name: 'Honey Lace Crop Top',
    description: 'Golden cotton lace crop top — festival-ready and effortlessly stylish. Pairs beautifully with high-waisted jeans or skirts.',
    price: 999,
    category: 'Clothing',
    tag: 'new',
    stock: 7,
    images: ['/assets/Honey_Lace_Top.jpeg'],
  },
  {
    name: 'Lavender Mini Bag',
    description: 'Delicate lavender crossbody bag with a pearl button closure. Small but mighty — fits your phone, keys, and lip balm perfectly.',
    price: 649,
    category: 'Bags',
    tag: 'bestseller',
    stock: 18,
    images: ['/assets/Lavender_Mini_Bag.webp'],
  },
  {
    name: 'Peach Blossom Earrings',
    description: 'Lightweight crochet drop earrings in soft peach tones. Hypoallergenic hooks, handcrafted with love. A delicate statement piece.',
    price: 249,
    category: 'Accessories',
    tag: 'new',
    stock: 30,
    images: ['/assets/Peach_Blossoms_Earrings.jpg'],
  },
  {
    name: 'Boho Fringe Kimono',
    description: 'Free-spirited open kimono with fringe detailing. Wear it as a beach cover-up or layer it over a simple outfit for instant boho vibes.',
    price: 1799,
    category: 'Clothing',
    tag: 'trending',
    stock: 5,
    images: ['/assets/Boho_Fringe_Kimono.jpeg'],
  },
  {
    name: 'Mint Coin Purse',
    description: 'Tiny mint green coin purse with a zip closure. Perfect as a keychain pouch or a cute gift. Crocheted with 100% cotton yarn.',
    price: 199,
    category: 'Bags',
    tag: 'bestseller',
    stock: 40,
    images: ['/assets/Mint_Coin_Purse.webp'],
  },
  {
    name: 'Rustic Wall Hanging',
    description: 'Bohemian macramé-inspired crochet wall hanging. Adds warmth and texture to any room. Each piece is one-of-a-kind.',
    price: 1099,
    category: 'Home Decor',
    tag: 'new',
    stock: 6,
    images: ['/assets/Rustic_Wall_Hanging.jpeg'],
  },
]

const seedDB = async () => {
  try {
    await connectDB()

    // Clear existing products
    await Product.deleteMany({})
    console.log('🗑️  Existing products cleared')

    // Insert seed products
    await Product.insertMany(products)
    console.log(`✅  ${products.length} products seeded successfully`)

    // Make first registered user an admin (handy for testing)
    const firstUser = await User.findOne({}).sort({ createdAt: 1 })
    if (firstUser) {
      firstUser.role = 'admin'
      await firstUser.save()
      console.log(`👑  "${firstUser.name}" has been set as admin`)
    }

    mongoose.connection.close()
    console.log('🔌  DB connection closed. Happy testing! 🧶')
  } catch (error) {
    console.error('❌ Seed failed:', error)
    mongoose.connection.close()
    process.exit(1)
  }
}

seedDB()