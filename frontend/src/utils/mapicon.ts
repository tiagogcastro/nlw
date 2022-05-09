import Leaflet from 'leaflet';
import mapMarkerImg from '../images/map-marker.svg';
import userHereImg from '../images/user_here_icon.png';

export const mapIcon = Leaflet.icon({
  iconUrl: mapMarkerImg,
  iconSize: [58, 68],
  iconAnchor: [29, 68],
  popupAnchor: [0, -60]
});

export const userHereIcon = Leaflet.icon({
  iconUrl: userHereImg,
  iconSize: [58, 68],
  iconAnchor: [29, 68],
  popupAnchor: [0, -60]
});
