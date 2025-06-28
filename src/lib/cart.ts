import { Product } from '@/components/CategorySection'

export function calculateTotal(products: Product[]): {
  subtotal: number
  total: number
  discount: number
} {
  let subtotal = products.reduce((total, item) => total + item.price, 0)
  let discount = 0
  const total = subtotal - discount
  return {
    subtotal,
    total: total,
    discount,
  }
}
