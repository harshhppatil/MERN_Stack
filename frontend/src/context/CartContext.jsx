import { createContext, useContext, useState, useEffect } from 'react'

const CartContext = createContext()

export const CartProvider = ({ children }) => {
  // Load cart from localStorage so it persists on page refresh
  const [cartItems, setCartItems] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem('loopsCart')) || []
    } catch {
      return []
    }
  })

  // Save to localStorage whenever cart changes
  useEffect(() => {
    localStorage.setItem('loopsCart', JSON.stringify(cartItems))
  }, [cartItems])

  const addToCart = (product, quantity = 1) => {
    setCartItems((prev) => {
      const existing = prev.find((i) => i._id === product._id)
      if (existing) {
        return prev.map((i) =>
          i._id === product._id
            ? { ...i, quantity: Math.min(i.quantity + quantity, product.stock) }
            : i
        )
      }
      return [...prev, { ...product, quantity }]
    })
  }

  const removeFromCart = (productId) => {
    setCartItems((prev) => prev.filter((i) => i._id !== productId))
  }

  const updateQuantity = (productId, quantity) => {
    if (quantity < 1) return removeFromCart(productId)
    setCartItems((prev) =>
      prev.map((i) => (i._id === productId ? { ...i, quantity } : i))
    )
  }

  const clearCart = () => setCartItems([])

  // Derived values
  const cartCount    = cartItems.reduce((sum, i) => sum + i.quantity, 0)
  const itemsPrice   = cartItems.reduce((sum, i) => sum + i.price * i.quantity, 0)
  const shippingPrice = itemsPrice >= 999 ? 0 : 99
  const totalPrice   = itemsPrice + shippingPrice

  return (
    <CartContext.Provider value={{
      cartItems,
      addToCart,
      removeFromCart,
      updateQuantity,
      clearCart,
      cartCount,
      itemsPrice,
      shippingPrice,
      totalPrice,
    }}>
      {children}
    </CartContext.Provider>
  )
}

// Custom hook — use this in any component
export const useCart = () => useContext(CartContext)