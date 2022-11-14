import "./header.scss";
import logoImg from "../../assets/img/logo.svg";
import phoneImg from "../../assets/img/phone.svg";
import Stash from "../Stash/Stash";
import { Link } from "react-router-dom";
const Header = () => {
  return (
    <div className="header">
      <div className="header-top">
        <nav>
          <ul>
            <Link to="/">
              <li>Головна</li>
            </Link>
            <Link to="/contacts">
              <li>Контакти</li>
            </Link>
            <Link to="/delivery">
              <li>Доставка</li>
            </Link>
          </ul>
        </nav>
        <div className="current-city">
          Ваше місто: <span>Київ</span>
        </div>
        {/* <div className="header-top-buttons">
          <button>Вхід</button>
          <button>Авторизація</button>
        </div> */}
      </div>
      <div className="header-bottom">
        <div className="header-bottom-content logo">
          <img src={logoImg} alt="" />
          <Link style={{ textDecoration: "none", color: "black" }} to="/">
            <h1>
              AUTOZAPCHASTI <span>Магазин та пошук автозапчастин</span>
            </h1>
          </Link>
        </div>
        <a href="tel:+380778238490" className="header-bottom-content contact">
          <img src={phoneImg} alt="" />
          <h2>
            Щоденно з 09:00 до 22:00 <span>+380778238490</span>
          </h2>
        </a>
        <Stash />
      </div>
    </div>
  );
};
export default Header;
