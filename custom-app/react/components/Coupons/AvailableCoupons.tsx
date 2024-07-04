import React, { useState } from 'react'
import ExpireDateIcon from './icons/ExpireDateIcon'
import styles from './styles.css'
import { CouponCardProps, CouponProps } from './Coupons.types'

const CouponCard = ({ coupon }: { coupon: CouponCardProps }) => {
  const [btnText, setBtnText] = useState('Copiar código')

  const copyCode = () => {
    navigator.clipboard.writeText(coupon.code)
    setBtnText('Código copiado!')

    setTimeout(() => {
      setBtnText('Copiar código')
    }, 4000)
  }

  return (
    <div className={styles.couponCard}>
      <div className={styles.logoContainer}>
        <img src="/arquivos/coupon-card-logo.png" />
      </div>
      <div className={styles.infoContainer}>
        <h3>{coupon.title}</h3>
        <button>Regras do cupom</button>
        <div className={styles.rulesContainer}>{coupon.rules}</div>
        <div className={styles.expireDateContainer}>
          <ExpireDateIcon />
          Válido até {coupon.expireDate}
        </div>
      </div>
      <div className={styles.buttonsContainer}>
        <div className={styles.codeBtn}>{coupon.code}</div>
        <button className={styles.copyCodeBtn} onClick={() => copyCode()}>
          <img src="/arquivos/how-to-step-1.svg" />
          {btnText}
        </button>
        <button className={styles.buyProductsBtn}>
          <a href={coupon.href}>
            <img src="/arquivos/how-to-step-4.svg" />
            Comprar produtos
          </a>
        </button>
      </div>
    </div>
  )
}

const AvailableCoupons = ({ coupons, children }: CouponProps) => {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <section className={styles.availableCoupons}>
      <h2>Confira os cupons disponíveis</h2>

      <div className={styles.couponsContainer}>
        {coupons.map((coupon) => {
          return <CouponCard coupon={coupon} />
        })}
      </div>

      <button
        className={styles.rulesBtn}
        onClick={() => setIsOpen(!isOpen)}
        style={isOpen ? { marginBottom: '20px' } : {}}
      >
        Regras de cupom na IRMÃOS SOARES
      </button>
      {isOpen && <div>{children}</div>}
    </section>
  )
}

export default AvailableCoupons
