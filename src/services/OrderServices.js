import requests from "./httpServices";

const OrderServices = {
  addOrder: async (body, headers) => {
    return requests.post("/order/add", body, headers);
  },

  createPaymentIntent: async (body) => {
    return requests.post("/order/create-payment-intent", body);
  },

  getOrderCustomer: async ({ page = 1, limit = 8 }) => {
    return requests.get(`/order?limit=${limit}&page=${page}`);
  },
  getOrderById: async (id, body) => {
    return requests.get(`/order/${id}`, body);
  },
};

export default OrderServices;








// const submitHandler = async (data, shippingOption) => {
//   dispatch({ type: "SAVE_SHIPPING_ADDRESS", payload: data });
//   Cookies.set("shippingAddress", JSON.stringify(data));
//   setIsCheckoutSubmit(true);
//   setError("");

//   userInfo = {
//     name: `${data.firstName} ${data.lastName}`,
//     contact: data.contact,
//     email: data.email,
//     address: data.address,
//     country: data.country,
//     city: data.city,
//     zipCode: data.zipCode,
//     shippingOption: shippingOption,
//   };

//   let orderInfo = {
//     user_info: userInfo,
//     paymentMethod: data.paymentMethod,
//     status: "Pending",
//     cart: items,
//     subTotal: cartTotal,
//     shippingCost: shippingCost,
//     discount: discountAmount,
//     total: total,
//     shippingOption: shippingOption, // add the shippingOption field to the orderInfo object
//   };

//   if (data.paymentMethod === "Card") {
//     if (!stripe || !elements) {
//       return;
//     }

//     const { error, paymentMethod } = await stripe.createPaymentMethod({
//       type: "card",
//       card: elements.getElement(CardElement),
//     });

//     if (error && !paymentMethod) {
//       setError(error.message);
//       setIsCheckoutSubmit(false);
//     } else {
//       setError("");
//       const orderData = {
//         ...orderInfo,
//         cardInfo: paymentMethod,
//       };

//       handlePaymentWithStripe(orderData);

//       return;
//     }
//   }
//   if (data.paymentMethod === "Cash") {
//     OrderServices.addOrder(orderInfo) // pass the orderInfo object with the shippingOption field
//       .then((res) => {
//         router.push(`/order/${res._id}`);
//         notifySuccess("Your Order Confirmed!");
//         Cookies.remove("couponInfo");
//         sessionStorage.removeItem("products");
//         emptyCart();
//         setIsCheckoutSubmit(false);
//       })
//       .catch((err) => {
//         notifyError(err.message);
//         setIsCheckoutSubmit(false);
//       });
//   }
// };
{/* <div className="grid grid-cols-6 gap-6 mb-8">
  <div className="col-span-6">
    <input
      register={register}
      label={t("common:streetAddress")}
      name="user_info.address"
      id="address-line"
      type="text"
      placeholder="123 Boulevard Rd, Beverley Hills"
      className="py-2 px-4 md:px-5 w-full appearance-none border text-sm opacity-75 text-input rounded-md placeholder-body min-h-12 transition duration-200 focus:ring-0 ease-in-out bg-white border-gray-200 focus:outline-none focus:border-emerald-500 h-11 md:h-12"
      defaultValue={currentLocation?.addressLine || ""}
    />
    <Error errorName={errors.user_info?.address} />
  </div>

  <div className="col-span-6 sm:col-span-6 lg:col-span-2">
    <input
      register={register}
      label={t("common:city")}
      name="user_info.city"
      id="city"
      type="text"
      placeholder="Los Angeles"
      className="py-2 px-4 md:px-5 w-full appearance-none border text-sm opacity-75 text-input rounded-md placeholder-body min-h-12 transition duration-200 focus:ring-0 ease-in-out bg-white border-gray-200 focus:outline-none focus:border-emerald-500 h-11 md:h-12"
      defaultValue={currentLocation?.city || ""}
    />
    <Error errorName={errors.user_info?.city} />
  </div>

  <div className="col-span-6 sm:col-span-3 lg:col-span-2">
    <input
      register={register}
      label="Country"
      name="user_info.country"
      id="state"
      type="text"
      placeholder="United States"
      className="py-2 px-4 md:px-5 w-full appearance-none border text-sm opacity-75 text-input rounded-md placeholder-body min-h-12 transition duration-200 focus:ring-0 ease-in-out bg-white border-gray-200 focus:outline-none focus:border-emerald-500 h-11 md:h-12"
      defaultValue={currentLocation?.country || ""}
    />
    <Error errorName={errors.user_info?.country} />
  </div>

  <div className="col-span-6 sm:col-span-3 lg:col-span-2">
    <input
      register={register}
      label={t("common:zIPPostal")}
      name="user_info.zipCode"
      id="pincode"
      type="text"
      placeholder="2345"
      className="py-2 px-4 md:px-5 w-full appearance-none border text-sm opacity-75 text-input rounded-md placeholder-body min-h-12 transition duration-200 focus:ring-0 ease-in-out bg-white border-gray-200 focus:outline-none focus:border-emerald-500 h-11 md:h-12"
      defaultValue={currentLocation?.zipCode || ""}
    />
    <Error errorName={errors.user_info?.zipCode} />
  </div>
</div> */}



{/* <input
  register={register}
  label={t("common:streetAddress")}
  name="user_info.addressLine" // update this line
  id="address-line"
  type="text"
  placeholder="123 Boulevard Rd, Beverley Hills"
  className="py-2 px-4 md:px-5 w-full appearance-none border text-sm opacity-75 text-input rounded-md placeholder-body min-h-12 transition duration-200 focus:ring-0 ease-in-out bg-white border-gray-200 focus:outline-none focus:border-emerald-500 h-11 md:h-12"
  defaultValue={currentLocation?.addressLine || ""}
/>
<Error errorName={errors.addressLine} /> {/* update this line */}

{/* <input
  register={register}
  label={t("common:city")}
  name="user_info.city"
  id="city"
  type="text"
  placeholder="Los Angeles"
  className="py-2 px-4 md:px-5 w-full appearance-none border text-sm opacity-75 text-input rounded-md placeholder-body min-h-12 transition duration-200 focus:ring-0 ease-in-out bg-white border-gray-200 focus:outline-none focus:border-emerald-500 h-11 md:h-12"
  defaultValue={currentLocation?.city || ""}
/>
<Error errorName={errors.city} />

<input
  register={register}
  label="Country"
  name="user_info.country" // update this line
  id="state"
  type="text"
  placeholder="United States"
  className="py-2 px-4 md:px-5 w-full appearance-none border text-sm opacity-75 text-input rounded-md placeholder-body min-h-12 transition duration-200 focus:ring-0 ease-in-out bg-white border-gray-200 focus:outline-none focus:border-emerald-500 h-11 md:h-12"
  defaultValue={currentLocation?.country || ""}
/>
<Error errorName={errors.country} /> {/* update this line */}

