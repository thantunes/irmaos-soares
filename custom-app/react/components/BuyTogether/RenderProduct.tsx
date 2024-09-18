import React from 'react'
import { ProductTypes } from 'vtex.product-context'
import styles from './styles.css'

interface RenderProductProps {
  product: ProductTypes.Product
}

const RenderProduct: React.FC<RenderProductProps> = ({ product }) => {
  if (!product) return null

  const {
    productName = 'Produto não disponível',
    linkText = '',
    items = [],
  } = product
  const { images = [], sellers = [] } = items[0] || {}
  const productImage = images[0]?.imageUrl
  const productPrice = sellers[0]?.commertialOffer?.ListPrice ?? 0

  const priceFormatted = productPrice.toLocaleString('pt-BR', {
    style: 'currency',
    currency: 'BRL',
  })

  return (
    <a
      href={`/${linkText}/p`}
      className={styles.product}
      aria-label={productName}
    >
      <img src={productImage} alt={productName} />
      <h3>{productName}</h3>
      <div className={styles.price}>
        <div>{priceFormatted}</div>
        <span>à vista</span>
      </div>
      <div className={styles.installments}>
        ou <strong>{priceFormatted}</strong> em até <strong>10x</strong> sem
        juros
      </div>
    </a>
  )
}

export default RenderProduct
