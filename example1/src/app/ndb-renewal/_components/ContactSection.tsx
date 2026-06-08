import styles from "./ContactSection.module.css";

export function ContactSection() {
  return (
    <section id="contact" className={styles.section} aria-labelledby="contact-heading">
      <div className={styles.inner}>
        <h2 id="contact-heading" className={styles.heading}>お問い合わせ</h2>
        <p className={styles.body}>
          サービスに関するご質問・ご相談は、お気軽にお問い合わせください。
        </p>
        <a
          href="https://ndbnet.co.jp/contact.html"
          target="_blank"
          rel="noopener noreferrer"
          className={styles.btn}
          aria-label="お問い合わせフォームへ（新しいタブで開く）"
        >
          お問い合わせフォームへ
        </a>
      </div>
    </section>
  );
}
