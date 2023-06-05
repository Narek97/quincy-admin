export const brandView = {
  title: "brand",
  name: "brands",
  fields: {
    dashboard: [
      { field: "sponsor", headerName: "Sponsor", width: 150},
      { field: "targetUrl", headerName: "Target URL", width: 150},
      { field: "triggerUrls", headerName: "Trigger URLs", width: 150},
      { field: "logo", headerName: "Sponsor Logo", width: 150},
      { field: "action", headerName: "Action", width: 150, sortable: false},
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
      { field: "name", headerName: "Sponsor", sortable: false, flex: 1,},
      { field: "couponCode", headerName: "Coupon Code", sortable: false,  flex: 1,},
      { field: "dealText", headerName: "Text", sortable: false, flex: 1,},
      { field: "action", headerName: "Action",  sortable: false, flex: 1,},
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
