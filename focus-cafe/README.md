# Focus Café

Sitio de Focus Café (León, Gto.). React 19 + TypeScript + Vite, sin dependencias de UI.

La página es **un día en Focus**: el reloj flotante avanza de 07:00 a 20:00 con el scroll,
de la mañana en crema a la noche en negro.

```bash
npm install
npm run dev      # desarrollo
npm run build    # producción en dist/
```

## Estructura

```
src/
  styles/        tokens.css (paleta, tipografía, movimiento) · base.css (reset y utilidades)
  data/          menu.ts (carta, más pedidos, combos, Jumbo) · site.ts (contacto, video, nav) · assets.ts
  hooks/         useInView · useReducedMotion
  components/    SplitText · CurvedMarquee · VideoDialog · DayClock · SiteHeader
  sections/      Una carpeta por sección, con su .tsx y su .css
    Hero/          07:30  bebida que atraviesa la palabra FOCUS
    PourRibbon/           cinta de texto sobre una curva
    Barra/         10:00  los más pedidos (card swap)
    Carta/         13:00  carta completa, vitrina, combos de la semana, Jumbo
    Personajes/    16:00  pruebas de impresión con las 4 tintas
    Experiencia/   18:00  el lugar
    Noche/         20:00  video de marca, visítanos y footer
  assets/        products · combos · characters · brand · photos (todo en .webp)
```

## Tareas comunes

- **Cambiar precios o productos:** `src/data/menu.ts`.
- **Agregar el video de marca:** copia el archivo a `public/video/focus.mp4` y en `src/data/site.ts`
  cambia `BRAND_VIDEO` a `"/video/focus.mp4"`.
- **Agregar el horario:** `CONTACT.hours` en `src/data/site.ts`.
- **Nueva foto de producto:** guárdala en `src/assets/products/` como .webp y úsala en `menu.ts`
  con `products.nombre_del_archivo`. Si la foto viene cortada de un lado, agrega `cut: "left"` o `cut: "right"`.
