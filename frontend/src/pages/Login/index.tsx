import React from 'react';

import './styles.css';

import { FiArrowLeft } from 'react-icons/fi';
import { Link } from 'react-router-dom';
import {LoginSidebar} from '../../components/LoginSidebar';

export function Login() {
	function handleSubmitLogin() {

	}
	return (
		<div className="pageLogin">
			<LoginSidebar />
			<div className="containerFormulary">
				<div className="formulary">
					<Link to="/" className="toFirstPage">
						<FiArrowLeft size={26} className="arrow" />
					</Link>
					<h1>Fazer login</h1>
					<form onSubmit={handleSubmitLogin}>
						<label htmlFor="email">
							E-mail
						</label>
						<input type="text" id="email" />

						<label htmlFor="password">
							Senha
						</label>
						<input type="password" id="password" />
						<div className="footerLogin">
							<label htmlFor="remember">
								<input type="checkbox" name="remember" id="remember" />
								Lembrar-me
							</label>
							<Link to="ForgotPassword">Esqueci minha senha</Link>
						</div>
						<button className="confirm-button" type="submit">
							Entrar
						</button>
					</form>
				</div>
			</div>
		</div>
	)
}
