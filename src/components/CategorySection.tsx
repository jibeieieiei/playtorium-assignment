import ProductCard from './ProductCard'

export interface Product {
  id: number
  name: string
  price: number
  image: string
}

interface CategorySectionProps {
  title: string
  items: Product[]
  category: string
  onAddToCart: (item: Product, category: string) => void
}
const CategorySection = ({
  title,
  items,
  category,
  onAddToCart,
}: CategorySectionProps) => (
  <section className="w-1/3 mb-12">
    <h2 className="text-3xl font-bold text-gray-800 mb-8 text-center">
      {title}
    </h2>
    <div className="flex flex-wrap gap-6 justify-center">
      {items.map((item) => (
        <div key={item.id} className="w-72">
          <ProductCard
            item={item}
            onAddToCart={onAddToCart}
            category={category}
          />
        </div>
      ))}
    </div>
  </section>
)

export default CategorySection
