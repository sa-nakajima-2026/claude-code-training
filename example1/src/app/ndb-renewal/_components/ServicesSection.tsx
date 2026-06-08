import { ServiceCard } from "./ServiceCard";
import styles from "./ServicesSection.module.css";

const SERVICES = [
  {
    id: "development",
    title: "開発・導入サービス",
    description:
      "お客様のニーズに合わせた情報システムの設計・開発から導入支援まで対応します。製造業・金融業・官公庁など幅広い業種の実績をもとにサポートします。",
    icon: "💻",
  },
  {
    id: "onsite",
    title: "オンサイトサービス",
    description:
      "お客様先に常駐し、情報システムの運用・保守・技術支援を行います。現場で直接課題を把握し、迅速かつ的確に対応します。",
    icon: "🏢",
  },
  {
    id: "consultation",
    title: "コンサルテーションサービス",
    description:
      "情報システムの企画・計画段階から、業務ノウハウとプロジェクト管理の経験を活かして専門的にご支援します。",
    icon: "📋",
  },
];

export function ServicesSection() {
  return (
    <section id="services" className={styles.section} aria-labelledby="services-heading">
      <div className={styles.inner}>
        <h2 id="services-heading" className={styles.heading}>サービス</h2>
        <p className={styles.lead}>
          情報システムのライフサイクル全般を支援する3つのサービス
        </p>
        <div className={styles.grid}>
          {SERVICES.map((service) => (
            <ServiceCard key={service.id} {...service} />
          ))}
        </div>
      </div>
    </section>
  );
}
