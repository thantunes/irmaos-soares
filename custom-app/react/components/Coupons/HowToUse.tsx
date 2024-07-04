import React, { useState } from 'react'
import UpArrowIcon from './icons/UpArrowIcon'
import { StepCardProps } from './Coupons.types'
import styles from './styles.css'
import RightArrowIcon from './icons/RightArrowIcon'

const STEPS = [
  {
    title: 'Na página de cupons',
    icon: '/arquivos/how-to-step-1.svg',
    instruction: 'Escolha o seu cupom e copie o código',
  },
  {
    title: 'Na página de produtos',
    icon: '/arquivos/how-to-step-2.svg',
    instruction: 'Adicione os produtos ao carrinho',
  },
  {
    title: 'No carrinho',
    icon: '/arquivos/how-to-step-3.svg',
    instruction: "Cole ou digite o código e clique em 'Aplicar'",
  },
  {
    title: 'No carrinho',
    icon: '/arquivos/how-to-step-4.svg',
    instruction: "Clique em 'Finalizar compra'",
  },
]

const StepCard = ({ title, icon, instruction, index }: StepCardProps) => {
  return (
    <div className={styles.stepCard}>
      <div className={styles.stepId}>
        <div className={styles.number}>{index + 1}</div>
        <div className={styles.title}>{title}</div>
      </div>
      <div className={styles.instruction}>
        <img src={icon} alt={title} />
        <div>{instruction}</div>
      </div>
      <div className={styles.divider}>
        <RightArrowIcon />
      </div>
    </div>
  )
}

const HowToUse = () => {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <section
      className={`${styles.howToContainer} ${isOpen ? styles.isOpen : ''}`}
    >
      <div className={styles.howToHeader}>
        <h2>Como utilizar?</h2>
        <button
          className={styles.howToHeaderButton}
          onClick={() => setIsOpen(!isOpen)}
        >
          Mostrar mais
          <div
            className={`${styles.howToHeaderButtonIcon} ${
              isOpen ? styles.isOpen : ''
            }`}
          >
            <UpArrowIcon />
          </div>
        </button>
      </div>
      <div className={styles.howToSteps}>
        {STEPS.map(({ title, icon, instruction }, index) => {
          return (
            <StepCard
              title={title}
              icon={icon}
              instruction={instruction}
              index={index}
              key={index}
            />
          )
        })}
      </div>
      <div className={styles.generalRule}>
        <img src="/arquivos/general-rule.svg" alt="Regra geral" />
        <div>Regra geral de uso:</div>
        <p>*Cupons não são cumulativos, devendo ser usado um por vez.</p>
      </div>
      <div
        className={`${styles.gradientOverlay} ${isOpen ? styles.isOpen : ''}`}
      />
    </section>
  )
}

export default HowToUse
