import { useEffect } from 'react'

const QuantityInputFix = () => {
  useEffect(() => {
    console.log('QuantityInputFix ativo')

    const applyFix = () => {
      const inputs = document.querySelectorAll(
        '.vtex-product-quantity-1-x-quantitySelectorContainer .vtex-numeric-stepper__input'
      )

      inputs.forEach((input) => {
        // Evita adicionar o mesmo listener várias vezes
        // @ts-ignore
        if (!input.dataset.fixApplied) {
          input.addEventListener('click', blockRedirectClick)
          input.addEventListener('keydown', blockRedirectKeydown)
          // @ts-ignore
          input.dataset.fixApplied = 'true'
        }
      })
    }

    // Aplica fix nos que já existem
    applyFix()

    // Observa mudanças no DOM (quando a VTEX renderiza vitrine, shelf, etc)
    const observer = new MutationObserver(() => {
      applyFix()
    })

    observer.observe(document.body, {
      childList: true,
      subtree: true,
    })

    return () => {
      observer.disconnect()
    }
  }, [])

  return null
}

function blockRedirectClick(e: any) {
  e.stopPropagation()
  e.preventDefault()
}

function blockRedirectKeydown(e: any) {
  e.stopPropagation()
}

export default QuantityInputFix
