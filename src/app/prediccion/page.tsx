import PrediccionClimatica from "@/components/PrediccionClimatica";
import Header from "../../components/Header";
import Footer from "../../components/Footer";

import styles from '../../styles/Prediccion.module.css';  // CSS del layout

export default function Page() {
    return (
        <div className={styles.pageWrapper}>
            <Header />
            <main className={styles.container}>
                        <div className={styles.bannerIntro}>
                        <h1 className={styles.bannerTitulo}>🌦️ Sistema Inteligente de Predicción Climática</h1>
                        <p className={styles.bannerTexto}>
                            Consulta las predicciones de precipitación, temperatura y viento para los próximos meses.
                        </p>
                    </div>
                    <PrediccionClimatica />
          
            </main>
            <Footer />
        </div>
    );
}   