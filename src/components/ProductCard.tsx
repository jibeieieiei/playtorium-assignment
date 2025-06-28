import { Plus } from 'lucide-react'
import { Product } from './CategorySection'

interface ProductCardProps {
  item: Product
  onAddToCart: (item: Product) => void
}

const ProductCard = ({ item, onAddToCart }: ProductCardProps) => (
  <div className="bg-white rounded-lg shadow-md p-4 hover:shadow-lg transition-shadow">
    <div className="text-4xl text-center mb-3">{item.image}</div>
    <h3 className="font-semibold text-gray-800 mb-2 text-center">
      {item.name}
    </h3>
    <p className="text-lg font-bold text-blue-600 mb-3 text-center">
      ฿{item.price.toLocaleString()}
    </p>
    <button
      onClick={() => onAddToCart(item)}
      className="w-full bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600 transition-colors flex items-center justify-center space-x-2 cursor-pointer"
    >
      <Plus size={16} />
      <span>Add to Cart</span>
    </button>
  </div>
)

export default ProductCard
