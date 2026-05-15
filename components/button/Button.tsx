import styles from "./button.module.css";

interface ButtonProbs {
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
}

export default function Button({ children, className, onClick }: ButtonProbs) {
  return (
    <div className={styles.main}>
      <button className={`${styles.buttonMain} ${className}`} onClick={onClick}>
        {children}
      </button>
    </div>
  );
}
