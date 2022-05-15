import React, { useEffect, useMemo, useState } from 'react';

import { MapContainerProps } from 'react-leaflet';

import { Orphanage } from '../../../pages/OrphanagesMap';
import { userHereIcon } from '../../../utils/mapicon';
import { GeoLocation, LeafletMap } from '../LeafletMap';
import { LeafletOrphanagesMarker } from '../LeafletOrphanagesMarker';
import { MapMarker } from '../MapMarker';

export type MapStatus = 'none' | 'loading' | 'location_denied' | 'location_accept';

export type LeafletOrphanagesMapProps = MapContainerProps &{
  orphanages?: Orphanage[];
}

export function LeafletOrphanagesMap({
  orphanages,
  ...rest
}: LeafletOrphanagesMapProps) {
  return useMemo(() => {
		return (
			<>
        <LeafletMap
          key="current_location_map" 
          location={{
            lat: 51.505,
            lng: -0.09,
          }}
          {...rest}
        >
          {orphanages && <LeafletOrphanagesMarker orphanages={orphanages}/>}
          {rest.children}
          <MapMarker
            getCurrentLocation
            setCurrentMarkerOnClick={false} 
            popupText='Você está aqui'
            icon={userHereIcon}
          />
        </LeafletMap>
			</>
		)
	}, [orphanages]);
}