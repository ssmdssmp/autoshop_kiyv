import axios from "axios";
export const getFilters = () =>
  axios
    .get("https://636ab4e2c07d8f936da57d69.mockapi.io/filters")
    .then((res) => res.data);
export const getItems = () =>
  axios
    .get("https://636ab4e2c07d8f936da57d69.mockapi.io/items")
    .then((res) => res.data);
export const getSingleItem = (id) =>
  axios
    .get(`https://636ab4e2c07d8f936da57d69.mockapi.io/items/${id}`)
    .then((res) => res.data);
export const getCars = () =>
  axios
    .get("https://636ab4e2c07d8f936da57d69.mockapi.io/cars")
    .then((res) => res.data);
export const getProducers = () =>
  axios
    .get("https://636ab4e2c07d8f936da57d69.mockapi.io/producers")
    .then((res) => res.data);
export const getRegions = () =>
  axios
    .post("https://api.novaposhta.ua/v2.0/json/", {
      apiKey: "ddb146164707a15808c04ac1f4ed25a6",
      modelName: "Address",
      calledMethod: "getAreas",
      methodProperties: {},
    })
    .then((res) => res.data.data);
export const getCities = (selectedRegion) =>
  axios
    .post("https://api.novaposhta.ua/v2.0/json/", {
      apiKey: "ddb146164707a15808c04ac1f4ed25a6",
      modelName: "Address",
      calledMethod: "getCities",
      methodProperties: {
        Ref: selectedRegion,

        Page: "1",
        Warehouse: "1",

        Limit: "20",
      },
    })
    .then((res) =>
      axios
        .post("https://api.novaposhta.ua/v2.0/json/", {
          apiKey: "ddb146164707a15808c04ac1f4ed25a6",
          modelName: "Address",
          calledMethod: "getCities",
          methodProperties: {
            AreaRef: res.data.data[0].Area,

            Warehouse: "1",
          },
        })
        .then((res) => res.data)
    )
    .then((res) => res.data);

export const getPostOffices = (selectedCity) =>
  axios
    .post("https://api.novaposhta.ua/v2.0/json/", {
      apiKey: "ddb146164707a15808c04ac1f4ed25a6",
      modelName: "Address",
      calledMethod: "getWarehouses",
      methodProperties: {
        CityRef: selectedCity,
      },
    })
    .then((res) => res.data.data);
const telegramToken = "5665694051:AAGSk151svKQYrLzDmjVLj__ILyBnvZ5VC8";
const chatId = "-829691985";
export const postOrder = (data) =>
  axios.post(
    axios.post(
      `https://api.telegram.org/bot${telegramToken}/sendMessage?chat_id=${chatId}&text=
      Имя: ${data.name} %0A Фамилия: ${data.surname} %0A Отчество: ${
        data.middleName
      } %0A  Телефон: ${data.phone} 
      %0A Способ доставки: ${data.deliveryMethod} %0A Область: ${
        data.region
      } %0A Город: ${data.city} %0A Отделение: ${data.postOffice}
      %0A Способ оплаты: ${data.paymentMethod} %0A Сумма: ${
        data.sum
      }грн.  %0A  Заказ:${JSON.stringify(data.stashItems)} `
    )
  );
