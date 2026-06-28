export interface FipePriceHistory {
  month: string;
  price: string;
  reference: string;
}

export interface FipePrice {
  brand: string;
  codeFipe: string;
  fuel: string;
  fuelAcronym: string;
  model: string;
  modelYear: number;
  price: string;
  priceHistory: FipePriceHistory[];
  referenceMonth: string;
  vehicleType: number;
}