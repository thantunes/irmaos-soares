import React from 'react'
import styles from './styles.css'

interface Loja {
  nameStore: string
  addressStore: string
  phoneStore: string
  photoStore: string
  linkStore?: string
}

interface LojasProps {
  lojas: Loja[]
}

const Lojas: StorefrontFunctionComponent<LojasProps> = (props: LojasProps) => {
  const lojas = props.lojas || []

  return (
    <div className={styles.stores}>
      {lojas.map((shop: Loja, index: number) => {
        return (
          <div className={styles.store} key={index}>
            <div className={styles.shopImage}>
              <img
                className="w-100"
                src={shop.photoStore}
                alt={shop.nameStore}
              />
            </div>
            <div className={styles.shopInfo}>
              <h2 className={styles.shopName}>{shop?.nameStore}</h2>
              <a
                href={`tel:${shop?.phoneStore}`}
                title={`Ligar para ${shop?.nameStore}`}
                target="_blank"
                className={styles.phoneStore}
              >
                {shop?.phoneStore}
              </a>
            </div>
            <div className={styles.addressContent}>
              <p className={styles.address}>{shop?.addressStore}</p>
              {shop.linkStore ? (
                <a
                  href={shop.linkStore}
                  className={styles.storeLink}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <img
                    src="/arquivos/nossas-lojas-map-icon.svg"
                    alt="Ver no mapa"
                    style={{ marginRight: 8 }}
                  />
                  Ver no Mapa
                </a>
              ) : null}
            </div>
          </div>
        )
      })}
    </div>
  )
}

export default Lojas

Lojas.schema = {
  title: 'Lojas Físicas',
}
