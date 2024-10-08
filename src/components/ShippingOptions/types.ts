export interface ShippingMethod {
  _id: string;
  type: string;
  description: string;
  price: number;
}

export interface ShippingOptionsProps {
  shippingMethods: ShippingMethod[];
}
