// Expone las imágenes de cada carpeta por nombre de archivo (sin extensión): products.matcha_latte, etc.
// Vite exige que las opciones de import.meta.glob sean literales en cada llamada.
const byName = (files: Record<string, string>) =>
  Object.fromEntries(
    Object.entries(files).map(([path, url]) => [path.split("/").pop()!.replace(/\.\w+$/, ""), url])
  );

export const products = byName(import.meta.glob<string>("../assets/products/*.webp", { eager: true, import: "default" }));
export const combos = byName(import.meta.glob<string>("../assets/combos/*.webp", { eager: true, import: "default" }));
export const characters = byName(import.meta.glob<string>("../assets/characters/*.webp", { eager: true, import: "default" }));
export const brand = byName(import.meta.glob<string>("../assets/brand/*.webp", { eager: true, import: "default" }));
export const photos = byName(import.meta.glob<string>("../assets/photos/*.webp", { eager: true, import: "default" }));
