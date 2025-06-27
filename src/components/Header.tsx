'use client';
import Link from 'next/link';
import styles from '../styles/Header.module.css';

export default function Header() {
  return (
    <header className={styles.header}>
      <div className={styles.logo}>💧 Sistema de Agua Mindo</div>
      <nav className={styles.nav}>
        <Link href="/">Inicio</Link>
        <Link href="/conoce">Conoce Mindo</Link>
        <Link href="/sabias">¿Qué tanto sabes?</Link>
        <Link href="/prediccion">Predicción</Link>
      </nav>
    </header>
  );
}
