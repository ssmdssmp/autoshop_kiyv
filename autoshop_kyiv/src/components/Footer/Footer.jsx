import "./Footer.scss";
import instImg from "../../assets/img/instagram.png";
import fbImg from "../../assets/img/facebook.png";
import locationAltImg from "../../assets/img/location_alt.png";
const Footer = () => {
  return (
    <footer>
      <ul>
        <li>
          <p>Ми у соц мережах:</p>
          <ul>
            <li>
              <a href="">
                <img src={fbImg} alt="" />
              </a>
            </li>
            <li>
              <a href="https://www.instagram.com/">
                <img src={instImg} alt="" />
              </a>
            </li>
          </ul>
        </li>
        <li>
          <p>Наша адреса:</p>
          <div>
            <img src={locationAltImg} alt="" />
            <p>м. Київ, вул. Басейна, 1</p>
          </div>
        </li>
        <li>
          <p>Номер телефону:</p>
          <p style={{ fontWeight: "700" }}>+380778238490</p>
        </li>
      </ul>
    </footer>
  );
};
export default Footer;
