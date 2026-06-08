import styles from "./FeaturesSection.module.css";

const FEATURES = [
  {
    id: "lifecycle",
    title: "ライフサイクル全般の支援",
    description:
      "企画・開発・導入・運用・保守まで、情報システムのすべての段階に対応。一貫したサービスでお客様の負担を軽減します。",
  },
  {
    id: "onsite",
    title: "顧客先での直接支援",
    description:
      "お客様のオフィスや現場に入り込み、実際の業務を理解した上で課題解決に取り組みます。",
  },
  {
    id: "expertise",
    title: "業務ノウハウとプロジェクト管理経験",
    description:
      "長年にわたる業務経験とプロジェクト管理のノウハウを活かし、技術とビジネスの両面からご支援します。",
  },
];

export function FeaturesSection() {
  return (
    <section className={styles.section} aria-labelledby="features-heading">
      <div className={styles.inner}>
        <h2 id="features-heading" className={styles.heading}>NDBの特徴</h2>
        <div className={styles.list}>
          {FEATURES.map((feature, index) => (
            <div key={feature.id} className={styles.item}>
              <span className={styles.number} aria-hidden="true">
                {String(index + 1).padStart(2, "0")}
              </span>
              <div className={styles.body}>
                <h3 className={styles.itemTitle}>{feature.title}</h3>
                <p className={styles.itemDesc}>{feature.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
