import React from 'react';
import { FiArrowRight } from 'react-icons/fi';
import { Link } from 'react-router-dom';

import './styles.css';

import logoImg from '../../images/logo.svg';

export function Landing() {


	return (
		<div id="page-landing">
			<div className="content-wrapper">
				<div className="happyAndLocation">
					<img src={logoImg} alt="Happy" />
					{/* <div className="location">
						<strong>Mangaratiba</strong>
						<span>Rio de Janeiro</span>
					</div> */}
				</div>
				<main>
					<h1>Leve felicidade para o mundo</h1>
					<p>Visite orfanatos e mude o dia de muitas crianças.</p>
				</main>

				<Link to="/orphanages" className="enter-app">
					<FiArrowRight size={26} color="rgba(0,0, 0, 0.6)" />
				</Link>
			</div>
		</div>
	);
}