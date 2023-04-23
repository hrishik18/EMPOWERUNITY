import { Button } from "@mui/material";
import styles from "./Home.module.css";
import SideNav from "../../components/SideNav/SideNav"
import Piechart from "../../components/Charts/Piechart"
import bg from "../../images/background.png"
import TopNav from "../../components/TopNav/TopNav";

const Home = () => {
  return (
  <div>
   <SideNav/>
   <TopNav/>
    <div className={styles.container}>
    <Piechart/>
    <button className={styles.donate}>Donate Now!!</button>
    </div>
  </div>
  );
};

export default Home;
