import { Link } from "react-router-dom";
import style from "./NavBar.module.css";
import Searchbar from "../Searchbar/searchbar";

const NavBar = () => {
    return (
        <div className={style.container}>
          <div className={style.containerButtons}>
            <Link to="/" className={style.button}>
              Welcome
            </Link>
            <Link to="/home" className={style.button}>
              Home
            </Link>
            <Link to="/create" className={style.button}>
              Form
            </Link>
            <Searchbar/>
          </div>
        </div>
        
      );
    };
    

export default NavBar;
