import React, { useEffect, useState } from 'react'
import { NavLink, useLocation } from 'react-router-dom'
import { UserContext } from '../../UserContext'
import MinhasFotos from '../../Assets/feed.svg?react'
import AdicionarFoto from '../../Assets/adicionar.svg?react'
import Sair from '../../Assets/sair.svg?react'
import styles from './UserHeaderNav.module.css'
import { useNavigate } from 'react-router-dom'
import UseMedia from '../../Hooks/UseMedia'

const UserHeaderNav = () => {
    const { userLogout } = React.useContext(UserContext)
    const navigate = useNavigate()
    const mobile = UseMedia('(max-width: 40rem)')
    const [mobileMenu, setMobileMenu] = React.useState(false)

    const {pathname} = useLocation()
    useEffect(() => {
        setMobileMenu(false)
    }, [pathname])

    function handleLogout() {
        userLogout()
        Navigate('/login')
    }  

  return (
    <React.Fragment>
        {mobile && 
        <button 
            aria-label='Menu' 
            className={`${styles.mobileButton} ${mobileMenu && styles.mobileButtonActive}` }
            onClick={() => setMobileMenu(!mobileMenu)}
        ></button>}

        <nav className={`${mobile ? styles.navMobile : styles.nav } ${mobileMenu && styles.navMobileActive}`}>
            <NavLink to='/conta' end>
                <MinhasFotos />
                {mobile && 'Minhas Fotos'}
            </NavLink>

            <NavLink to='/conta/postar'>
                <AdicionarFoto />
                {mobile && 'Adicionar Foto'}
                
            </NavLink>
            <button onClick={handleLogout}>
                <Sair />
                {mobile && 'Sair'}
            </button>
        </nav>
    </React.Fragment>
  )
}

export default UserHeaderNav