export interface ShippingMethod {
  _id: string;
  type: string;
  price: number;
}

export interface ShippingOptionsProps {
  shippingMethods: ShippingMethod[];
}
