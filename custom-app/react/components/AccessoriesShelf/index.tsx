import React, { useEffect, useState } from 'react'
import { useProduct } from 'vtex.product-context'
import axios from 'axios'
import { ProductTypes } from 'vtex.product-context'
import { SliderLayout } from 'vtex.slider-layout'
import ProductCard from '../SuggestionsShelf/ProductCard'
import styles from '../SuggestionsShelf/styles.css'

const AccessoriesShelf: React.FC = ({ children }) => {
  const mainProductContext = useProduct()
  const mainProductId = mainProductContext?.product?.productId
  const [suggestedProducts, setSuggestedProducts] = useState<
    ProductTypes.Product[]
  >([])
  const [isLoading, setIsLoading] = useState(false)
  isLoading
  const sliderConfig = {
    itemsPerPage: {
      desktop: 5,
      tablet: 2,
      phone: 1,
    },
    infinite: true,
    showNavigationArrows: 'desktopOnly',
    blockClass: 'carousel',
  }
  //   const { addItems } = OrderItems.useOrderItems()

  useEffect(() => {
    const fetchProducts = async () => {
      setIsLoading(true)
      const timestamp = new Date().getTime()
      try {
        const res = await axios.get(
          `/api/catalog_system/pub/products/crossselling/accessories/${mainProductId}?t=${timestamp}`
        )
        setSuggestedProducts(res.data)
      } catch (err) {
        console.error('Erro ao buscar produtos:', err)
      } finally {
        setIsLoading(false)
      }
    }

    if (mainProductId) {
      fetchProducts()
    }
  }, [mainProductId])

  useEffect(() => {
    console.log({ suggestedProducts })
  }, [suggestedProducts])

  if (suggestedProducts.length <= 0) return null

  return (
    <>
      <h2 className={styles.customShelfTitle}>Acessórios</h2>
      <SliderLayout {...{ sliderConfig }}>
        {suggestedProducts.map((product: ProductTypes.Product) => (
          <ProductCard
            product={product}
            key={product.productId}
            children={children}
          />
        ))}
      </SliderLayout>
    </>
  )
}

export default AccessoriesShelf
