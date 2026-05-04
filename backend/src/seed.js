import mongoose from 'mongoose'
import dotenv from 'dotenv'
import Car from './models/Car.js'

dotenv.config({ path: '../.env' })

const cars = [
  {
    name: 'Huracán EVO',
    brand: 'Lamborghini',
    category: 'Sports',
    year: 2023,
    seats: 2,
    transmission: 'Automatic',
    fuelType: 'Petrol',
    pricePerDay: 55000,
    description:
      'The Lamborghini Huracán EVO is a masterpiece of Italian engineering. With a naturally aspirated V10 engine and razor-sharp handling, it delivers a pure, visceral driving experience unlike anything else on the road.',
    images: ['https://images.unsplash.com/photo-1621135802920-133df287f89c?w=1200'],
    features: ['Carbon Ceramic Brakes', 'Sport Exhaust', 'Lift System', 'Apple CarPlay', 'Alcantara Interior'],
    specs: {
      engine: '5.2L V10 Naturally Aspirated',
      horsepower: 630,
      topSpeed: 325,
      acceleration: '2.9s 0-100',
      drive: 'AWD',
    },
    location: 'Mumbai, India',
  },
  {
    name: '488 GTB',
    brand: 'Ferrari',
    category: 'Sports',
    year: 2022,
    seats: 2,
    transmission: 'Automatic',
    fuelType: 'Petrol',
    pricePerDay: 65000,
    description:
      'The Ferrari 488 GTB represents the pinnacle of mid-engine sports car design. Its twin-turbocharged V8 delivers breathtaking performance while the aerodynamic body generates unprecedented downforce.',
    images: ['https://images.unsplash.com/photo-1583121274602-3e2820c69888?w=1200'],
    features: ['Manettino Dial', 'Carbon Fibre Package', 'Racing Seats', 'Launch Control', 'Brembo Brakes'],
    specs: {
      engine: '3.9L Twin-Turbo V8',
      horsepower: 660,
      topSpeed: 330,
      acceleration: '3.0s 0-100',
      drive: 'RWD',
    },
    location: 'Mumbai, India',
  },
  {
    name: '911 Carrera S',
    brand: 'Porsche',
    category: 'Sports',
    year: 2023,
    seats: 4,
    transmission: 'Automatic',
    fuelType: 'Petrol',
    pricePerDay: 45000,
    description:
      'The Porsche 911 Carrera S is an icon of automotive engineering. Its rear-engine layout, precise steering, and timeless silhouette have made it the benchmark sports car for over 60 years.',
    images: ['https://images.unsplash.com/photo-1503376780353-7e6692767b70?w=1200'],
    features: ['Sport Chrono Package', 'PASM Suspension', 'Bose Surround Sound', 'Panoramic Roof', 'Lane Keep Assist'],
    specs: {
      engine: '3.0L Twin-Turbo Flat-6',
      horsepower: 450,
      topSpeed: 308,
      acceleration: '3.5s 0-100',
      drive: 'RWD',
    },
    location: 'Mumbai, India',
  },
  {
    name: 'DB11 Volante',
    brand: 'Aston Martin',
    category: 'Convertible',
    year: 2022,
    seats: 4,
    transmission: 'Automatic',
    fuelType: 'Petrol',
    pricePerDay: 60000,
    description:
      "The Aston Martin DB11 Volante is Britain's most beautiful convertible. With its twin-turbo V8, an eight-layer acoustic soft-top, and hand-stitched leather interior, it is the perfect grand tourer for open-road adventures.",
    images: ['https://images.unsplash.com/photo-1774903415426-04eb0cbfc3a5?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'],
    features: ['Acoustic Soft Top', 'Bang & Olufsen Audio', 'Heated Seats', 'Dynamic Torque Vectoring', 'Sport Plus Mode'],
    specs: {
      engine: '4.0L Twin-Turbo V8',
      horsepower: 510,
      topSpeed: 300,
      acceleration: '3.7s 0-100',
      drive: 'RWD',
    },
    location: 'Mumbai, India',
  },
  {
    name: 'S-Class S500',
    brand: 'Mercedes-Benz',
    category: 'Sedan',
    year: 2023,
    seats: 5,
    transmission: 'Automatic',
    fuelType: 'Petrol',
    pricePerDay: 25000,
    description:
      'The Mercedes-Benz S-Class is the definitive luxury sedan. With its MBUX Hyperscreen, active suspension, and class-leading comfort, it sets the standard for what a luxury car should be.',
    images: ['https://images.unsplash.com/photo-1660139131278-607310e532fe?q=80&w=1169&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'],
    features: ['MBUX Hyperscreen', 'Burmester 4D Sound', 'Active Body Control', 'Augmented Reality Nav', 'Executive Rear Seats'],
    specs: {
      engine: '3.0L Inline-6 EQ Boost',
      horsepower: 429,
      topSpeed: 250,
      acceleration: '4.9s 0-100',
      drive: 'AWD',
    },
    location: 'Bangalore, India',
  },
  {
    name: 'G-Class G63 AMG',
    brand: 'Mercedes-Benz',
    category: 'SUV',
    year: 2023,
    seats: 5,
    transmission: 'Automatic',
    fuelType: 'Petrol',
    pricePerDay: 38000,
    description:
      'The Mercedes-AMG G63 is an icon reimagined. Its boxy silhouette has remained virtually unchanged since 1979, yet under the hood sits a ferocious 4.0L biturbo V8 that makes it one of the fastest SUVs on earth.',
    images: ['https://images.unsplash.com/photo-1648413653877-ade5eefd2f1b?q=80&w=1332&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'],
    features: ['AMG Performance Seats', 'Widescreen Cockpit', 'AMG Ride Control+', 'Burmester Surround Sound', 'Three Locking Differentials'],
    specs: {
      engine: '4.0L Biturbo V8',
      horsepower: 585,
      topSpeed: 220,
      acceleration: '4.5s 0-100',
      drive: 'AWD',
    },
    location: 'Bangalore, India',
  },
  {
    name: '7 Series 740i',
    brand: 'BMW',
    category: 'Sedan',
    year: 2023,
    seats: 5,
    transmission: 'Automatic',
    fuelType: 'Petrol',
    pricePerDay: 20000,
    description:
      'The BMW 7 Series combines athletic performance with executive luxury. The Theatre Screen, crystal controls, and Merino leather interior create a mobile sanctuary unlike any other.',
    images: ['https://images.unsplash.com/photo-1555215695-3004980ad54e?w=1200'],
    features: ['Theatre Screen', 'Crystal Gear Selector', 'Merino Leather', 'Parking Assistant Pro', 'Bowers & Wilkins Audio'],
    specs: {
      engine: '3.0L Inline-6 TwinPower Turbo',
      horsepower: 375,
      topSpeed: 250,
      acceleration: '4.7s 0-100',
      drive: 'AWD',
    },
    location: 'Delhi, India',
  },
  {
    name: 'Range Rover Autobiography',
    brand: 'Land Rover',
    category: 'SUV',
    year: 2023,
    seats: 5,
    transmission: 'Automatic',
    fuelType: 'Petrol',
    pricePerDay: 30000,
    description:
      'The Range Rover Autobiography is the ultimate expression of luxury SUV ownership. Combining unmatched off-road capability with a supremely refined interior, it is equally at home on mountain trails and city boulevards.',
    images: ['https://images.unsplash.com/photo-1604054094723-3a949e4a8993?q=80&w=1065&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'],
    features: ['Terrain Response 2', 'Pixel LED Headlights', 'Meridian Signature Audio', 'Executive Class Rear', 'Air Suspension'],
    specs: {
      engine: '4.4L Twin-Turbo V8',
      horsepower: 530,
      topSpeed: 250,
      acceleration: '4.6s 0-100',
      drive: 'AWD',
    },
    location: 'Mumbai, India',
  },
  {
    name: 'Bentayga EWB',
    brand: 'Bentley',
    category: 'SUV',
    year: 2023,
    seats: 5,
    transmission: 'Automatic',
    fuelType: 'Petrol',
    pricePerDay: 50000,
    description:
      'The Bentley Bentayga Extended Wheelbase is the most luxurious SUV ever created. Hand-crafted with the finest materials, it offers an unparalleled combination of performance, presence, and opulence.',
    images: ['https://images.unsplash.com/photo-1709245647374-a6ecf222ab8a?q=80&w=1079&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'],
    features: ['Airline Seat Specification', 'Naim Audio', 'My Bentley App', 'Night Vision', 'Bentley Rotating Display'],
    specs: {
      engine: '4.0L Twin-Turbo V8',
      horsepower: 542,
      topSpeed: 290,
      acceleration: '4.5s 0-100',
      drive: 'AWD',
    },
    location: 'Delhi, India',
  },
]

const seedDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI)
    console.log('✅ MongoDB Connected')

    await Car.deleteMany({})
    console.log('🗑️  Existing cars cleared')

    await Car.insertMany(cars)
    console.log(`🚗 ${cars.length} premium cars seeded successfully`)

    process.exit(0)
  } catch (error) {
    console.error('❌ Seed failed:', error.message)
    process.exit(1)
  }
}

seedDB()