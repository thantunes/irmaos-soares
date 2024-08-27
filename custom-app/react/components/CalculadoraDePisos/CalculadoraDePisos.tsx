import React, { useEffect, useState } from 'react'
import styles from './styles.css'
//@ts-ignore
import useProduct from 'vtex.product-context/useProduct'
import formatPrice from '../../utils/formatPrice'
import { useProductDispatch } from 'vtex.product-context'

// import Installments from "vtex.product-price/Installments";

interface CalculatorProps {
  productContext: {
    product: {
      items: {
        unitMultiplier: number
        sellers: {
          commertialOffer: {
            Price: number
            Installments: {
              Value: number[]
            }[]
          }
        }[]
      }[]
      categories: string[]
    }
  }
}

const CalculadoraDePisos: StorefrontFunctionComponent<CalculatorProps> = () => {
  const dispatch = useProductDispatch()
  const { product } = useProduct()

  console.log({product})

  const [boxValue, setBoxValue] = useState(1)
  const [countBoxes, setCountBoxes] = useState(1)
  const [countBoxesPrice, setCountBoxesPrice] = useState(0)
  const [addPercent, setAddPercent] = useState(false)
  const [showCalculator, setShowCalculator] = useState(false)
  const classNames = {
    wrapper: styles.calculadora_wrapper,
    title: styles.calculadora_title,
    calculadora_box: styles.calculadora_box,
    left: styles.calculadora_box_left,
    right: styles.calculadora_box_right,
    countBoxes: styles.calculadora_countBoxes,
    countBoxesPrice: styles.calculadora_countBoxesPrice,
    percent: styles.percent,
    boxValue: styles.calculadora_input,
    percentInput: styles.percent_input,
    percentLabel: styles.percent_label,
  }
  useEffect(() => {
    if (product) {
      checkCategory()
    }
  }, [product])

  useEffect(() => {
    recalculate()
  }, [boxValue, addPercent])

  const checkCategory = () => {
    const categories = product?.categories

    if (categories) {
      if (categories.includes('/Pisos e Revestimentos/Pisos e Revestimentos/')) {
        setShowCalculator(true)
        const sellingPrice = document.querySelector(
          '.vtex-product-price-1-x-sellingPrice'
        )
        if (sellingPrice) {
          document
            .querySelector('.vtex-product-price-1-x-sellingPrice')
            ?.remove()
        }
      } else {
        setShowCalculator(false)
      }
    }
  }

  const unitMultiplier = product?.items[0].unitMultiplier!
  const pricePerSquareMeter =
    product?.items[0].sellers[0].commertialOffer.Price!
  // const installments = product?.items[0].sellers[0].commertialOffer.Installments[0].Value!;

  const recalculate = () => {
    let calculatedValue = boxValue
    if (addPercent) {
      calculatedValue *= 1.1 // Adiciona 10%
    }

    let calculatedBoxes = Math.ceil(calculatedValue / unitMultiplier) || 0
    let calculatedPrice = calculatedBoxes * pricePerSquareMeter * unitMultiplier
    calculatedPrice = Math.floor(calculatedPrice * 100) / 100

    setCountBoxes(calculatedBoxes)
    dispatch?.({
      type: 'SET_QUANTITY',
      args: {
        quantity: calculatedBoxes,
      },
    } as any)
    setCountBoxesPrice(calculatedPrice)
  }

  const handleBoxValueChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseFloat(event.target.value)
    setBoxValue(value)
  }

  const handleAddPercentChange = () => {
    setAddPercent(!addPercent)
  }

  if (!showCalculator) return null

  return (
    <>
      <section className={classNames.wrapper}>
        <h3 className={classNames.title}>
          Quantos metros quadrados você precisa?
        </h3>
        <div className={classNames.calculadora_box}>
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
            <span className={classNames.countBoxesPrice}>
              {formatPrice(countBoxesPrice)}
            </span>
          </div>
        </div>
        <div className={classNames.percent}>
          <input
            className={classNames.percentInput}
            type="checkbox"
            name="add-percent"
            id="add-percent"
            checked={addPercent}
            onChange={handleAddPercentChange}
          />
          <label
            htmlFor="add-percent"
            className={classNames.percentLabel}
          ></label>
          Seja prevenido e adicione 10%
        </div>
      </section>

      <p className={styles.productPrice}>
        {formatPrice(pricePerSquareMeter)}/m² <span>à vista</span>
      </p>
      <p className={styles.productUnitMultiplier}>({unitMultiplier}m²/caixa)</p>
    </>
  )
}

export default CalculadoraDePisos
