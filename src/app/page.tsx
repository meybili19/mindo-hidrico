'use client';
import Header from '../components/Header';
import styles from '../styles/Home.module.css';

export default function HomePage() {
  return (
    <>
      <Header />
      <main className={styles.main}>
        <h1 className={styles.welcomeTitle}>Bienvenidos al Sistema del Agua de Mindo 💧</h1>
        <p className={styles.welcomeText}>
          Descubre cómo el agua nace, fluye y llega hasta el mar. ¡Explora y aprende!
        </p>
      </main>
    </>
  );
}
