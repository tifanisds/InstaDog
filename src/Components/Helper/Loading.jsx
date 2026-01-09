import React from 'react'
import styles from './Loading.module.css'
import Carregamento from '../../Assets/carregando.svg?react'

const Loading = () => {
  return (
    <div className={styles.wrapper}>
      <div className={styles.loading}>
        <Carregamento />
      </div>
    </div>
  )
}

export default Loading