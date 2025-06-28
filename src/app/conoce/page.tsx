'use client';
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import dynamic from 'next/dynamic';
import Carrusel from "../../components/CarruselFloraFauna";
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

const MapaUbicacionMindo = dynamic(() => import("../../components/MapaUbicacionMindo"), { ssr: false });

import styles from '../../styles/Conoce.module.css';

const flora = [
  { nombre: 'Orquídea', src: '/images/flora/orquidea.jpg' },
  { nombre: 'Helecho', src: '/images/flora/helecho.jpg' },
  { nombre: 'Bromelia', src: '/images/flora/bromelia.jpg' },
  { nombre: 'Musgo', src: '/images/flora/musgo.jpg' },
  { nombre: 'Cedro', src: '/images/flora/cedro.jpg' },
  { nombre: 'Balsa', src: '/images/flora/balsa.jpg' },
  { nombre: 'Teka', src: '/images/flora/teka.jpg' },
  { nombre: 'Guaba', src: '/images/flora/guaba.jpg' },
  { nombre: 'Aguacatillo', src: '/images/flora/aguacatillo.jpg' },
  { nombre: 'Canelo Blanco', src: '/images/flora/caneloblanco.jpg' },
];

const fauna = [
  { nombre: 'Tucán de Swainson', src: '/images/fauna/tucanSwainson.jpg' },
  { nombre: 'Colibrí', src: '/images/fauna/colibri.jpg' },
  { nombre: 'Mariposa Morfo', src: '/images/fauna/mariposa.jpg' },
  { nombre: 'Rana de cristal', src: '/images/fauna/rana.jpeg' },
  { nombre: 'Oso de Anteojos', src: '/images/fauna/oso.jpg' },
  { nombre: 'Lagarto Pinocho', src: '/images/fauna/lagarto.jpg' },
  { nombre: 'Perico Cola Larga', src: '/images/fauna/pericoColaLarga.jpg' },
  { nombre: 'Quetzal', src: '/images/fauna/quetzal.jpg' },
  { nombre: 'Tangara azul', src: '/images/fauna/tangara.jpg' },
  { nombre: 'Murciélago frutero', src: '/images/fauna/murcielago.jpeg' },
];

export default function ConoceMindo() {
  return (
    <>
      <Header />
      <main className={styles.main}>
        <h1>🌿 ¡Bienvenido a Mindo!</h1>
        <br></br>
        <p className={styles.intro}>
          A solo 90 minutos de la ciudad Mitad del Mundo – Quito, Mindo te sumerge en el Chocó Andino, un refugio de biodiversidad. Aquí, la naturaleza cobra vida desde el vuelo matutino de colibríes hasta el coro nocturno de ranas, ofreciendo tanto aventura como paz. Con actividades como canyoning, canopy, o paseos tranquilos, Mindo es el escape perfecto cerca de la capital ecuatoriana para los entusiastas de la naturaleza. <br /><br />
          Mindo, ubicado a 1,300 metros sobre el nivel del mar, disfruta de un clima húmedo y templado, con humedad del 70% al 90%. Este entorno favorece una biodiversidad excepcional, con temperaturas de 15°C a 24°C ideales para actividades al aire libre y exploración.
        </p>

        <section className={styles.section}>
          <h2>📍 ¿Dónde está Mindo?</h2>
          <p>Ubicado en el noroccidente de Ecuador, en el corazón del Chocó Andino, Mindo es parte de la Reserva de Biósfera reconocida por la UNESCO.</p>
          <MapaUbicacionMindo />
        </section>

        <section className={styles.section}>
          <div className={styles.duoCarrusel}>
            <div className={styles.carruselBox}>
              <h2>🌿 Flora de Mindo</h2>
              <p>Más de <strong>200 especies de flores</strong> únicas en un bosque húmedo que siempre florece.</p>
              <Carrusel items={flora} />
            </div>
            <div className={styles.carruselBox}>
              <h2>🦜 Fauna de Mindo</h2>
              <p>Mindo es hogar de más de <strong>500 especies de aves</strong> y cientos de otros animales sorprendentes.</p>
              <Carrusel items={fauna} />
            </div>
          </div>
        </section>

        <div className={styles.destacadoAgua}>
          <a href="/sistema-agua" className={styles.linkAgua}>
            💧 Mira aquí a dónde se dirige el agua que produce la región
          </a>
        </div>

      </main>
      <Footer />
    </>
  );
}
