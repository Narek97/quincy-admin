import { FC } from "react";
import CouponFormRenderer from "../../components/coupons/form/coupon";
import SponsorFormRenderer from "../../components/coupons/form/sponsor";
import { IView } from "../../ts/interface";
import { ImageRenderer } from "../../components/coupons/renderer";

export const brandView: IView = {
  title: "brand",
  name: "brands",
  request: "brand",
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
      {
        field: "logo",
        headerName: "Sponsor Logo",
        flex: 1,
        sortable: false,
        renderCell: ImageRenderer,
      },
      {
        field: "action",
        headerName: "Action",
        flex: 1,
        sortable: false,
      },
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

export const couponView: IView = {
  title: "coupon",
  name: "coupons",
  request: "coupon",
  fields: {
    dashboard: [
      {
        field: "name",
        headerName: "Sponsor",
        sortable: false,
        flex: 1,
        valueGetter: (params: any) =>  params.row.brand.name},
     
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
        name: "brand",
        placeholder: "Deal Sponsor",
        input: "select",
        required: true,
        multiChoice: false,
        async: true,
        asyncGet: "brand",
        nameKey: "brands",
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

export const couponsTabViewMap: Record<string, IView> = {
  brand: brandView,
  coupon: couponView,
};

export const couponsTabs = ["coupon", "brand"];

export const COUPONS_LIMIT = 5;

export const couponsFormRendererMap: Record<string, FC<any>> = {
  brand: SponsorFormRenderer,
  coupon: CouponFormRenderer,
};
