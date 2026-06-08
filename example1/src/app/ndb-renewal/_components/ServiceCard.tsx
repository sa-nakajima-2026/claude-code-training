import styles from "./ServiceCard.module.css";

type ServiceCardProps = {
  title: string;
  description: string;
  icon: string;
};

export function ServiceCard({ title, description, icon }: ServiceCardProps) {
  return (
    <article className={styles.card}>
      <span className={styles.icon} aria-hidden="true">
        {icon}
      </span>
      <h3 className={styles.title}>{title}</h3>
      <p className={styles.description}>{description}</p>
    </article>
  );
}
