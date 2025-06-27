'use client';
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import dynamic from 'next/dynamic';
const MapaUbicacionMindo = dynamic(() => import("../../components/MapaUbicacionMindo"), { ssr: false });

import styles from '../../styles/Conoce.module.css';

export default function ConoceMindo() {
  return (
    <>
      <Header />
      <main className={styles.main}>
        <h1>🌿 ¡Bienvenido a Mindo!</h1>
        <p className={styles.intro}>
          Mindo es un lugar lleno de naturaleza, agua y vida. Aquí aprenderás de dónde viene el agua, a dónde va y por qué es tan importante cuidarla.
        </p>

        <section className={styles.section}>
          <h2>📍 ¿Dónde está Mindo?</h2>
          <p>Mindo se encuentra en el norte del Ecuador y la única Parroquia del cantón San Miguel de Los Bancos en la provincia de Pichincha, a unos 80 km al noroeste de Quito. </p>
          <MapaUbicacionMindo />
        </section>

        <section className={styles.section}>
          <h2>💧 Captación de Agua en Mindo Pichán</h2>
          <p>
            La captación de Mindo Pichán aporta <strong>250 litros por segundo</strong> para abastecer barrios del norte de Quito como <em>Pisulí, La Roldós, El Bosque</em> y parte de <em>San Carlos</em>.
          </p>
          <p>
            Este sistema incluye las captaciones de <strong>Pichá, Mindo Bajo y Mindo Medio</strong>, y el agua recorre un tramo de 21 km hasta la planta de tratamiento por medio de bombeo.
          </p>
          <p>
            La Empresa Pública Metropolitana de Agua Potable y Saneamiento (Epmaps) trabaja día y noche para asegurar que el agua llegue limpia y suficiente a miles de hogares.
          </p>
          <p>
            ¡Es importante usar el agua con responsabilidad para que nunca falte!
          </p>
        </section>

        <section className={styles.section}>
          <h2>🌸 Flora y Fauna de Mindo</h2>
          <div className={styles.cards}>
            <div className={styles.card}>
              <h3>🐦 Tucanes</h3>
              <p>Los coloridos tucanes vuelan entre los árboles de Mindo.</p>
            </div>
            <div className={styles.card}>
              <h3>🦋 Mariposas</h3>
              <p>Mindo es famoso por sus mariposas de todos los colores.</p>
            </div>
            <div className={styles.card}>
              <h3>🌳 Bosques Nublados</h3>
              <p>Es el hogar de árboles gigantes cubiertos de musgo y orquídeas.</p>
            </div>
          </div>
        </section>

        <section className={styles.section}>
          <h2>🌊 ¿Y el agua?</h2>
          <p>
            En Mindo llueve mucho. El agua baja desde las montañas, forma ríos y llega hasta el océano. ¡Sin esta agua, muchas personas no tendrían qué beber!
          </p>
        </section>

        <a className={styles.button} href="/sabias">
          ➡️ ¡Descubre más sobre el agua!
        </a>
      </main>
      <Footer />
    </>
  );
}
