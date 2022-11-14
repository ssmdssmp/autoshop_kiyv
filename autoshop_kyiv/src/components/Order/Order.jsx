import "./order.scss";
import OrderForm from "./OrderForm";
import OrderSubmit from "./OrderSubmit";
import Footer from "../Footer/Footer";
const Order = () => {
  return (
    <div className="order-wrapper">
      <h2 className="order-title">Оформлення замовлення</h2>

      <div className="order">
        <OrderForm />
      </div>
      <Footer />
    </div>
  );
};
export default Order;
