import { CartItem } from '@/app/page'
import { Discount } from '@/components/PaymentModal'

export function calculateTotal(
  items: CartItem[],
  discount: Discount
): {
  subtotal: number
  total: number
  discount: number
} {
  const subtotal = items.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  )
  let discountTotal = 0
  let total = subtotal

  // Coupon
  if (discount.coupon.type === 'amount' && discount.coupon.value) {
    discountTotal += Number(discount.coupon.value)
    total -= Number(discount.coupon.value)
  } else if (discount.coupon.type === 'percentage' && discount.coupon.value) {
    discountTotal += (subtotal * Number(discount.coupon.value)) / 100
    total -= (subtotal * Number(discount.coupon.value)) / 100
  }

  // On Top
  if (
    discount.onTop.type === 'category' &&
    discount.onTop.category !== '' &&
    discount.onTop.amount
  ) {
    const existingItems = items.filter(
      (item) => item.category === discount.onTop.category
    )
    const categoryTotal = existingItems.reduce(
      (total, item) => total + item.price * item.quantity,
      0
    )
    const discountPercentageCoupon = 100 - (total / subtotal) * 100
    if (discountPercentageCoupon) {
      discountTotal +=
        (((categoryTotal * (100 - discountPercentageCoupon)) / 100) *
          Number(discount.onTop.amount)) /
        100
      total -=
        (((categoryTotal * (100 - discountPercentageCoupon)) / 100) *
          Number(discount.onTop.amount)) /
        100
    } else {
      discountTotal += (categoryTotal * Number(discount.onTop.amount)) / 100
      total -= (categoryTotal * Number(discount.onTop.amount)) / 100
    }
  } else if (discount.onTop.type === 'point' && discount.onTop.points) {
    // handle 20 %
    const maxDiscountOnTopPoints = total * 0.2
    if (Number(discount.onTop.points) > maxDiscountOnTopPoints) {
      discountTotal += maxDiscountOnTopPoints
      total -= maxDiscountOnTopPoints
    } else {
      discountTotal += Number(discount.onTop.points)
      total -= Number(discount.onTop.points)
    }
  }

  // Seasonal
  if (
    discount.seasonal &&
    discount.seasonal.discount &&
    discount.seasonal.every
  ) {
    discountTotal +=
      Math.floor(total / Number(discount.seasonal.every)) *
      Number(discount.seasonal.discount)
    total -=
      Math.floor(total / Number(discount.seasonal.every)) *
      Number(discount.seasonal.discount)
  }

  return {
    subtotal,
    discount: discountTotal,
    total: total < 0 ? 0 : total,
  }
}
