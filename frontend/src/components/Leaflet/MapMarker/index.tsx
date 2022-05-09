import { Icon } from 'leaflet';
import React, { useState } from 'react';

import { Popup, useMapEvents } from 'react-leaflet';
import { Marker } from 'react-leaflet';

import { mapIcon } from "../../../utils/mapicon";
import { GeoLocation } from '../LeafletMap';

export type MapMarkerProps = {
  setPosition?: React.Dispatch<React.SetStateAction<GeoLocation | null>>;
  popupText?: string;
  setCurrentMarkerOnClick?: boolean;
  getCurrentLocation?: boolean;
  icon?: Icon;
}

export function MapMarker({
  setPosition,
  popupText,
  setCurrentMarkerOnClick=true,
  getCurrentLocation=true,
  icon
}: MapMarkerProps) {
  const [markerPosition, setMarkerPosition] = useState<GeoLocation | null>(null);

  const map = useMapEvents({
    click(event) {
      map.locate();

      if(setCurrentMarkerOnClick) {
        setMarkerPosition(event.latlng);
      }

      map.flyTo(event.latlng, map.getZoom())
      setPosition && setPosition(event.latlng);
    },
    locationfound: (event) => {
      map.flyTo(event.latlng, map.getZoom());

      if(getCurrentLocation) {
        setMarkerPosition(event.latlng);
      }
      setPosition && setPosition(event.latlng);
    },

  });

  return markerPosition && (
    <Marker position={markerPosition} icon={icon ? icon : mapIcon}>
      <Popup>{popupText || 'Você marcou aqui!'}</Popup>
    </Marker>
  )
}