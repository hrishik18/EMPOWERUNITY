import styles from "./Home.module.css";
import SideNav from "../../components/SideNav/SideNav"
import Piechart from "../../components/Charts/Piechart"
import bg from "../../images/background.png"
import TopNav from "../../components/TopNav/TopNav";
import { useNavigate} from 'react-router-dom';

const Home = () => {
  const history = useNavigate();

  const handleClick = () => {
    history('/trans');
  };
  return (
    <div>
      <SideNav />
      <TopNav />
      <div className={styles.container}>
        <Piechart />
        <button className={styles.donate} onClick={handleClick} >Donate Now!!</button>
      </div>
    </div>
  );
};

export default Home;
