import PrediccionClimatica from "@/components/PrediccionClimatica";
import Header from "../../components/Header";
import Footer from "../../components/Footer";

import styles from '../../styles/Prediccion.module.css';

export default function Page() {
  return (
    <>
      <Header />
      <main className={styles.main}>
        <div className={styles.container}>
          <PrediccionClimatica />
        </div>
      </main>
      <Footer />
    </>
  );
}
