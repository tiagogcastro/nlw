import React from 'react';

import { Marker, Popup } from 'react-leaflet';

import { FiArrowRight } from 'react-icons/fi';

import { Link } from 'react-router-dom';

import { Orphanage } from '../../../pages/OrphanagesMap';
import { mapIcon } from '../../../utils/mapicon';

export type LeafletOrphanagesMarker = {
  orphanages?: Orphanage[]
}

export function LeafletOrphanagesMarker({
  orphanages
}: LeafletOrphanagesMarker) {

  return (
    <>
      {orphanages && orphanages.map(orphanage => (
        <Marker
          key={orphanage.id}
          icon={mapIcon}
          position={[orphanage.latitude, orphanage.longitude]}
        >
          <Popup closeButton={false} minWidth={240} maxWidth={240} className="map-popup">
            {orphanage.name}
            <Link to={`/orphanages/${orphanage.id}`}>
              <FiArrowRight size={20} color="fff" />
            </Link>
          </Popup>
        </Marker>
      ))}
    </>
  )
}