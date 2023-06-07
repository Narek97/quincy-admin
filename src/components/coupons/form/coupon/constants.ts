
import * as yup from 'yup';


export const couponSchema = yup.object().shape({
    couponCode: yup.string().required('Coupon Code is required'),
    dealText: yup.string(),
  });
  