import styles from "./HeroSection.module.css";

export function HeroSection() {
  return (
    <section className={styles.hero} aria-labelledby="hero-heading">
      <div className={styles.inner}>
        <p className={styles.eyebrow}>NDB — 日本デェイブレイク株式会社</p>
        <h1 id="hero-heading" className={styles.title}>
          お客様と共に、情報技術で未来を創る。
        </h1>
        <p className={styles.subcopy}>
          システムの企画から開発・導入・運用・保守まで、
          一貫したサービスでお客様のビジネスを支援します。
        </p>
        <div className={styles.cta}>
          <a href="#contact" className={styles.btnPrimary}>
            お問い合わせ
          </a>
          <a href="#services" className={styles.btnSecondary}>
            サービスを見る
          </a>
        </div>
      </div>
    </section>
  );
}
