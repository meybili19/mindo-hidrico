'use client';

import { useEffect, useState } from 'react';
import {
  MapContainer,
  TileLayer,
  Marker,
  Tooltip,
  Polyline,
  useMap,
  CircleMarker
} from 'react-leaflet';
import L, { LatLngTuple } from 'leaflet';
import styles from "../styles/MapaSistemaAgua.module.css";
import 'leaflet/dist/leaflet.css';
import { div } from 'framer-motion/client';

L.Icon.Default.mergeOptions({
  iconRetinaUrl: '/leaflet/marker-icon-2x.png',
  iconUrl: '/leaflet/marker-icon.png',
  shadowUrl: '/leaflet/marker-shadow.png',
});

const gotaIcon = new L.Icon({
  iconUrl: '/icons/gota.png',
  iconSize: [25, 25],
  iconAnchor: [12, 12],
});

const filtrosIniciales = {
  climatologicas: true,
  pluviometricas: true,
  aforo: true,
  plantas: true,
  barrios: true,
  cascadas: true,
  recorrido: true,
};


type Estacion = {
  nombre: string;
  tipo: 'Climatológica' | 'Pluviométrica' | 'Aforo' | 'Planta' | 'Distribución';
  coords: LatLngTuple;
  icon: string;
  descripcion: string;
};

type Cascada = {
  nombre: string;
  coords: LatLngTuple;
  descripcion: string;
};

function esEstacion(p: unknown): p is Estacion {
  return typeof p === 'object' && p !== null && 'tipo' in p;
}

const estaciones: Estacion[] = [
  {
    nombre: 'Río Mindo Bajo Estación',
    tipo: 'Aforo',
    coords: [-0.13698021260191134, -78.59399801787073],
    icon: '/icons/rio.png',
    descripcion: '🌊 Se mide cuánta agua pasa por el río, ¡como un medidor gigante de agua en movimiento!',
  },
  {
    nombre: 'Río Ingapi-Pacto',
    tipo: 'Aforo',
    coords: [-0.13876165625612272, -78.58614062875903],
    icon: '/icons/rio.png',
    descripcion: '📏 Esta estación nos dice si el río tiene mucha o poca agua. Muy útil para prevenir desbordes.',
  },
  {
    nombre: 'Mindo Bajo',
    tipo: 'Pluviométrica',
    coords: [-0.13652647443504576, -78.59798696935387],
    icon: '/icons/gota.png',
    descripcion: '💧 Mide la lluvia que cae. ¡Como un vaso que se llena para contar cada gota!',
  },
  {
    nombre: 'Bellavista - Casa',
    tipo: 'Pluviométrica',
    coords: [-0.015974037926492237, -78.68085099840562],
    icon: '/icons/gota.png',
    descripcion: '🌦️ Estación en una zona alta. Mide la lluvia desde las nubes más cercanas.',
  },
  {
    nombre: 'Bellavista - Camping',
    tipo: 'Pluviométrica',
    coords: [-0.016824028263380038, -78.68141096061568],
    icon: '/icons/gota.png',
    descripcion: '🏕️ Mide cuánta lluvia cae mientras acampas. ¡Ideal para llevar paraguas!',
  },
  {
    nombre: 'San José (Precip. efectiva)',
    tipo: 'Pluviométrica',
    coords: [-0.01129596229758306, -78.68803604197946],
    icon: '/icons/gota.png',
    descripcion: '🔍 Ayuda a saber cuánta lluvia realmente llega al suelo y no se evapora. ¡Muy importante!',
  },
  {
    nombre: 'Tandayapa',
    tipo: 'Pluviométrica',
    coords: [-0.019489984736395956, -78.6832500918909],
    icon: '/icons/gota.png',
    descripcion: '🏞️ Mide la lluvia en una zona montañosa. Perfecto para estudiar el bosque nublado.',
  },
  {
    nombre: 'Mindo Captación',
    tipo: 'Climatológica',
    coords: [-0.14955028509698767, -78.58823539490909],
    icon: '/icons/nube.png',
    descripcion: '☁️ Aquí se observan las condiciones del clima como la temperatura y la humedad del ambiente.',
  },
  {
    nombre: 'Planta de tratamiento Uyuchul',
    coords: [-0.10462, -78.55864],
    tipo: 'Planta',
    icon: '/icons/planta.png',
    descripcion: '🏭 Aquí se limpia el agua antes de llevarla a las casas. ¡Es como un gran filtro purificador!',
  },
  {
    nombre: 'Barrio El Bosque',
    coords: [-0.132819, -78.506227],
    tipo: 'Distribución',
    icon: '/icons/casa.png',
    descripcion: '🏠 Uno de los barrios del norte de Quito que recibe agua desde Mindo, tratada en la planta Uyuchul.',
  },
  {
    nombre: 'Barrio Pisulí',
    coords: [-0.128163, -78.515989],
    tipo: 'Distribución',
    icon: '/icons/casa.png',
    descripcion: '🏠 Barrio del norte de Quito que se abastece del agua proveniente de la planta Uyuchul.',
  },
  {
    nombre: 'Barrio La Roldós',
    coords: [-0.123164, -78.519391],
    tipo: 'Distribución',
    icon: '/icons/casa.png',
    descripcion: '🏠 Barrio del norte de Quito que recibe agua limpia desde Uyuchul, proveniente de Mindo.',
  },
  {
    nombre: 'Barrio San Carlos',
    coords: [-0.130407, -78.497675],
    tipo: 'Distribución',
    icon: '/icons/casa.png',
    descripcion: '🏠 Parte de San Carlos se abastece con el agua de Mindo, tratada en Uyuchul.',
  },
];

const cascadas: Cascada[] = [
  {
    nombre: 'Cascada de la Paz',
    coords: [-0.128, -78.695],
    descripcion: '🌈 Una hermosa caída de agua que lleva el agua hacia el río Blanco. ¡Relajante sonido natural!',
  },
  {
    nombre: 'Cascada de la Novia',
    coords: [-0.13, -78.692],
    descripcion: '👰 Famosa por su belleza. El agua cae fuerte creando una neblina mágica.',
  },
  {
    nombre: 'Cascada de la Bruja',
    coords: [-0.132, -78.698],
    descripcion: '🧙‍♀️ Lugar misterioso donde el agua baja desde lo alto. ¡Cuidado con la bruja!',
  },
];

const rutaAgua: LatLngTuple[] = [
  [-0.14955028509698767, -78.58823539490909],
  [-0.10462, -78.55864],
  [-0.128163, -78.515989],
  [-0.123164, -78.519391],
  [-0.132819, -78.506227],
  [-0.130407, -78.497675],
];

function AjustarVista({ puntos }: { puntos: LatLngTuple[] }) {
  const map = useMap();
  useEffect(() => {
    if (puntos.length > 0) {
      const bounds = L.latLngBounds(puntos);
      map.fitBounds(bounds, { padding: [50, 50] });
    }
  }, [puntos, map]);
  return null;
}

export default function MapaSistemaAgua() {
  const puntosVisibles: LatLngTuple[] = [
    ...estaciones.map(e => e.coords),
    ...cascadas.map(c => c.coords),
  ];

  const [gotitaIndex, setGotitaIndex] = useState(0);
  const [filtros, setFiltros] = useState(filtrosIniciales);

  const reiniciarRecorrido = () => {
    setGotitaIndex(0);
  };

  useEffect(() => {
    if (!filtros.recorrido) return;
    const intervalo = setInterval(() => {
      setGotitaIndex((prev) => {
        if (prev < rutaAgua.length - 1) return prev + 1;
        clearInterval(intervalo);
        return prev;
      });
    }, 2000);
    return () => clearInterval(intervalo);
  }, [filtros.recorrido]);

  const toggleFiltro = (clave: keyof typeof filtros) => {
    setFiltros(prev => ({ ...prev, [clave]: !prev[clave] }));
  };

  return (
    <div className={styles.main}>
      <div className={styles.mapaWrapper}>
        <div className={styles.accionesMapa}>
          <button onClick={() => toggleFiltro('climatologicas')}>
            Estación de Captación {filtros.climatologicas ? '👁️' : '🚫'}
          </button>
          <button onClick={() => toggleFiltro('pluviometricas')}>
            Pluviométricas {filtros.pluviometricas ? '👁️' : '🚫'}
          </button>
          <button onClick={() => toggleFiltro('aforo')}>
            Ríos {filtros.aforo ? '👁️' : '🚫'}
          </button>
          <button onClick={() => toggleFiltro('plantas')}>
            Plantas {filtros.plantas ? '👁️' : '🚫'}
          </button>
          <button onClick={() => toggleFiltro('barrios')}>
            Barrios {filtros.barrios ? '👁️' : '🚫'}
          </button>
          <button onClick={() => toggleFiltro('cascadas')}>
            Cascadas {filtros.cascadas ? '👁️' : '🚫'}
          </button>
          <button onClick={() => toggleFiltro('recorrido')}>
            Recorrido {filtros.recorrido ? '👁️' : '🚫'}
          </button>
          <button onClick={reiniciarRecorrido}>🔄 Reiniciar Recorrido</button>
        </div>
        <MapContainer
          center={[-0.139, -78.59]}
          zoom={13}
          scrollWheelZoom
          style={{ height: '100%', width: '100%' }}
        >
          <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
          <AjustarVista puntos={puntosVisibles} />

          {[...estaciones, ...cascadas].map((p, i) => {
            let mostrar = false;

            if (esEstacion(p)) {
              if (p.tipo === 'Planta' && filtros.plantas) mostrar = true;
              else if (p.tipo === 'Distribución' && filtros.barrios) mostrar = true;
              else if (p.tipo === 'Climatológica' && filtros.climatologicas) mostrar = true;
              else if (p.tipo === 'Pluviométrica' && filtros.pluviometricas) mostrar = true;
              else if (p.tipo === 'Aforo' && filtros.aforo) mostrar = true;
            } else {
              if (filtros.cascadas) mostrar = true;
            }

            if (!mostrar) return null;

            return (
              <Marker
                key={`punto-${i}`}
                position={p.coords}
                icon={L.icon({
                  iconUrl: (p as any).icon ?? '/icons/cascada.png',
                  iconSize: [30, 30],
                  iconAnchor: [15, 30],
                  popupAnchor: [0, -30],
                })}
              >
                <Tooltip
                  direction="top"
                  offset={[0, -20]}
                  opacity={1}
                  className={styles.customTooltip}
                >
                  <div className={styles.tooltipContent}>
                    <strong>{p.nombre}</strong>
                    <p>{p.descripcion}</p>
                  </div>
                </Tooltip>
              </Marker>
            );
          })}

          {filtros.recorrido && (
            <Polyline
              positions={rutaAgua}
              pathOptions={{ color: 'blue', weight: 4, dashArray: '10,10' }}
            />
          )}

          {filtros.recorrido && gotitaIndex < rutaAgua.length && (
            <Marker position={rutaAgua[gotitaIndex]} icon={gotaIcon}>
              <Tooltip direction="right" offset={[10, 0]} opacity={1} permanent>
                <span>
                  {gotitaIndex === 0 && '💧 Inicia en la captación'}
                  {gotitaIndex === 1 && '💧 Llega a la planta Uyuchul'}
                  {gotitaIndex === 2 && '💧 Saliendo hacia Pisulí'}
                  {gotitaIndex === 3 && '💧 Rumbo a La Roldós'}
                  {gotitaIndex === 4 && '💧 Llegando a El Bosque'}
                  {gotitaIndex === 5 && '💧 Finaliza en San Carlos'}
                </span>
              </Tooltip>
            </Marker>
          )}
        </MapContainer>
      </div>
    </div>
  );
}