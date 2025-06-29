'use client'
import { CartItem } from '@/app/page'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import { calculateTotal } from '@/lib/cart'
import PaymentCard from './PaymentCard'
import { useState } from 'react'
import { Input } from './ui/input'
import { RadioGroup, RadioGroupItem } from './ui/radio-group'
import { Label } from './ui/label'
import { Separator } from './ui/separator'
import { Product } from './CategorySection'

interface PaymentModalProps {
  open: boolean
  handleOpenChange: (open: boolean) => void
  items: CartItem[]
  removeFromCart: (item: Product) => void
}

export type Discount = {
  coupon: {
    type?: 'amount' | 'percentage' | string
    value?: string
  }
  onTop: {
    type?: 'point' | 'category' | string
    category?: 'clothing' | 'accessories' | 'electronics' | string
    amount?: string // number % off on clothing
    // choose one
    points?: string // 1 point 1 bath The amount will be capped at 20% of total price
  }
  seasonal?: {
    every?: string
    discount?: string
  }
}

const PaymentModal = ({
  open,
  handleOpenChange,
  items,
  removeFromCart,
}: PaymentModalProps) => {
  const [discount, setDiscount] = useState<Discount>({
    coupon: {
      type: 'amount',
    },
    onTop: {
      type: 'category',
      category: 'clothing',
    },
  })
  const summary = calculateTotal(items, discount)

  return (
    <Dialog
      open={open}
      onOpenChange={(open) => {
        handleOpenChange(open)
      }}
    >
      <DialogContent className="sm:max-w-[425px] overflow-y-scroll sm:max-h-[700px] h-fit flex flex-col">
        <DialogHeader>
          <DialogTitle>Discount</DialogTitle>
          <DialogDescription>Make you Discount</DialogDescription>
        </DialogHeader>
        <Separator />
        <div className="flex flex-col gap-4">
          {/* Discount */}
          <div className="flex flex-col gap-2">
            {/* Coupon */}
            <div className="flex flex-col gap-2">
              <span className="font-bold">Coupon</span>
              <RadioGroup
                defaultValue={discount.coupon.type}
                className="flex gap-2"
                onValueChange={(value) => {
                  setDiscount({
                    ...discount,
                    coupon: { type: value, value: discount?.coupon?.value },
                  })
                }}
              >
                <div className="flex items-center gap-3">
                  <RadioGroupItem value="amount" id="coupon1" />
                  <Label htmlFor="coupon1">Amount</Label>
                </div>
                <div className="flex items-center gap-3">
                  <RadioGroupItem value="percentage" id="coupon2" />
                  <Label htmlFor="coupon2">Percentage</Label>
                </div>
              </RadioGroup>
              <Input
                type="number"
                placeholder={discount?.coupon?.type ?? 'Amount'}
                max={100}
                value={discount?.coupon?.value ?? ''}
                className="border"
                onChange={(e) => {
                  if (/^\d*$/.test(e.target.value)) {
                    setDiscount({
                      ...discount,
                      coupon: {
                        type: discount?.coupon?.type,
                        value: e.target.value,
                      },
                    })
                  }
                }}
              />
            </div>
            {/* On Top */}
            <div className="flex flex-col gap-2">
              <span className="font-bold">On Top</span>
              <RadioGroup
                defaultValue={discount.onTop.type}
                className="flex gap-2"
                onValueChange={(value) => {
                  setDiscount({
                    ...discount,
                    onTop: { ...discount.onTop, type: value },
                  })
                }}
              >
                <div className="flex items-center gap-3">
                  <RadioGroupItem value="category" id="onTop1" />
                  <Label htmlFor="onTop1">Category</Label>
                </div>
                <div className="flex items-center gap-3">
                  <RadioGroupItem value="point" id="onTop2" />
                  <Label htmlFor="onTop2">Point</Label>
                </div>
              </RadioGroup>
              {discount.onTop.type === 'category' ? (
                <div className="flex flex-col gap-2">
                  <RadioGroup
                    defaultValue={discount.onTop.category}
                    className="flex gap-2"
                    onValueChange={(value) => {
                      setDiscount({
                        ...discount,
                        onTop: { ...discount.onTop, category: value },
                      })
                    }}
                  >
                    <div className="flex items-center gap-3">
                      <RadioGroupItem value="clothing" id="category1" />
                      <Label htmlFor="category1">Clothing</Label>
                    </div>
                    <div className="flex items-center gap-3">
                      <RadioGroupItem value="accessories" id="category2" />
                      <Label htmlFor="category2">Accessories</Label>
                    </div>
                    <div className="flex items-center gap-3">
                      <RadioGroupItem value="electronics" id="category3" />
                      <Label htmlFor="category3">Electronics</Label>
                    </div>
                  </RadioGroup>
                  <Input
                    type="number"
                    placeholder={'Amount % off '}
                    value={discount?.onTop?.amount ?? ''}
                    className="border"
                    onChange={(e) => {
                      setDiscount({
                        ...discount,
                        onTop: { ...discount.onTop, amount: e.target.value },
                      })
                    }}
                  />
                </div>
              ) : (
                <Input
                  type="number"
                  placeholder={'Your points'}
                  value={discount?.onTop?.points ?? ''}
                  className="border"
                  onChange={(e) => {
                    setDiscount({
                      ...discount,
                      onTop: { ...discount.onTop, points: e.target.value },
                    })
                  }}
                />
              )}
            </div>
            {/* Seasonal */}
            <div className="flex flex-col gap-2">
              <span className="font-bold">Seasonal</span>
              <Input
                placeholder="Discount XXX THB"
                type="number"
                value={discount?.seasonal?.discount ?? ''}
                className="border"
                onChange={(e) => {
                  setDiscount({
                    ...discount,
                    seasonal: {
                      ...discount.seasonal,
                      discount: e.target.value,
                    },
                  })
                }}
              />
              <Input
                placeholder="Every XXX THB"
                type="number"
                value={discount?.seasonal?.every ?? ''}
                className="border"
                onChange={(e) => {
                  setDiscount({
                    ...discount,
                    seasonal: {
                      ...discount.seasonal,
                      every: e.target.value,
                    },
                  })
                }}
              />
            </div>
          </div>
          {/* Items */}
          <Separator />

          {items.map((item) => (
            <div
              key={item.id}
              className="w-full flex items-center justify-between"
            >
              <PaymentCard item={item} removeFromCart={removeFromCart} />
            </div>
          ))}
        </div>
        <Separator />
        <DialogFooter>
          <div className="flex flex-col items-end *:min-w-40 *:flex *:justify-between *:items-center">
            <div>
              <span>Subtotal:</span>฿{summary.subtotal.toLocaleString()}
            </div>
            <div>
              <span>Discount:</span>
              -฿{summary.discount.toLocaleString()}
            </div>
            <div>
              <span>Total:</span>
              <span>฿{summary.total.toLocaleString()}</span>
            </div>
          </div>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

export default PaymentModal
