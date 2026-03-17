export interface Property {
  id?: string;
  title: string;
  description: string;
  price: number;
  location: string;
  bedrooms: number;
  bathrooms: number;
  area: number;
  imageUrl: string;
  type: 'sale' | 'rent';
  category: 'piso' | 'casa' | 'atico' | 'duplex';
  createdAt: string;
}

export interface Valuation {
  id?: string;
  name: string;
  email: string;
  phone: string;
  address: string;
  propertyType: string;
  area: number;
  bedrooms: number;
  estimatedValue: number;
  createdAt: string;
}
