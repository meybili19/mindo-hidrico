import PrediccionClimatica from "@/components/PrediccionClimatica";
import Header from "../../components/Header";
import Footer from "../../components/Footer";

import styles from '../../styles/Prediccion.module.css';

export default function Page() {
    return (
        <div className={styles.pageWrapper}>
            <Header />
            <main className={styles.container}>
                <div className={styles.bannerIntro}>
                    <h1 className={styles.bannerTitulo}>🌦️ Sistema de Predicción del Clima en Mindo</h1>
                    <p className={styles.bannerTexto}>
                        Bienvenid@ a nuestro sistema inteligente. Aquí puedes descubrir cómo estará el clima en Mindo en los próximos meses.
                    </p>
                    <p className={styles.bannerTexto}>
                        Elige una opción y descubre si lloverá, hará calor o de qué dirección vendrá el viento. ¡Es como ser un meteorólogo explorador! 🧭🌿☔
                    </p>
                </div>

                <PrediccionClimatica />
            </main>
            <Footer />
        </div>
    );
}
