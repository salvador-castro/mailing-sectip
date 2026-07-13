# mailing-sectip

Generador de mailings HTML para la Secretaría de Ciencia, Tecnología e Innovación Productiva (SECTIP) de UTN FRBA.

Permite armar el contenido del boletín de novedades por secciones (título, imagen, texto enriquecido y botón opcional) y exportar el HTML final listo para pegar en un cliente de correo. El encabezado con el logo de UTN y el pie con las redes sociales son fijos y se generan automáticamente.

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

1. **Contenido**: agregá una o más secciones. Cada una tiene título (obligatorio), imagen opcional (URL), texto opcional y un botón opcional con texto y link.
2. **Exportar**: copiá el HTML generado, descargalo como archivo `.html` o abrí una vista previa antes de usarlo.

## Deploy

Desplegado en Vercel (`vercel.json` incluido).
