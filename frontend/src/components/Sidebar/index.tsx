import './styles.css';

import React from 'react';
import { useNavigate } from 'react-router-dom';

import { FiArrowLeft } from 'react-icons/fi'

import mapMarkerImg from '../../images/map-marker.svg';

export function Sidebar() {
	const pageNavigate = useNavigate();

	return (
		<aside className="app-sidebar">
			<img src={mapMarkerImg} alt="Happy" />
			<footer>
				<button type="button" onClick={() => pageNavigate('/orphanages')}>
					<FiArrowLeft size={24} color="#FFF" />
				</button>
			</footer>
		</aside>
	)
}