import React, { useEffect, useState } from 'react'
import styles from './styles.css'
//@ts-ignore
import useProduct from 'vtex.product-context/useProduct'
import { useProductDispatch } from 'vtex.product-context'
import formatPrice from '../../utils/formatPrice'

const CalculadoraDePisos: StorefrontFunctionComponent = (props: any) => {
  const { children } = props
  const dispatch = useProductDispatch()
  const { product } = useProduct()

  const [boxValue, setBoxValue] = useState(1)
  const [countBoxes, setCountBoxes] = useState(1)
  const [countBoxesPrice, setCountBoxesPrice] = useState(0)
  const [addPercent, setAddPercent] = useState(false)
  const [showCalculator, setShowCalculator] = useState(false)

  const classNames = {
    wrapper: styles.calculadora_wrapper,
    title: styles.calculadora_title,
    calculadora_box: styles.calculadora_box,
    boxContainer: styles.boxContainer,
    left: styles.calculadora_box_left,
    right: styles.calculadora_box_right,
    countBoxes: styles.calculadora_countBoxes,
    countBoxesPrice: styles.calculadora_countBoxesPrice,
    percent: styles.percent,
    boxValue: styles.calculadora_input,
    percentInput: styles.percent_input,
    percentLabel: styles.percent_label,
    eachBoxPrice: styles.eachBoxPrice,
  }

  // 🔍 Verifica se o produto pertence a uma categoria de piso
  const isFloorCategory = (categories: string[] = []): boolean => {
    return categories.some(
      (cat) =>
        cat.includes('Pisos e Revestimentos') ||
        cat.includes('Porcelanato')
    )
  }

  // 🧩 Verifica categoria e remove o preço padrão se necessário
  useEffect(() => {
    if (!product) return
    const categories = product.categories ?? []

    console.log({categories})

    if (isFloorCategory(categories)) {
      setShowCalculator(true)

      const sellingPriceElement = document.querySelector(
        '.vtex-product-price-1-x-sellingPrice'
      )
      if (sellingPriceElement) sellingPriceElement.remove()
    } else {
      setShowCalculator(false)
    }
  }, [product])

  const unitMultiplier = product?.items?.[0]?.unitMultiplier ?? 1
  const pricePerSquareMeter =
    product?.items?.[0]?.sellers?.[0]?.commertialOffer?.Price ?? 0

  // 🔄 Recalcula caixas e valor total
  useEffect(() => {
    const recalculate = () => {
      let calculatedValue = boxValue
      if (addPercent) calculatedValue *= 1.1 // adiciona 10%

      const calculatedBoxes = Math.ceil(calculatedValue / unitMultiplier) || 0
      const calculatedPrice = Math.floor(
        calculatedBoxes * pricePerSquareMeter * unitMultiplier * 100
      ) / 100

      setCountBoxes(calculatedBoxes)
      setCountBoxesPrice(calculatedPrice)

      dispatch?.({
        type: 'SET_QUANTITY',
        args: { quantity: calculatedBoxes },
      } as any)
    }

    recalculate()
  }, [boxValue, addPercent, unitMultiplier, pricePerSquareMeter, dispatch])

  const handleBoxValueChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseFloat(event.target.value)
    setBoxValue(isNaN(value) ? 1 : value)
  }

  const handleAddPercentChange = () => {
    setAddPercent(!addPercent)
  }

  if (!showCalculator) return null

  return (
    <>
      <div className={styles.priceContainer}>
        <p className={styles.productPrice}>
          {formatPrice(pricePerSquareMeter)}/m² <span>à vista</span>
        </p>
        <p className={styles.productUnitMultiplier}>
          ({unitMultiplier}m²/caixa)
        </p>
      </div>

      {children}

      <section className={classNames.wrapper}>
        <h3 className={classNames.title}>
          Quantos metros quadrados você precisa?
        </h3>

        <div className={classNames.calculadora_box}>
          <div className={classNames.boxContainer}>
            <div className={classNames.left}>
              <input
                className={classNames.boxValue}
                type="number"
                name="boxValue"
                value={boxValue}
                min="1"
                step="0.01"
                onChange={handleBoxValueChange}
              />
            </div>

            <div className={classNames.right}>
              <span className={classNames.countBoxes}>
                {countBoxes} caixa(s) ({unitMultiplier} m²/caixa)
              </span>
              <span className={classNames.eachBoxPrice}>
                {formatPrice(unitMultiplier * pricePerSquareMeter)} / caixa
              </span>
              <span className={classNames.countBoxesPrice}>
                {formatPrice(countBoxesPrice)}
              </span>
            </div>
          </div>

          <div className={classNames.percent}>
            <input
              className={classNames.percentInput}
              type="checkbox"
              id="add-percent"
              checked={addPercent}
              onChange={handleAddPercentChange}
            />
            <label
              htmlFor="add-percent"
              className={classNames.percentLabel}
            ></label>
            Seja prevenido e <strong>adicione 10%</strong>
          </div>
        </div>
      </section>
    </>
  )
}

export default CalculadoraDePisos
