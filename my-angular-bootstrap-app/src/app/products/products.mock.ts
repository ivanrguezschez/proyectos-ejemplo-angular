export const productsList: Product[] = [
  {
    id: 1,
    name: 'Cepillo',
    price: 10,
    description: 'Descripción del producto Cepillo',
  },
  {
    id: 2,
    name: 'Detergente',
    price: 5,
    description: 'Descripción del producto Detergente',
  },
  {
    id: 3,
    name: 'Suavizante',
    price: 7,
    description: 'Descripción del producto Suavizante',
  },
  {
    id: 4,
    name: 'Estropajo',
    price: 8,
  },
  {
    id: 5,
    name: 'Limpiador',
    price: 2,
    description: 'Descripción del producto Limpiador',
  },
];

export interface Product {
  id: number | string;
  name: string;
  price: number;
  description?: string;
}
