import React from 'react';

import { MapContainer, MapContainerProps, TileLayer } from 'react-leaflet'

export type GeoLocation = {
  lat: number;
  lng: number;
}

export type LeafletMapProps = MapContainerProps &{
  location: GeoLocation;
  children?: React.ReactNode;
}

export function LeafletMap({
  location,
  children,
  ...rest
}: LeafletMapProps) {
  return (
    <MapContainer
      key={"currentmap"}
      center={[
        location.lat,
        location.lng
        ] 
      }
      zoom={10}
      style={{ width: '100%', height: '100%' }}
      {...rest}  
    >
      <TileLayer
        url={`${process.env.REACT_APP_MAPBOX_API}?access_token=${process.env.REACT_APP_MAPBOX_TOKEN}`}
      />
      {children}
    </MapContainer>
  )
}