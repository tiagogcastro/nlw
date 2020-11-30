import React from 'react'
import logoImg from '../images/logoLogin.svg'

import '../styles/components/loginSidebar.css'

export default function LoginSidebar() {
    return (
        <aside className="app-sidebar-login">
            <img src={logoImg} alt="Happy"/>
            <div className="location-login">
                <strong>Mangaratiba</strong>
                <span>Rio de Janeiro</span>
            </div>
        </aside>
    )
}