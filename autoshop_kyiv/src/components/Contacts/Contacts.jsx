import "./Contacts.scss";
import Map from "../Map/Map";
const Contacts = () => {
  const location = {
    address: "Baseina St, 1, Kyiv, 02000",
    lat: 50.44229623034675,
    lng: 30.523028524368392,
  };
  return (
    <div className="contacts-wrapper">
      <h2>Контакти</h2>
      <div className="contacts">
        <div className="contacts-map">
          <Map location={location} zoomLevel={17} />
        </div>
        <div className="contacts-text">
          <h3>ТОВ "Автозапчастини"</h3>
          <ul>
            <li>ФОП: Геращенко Людмила Павлівна, №03048506</li>
            <li>
              Адреса: <p>м. Київ, вул. Басейна, 1</p>
            </li>
            <li>
              Телефон: <a href="tel:+380778238490">+380778238490</a>
            </li>
            <li>
              Робочий час: <p>щоденно 08:00 - 22:00</p>
            </li>
            <li>
              Email:
              <a href="mailto: gerashenkoludmila1985@gmail.com">
                gerashenkoludmila1985@gmail.com
              </a>
            </li>
            <li>
              Facebook: <a href="facebook.com">facebook.com/avtozapchasti</a>
            </li>
            <li>
              Instagram:
              <a href="instagram.com">instagram.com/avtozapchasti</a>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};
export default Contacts;
