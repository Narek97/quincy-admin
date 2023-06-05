export const brandView = {
  title: "brand",
  name: "brands",
  fields: {
    dashboard: [
      {
        id: "sponsor",
        label: "Sponsor",
        disablePadding: false,
        numeric: false,
      },
      {
        id: "targetUrl",
        label: "Target URL",
        disablePadding: false,
        numeric: false,
      },
      {
        id: "triggerUrls",
        label: "Trigger URLs",
        disablePadding: false,
        numeric: false,
      },

      {
        id: "logo",
        label: "Sponsor Logo",
        disablePadding: false,
        numeric: false,
      },
      {
        id: "action",
        numeric: true,
        disablePadding: false,
        label: "Action",
      },
    ],

    form: [
      {
        name: "sponsor",
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
      {
        id: "sponsor",
        label: "Sponsor",
        disablePadding: false,
        numeric: false,
      },
      {
        id: "couponCode",
        label: "Coupon Code",
        disablePadding: false,
        numeric: false,
      },
      {
        id: "dealText",
        label: "Text",
        disablePadding: false,
        numeric: false,
      },
      {
        id: "action",
        numeric: true,
        disablePadding: false,
        label: "Action",
      },
    ],

    form: [
      {
        name: "sponsor",
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
