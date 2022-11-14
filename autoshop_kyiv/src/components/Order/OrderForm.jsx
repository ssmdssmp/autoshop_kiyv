import { Formik, Form, Field, ErrorMessage, useField } from "formik";
import OrderSubmit from "./OrderSubmit";
import { useDispatch, useSelector } from "react-redux";
import Select from "react-select";
import StashItem from "../Stash/StashItem";
import { setRegions, setCities, setPostOffices } from "../Stash/StashSlice";
import * as Yup from "yup";
import { nanoid } from "@reduxjs/toolkit";
import { useEffect, useState } from "react";
import { postOrder } from "../../hooks/http.hook";
import { resetStashItems } from "../Stash/StashSlice";
const OrderForm = () => {
  const dispatch = useDispatch();
  const [regionsSelect, setRegionsSelect] = useState([]);
  const [citiesSelect, setCitiesSelect] = useState([]);
  const [postOfficeNumbersSelect, setPostOfficeNumbersSelect] = useState([]);
  const [formSubmitted, setFormSubmitted] = useState(false);
  const stashItems = useSelector((state) => state.stash.stashItems);

  const regions = useSelector(
    ({ stash }) => stash.orderDetails.selectDelivery.regions
  );
  const cities = useSelector(
    ({ stash }) => stash.orderDetails.selectDelivery.cities
  );
  const postOfficeNumbers = useSelector(
    ({ stash }) => stash.orderDetails.selectDelivery.postOfficeNumbers
  );
  const calculateSum = () => {
    let sum = 0;
    stashItems.map((item) => {
      return (sum += item.obj.price * item.counter);
    });
    return sum;
  };
  console.log(postOfficeNumbers);
  useEffect(() => {
    dispatch(setRegions());
  }, []);
  useEffect(() => {
    const arr = [];
    if (regions.length !== 0) {
      regions.map((item) => {
        return arr.push({ label: item.Description, value: item.AreasCenter });
      });
    }
    setRegionsSelect(arr);
  }, [regions]);
  useEffect(() => {
    const arr = [];
    if (cities.length !== 0) {
      cities.map((item) => {
        return arr.push({
          label: item.Description.slice(0, item.Description.indexOf("(")),
          value: item.Ref,
        });
      });
    }
    setCitiesSelect(arr);
    console.log(arr);
  }, [cities]);

  useEffect(() => {
    const arr = [];
    if (postOfficeNumbers.length !== 0) {
      postOfficeNumbers.map((item) => {
        arr.push({ label: item.Description, value: item.Description });
      });
    }
    setPostOfficeNumbersSelect(arr);
  }, [postOfficeNumbers]);
  console.log(regions);
  const MyInput = ({ ...props }) => {
    const [field, meta] = useField(props);
    return (
      <>
        <input {...props} {...field} />
        {meta.touched && meta.error ? (
          <div className="form-error">{meta.error}</div>
        ) : null}
      </>
    );
  };

  const customStyles = {
    control: (provided, state) => ({
      ...provided,
      border: state.isFocused
        ? "1px solid #36AC0D"
        : "1px solid rgba(0, 0, 0, 0.166)",
      display: "flex",
      boxShadow: state.isFocused ? "0px 0px 1px #36AC0D " : "none",
      borderRadius: "4px",
      height: "30px",
      "&:hover": {
        borderColor: "#36AC0D",
      },
    }),
    input: (provided, input) => ({
      ...provided,
      boxShadow: "none !important",
      height: "30px",
      margin: "0",
      padding: "0",
    }),
    container: (provided, state) => ({
      ...provided,

      width: "150px",
      transition: "width 0.3s ease-in-out",
    }),
    placeholder: (provided, state) => ({
      ...provided,
      display: "flex",
      color: "rgba(0,0,0,0.3)",
    }),
    option: (provided, state) => ({
      ...provided,
      backgroundColor: state.isFocused
        ? "#35ac0d4b"
        : state.isSelected
        ? "white"
        : "white",
      color: "black",
    }),
    singleValue: (provided, state) => {
      const opacity = state.isDisabled ? 0.5 : 1;
      const transition = "opacity 300ms";

      return { ...provided, opacity, transition };
    },
  };
  const numRegex = /.*\d/;
  const latRegex = /[A-Za-z -]{2,}/;
  const validateFormString = (value) => {
    if (value === undefined) {
      return false;
    }
    if (
      value.match(/[\u0401\u0406\u0407\u0456\u0457\u0451\u0410-\u044f]/) &&
      !value.match(numRegex) &&
      !value.match(latRegex)
    ) {
      return true;
    } else {
      return false;
    }
  };
  const validatePhoneNumber = (phoneNumber) => {
    if (phoneNumber === undefined) {
      return false;
    }
    var text = phoneNumber.split("");
    text.some((a) => a === " ");

    if (
      (phoneNumber.includes("+") &&
        phoneNumber.includes("38") &&
        phoneNumber.length === 13) ||
      (!phoneNumber.includes("+") &&
        phoneNumber.includes("38") &&
        phoneNumber.length === 12) ||
      (!phoneNumber.includes("+") &&
        !phoneNumber.includes("38") &&
        phoneNumber.length === 10)
    ) {
      return true;
    } else {
      return false;
    }
  };
  return (
    <Formik
      initialValues={{
        name: "",
        surname: "",
        middleName: "",
        phone: "",
        deliveryMethod: "post",
        paymentMethod: "afterDelivery",
        region: "",
        city: "",
        postOffice: "",
        stashItems: stashItems,
        sum: calculateSum(),
      }}
      validationSchema={Yup.object({
        name: Yup.string()
          // .email()
          .required("Це поле є обов'язковим")
          .test(
            "Введіть по-батькові корректно",
            "Введіть по-батькові корректно",

            (value) => validateFormString(value)
          ),
        surname: Yup.string()
          .required("Це поле є обов'язковим")
          .test(
            "Введіть по-батькові корректно",
            "Введіть по-батькові корректно",

            (value) => validateFormString(value)
          ),
        middleName: Yup.string()
          .required("Це поле є обов'язковим")
          .test(
            "Введіть по-батькові корректно",
            "Введіть по-батькові корректно",

            (value) => validateFormString(value)
          ),
        phone: Yup.string()
          .required("Це поле є обов'язковим")
          .test("Введіть номер корректно", "Введіть номер корректно", (value) =>
            validatePhoneNumber(value)
          ),
        region: Yup.string().when("deliveryMethod", {
          is: "post",
          then: Yup.string().required("Це поле є обов'язковим"),
        }),
        city: Yup.string().when("deliveryMethod", {
          is: "post",
          then: Yup.string().required("Це поле є обов'язковим"),
        }),
        postOffice: Yup.string().when("deliveryMethod", {
          is: "post",
          then: Yup.string().required("Це поле є обов'язковим"),
        }),
      })}
      onSubmit={(values, { resetForm }) => {
        let arr = [];
        values.stashItems.map((item) => {
          console.log(item.obj.tradeIndex.substring(1));
          arr.push({
            count: item.counter,
            title: item.obj.title,
            tradeIndex: item.obj.tradeIndex.substring(1),
          });
        });
        values.stashItems = arr;
        postOrder(values)
          .then(setFormSubmitted(true))
          .then(dispatch(resetStashItems()));
        resetForm({ values: "" });
      }}
    >
      {(props) => (
        <>
          <Form className="form">
            <h5>Контакти отримувача</h5>
            <div className="input-wrapper">
              <MyInput placeholder="Прізвище" name="surname" />
            </div>
            <div className="input-wrapper">
              <MyInput placeholder="Ім'я" name="name" />
            </div>
            <div className="input-wrapper">
              <MyInput placeholder="По-батькові" name="middleName" />
            </div>
            <div className="input-wrapper">
              <MyInput placeholder="Телефон" name="phone" />
            </div>

            <h5>Замовлення</h5>
            <ul className="form-order">
              {stashItems.map((item) => {
                return (
                  <StashItem
                    key={nanoid()}
                    orderStashItem={1}
                    counter={item.counter}
                    settings={item.obj}
                  />
                );
              })}
            </ul>
            <h5> Доставка</h5>
            <label
              className={
                props.values.deliveryMethod === "post" ? "active-label" : ""
              }
              onClick={() => {
                props.values.deliveryMethoddeliveryMethod = "post";
              }}
            >
              <Field type="radio" name="deliveryMethod" value="post" />
              <p>Нова Пошта</p>
            </label>
            {props.values.deliveryMethod === "post" && (
              <div className="order-post">
                <div className="order-city">
                  <p>Оберіть область:</p>{" "}
                  <div className="select-wrapper">
                    <Select
                      name="region"
                      onChange={(opt) => {
                        props.values.region = opt.label;

                        dispatch(setCities(opt.value));
                      }}
                      options={regionsSelect}
                      styles={customStyles}
                    />
                    {props.errors.region && props.touched.region ? (
                      <div className="form-error">{props.errors.region}</div>
                    ) : null}
                  </div>
                </div>

                <div className="order-city city">
                  <p>Оберіть місто:</p>
                  <div className="select-wrapper">
                    <Select
                      name="city"
                      onChange={(opt) => {
                        props.values.city = opt.label;
                        dispatch(setPostOffices(opt.value));
                      }}
                      options={citiesSelect}
                      styles={customStyles}
                    />
                    {props.errors.city && props.touched.city ? (
                      <div className="form-error">{props.errors.city}</div>
                    ) : null}
                  </div>
                </div>
                <div className="order-city post-office">
                  <p>Номер відділення:</p>{" "}
                  <div className="select-wrapper">
                    <Select
                      name="postOffice"
                      onChange={(opt) => (props.values.postOffice = opt.label)}
                      options={postOfficeNumbersSelect}
                      styles={customStyles}
                    />
                    {props.errors.postOffice && props.touched.postOffice ? (
                      <div className="form-error">
                        {props.errors.postOffice}
                      </div>
                    ) : null}
                  </div>
                </div>
              </div>
            )}
            <label
              className={
                props.values.deliveryMethod === "self" ? "active-label" : ""
              }
              onClick={() => {
                props.values.deliveryMethod = "self";
              }}
            >
              <Field type="radio" name="deliveryMethod" value="self" />
              Самовивіз з магазину (Київ)
            </label>

            <h5>Оплата</h5>
            <label
              className={
                props.values.paymentMethod === "afterDelivery"
                  ? "active-label"
                  : ""
              }
              onClick={() => {
                props.values.paymentMethod = "afterDelivery";
              }}
            >
              <Field type="radio" name="paymentMethod" value="afterDelivery" />
              Оплата при отриманні товару
            </label>
            <label
              className={
                props.values.paymentMethod === "payNow" ? "active-label" : ""
              }
              onClick={() => {
                props.values.paymentMethod = "payNow";
              }}
            >
              <Field type="radio" name="paymentMethod" value="payNow" />
              Оплатити зараз
            </label>
            <label
              className={
                props.values.paymentMethod === "visaPay" ? "active-label" : ""
              }
              onClick={() => {
                props.values.paymentMethod = "visaPay";
              }}
            >
              <Field type="radio" name="paymentMethod" value="visaPay" />
              Безготівковий для юридичних та фізичних осіб
            </label>
          </Form>
          <OrderSubmit
            setFormSubmitted={setFormSubmitted}
            formSubmitted={formSubmitted}
            calculateSum={() => calculateSum()}
          />
        </>
      )}
    </Formik>
  );
};
export default OrderForm;
