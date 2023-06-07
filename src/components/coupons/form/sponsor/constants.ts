
import * as yup from 'yup';


export const createSponsorDefaultValues = {
  name: "",
  targetUrl: "",
  triggerUrls: [],
  logo: null,
  deleteAttachment: false,
} as const ;


export const createSponsorSchema = yup.object().shape({
  name: yup.string().required('Name is required'),
  targetUrl: yup
    .string()
    .required('Target URL is required')
    .url('Target URL must be a valid URL'),
  triggerUrls: yup.array().of(yup.string().url('Trigger URL must be a valid URL')),
  logo: yup
    .mixed()
    .required('Logo is required')
});


export const editSponsorSchema = yup.object().shape({
  name: yup.string().required('Name is required'),
  targetUrl: yup
    .string()
    .required('Target URL is required')
    .url('Target URL must be a valid URL'),
  triggerUrls: yup.array().of(yup.string().url('Trigger URL must be a valid URL')),
});