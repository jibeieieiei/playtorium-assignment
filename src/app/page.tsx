'use client'
import React, { useState } from 'react'
import { ShoppingCart } from 'lucide-react'
import CategorySection, { Product } from '@/components/CategorySection'
import { MOCK_DATA } from '@/constants/data'
import PaymentModal from '@/components/PaymentModal'

export interface CartItem extends Product {
  quantity: number
}

const ShoppingPage = () => {
  const [cartItems, setCartItems] = useState<CartItem[]>([])
  console.log(cartItems, 'cartItems')
  const [open, setOpen] = useState<boolean>(false)

  const addToCart = (item: Product): void => {
    setCartItems((prev) => {
      const existingItem = prev.find((cartItem) => cartItem.id === item.id)
      if (existingItem) {
        return prev.map((cartItem) =>
          cartItem.id === item.id
            ? { ...cartItem, quantity: cartItem.quantity + 1 }
            : cartItem
        )
      }
      return [...prev, { ...item, quantity: 1 }]
    })
  }

  const getTotalItems = (): number => {
    return cartItems.reduce((total, item) => total + item.quantity, 0)
  }

  const getTotalPrice = (): number => {
    return cartItems.reduce(
      (total, item) => total + item.price * item.quantity,
      0
    )
  }

  const handleOpenChange = (open: boolean): void => {
    setOpen(open)
  }

  const handleCheckout = (): void => {
    setOpen(true)
    // alert(
    //   `Proceeding to checkout with ${getTotalItems()} items for ฿${getTotalPrice().toLocaleString()}`
    // )
  }

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Header */}
      <header className="bg-white shadow-md sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
          <h1 className="text-2xl font-bold text-gray-900">Shopping Store</h1>

          <div className="relative">
            <button className="flex items-center space-x-2 bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition-colors">
              <ShoppingCart size={20} />
              <span>Cart</span>
              {getTotalItems() > 0 && (
                <span className="bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                  {getTotalItems()}
                </span>
              )}
            </button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 py-8 flex">
        {/* Clothing Section */}
        <CategorySection
          title="Clothing"
          items={MOCK_DATA.clothing}
          onAddToCart={addToCart}
        />
        {/* Accessories Section */}
        <CategorySection
          title="Accessories"
          items={MOCK_DATA.accessories}
          onAddToCart={addToCart}
        />

        {/* Electronics Section */}
        <CategorySection
          title="Electronics"
          items={MOCK_DATA.electronics}
          onAddToCart={addToCart}
        />
      </main>

      {/* Cart Summary */}
      {cartItems.length > 0 && (
        <div className="fixed bottom-4 right-4 bg-white rounded-lg shadow-lg p-4 max-w-sm">
          <h3 className="font-bold mb-2">Cart Summary</h3>
          <div className="max-h-32 overflow-y-auto">
            {cartItems.map((item) => (
              <div key={item.id} className="flex justify-between text-sm mb-1">
                <span>
                  {item.name} x{item.quantity}
                </span>
                <span>฿{(item.price * item.quantity).toLocaleString()}</span>
              </div>
            ))}
          </div>
          <div className="border-t pt-2 mt-2">
            <div className="flex justify-between font-bold">
              <span>Total:</span>
              <span>฿{getTotalPrice().toLocaleString()}</span>
            </div>
          </div>
          <button
            onClick={handleCheckout}
            className="w-full bg-green-500 text-white py-2 rounded-lg mt-2 hover:bg-green-600 transition-colors"
          >
            Checkout
          </button>
        </div>
      )}
      <PaymentModal
        open={open}
        handleOpenChange={handleOpenChange}
        items={cartItems}
      />
    </div>
  )
}

export default ShoppingPage
