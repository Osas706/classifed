// mobile/types/ad.types.ts
export interface Ad {
  _id: string;
  user: string;
  title: string;
  description?: string;
  price?: number;
  category?: string;
  condition?: "New" | "Used" | "Refurbished";
  terms?: string;
  adImage?: string;
  displayImage?: string;
  country?: string;
  state?: string;
  lat?: number;
  long?: number;
  firstName?: string;
  lastName?: string;
  email?: string;
  phoneNumber?: string;
  createdAt: string;
  updatedAt?: string;
}

export interface AdFormData {
  title: string;
  description?: string;
  price?: number;
  category?: string;
  condition?: string;
  terms?: string;
  country?: string;
  state?: string;
  lat?: number;
  long?: number;
  adImage?: string; // local URI from image picker
}

export type AdCategory =
  | "All"
  | "Electronics"
  | "Vehicles"
  | "Fashion"
  | "Home & Garden"
  | "Sports"
  | "Jobs"
  | "Real Estate"
  | "Services"
  | "Others";
