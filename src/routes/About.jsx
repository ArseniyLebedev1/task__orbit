import styles from './About.module.css';

const FEATURES = [
  {
    title: 'React 18 + Router v6',
    text: 'Приложение собрано на функциональных компонентах с современным роутингом.'
  },
  {
    title: 'Zustand + Custom Hook',
    text: 'Состояние хранится в сторе, а предпочтения сохраняются через useLocalStorage.'
  },
  {
    title: 'Framer Motion',
    text: 'Добавление и удаление задач сопровождается плавной анимацией.'
  },
  {
    title: 'JSON Server',
    text: 'Имитация API позволяет работать с данными так же, как в реальном проекте.'
  }
];

function About() {
  return (
    <section className={styles.page}>
      <div className={styles.hero}>
        <h2>О проекте</h2>
        <p>
          Flowlist показывает, как можно построить аккуратное React-приложение с
          чистой архитектурой, современной экосистемой и вниманием к деталям.
        </p>
      </div>
      <div className={styles.grid}>
        {FEATURES.map((item) => (
          <article key={item.title} className={styles.card}>
            <h3>{item.title}</h3>
            <p>{item.text}</p>
          </article>
        ))}
      </div>
      <div className={styles.note}>
        <h4>Как запустить</h4>
        <p>
          Запустите `npm run server` для JSON Server и `npm run dev` для Vite. В
          `.env` можно указать другой адрес API.
        </p>
      </div>
    </section>
  );
}

export default About;
