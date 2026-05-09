import styles from "./button.module.css";

interface ButtonProbs {
  children: React.ReactNode;
}

export default function Button({ children }: ButtonProbs) {
  return (
    <div className={styles.main}>
      <button className={styles.buttonMain}>{children}</button>
    </div>
  );
}
