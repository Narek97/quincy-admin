import CouponFormRenderer from "../../components/coupons/form/coupon";
import SponsorFormRenderer from "../../components/coupons/form/sponsor";

export const brandView = {
  title: "brand",
  name: "brands",
  fields: {
    dashboard: [
      { field: "name", headerName: "Sponsor", flex: 1 },
      {
        field: "targetUrl",
        headerName: "Target URL",
        flex: 1,
        sortable: false,
      },
      {
        field: "triggerUrls",
        headerName: "Trigger URLs",
        flex: 1,
        sortable: false,
      },
      { field: "logo", headerName: "Sponsor Logo", flex: 1, sortable: false },
      { field: "action", headerName: "Action", flex: 1, sortable: false },
    ],

    form: [
      {
        name: "name",
        placeholder: "Sponsor",
        input: "text",
        required: true,
        multiChoice: false,
      },
      {
        name: "targetUrl",
        placeholder: "Deal Target URL",
        input: "text",
        required: true,
        multiChoice: false,
      },
      {
        name: "triggerUrls",
        placeholder: "Deal Trigger URLs",
        input: "text",
        required: false,
        multiChoice: true,
      },

      {
        name: "logo",
        placeholder: "Deal Sponsor Logo",
        input: "image",

        required: true,
        multiChoice: false,
      },
    ],
  },
};

export const couponView = {
  title: "coupon",
  name: "coupons",
  fields: {
    dashboard: [
      { field: "name", headerName: "Sponsor", sortable: false, flex: 1 },
      {
        field: "couponCode",
        headerName: "Coupon Code",
        sortable: false,
        flex: 1,
      },
      { field: "dealText", headerName: "Text", sortable: false, flex: 1 },
      { field: "action", headerName: "Action", sortable: false, flex: 1 },
    ],

    form: [
      {
        name: "name",
        placeholder: "Deal Sponsor",
        input: "select",
        required: true,
        multiChoice: false,
        async: true,
      },
      {
        name: "couponCode",
        placeholder: "Deal Coupon Code",
        input: "text",
        required: true,
        multiChoice: false,
      },
      {
        name: "dealText",
        placeholder: "Deal Text",
        input: "text",
        required: false,
        multiChoice: false,
      },
    ],
  },
};

export const couponsTabViewMap = {
  brand: brandView,
  coupon: couponView,
};

export const couponsTabs = ["coupon", "brand"];

export const COUPONS_LIMIT = 5;

export const couponsFormRendererMap = {
  brand: SponsorFormRenderer,
  coupon: CouponFormRenderer,
};
