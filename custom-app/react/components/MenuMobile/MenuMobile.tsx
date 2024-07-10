import React, { FC, useEffect, useState } from 'react'
import styles from './styles.css'

interface MenuItem {
  id: string
  name: string
  url: string
  children?: MenuItem[]
  active: boolean
  parentCategory?: string
}

const MenuMobile: FC = () => {
  const [menu, setMenu] = useState(false)
  const [menuData, setMenuData] = useState<MenuItem[]>([])
  const [openOffer, setOpenOffer] = useState(false)

  const handleToggleItem = (itemId: string) => {
    setMenuData((prevMenuData) => {
      return prevMenuData.map((item) => {
        if (item.id === itemId) {
          return {
            ...item,
            active: !item.active,
          }
        }
        return item
      })
    })
  }

  const toggleMenu = () => {
    setMenu(!menu)
  }

  const loadMenuData = async () => {
    try {
      const response = await fetch('/api/catalog_system/pub/category/tree/1', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/vnd.vtex.ds.v10+json',
          'REST-Range': 'resources=0-1000',
        },
      })

      if (response.ok) {
        const data = await response.json()
        const menuDataWithActive = data.map((item: MenuItem) => {
          return {
            ...item,
            active: false,
          }
        })
        setMenuData(menuDataWithActive)
      } else {
        throw new Error(`Failed to fetch menu data: ${response.statusText}`)
      }
    } catch (error) {
      console.error('Error fetching menu data:', error)
    }
  }

  useEffect(() => {
    if (menu && menuData.length === 0) {
      loadMenuData()
    }
  }, [menu, menuData])

  const renderMenuItems = (items: MenuItem[], _parentCategory?: string) => {
    return items.map((item) => {
      const hasChildren = item.children && item.children.length > 0
      return (
        <li
          key={item.id}
          id={`cat-${item.id}`}
          className={`${styles.navExpand} ${item.active ? styles.active : ''} ${
            hasChildren ? styles.more : ''
          }`}
        >
          <a
            href={hasChildren ? '#' : item.url}
            title={item.name}
            className={styles.navLink}
            onClick={() => handleToggleItem(item.id)}
          >
            {item.name}
          </a>
          {item.children && (
            <ul className={styles.navExpandContent}>
              <li className={`${styles.navItem} ${styles.navBack}`}>
                <a
                  className={`${styles.navBackLink}`}
                  href="#"
                  onClick={() => handleToggleItem(item.id)}
                >
                  {item.name}
                </a>
              </li>
              {renderMenuItems(item.children, item.id)}
              <li>
                <a
                  href={item.url}
                  title={`Ver todos os produtos da categoria ${item.name}`}
                  className={styles.navLink}
                >
                  Ver todos
                </a>
              </li>
            </ul>
          )}
        </li>
      )
    })
  }

  return (
    <>
      <button
        className={`${styles.menuToggle} ${menu ? styles.active : ''}`}
        aria-label="Menu"
        onClick={toggleMenu}
      >
        <span></span>
        <span></span>
        <span></span>
      </button>

      {menu && (
        <>
          <div
            id="modalMenu"
            tabIndex={-1}
            aria-labelledby="modalMenuLabel"
            aria-hidden={!menu}
            aria-modal={menu}
            role="dialog"
            style={{ display: menu ? 'block' : 'none' }}
            className={`${styles.modalMenu} ${styles.modalLeft} ${
              styles.fade
            } ${menu ? styles.show : ''}`}
          >
            <div className={styles.modalDialog}>
              <div className={styles.modalContent}>
                <div className={styles.modalHeader}>
                  <button
                    onClick={toggleMenu}
                    type="button"
                    className={styles.btnClose}
                    data-bs-dismiss="modal"
                    aria-label="Close"
                  ></button>

                  <img
                    className="img-fluid d-block mx-auto"
                    alt="Irmãos Soares"
                    src="/arquivos/logo-irmao-soares.png"
                    width={100}
                    height={40}
                  />
                </div>
                <div className={styles.modalBody}>
                  <nav>
                    <ul className={styles.menu}>
                      <li>
                        <a href="/" title="Início">
                          Início
                        </a>
                      </li>
                      <li id="cat-ofertas" className={styles.catOfertas}>
                        <a title="Ofertas" className={styles.navLinkOffer} onClick={() => setOpenOffer(true)}>
                          Ofertas
                        </a>
                        <ul className={`${styles.navExpandContent} ${styles.navExpandContentOffer} ${openOffer ? styles.show : ''}`}>
                          <li className={`${styles.navItem} ${styles.navBack}`} onClick={() => setOpenOffer(false)}>
                            <a
                              className={`${styles.navBackLink}`}
                              onClick={() => setOpenOffer(false)}
                            >
                              Ofertas
                            </a>
                          </li>
                          <li className={`${styles.navItem}`}>
                            <a href="/139?map=productClusterIds&order=OrderByPriceDESC">
                              Produtos em oferta
                            </a>
                          </li>
                          <li className={`${styles.navItem}`}>
                            <a href="/cupons-de-desconto">
                              Cupons de descontos
                            </a>
                          </li>
                        </ul>
                      </li>
                      {renderMenuItems(menuData)}
                    </ul>
                  </nav>
                </div>
              </div>
            </div>
          </div>
          <div
            id="modalBackdrop"
            onClick={toggleMenu}
            className={`${styles.modalBackdrop} ${styles.fade} ${styles.show}`}
          ></div>
        </>
      )}
    </>
  )
}

export default MenuMobile
