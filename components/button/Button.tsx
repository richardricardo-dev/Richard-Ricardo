import styles from "./button.module.css";

interface ButtonProbs {
  children: React.ReactNode;
  className?: string;
}

export default function Button({ children, className }: ButtonProbs) {
  return (
    <div className={styles.main}>
      <button className={`${styles.buttonMain} ${className}`}>{children}</button>
    </div>
  );
}
