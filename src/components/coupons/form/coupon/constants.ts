import * as yup from "yup";

export const couponSchema = yup.object().shape({
  brand: yup.mixed().required("Brand is required"),
  couponCode: yup.string().required("Coupon Code is required"),
  dealText: yup.string(),
});
