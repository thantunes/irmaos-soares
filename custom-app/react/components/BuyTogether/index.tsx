import axios from 'axios'
import React, { useEffect, useState, useMemo } from 'react'
import { useProduct } from 'vtex.product-context'
import PlusIcon from './icons/PlusIcon'
import EqualIcon from './icons/EqualIcon'
import styles from './styles.css'
import type { ProductTypes } from 'vtex.product-context'
import { OrderItems } from 'vtex.order-items'
import RenderProduct from './RenderProduct'

const BuyTogether = () => {
  const mainProductContext = useProduct()
  const mainProductId = mainProductContext?.product?.productId
  const mainProduct = mainProductContext?.product
  const [similarProducts, setSimilarProducts] = useState<
    ProductTypes.Product[]
  >([])
  const [isLoading, setIsLoading] = useState(false)

  const { addItems } = OrderItems.useOrderItems()

  // useMemo para calcular valores de produto e evitar recalcular a cada renderização
  const firstProduct = useMemo(() => similarProducts[0], [similarProducts])
  const finalTotal = useMemo(() => {
    const mainProductPrice =
      mainProduct?.items?.[0]?.sellers?.[0]?.commertialOffer?.ListPrice ?? 0
    const similarProductPrice =
      firstProduct?.items?.[0]?.sellers?.[0]?.commertialOffer?.ListPrice ?? 0
    return mainProductPrice + similarProductPrice
  }, [mainProduct, firstProduct])

  useEffect(() => {
    const fetchProducts = async () => {
      setIsLoading(true)
      const timestamp = new Date().getTime()
      try {
        const res = await axios.get(
          `/api/catalog_system/pub/products/crossselling/showtogether/${mainProductId}?t=${timestamp}`
        )
        setSimilarProducts(res.data)
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
    console.log({ similarProducts })
  }, [similarProducts])

  const itemsToAdd = useMemo(
    () => [
      {
        id: mainProduct?.productId ?? '',
        quantity: 1,
        seller: mainProduct?.items?.[0]?.sellers?.[0]?.sellerId ?? '',
      },
      {
        id: firstProduct?.productId ?? '',
        quantity: 1,
        seller: firstProduct?.items?.[0]?.sellers?.[0]?.sellerId ?? '',
      },
    ],
    [mainProduct, firstProduct]
  )

  const handleAddToCart = async () => {
    if (!mainProduct || similarProducts.length === 0) {
      console.error('Produtos insuficientes para adicionar ao carrinho')
      return
    }

    setIsLoading(true)

    try {
      await addItems(itemsToAdd)

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

  if (!similarProducts.length) return null

  return (
    <section className={styles.buyTogether}>
      <h2>Aproveite e leve junto</h2>
      <div className={styles.wrapper}>
        <div className={styles.container}>
          {mainProduct && <RenderProduct product={mainProduct} />}
          <PlusIcon />
          {firstProduct && <RenderProduct product={firstProduct} />}
          <EqualIcon />
        </div>

        <div className={styles.addToCartContainer}>
          <div className={styles.productsCount}>os 2 produtos por</div>
          <div className={styles.finalPrice}>
            <strong>
              {finalTotal.toLocaleString('pt-BR', {
                style: 'currency',
                currency: 'BRL',
              })}{' '}
            </strong>
            à vista
          </div>
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
              'Adicionar ao carrinho'
            )}
          </button>
        </div>
      </div>
    </section>
  )
}

export default BuyTogether
