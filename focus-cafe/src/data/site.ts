export const NAV = [
  { href: "#barra", label: "La barra" },
  { href: "#carta", label: "Carta" },
  { href: "#personajes", label: "Personajes" },
  { href: "#noche", label: "Visítanos" },
];

export const CONTACT = {
  street: "Calzada Tepeyac 401, Local A",
  area: "Colonia León Moderno · León, Guanajuato",
  phones: ["33 1781 2099", "477 567 0088"],
  whatsapp: "https://wa.me/523317812099",
  maps: "https://www.google.com/maps/search/?api=1&query=Calzada+Tepeyac+401+Leon+Moderno+Leon+Guanajuato",
  hours: null as string | null, // TODO: confirmar horario
};

// Coloca el video en /public/video/focus.mp4 y cambia esto a "/video/focus.mp4"
export const BRAND_VIDEO: string | null = null;

export const MARQUEE = {
  day: "CAFÉ DE ESPECIALIDAD ✦ DESAYUNOS AL MOMENTO ✦ PAN DULCE ✦ PARA LLEVAR O QUEDARSE ✦ ",
  night: "FOCUS CAFÉ ✦ CALZADA TEPEYAC 401 ✦ LEÓN, GTO. ✦ ",
};

export const VCARD = [
  "BEGIN:VCARD",
  "VERSION:3.0",
  "FN:Focus Café",
  "ORG:Focus Café",
  "TEL;TYPE=CELL:+523317812099",
  "TEL;TYPE=WORK:+524775670088",
  "ADR;TYPE=WORK:;;Calzada Tepeyac 401 Local A;León;Guanajuato;;México",
  "END:VCARD",
].join("\n");
