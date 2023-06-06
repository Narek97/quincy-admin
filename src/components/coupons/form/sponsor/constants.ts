
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
    .test('fileFormat', 'Invalid file format', function (value) {
      if (!value) return true; // Skip validation if no file is selected

      const supportedFormats = ['image/jpeg', 'image/png'];
      const file = this.options.context?.currentLogoFile;

      if (!file) return false; // File is missing

      return supportedFormats.includes(file.type);
    }),
});


export const editSponsorSchema = yup.object().shape({
  name: yup.string().required('Name is required'),
  targetUrl: yup
    .string()
    .required('Target URL is required')
    .url('Target URL must be a valid URL'),
  triggerUrls: yup.array().of(yup.string().url('Trigger URL must be a valid URL')),
  logo: yup
    .mixed()
    .nullable()
    .test('fileFormat', 'Invalid file format', function (value) {
      if (!value) return true; // Skip validation if no file is selected

      const supportedFormats = ['image/jpeg', 'image/png'];
      const file = this.options.context?.currentLogoFile;

      if (!file) return false; // File is missing

      return supportedFormats.includes(file.type);
    }),
});