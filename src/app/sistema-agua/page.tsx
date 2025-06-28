'use client';
import Header from '../../components/Header';
import Footer from "../../components/Footer";
import dynamic from 'next/dynamic';
import styles from '../../styles/SistemaAgua.module.css';

const MapaSistemaAgua = dynamic(() => import("../../components/MapaSistemaAgua"), { ssr: false });

export default function SistemaAguaPage() {
  return (
    <>
      <Header />
      <main className={styles.main}>
        <h1 className={styles.title}>💧 Captación y Sistema de Agua - Mindo</h1>

        <p className={styles.intro}>
          En Mindo, el agua nace de los ríos Mindo, Cinto y Saloya, atravesando bosques nublados y formando cascadas. Este recorrido permite actividades como tubing y senderismo, y finalmente el agua llega al río Blanco.
        </p>

        <section className={styles.section}>
          <h2 className={styles.sectionTitle}>🗺️ Recorrido del agua</h2>
          <p className={styles.sectionP}>
            A continuación, puedes ver en el mapa el camino que sigue el agua en la región, desde su captación hasta su salida:
          </p>
          <MapaSistemaAgua />
        </section>

        <div className={styles.cardsContainer}>
          <div className={styles.card}>
            <h2 className={styles.sectionTitle}>🔎 Leyenda</h2>
            <ul className={styles.list}>
              <li className={styles.listItem}>
                <img src="/icons/nube.png" alt="Clima" width="20" className={styles.listItemImg} />
                <strong>Climatológica:</strong> mide condiciones del clima
              </li>
              <li className={styles.listItem}>
                <img src="/icons/gota.png" alt="Lluvia" width="20" className={styles.listItemImg} />
                <strong>Pluviométrica:</strong> mide la lluvia
              </li>
              <li className={styles.listItem}>
                <img src="/icons/rio.png" alt="Río" width="20" className={styles.listItemImg} />
                <strong>Aforo:</strong> mide el caudal de los ríos
              </li>
              <li className={styles.listItem}>
                <img src="/icons/cascada.png" alt="Cascada" width="20" className={styles.listItemImg} />
                <strong>Cascadas:</strong> caídas naturales de agua
              </li>
            </ul>
          </div>

          <div className={styles.card}>
            <h2 className={styles.sectionTitle}>💦 ¿Cómo viaja el agua en Mindo?</h2>
            <ol className={styles.list}>
              <li className={styles.olItem}>☁️ El agua cae desde las nubes como lluvia sobre Mindo.</li>
              <li className={styles.olItem}>🌲 Se almacena en los ríos Mindo, Cinto y quebradas del bosque nublado.</li>
              <li className={styles.olItem}>💧 Es captada en puntos como Mindo Bajo y Píchan.</li>
              <li className={styles.olItem}>🚰 Viaja a la planta de tratamiento de Uyuchul, en el sector de Píchan.</li>
              <li className={styles.olItem}>🧼 Allí se limpia el agua para que sea segura para tomar.</li>
              <li className={styles.olItem}>🏘️ Finalmente, llega a barrios del norte de Quito como Pisulí, La Roldós, El Bosque y parte de San Carlos.</li>
            </ol>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}