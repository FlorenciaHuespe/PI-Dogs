import style from './landing.module.css';
import { useHistory } from 'react-router-dom';
import imgLanding from './img/Landing1-PhotoRoom.png';
import gifLanding from './img/gifLanding.gif';

const Landing = () => {
  const history = useHistory();

  const handleClick = () => {
    history.push("/home");
  };

  return (
    <div className={style.container}>
      <img src={imgLanding} alt="Dog" className={style.image} />
      <img src={gifLanding} alt="Dog GIF" className={style.gif} />
        <span className={style.btn_home} onClick={handleClick}>Ingresar</span> {/* Aplicamos la nueva clase btn_home */}
    </div>
  );
};

export default Landing;
