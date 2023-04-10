import { Button } from "@mui/material";
import styles from "./Home.module.css";
import SideNav from "../components/SideNav/SideNav"
import Piechart from "../components/Charts/Piechart"
import bg from "../components/images/background.png"

const Home = () => {
  return (
  <div>
   <SideNav/>
   <div className={styles.navbar}>
     <div className={styles.name}>EmpowerUnity</div>
     <div className={styles.buttcontainer}>
        <div className={styles.box}>
            <button className={styles.button}>Sign Up</button>
        </div>
        <div className={styles.box}>
            <button className={styles.button}>Sign In</button>
        </div>
        </div>
    </div>
    <div className={styles.container}>
    <Piechart/>
    <button className={styles.donate}>Donate Now!!</button>
    </div>
  </div>
  );
};

export default Home;
