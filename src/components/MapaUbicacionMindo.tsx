'use client';
import { useEffect } from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

const mindoCaptacion: [number, number] = [-0.14955028509698767, -78.58823539490909];

export default function MapaUbicacionMindo() {
  useEffect(() => {
    // Forzar el borrado para evitar error TS
    delete (L.Icon.Default.prototype as any)._getIconUrl;

    L.Icon.Default.mergeOptions({
      iconRetinaUrl: '/leaflet/marker-icon-2x.png',
      iconUrl: '/leaflet/marker-icon.png',
      shadowUrl: '/leaflet/marker-shadow.png',
    });
  }, []);

  return (
    <div style={{ height: '300px', width: '100%', marginTop: '1rem' }}>
      <MapContainer
        center={mindoCaptacion}
        zoom={13}
        scrollWheelZoom={true}
        style={{ height: '100%', width: '100%' }}
      >
        <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />

        <Marker position={mindoCaptacion}>
          <Popup>
            📍 <strong>Mindo Captación</strong><br />
            Tipo: Estación Climatológica
          </Popup>
        </Marker>
      </MapContainer>
    </div>
  );
}
