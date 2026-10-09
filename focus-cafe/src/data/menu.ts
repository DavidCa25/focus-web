// Fuente: Menú Septiembre FOCUS (PDF). Precios en MXN.
import { combos, products } from "./assets";

export type CutEdge = "left" | "right";

export interface MenuItem {
  name: string;
  description?: string;
  /** Precio único. */
  price?: number;
  /** Precios por temperatura (columnas 🔥 / 🧊 del menú impreso). */
  hot?: number;
  cold?: number;
  /** Marcado con ♥ en el menú impreso. */
  favorite?: boolean;
  image?: string;
  /** Lado en que la foto original viene recortada; se desvanece con CSS. */
  cut?: CutEdge;
}

export interface MenuGroup {
  title?: string;
  note?: string;
  items: MenuItem[];
}

export interface MenuCategory {
  id: string;
  label: string;
  note?: string;
  groups: MenuGroup[];
  extras?: string;
}

export const MENU: MenuCategory[] = [
  {
    id: "cafe",
    label: "Café",
    extras: "Extras: espresso $20 · leche $5 · jarabes $5 · crema batida $5 · bombones $5",
    groups: [
      {
        items: [
          { name: "Espresso", hot: 30 },
          { name: "Espresso americano", hot: 40, cold: 45, image: products.taza_americano },
          { name: "Americano regular", hot: 30 },
          { name: "Flat white", hot: 55, favorite: true, image: products.flat_white },
          { name: "Cappuccino", hot: 65 },
          { name: "Latte", hot: 70, cold: 75 },
          { name: "Latte mazapán", hot: 75, cold: 80 },
          { name: "Caramel macchiato", hot: 70, cold: 75, favorite: true, image: products.caramel_macchiato },
          { name: "Moka", hot: 75, cold: 80, favorite: true, image: products.moka },
          { name: "Chocolate", hot: 65, cold: 70 },
          { name: "Café vietnamita", cold: 75, favorite: true, image: products.cafe_vietnamita },
          { name: "Caramelizer", cold: 80 },
          { name: "Hongos adaptógenos", hot: 85, cold: 90 },
        ],
      },
    ],
  },
  {
    id: "frappes",
    label: "Frappés",
    groups: [
      {
        items: [
          { name: "Caramelo", price: 80 },
          { name: "Vainilla", price: 80 },
          { name: "Chai", price: 80 },
          { name: "Kranky", price: 85 },
          { name: "Mazapán", price: 85 },
          { name: "Chocolate", price: 85 },
          { name: "Matcha", price: 90 },
        ],
      },
    ],
  },
  {
    id: "te-matcha",
    label: "Té y matcha",
    groups: [
      {
        title: "Tés",
        items: [
          { name: "Mariposa azul", cold: 75 },
          { name: "Chai latte", hot: 70, cold: 75 },
          { name: "Jazmín y miel", hot: 40, cold: 45 },
          { name: "Manzanilla y miel", hot: 40, cold: 45, favorite: true, image: products.te_manzanilla },
          { name: "De rosas y miel", hot: 40, cold: 45 },
          { name: "Cardamomo", hot: 40, cold: 45 },
          { name: "Caléndula", hot: 40, cold: 45 },
          { name: "Leche dorada", hot: 40, cold: 45 },
        ],
      },
      {
        title: "Matcha",
        items: [
          { name: "Matcha latte", hot: 75, cold: 80, favorite: true, image: products.matcha_latte },
          { name: "Matcha miel manzanilla", cold: 85 },
          { name: "Matcha coco", cold: 85 },
          { name: "Matcha manzana", cold: 85 },
        ],
      },
    ],
  },
  {
    id: "temporada",
    label: "Temporada",
    groups: [
      {
        title: "De temporada",
        items: [
          { name: "Red velvet", description: "Betabel, jengibre, miel y chocolate.", hot: 80, cold: 85 },
          { name: "Fresquita", description: "Fresas, menta, agua mineral y limón.", cold: 75 },
          { name: "Cold brew", description: "Cold brew de la casa infusionado 24 horas.", cold: 55, image: products.cold_brew, cut: "right" },
          { name: "Cold brew tonic", description: "Cold brew de la casa con agua tónica.", cold: 75 },
          { name: "Cold brew jamaica", description: "Cold brew de la casa y concentrado de jamaica dulce.", cold: 75 },
        ],
      },
      {
        title: "Smoothies",
        note: "Extras: avena, camote o chía +$10 · yogurt griego +$15 · proteína +$42",
        items: [
          { name: "Frutos rojos", price: 85 },
          { name: "Mango piña", price: 85 },
          { name: "Plátano mango", price: 85 },
        ],
      },
    ],
  },
  {
    id: "desayunos",
    label: "Desayunos",
    note: "Preparados al momento. Conviértelo en combo con café americano por +$25.",
    groups: [
      {
        title: "Sandwich",
        items: [
          { name: "Sandwich Focus", description: "Aguacate, 2 huevos estrellados, tocino, queso y papitas.", price: 100, favorite: true, image: products.sandwich_focus, cut: "left" },
          { name: "Sandwich de atún", description: "Ensalada de atún al chipotle, queso y papitas.", price: 85 },
          { name: "Sandwich de huevo", description: "Pan de masa madre, huevo revuelto, queso, aguacate y papitas.", price: 85 },
          { name: "Grilled cheese", description: "5 quesos con papas o ensalada.", price: 80, image: products.grilled_cheese, cut: "left" },
          { name: "Croissant de jamón", description: "Jamón de pavo, queso y papitas.", price: 80, image: products.croissant_jamon, cut: "right" },
          { name: "Croissant de huevo", description: "Huevito revuelto con queso, aguacate y papitas.", price: 75 },
        ],
      },
      {
        title: "Chilaquiles",
        note: "Totopos horneados con salsa poblana verde y queso. Extras: huevo o salsa $10 · pollo $20 · tocino $15 · arrachera $40",
        items: [
          { name: "Chilaquiles sencillos", price: 60 },
          { name: "Chilaquiles con 2 huevos", price: 70, image: products.chilaquiles, cut: "right" },
          { name: "Chilaquiles Focus", description: "Con huevito revuelto y tocino.", price: 85, favorite: true },
          { name: "Chilaquiles con pollo", price: 90 },
          { name: "Chilaquiles con arrachera", price: 110 },
        ],
      },
      {
        title: "Toast y wraps",
        items: [
          { name: "Toast de atún al chipotle", description: "Pan de masa madre con queso y ensalada de atún con cebolla y jitomate.", price: 65 },
          { name: "Wrap de huevo", description: "Burrito de harina con huevo a la mexicana y queso.", price: 70 },
          { name: "Wrap de huevo con tocino", description: "Burrito de harina con huevo a la mexicana, queso y tocino.", price: 85 },
        ],
      },
      {
        title: "¿Algo fit?",
        items: [
          { name: "Mix de ensalada con huevo cocido", description: "Ensalada, germinado, jitomate, aguacate, huevo cocido, aderezo de mostaza y miel, y pan de masa madre tostado.", price: 80 },
        ],
      },
    ],
  },
  {
    id: "tardes",
    label: "Tardes",
    note: "Jueves y viernes, de 4 a 8 pm.",
    groups: [
      {
        items: [
          { name: "Waffles dulces (3 pzas)", description: "Con plátano y 2 complementos: arándanos, almendra, nuez, maple, nutella, dulce de leche, lechera o mermelada de fresa.", price: 75 },
          { name: "Rollitos vietnamitas (2 pzas)", description: "Hoja de arroz, jícama, zanahoria, pepino, lechuga, mango y cilantro, con mostaza dulce y ajonjolí.", price: 65 },
          { name: "Bánh mì", description: "Baguette de masa madre con pollo a la barbecue, zanahoria, pepino, cilantro, jalapeño, mayonesa y sriracha.", price: 110 },
        ],
      },
    ],
  },
  {
    id: "panaderia",
    label: "Panadería",
    note: "Pregunta en barra por la panadería disponible del día.",
    groups: [
      {
        items: [
          { name: "Rol de 3 leches", image: products.rol_3_leches },
          { name: "Pay de queso", image: products.pay_de_queso },
          { name: "Donas", image: products.dona },
          { name: "Brownies", image: products.brownie },
          { name: "Bollitos de masa madre" },
        ],
      },
    ],
  },
  {
    id: "para-casa",
    label: "Para casa",
    note: "También vendemos nuestro café en grano o molido. Pregunta en barra.",
    groups: [
      {
        items: [
          { name: "Prensa francesa", price: 200 },
          { name: "Cafetera moka", price: 250 },
          { name: "Taza de espresso", price: 45 },
          { name: "Termo", price: 200 },
        ],
      },
    ],
  },
];

export const itemsOf = (category: MenuCategory) => category.groups.flatMap((g) => g.items);

export const hasTemperatures = (category: MenuCategory) =>
  itemsOf(category).some((item) => item.hot !== undefined || item.cold !== undefined);

/* ---------- La barra: "Los más pedidos" del menú impreso ---------- */

export interface FeaturedItem {
  name: string;
  /** Palabra gigante de fondo. */
  word: string;
  price: number;
  image: string;
  description: string;
  note: string;
  specs: [string, string][];
  /** Color de fondo de la sección y color de la palabra gigante. */
  tint: string;
  ink: string;
}

export const FEATURED: FeaturedItem[] = [
  {
    name: "Matcha latte", word: "MATCHA", price: 80, image: products.matcha_latte,
    description: "Matcha con leche, en capas. Caliente o frío.", note: "♡ favorito de la casa",
    specs: [["Caliente", "$75"], ["Frío", "$80"]], tint: "#e2eac2", ink: "#5e7a0f",
  },
  {
    name: "Café vietnamita", word: "VIETNAMITA", price: 75, image: products.cafe_vietnamita,
    description: "Café intenso en capas, servido solo en frío.", note: "solo en frío",
    specs: [["Caliente", "—"], ["Frío", "$75"]], tint: "#ece1cb", ink: "#6a4224",
  },
  {
    name: "Caramel macchiato", word: "CARAMEL", price: 75, image: products.caramel_macchiato,
    description: "Espresso, leche y caramelo. Caliente o frío.", note: "caliente o frío",
    specs: [["Caliente", "$70"], ["Frío", "$75"]], tint: "#f1e3c6", ink: "#9c5b22",
  },
  {
    name: "Té de manzanilla", word: "MANZANILLA", price: 45, image: products.te_manzanilla,
    description: "Manzanilla con miel, servida fría con flores.", note: "con miel",
    specs: [["Caliente", "$40"], ["Frío", "$45"]], tint: "#f3eacd", ink: "#b06f22",
  },
  {
    name: "Flat white", word: "FLAT", price: 55, image: products.flat_white,
    description: "Espresso con leche texturizada y arte latte.", note: "♡ el de todos los días",
    specs: [["Caliente", "$55"], ["Frío", "—"]], tint: "#ebe2d2", ink: "#3b2a20",
  },
  {
    name: "Moka", word: "MOKA", price: 75, image: products.moka,
    description: "Espresso con chocolate. Caliente o frío.", note: "con chocolate",
    specs: [["Caliente", "$75"], ["Frío", "$80"]], tint: "#e9ddd3", ink: "#4a2a1e",
  },
];

/* ---------- Combos de la semana ---------- */

export const COMBOS = [
  { day: "lunes", dish: "Sandwich Focus", price: 125, image: combos.combo_lunes },
  { day: "martes", dish: "Croissant de jamón", price: 105, image: combos.combo_martes },
  { day: "miércoles", dish: "Chilaquiles con huevo", price: 90, image: combos.combo_miercoles },
  { day: "jueves", dish: "Grilled cheese", price: 105, image: combos.combo_jueves },
  { day: "viernes", dish: "Sandwich de atún", price: 110, image: combos.combo_viernes },
];

/* ---------- Para los atrevidos ---------- */

export const JUMBO = {
  name: "Caramel macchiato Jumbo",
  size: "1 litro",
  price: 135,
  image: products.caramel_macchiato,
  notes: ["4 espressos", "crema batida de la casa", "500 ml de leche", "caramelo"],
};
