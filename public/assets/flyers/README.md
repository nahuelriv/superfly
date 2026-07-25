# Flyers de la edición anterior

Las tarjetas de la galería se muestran **vacías** hasta que pongas los flyers originales.

## Cómo cargarlos

1. Guardá las 4 imágenes en esta misma carpeta (`public/assets/flyers/`). Pueden ser JPG, PNG o WebP. Recomendado: ~4:5, lado largo máximo 1200px, ~200 KB c/u.

2. En `src/data/festival.js` completá la propiedad `src` de cada flyer con la ruta. Ejemplo:

```js
export const flyersIII = [
  {
    src: "/assets/flyers/horarios.jpg",   // <-- poner ruta acá
    alt: "Flyer de horarios de bandas y DJs",
    titulo: "Bandas / DJs",
  },
  // ...
];
```

Una vez que cada `src` deja de ser `null`, la card se vuelve cliqueable y abre el lightbox automáticamente.
