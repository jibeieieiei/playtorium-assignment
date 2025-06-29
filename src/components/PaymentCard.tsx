import { CartItem } from '@/app/page'
import React from 'react'
import { Product } from './CategorySection'
import { X } from 'lucide-react'

interface PaymentCardProps {
  item: CartItem
  removeFromCart: (item: Product) => void
}

const PaymentCard = ({ item, removeFromCart }: PaymentCardProps) => {
  return (
    <div className="w-full relative">
      <div
        className="absolute right-4 top-4"
        onClick={() => {
          removeFromCart(item)
        }}
      >
        <X className="cursor-pointer hover:text-red-500 size-5" />
      </div>
      <div className="bg-white rounded-lg shadow-md p-4 hover:shadow-lg transition-shadow flex items-center gap-4 text-gray-800 font-semibold">
        {/* Image */}
        <div className="text-4xl text-center mb-3">{item.image}</div>
        <div className="w-full flex flex-col gap-2 justify-between items-start">
          {/* Name  */}
          <h3 className="mb-2 text-center">{item.name}</h3>
          <div className="w-full flex justify-between items-center">
            {/* Price */}
            <p className="text-left flex-1">฿{item.price.toLocaleString()}</p>
            <p className="text-right flex-1">x {item.quantity}</p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default PaymentCard
