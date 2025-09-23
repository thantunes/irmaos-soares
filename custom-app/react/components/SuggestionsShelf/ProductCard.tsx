import React, { useState } from 'react'
import { ProductTypes } from 'vtex.product-context'
import formatPrice from '../../utils/formatPrice'
import { OrderItems } from 'vtex.order-items'
import { Link } from 'vtex.render-runtime'
import styles from './styles.css'
function getBestInstallmentMessage(installments: Installment[]) {
  if (!installments || installments.length === 0) return ''

  // pega só as opções sem juros
  const noInterest = installments.filter((i) => i.InterestRate === 0)

  if (noInterest.length === 0) return ''

  // encontra a com maior número de parcelas
  const best = noInterest.reduce((prev, current) =>
    current.NumberOfInstallments > prev.NumberOfInstallments ? current : prev
  )

  const totalFormatted = formatPrice(best.TotalValuePlusInterestRate)

  return (
    <p className={styles.installments}>
      ou <strong>{totalFormatted}</strong> em até{' '}
      <strong>{best.NumberOfInstallments}x</strong> sem juros
    </p>
  )
}

const ProductCard = ({
  product,
  children,
}: {
  product: ProductTypes.Product
  children: React.ReactNode
}) => {
  const productImg = product?.items[0]?.images[0]?.imageUrl
  const productName = product?.productName
  const productPrice = product?.items[0].sellers[0].commertialOffer.Price
  const installmentsMessage = getBestInstallmentMessage(
    product?.items[0]?.sellers[0]?.commertialOffer?.Installments
  )
  const [isLoading, setIsLoading] = useState(false)

  // ✅ Hook chamado dentro do componente
  const { addItems } = OrderItems.useOrderItems()

  const handleAddToCart = async () => {
    const skuId = product?.items?.[0]?.itemId
    const seller = product?.items?.[0]?.sellers?.[0]?.sellerId

    if (!skuId || !seller) return

    const productToAdd = [
      {
        id: skuId, // precisa ser o itemId (SKU), não o productId
        quantity: 1,
        seller,
      },
    ]

    setIsLoading(true)

    try {
      await addItems(productToAdd)

      const minicartButton = document.querySelector(
        '.vtex-minicart-2-x-openIconContainer .vtex-button'
      ) as HTMLButtonElement | null
      minicartButton?.click()
    } catch (error) {
      console.error('Erro ao adicionar itens ao carrinho:', error)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className={styles.customProductContainer}>
      <Link href={`/${product?.linkText}/p`} className={styles.customProduct}>
        <img src={productImg} alt="" />
        {children}
        <h3>{productName}</h3>
        <div className={styles.priceContainer}>
          {formatPrice(productPrice)} <span>à vista</span>
        </div>
        {installmentsMessage}
      </Link>
      <button
        onClick={handleAddToCart}
        disabled={isLoading}
        aria-busy={isLoading}
      >
        {isLoading ? (
          <img
            src="/arquivos/loading.gif"
            alt="Carregando..."
            style={{ maxWidth: '31.2px' }}
          />
        ) : (
          <>
            Comprar
            <img src="/arquivos/summary-icon.svg" alt="Comprar produto" />
          </>
        )}
      </button>
    </div>
  )
}

export default ProductCard
