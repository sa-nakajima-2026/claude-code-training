import styles from "./RecruitSection.module.css";

export function RecruitSection() {
  return (
    <section id="recruit" className={styles.section} aria-labelledby="recruit-heading">
      <div className={styles.inner}>
        <h2 id="recruit-heading" className={styles.heading}>採用情報</h2>
        <p className={styles.body}>
          1976年の設立以来、製造業・金融業・官公庁など幅広い分野でお客様の
          情報システムを支え続けています。東京都港区を拠点に、
          約220名（2025年4月時点）が在籍しています。
        </p>
        <p className={styles.body}>
          情報システムのライフサイクル全般を支援する仕事を通じて、
          技術力と業務知識を身につけたい方はぜひご確認ください。
        </p>
        <a
          href="https://ndbnet.co.jp/recruit/"
          target="_blank"
          rel="noopener noreferrer"
          className={styles.link}
          aria-label="採用ページを見る（新しいタブで開く）"
        >
          採用ページを見る
        </a>
      </div>
    </section>
  );
}
