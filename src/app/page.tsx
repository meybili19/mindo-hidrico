'use client';
import Header from '../components/Header';
import Footer from '../components/Footer';
import Link from 'next/link';
import styles from '../styles/Home.module.css';

export default function HomePage() {
  return (
    <div className={styles.container}>
      <Header />
      <main className={styles.main}>
        <h1 className={styles.welcomeTitle}>💧 Bienvenidos al Sistema del Agua de Mindo</h1>
        <p className={styles.welcomeText}>
          Aprende cómo el agua nace en las montañas, fluye por los ríos y llega a nuestros hogares y al mar.  
          ¡Explora, descubre y cuida el agua con nosotros!
        </p>
        <Link href="/conoce" className={styles.button}>
          🌿 Conoce Mindo
        </Link>
      </main>
      <Footer />
    </div>
  );
}
