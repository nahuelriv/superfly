// Toda la data del evento vive acá. Nada de strings sueltos en componentes.
// Si cambia algo (fecha, fotos, sponsors), se toca SOLO este archivo.

// Lo que se viene. Todavía no se sabe qué será (otra fecha, una gira, otra
// cosa), así que el anuncio es vago pero fanfarrón: sin numerales ni "edición".
export const proximo = {
  nombre: "Festival SuperFly!",
  estado: "proximamente", // "proximamente" | "en-venta"
  tagline: "El mejor festival del mundo",
  // Protagonista tipográfico del hero + bajada fanfarrona (sin numerales).
  aviso: "Se viene",
  avisoBajada: "Algo enorme",
  instagram: "https://instagram.com/festivalsuperfly",
  instagramHandle: "@festivalsuperfly",
  // Cuando haya definición/fecha, completar y cambiar estado a "en-venta":
  fechaLarga: null,
  ubicacion: null,
  entradasUrl: null,
};

export const edicionAnterior = {
  edicion: "III",
  fechaLarga: "Sábado 21 de marzo",
  ubicacion: "Av. Corrientes 6271, C.A.B.A.",
  mapsUrl: "https://maps.google.com/?q=Av.+Corrientes+6271,+CABA",
  resumen:
    "Bandas, DJs, microcine, arcades, feria y un cañón de camisetas a la 01:00.",
};

// Logo principal (PNG cyan con transparencia). Se usa siempre como <img>.
export const logo = {
  src: "/assets/logo/superfly-logo.svg",
  alt: "Festival SuperFly!",
  // Resolución nativa: 1530x580. No renderizar más ancho que esto.
  anchoNativo: 1530,
};

// Los 6 flyers originales de la edición III (formato 4:5).
export const flyersIII = [
  { src: "/assets/flyers/01-lineup.jpg", titulo: "Line-up", alt: "Flyer con las bandas de la edición III: Los Brujos, Dietrich, Pyramides, Los Subtítulos, Homogénica" },
  { src: "/assets/flyers/02-momento-canon.jpg", titulo: "Momento Cañón", alt: "Flyer del Momento Cañón: lanzamiento de camisetas a la 01:00" },
  { src: "/assets/flyers/03-mapa.jpg", titulo: "Mapa", alt: "Mapa del predio del festival con todas sus zonas" },
  { src: "/assets/flyers/04-microcine.jpg", titulo: "Microcine", alt: "Flyer con los horarios del microcine y sus curadores" },
  { src: "/assets/flyers/05-djs.jpg", titulo: "DJs", alt: "Flyer con los DJs de la noche: Solo Maldito, Miss Jeanette, Matzorama" },
  { src: "/assets/flyers/06-videojuegos.jpg", titulo: "Videojuegos", alt: "Flyer de videojuegos argentinos por Pressover" },
];

// Fotos de la noche. Nahuel deja los archivos en /public/assets/fotos/ con
// estos nombres (noche-01.jpg ... noche-10.jpg) y aparecen solas. Si un archivo
// todavía no está, el componente muestra el placeholder del sistema (sin ícono
// de imagen rota), respetando el `ratio` para que el layout no salte.
export const fotosIII = [
  { src: "/assets/fotos/noche-01.jpg", alt: "Escenario principal durante una banda", ratio: "4/5", destacada: true },
  { src: "/assets/fotos/noche-02.jpg", alt: "El público bailando frente al escenario", ratio: "1/1" },
  { src: "/assets/fotos/noche-03.jpg", alt: "Stand de arcades retro", ratio: "4/5" },
  { src: "/assets/fotos/noche-04.jpg", alt: "DJ en cabina con luces rosas y cyan", ratio: "1/1" },
  { src: "/assets/fotos/noche-05.jpg", alt: "Feria SuperFly con la gente recorriendo", ratio: "4/5" },
  { src: "/assets/fotos/noche-06.jpg", alt: "Cañón lanzando camisetas sobre el público", ratio: "16/10", destacada: true },
  { src: "/assets/fotos/noche-07.jpg", alt: "Consolas y videojuegos argentinos", ratio: "1/1" },
  { src: "/assets/fotos/noche-08.jpg", alt: "Microcine con la gente mirando cortos", ratio: "4/5" },
  { src: "/assets/fotos/noche-09.jpg", alt: "Metegol y fútbol tenis en el patio", ratio: "1/1" },
  { src: "/assets/fotos/noche-10.jpg", alt: "Vista general del predio de noche", ratio: "16/10" },
];

export const lineupIII = [
  { hora: "20:00", nombre: "Solo Maldito", nota: "Vinilos · Warm up", tipo: "warmup" },
  { hora: "20:30", nombre: "Los Subtítulos", tipo: "banda" },
  { hora: "21:20", nombre: "Homogénica", tipo: "banda" },
  { hora: "22:10", nombre: "Dietrich", tipo: "banda" },
  { hora: "23:10", nombre: "Pyramides", tipo: "banda" },
  { hora: "00:00", nombre: "Los Brujos", tipo: "banda" },
  { hora: "00:30", nombre: "Miss Jeanette", tipo: "dj" },
  { hora: "02:00", nombre: "Matzorama", tipo: "dj" },
];

// Momento destacado de la noche (sección propia, la más ruidosa).
export const momentoCanonIII = {
  hora: "01:00",
  titulo: "Momento",
  subtitulo: "Cañón",
  descripcion: "Lanzamiento de camisetas",
  djs: [
    { nombre: "DJ Miss Jeanette", hora: "00:30" },
    { nombre: "DJ Matzorama", hora: "02:00" },
  ],
};

// Zonas y atracciones del predio (sección "Qué había").
export const zonasIII = [
  { nombre: "Escenario Principal", grupo: "musica" },
  { nombre: "CyberCAFE x After Game", grupo: "gaming" },
  { nombre: "Consolas by After Game", grupo: "gaming" },
  { nombre: "Arcades Retro by Clarck", nota: "Entretenimiento vintage", grupo: "gaming" },
  { nombre: "Videojuegos Argentinos por Pressover", grupo: "gaming" },
  { nombre: "Metegol · Fútbol Tenis", grupo: "juegos" },
  { nombre: "Microcine SuperFly", grupo: "cultura" },
  { nombre: "Feria SuperFly", grupo: "cultura" },
  { nombre: "Comidas y bebidas", grupo: "servicios" },
  { nombre: "Guarda Ropa", grupo: "servicios" },
];

export const gruposZona = {
  musica: { label: "Música", color: "navy" },
  gaming: { label: "Gaming", color: "rosa" },
  cultura: { label: "Cultura", color: "cyan" },
  juegos: { label: "Juegos", color: "rosa" },
  servicios: { label: "Servicios", color: "blanco" },
};

// Sponsors. Nahuel pasa los logos; mientras `logo` sea null se muestra el
// nombre en un label del sistema (nunca caja gris).
export const sponsors = [
  { nombre: "After Game", logo: null },
  { nombre: "Clarck", logo: null },
  { nombre: "Pressover", logo: null },
  { nombre: "C Art Media", logo: null },
];
