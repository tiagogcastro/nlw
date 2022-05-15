import { Icon } from 'leaflet';
import React, { useState } from 'react';

import { Popup, useMapEvents } from 'react-leaflet';
import { Marker } from 'react-leaflet';

import { mapIcon } from "../../../utils/mapicon";
import { GeoLocation } from '../LeafletMap';

export type MapMarkerProps = {
  setPosition?: (location: GeoLocation | null) => void;
  popupText?: string;
  setCurrentMarkerOnClick?: boolean;
  getCurrentLocation?: boolean;
  icon?: Icon;

  setErrors?: <T>(errors: T) => void;
}

export function MapMarker({
  setPosition,
  popupText,
  setCurrentMarkerOnClick=true,
  getCurrentLocation=true,
  icon,
  setErrors
}: MapMarkerProps) {
  const [markerPosition, setMarkerPosition] = useState<GeoLocation | null>(null);

  const map = useMapEvents({
    click(event) {
      map.locate();
      map.flyTo(event.latlng, map.getZoom())

      setPosition && setPosition(event.latlng);

      // using by form lib
      setErrors && setErrors((prevState: any) => {
        return {
          ...prevState,
          latitude: undefined,
          longitude: undefined,
        }
      })

      if(setCurrentMarkerOnClick) {
        setMarkerPosition(event.latlng);
      }
    },
    locationfound: (event) => {
      if(getCurrentLocation) {
        map.flyTo(event.latlng, map.getZoom());

        setPosition && setPosition(event.latlng);

        setMarkerPosition(event.latlng);
      }
    },
  });

  return markerPosition && (
    <Marker position={markerPosition} icon={icon ? icon : mapIcon}>
      <Popup>{popupText || 'Você marcou aqui!'}</Popup>
    </Marker>
  )
}