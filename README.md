# mailing-sectip

Herramienta de uso interno para la Secretaría de Ciencia, Tecnología e Innovación Productiva (SECTIP) de UTN FRBA, que genera el HTML del boletín de novedades para enviarlo a través de la plataforma [SIA](https://sia.frba.utn.edu.ar/) (llega a casillas como Gmail y Hotmail).

Permite armar el contenido del boletín por secciones (título, imagen, texto enriquecido y botón opcional) y exportar el HTML final listo para pegar en el SIA. El encabezado con el logo de UTN y el pie con las redes sociales son fijos y se generan automáticamente. También se genera un preheader oculto (a partir de los títulos de las secciones) para la vista previa en la bandeja de entrada.

## Stack

- React 18 + Vite
- Tailwind CSS
- Tiptap (editor de texto enriquecido)
- Vercel Analytics

## Desarrollo

```bash
npm install
npm run dev
```

## Build

```bash
npm run build
npm run preview
```

## Uso

1. **Contenido**: agregá una o más secciones. Cada una tiene título (obligatorio), imagen opcional (URL https, con descripción obligatoria si se carga), texto opcional y un botón opcional con texto y link (URL https). El preview de la imagen indica si la URL cargó correctamente o no.
2. **Exportar**: copiá el HTML generado y pegalo en el [SIA](https://sia.frba.utn.edu.ar/), descargalo como archivo `.html` o abrí una vista previa antes de usarlo.

## Deploy

Desplegado en Vercel (`vercel.json` incluido).
