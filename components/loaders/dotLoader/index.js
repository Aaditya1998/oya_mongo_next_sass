import styles from "./styles.module.scss";
import CircleLoader from "react-spinners/CircleLoader";
export default function DotLoaderSpinner({ loading }) {
  return (
    <div className={styles.loader}>
      <CircleLoader color="#374fd7" Loading={loading} />
    </div>
  );
}
