import React, { useEffect, useState} from 'react';
import mapMarkerImg from '../images/map-marker.svg';
import {Link} from 'react-router-dom';
import {FiPlus} from 'react-icons/fi';
import {Map, TileLayer, Marker, Popup} from 'react-leaflet';
import {FiArrowLeft, FiArrowRight} from 'react-icons/fi'

import '../styles/pages/orphanages-map.css';
import mapIcon from '../utils/mapicon';
import api from '../services/api';

interface Orphanage {
    id: number
    latitude: number
    longitude: number
    name: string
}

function OrphanagesMap() {
    const [orphanages, setOrphanages] = useState<Orphanage[]>([])

    useEffect(() => {
        api.get('orphanages').then(res => {
            setOrphanages(res.data)
        })
    }, [])
    return (
        <div id="page-map">
            <aside>
                <header>
                    <img src={mapMarkerImg} alt=""/>
                    <h1>Escolha um orfanato no mapa</h1>
                    <p> Muitas crianças estão esperando a sua visita.</p>
                </header>

                <footer>
                    <strong>Mangaratiba</strong>
                    <span>Rio de Janeiro</span>
                    <Link to="/" className="toFirstPage">
                        <FiArrowLeft size={26} color="rgba(0,0, 0, 0.6)" className="arrow"/>
                        Voltar
                    </Link>
                </footer>
            </aside>

            <Map 
                center={[-22.9207414,-43.9016972]}
                zoom={15}
                style={{width: '100%', height: '100%'}}>
                <TileLayer 
                    url={`https://api.mapbox.com/styles/v1/mapbox/light-v10/tiles/256/{z}/{x}/{y}@2x?access_token=${process.env.REACT_APP_MAPBOX_TOKEN}`}
                /> 

                {orphanages.map(orphanage => {
                    return (
                        <Marker
                            key={orphanage.id}
                            icon={mapIcon}
                            position={[orphanage.latitude, orphanage.longitude]}
                            >
                            <Popup closeButton={false} minWidth={240} maxWidth={240} className="map-popup">
                            {orphanage.name}
                            <Link to={`/orphanages/${orphanage.id}`}>
                                <FiArrowRight size={20} color="fff"/>
                            </Link>
                            </Popup>
                        </Marker>
                    )
                })}
            </Map>

            <Link to="/orphanages/create" className="create-orphanage">
                <FiPlus size={32} color="#fff"/>
            </Link>

        </div>
    );
}

export default OrphanagesMap;