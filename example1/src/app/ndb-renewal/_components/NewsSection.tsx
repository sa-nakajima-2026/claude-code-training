import styles from "./NewsSection.module.css";

export function NewsSection() {
  return (
    <section id="news" className={styles.section} aria-labelledby="news-heading">
      <div className={styles.inner}>
        <h2 id="news-heading" className={styles.heading}>お知らせ</h2>
        <p className={styles.notice}>
          最新のお知らせは公式サイトをご確認ください。
        </p>
        <a
          href="https://ndbnet.co.jp/news.html"
          target="_blank"
          rel="noopener noreferrer"
          className={styles.link}
          aria-label="お知らせ一覧を見る（新しいタブで開く）"
        >
          お知らせ一覧を見る
        </a>
      </div>
    </section>
  );
}
