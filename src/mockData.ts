// src/mockData.ts

export interface ProductSpec {
  [key: string]: string;
}

export interface LuzHogarProduct {
  id: string;
  name: string;
  slug: string;
  category: string;
  brand: string;
  price: number;
  originalPrice?: number;
  stock: number;
  rating: number;
  reviewsCount: number;
  image: string;
  specs: ProductSpec;
  badge: string | null;
}

export const luzHogarMockProducts: LuzHogarProduct[] = [
  // --- GRAN ELECTRO ---
  {
    id: "ge-001",
    name: "Lavadora Candy Smart 8Kg 1400 RPM",
    slug: "lavadora-candy-8kg",
    category: "Gran Electro",
    brand: "Candy",
    price: 349.99,
    originalPrice: 429.99,
    stock: 15,
    rating: 4.8,
    reviewsCount: 124,
    image: "/lavadora-candy-8-kg-1400-rpm.jpg",
    specs: {
      "Capacidad": "8 Kg",
      "Clase Energética": "A",
      "Revoluciones": "1400 rpm"
    },
    badge: "-18%"
  },
  {
    id: "ge-002",
    name: "Lavavajillas Corberó 12 Servicios Inox",
    slug: "lavavajillas-corbero-12-servicios",
    category: "Gran Electro",
    brand: "Corberó",
    price: 399.00,
    originalPrice: 449.00,
    stock: 5,
    rating: 4.5,
    reviewsCount: 89,
    image: "/lavavajillas-corbero-12-servicios-color-inox.jpg",
    specs: {
      "Capacidad": "12 Servicios",
      "Clase Energética": "E",
      "Color": "Inox"
    },
    badge: "Oferta"
  },

  // --- IMAGEN Y SONIDO ---
  {
    id: "is-001",
    name: "Smart TV LG 55'' 4K UHD",
    slug: "smart-tv-lg-55-4k",
    category: "Imagen y Sonido",
    brand: "LG",
    price: 459.50,
    originalPrice: 549.00,
    stock: 8,
    rating: 4.9,
    reviewsCount: 210,
    image: "https://images.unsplash.com/photo-1593359677770-4669502a35b0?auto=format&fit=crop&q=80&w=600",
    specs: {
      "Pulgadas": "55\"",
      "Resolución": "4K UHD",
      "Panel": "LED"
    },
    badge: "SuperVentas"
  },
  {
    id: "is-002",
    name: "Barra de Sonido Samsung 2.1",
    slug: "barra-sonido-samsung",
    category: "Imagen y Sonido",
    brand: "Samsung",
    price: 129.99,
    originalPrice: 150.00,
    stock: 22,
    rating: 4.2,
    reviewsCount: 45,
    image: "https://images.unsplash.com/photo-1545454675-3531b543be5d?auto=format&fit=crop&q=80&w=600",
    specs: {
      "Potencia": "150W",
      "Conectividad": "Bluetooth"
    },
    badge: "Novedad"
  },

  // --- PEQUEÑO ELECTRO ---
  {
    id: "pe-001",
    name: "Microondas Teka 20L con Grill",
    slug: "microondas-teka-20l-grill",
    category: "Pequeño Electro",
    brand: "Teka",
    price: 89.90,
    originalPrice: 110.00,
    stock: 50,
    rating: 4.7,
    reviewsCount: 340,
    image: "/microondas-20l-con-grill-teka.jpg",
    specs: {
      "Capacidad": "20 Litros",
      "Potencia": "700W",
      "Grill": "Sí"
    },
    badge: "-20%"
  },

  // --- CLIMATIZACIÓN ---
  {
    id: "cl-001",
    name: "Termo Eléctrico Aparici 50 Litros",
    slug: "termo-aparici-50l",
    category: "Climatización",
    brand: "Aparici",
    price: 145.00,
    originalPrice: 145.00,
    stock: 5,
    rating: 4.6,
    reviewsCount: 32,
    image: "https://images.unsplash.com/photo-1584622650111-993a426fbf0a?auto=format&fit=crop&q=80&w=600",
    specs: {
      "Capacidad": "50 Litros",
      "Clase Energética": "C",
      "Instalación": "Vertical/Horizontal"
    },
    badge: null
  }
];

export interface OrderTimelineStep {
  step: string;
  timestamp: string | null;
  completed: boolean;
}

export interface MockOrder {
  id: string;
  date: string;
  total: number;
  status: string;
  items: number;
  timeline: OrderTimelineStep[];
  address: string;
  paymentMethod: string;
  products: Array<{ name: string; quantity: number; price: number; image: string }>;
}

export const mockOrders: MockOrder[] = [
  {
    id: "ORD-2026-9081",
    date: "2026-04-20",
    total: 459.50,
    status: "Enviado",
    items: 1,
    address: 'Calle Triana 12, Las Palmas de Gran Canaria, 35002',
    paymentMethod: 'Visa ending in 4242',
    products: [
       { name: "Smart TV LG 55'' 4K UHD", quantity: 1, price: 459.50, image: "https://images.unsplash.com/photo-1593359677770-4669502a35b0?auto=format&fit=crop&q=80&w=600" }
    ],
    timeline: [
      { step: "Pedido Realizado", timestamp: "20 Abr, 09:00", completed: true },
      { step: "En Preparación", timestamp: "21 Abr, 10:30", completed: true },
      { step: "Enviado", timestamp: "22 Abr, 16:45", completed: true },
      { step: "Entregado", timestamp: null, completed: false }
    ]
  },
  {
    id: "ORD-2026-7742",
    date: "2026-04-18",
    total: 349.99,
    status: "Entregado",
    items: 1,
    address: 'Avenida Marítima 5, Santa Cruz de Tenerife, 38003',
    paymentMethod: 'Apple Pay',
    products: [
      { name: "Lavadora Candy Smart Inverter 9Kg", quantity: 1, price: 349.99, image: "https://images.unsplash.com/photo-1584622650111-993a426fbf0a?auto=format&fit=crop&q=80&w=600" }
    ],
    timeline: [
      { step: "Pedido Realizado", timestamp: "18 Abr, 11:00", completed: true },
      { step: "En Preparación", timestamp: "18 Abr, 15:30", completed: true },
      { step: "Enviado", timestamp: "19 Abr, 09:45", completed: true },
      { step: "Entregado", timestamp: "20 Abr, 14:20", completed: true }
    ]
  }
];
