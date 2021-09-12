import styles from "../styles/Post.module.scss";

export default function Post({ name, content, date, likers, comments }) {
  return (
    <div className={styles.container}>
      {name} <br />
      {content} <br />
      {date}
    </div>
  );
}
