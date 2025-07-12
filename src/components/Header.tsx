'use client';

import Link from 'next/link';
import { useState } from 'react';
import styles from '../styles/Header.module.css';

export default function Header() {
  const [menuAbierto, setMenuAbierto] = useState(false);

  const toggleMenu = () => {
    setMenuAbierto(!menuAbierto);
  };

  return (
    <header className={styles.header}>
      <div className={styles.logo}>💧 Sistema de Agua - Mindo</div>

      <button
        className={styles.hamburger}
        onClick={toggleMenu}
        aria-label="Abrir menú"
      >
        ☰
      </button>

      <nav className={`${styles.nav} ${menuAbierto ? styles.navActivo : ''}`}>
        <Link href="/" onClick={() => setMenuAbierto(false)}>Inicio</Link>
        <Link href="/conoce" onClick={() => setMenuAbierto(false)}>Conoce Mindo</Link>
        <Link href="/sistema-agua" onClick={() => setMenuAbierto(false)}>Sistema de Agua</Link>
        <Link href="/prediccion" onClick={() => setMenuAbierto(false)}>Predicción</Link>
      </nav>
    </header>
  );
}

