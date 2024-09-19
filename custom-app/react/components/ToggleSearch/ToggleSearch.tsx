import React, { useState, useCallback } from 'react'

import styles from './toggle-search.css'

interface Props {
  openSearchIcon: string
  closeSearchIcon: string
}

const ToggleSearch: StorefrontFunctionComponent<Props> = (props: any) => {
  const [openedSearch, setOpenedSearch] = useState(false)

  const toggleSearch = useCallback(() => {
    setOpenedSearch(!openedSearch)
  }, [openedSearch])

  return (
    <>
      <button className={styles.searchButton} onClick={toggleSearch}>
        <img
          src={openedSearch ? props.closeSearchIcon : props.openSearchIcon}
        />
      </button>

      <div
        className={`${styles.searchWrapper} ${
          openedSearch ? styles.activeSearchWrapper : ''
        }`}
      >
        {props.children}
      </div>

      <div
        className={`${styles.searchOverlay} ${
          openedSearch ? styles.activeSearchOverlay : ''
        }`}
        onClick={toggleSearch}
      ></div>
    </>
  )
}

export default ToggleSearch
