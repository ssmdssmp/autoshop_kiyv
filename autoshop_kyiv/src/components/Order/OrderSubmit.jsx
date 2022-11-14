import { useFormikContext } from "formik";
import { useSelector } from "react-redux";
import doneImg from "../../assets/img/done.png";
import { Link } from "react-router-dom";
const OrderSubmit = ({ calculateSum, formSubmitted, setFormSubmitted }) => {
  const { submitForm } = useFormikContext();
  const stashItems = useSelector((state) => state.stash.stashItems);

  return (
    <div className="order-submit">
      <h3> {formSubmitted ? "Замовлення успішно оформлене" : "Разом"}</h3>
      {formSubmitted ? (
        <img className="order-submit-done-img" src={doneImg} />
      ) : (
        <>
          <p>
            {stashItems.length} поз. на суму<span>{calculateSum()} грн.</span>
          </p>
          <p>
            Вартість доставки <span>за таримами перевізника</span>
          </p>
        </>
      )}
      <hr />
      <h4>
        До сплати <span>{calculateSum()} грн.</span>
      </h4>

      {formSubmitted ? (
        <Link to="/">
          <button>Повернутись до товарів</button>
        </Link>
      ) : (
        <button onClick={() => submitForm()}>Підтвердити замовлення</button>
      )}
    </div>
  );
};
export default OrderSubmit;
