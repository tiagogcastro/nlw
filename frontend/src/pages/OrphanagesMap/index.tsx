import './styles.css';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

import { FiPlus } from 'react-icons/fi';
import { FiArrowLeft } from 'react-icons/fi';

import mapMarkerImg from '../../images/map-marker.svg';

import { LeafletOrphanagesMap } from '../../components/Leaflet';

import {api} from '../../services/api';

export interface Orphanage {
	id: number
	latitude: number
	longitude: number
	name: string
}

export function OrphanagesMap() {
	const [orphanages, setOrphanages] = useState<Orphanage[]>([]);

	useEffect(() => {
		api.get('orphanages').then(res => {
			setOrphanages(res.data)
		})
	}, [])

	return (
		<div id="page-map">
			<aside>
				<header>
					<img src={mapMarkerImg} alt="" />
					<h1>Escolha um orfanato no mapa</h1>
					<p> Muitas crianças estão esperando a sua visita.</p>
				</header>

				<footer>
					<strong>Mangaratiba</strong>
					<span>Rio de Janeiro</span>
					<Link to="/" className="toFirstPage">
						<FiArrowLeft size={26} color="rgba(0,0, 0, 0.6)" className="arrow" />
						Voltar
					</Link>
				</footer>
			</aside>
			<LeafletOrphanagesMap orphanages={orphanages}/>

			<Link to="/orphanages/create" className="create-orphanage">
				<FiPlus size={32} color="#fff" />
			</Link>
		</div>
	);
}
