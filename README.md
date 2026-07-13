# mailing-sectip

Herramienta de uso interno de la Secretaría de Ciencia, Tecnología e Innovación Productiva (SECTIP) de UTN FRBA para armar el boletín de novedades y enviarlo a través de la plataforma [SIA](https://sia.frba.utn.edu.ar/) (llega a casillas como Gmail y Hotmail).

Permite armar el contenido del boletín por secciones (título, imagen, texto enriquecido y botón opcional), copiar el HTML final listo para pegar directamente en el editor del SIA y, opcionalmente, descargarlo como archivo `.html` de respaldo. El encabezado con el logo de UTN y el pie con las redes sociales son fijos y se generan automáticamente, junto con un preheader oculto (a partir de los títulos de las secciones) para la vista previa en la bandeja de entrada.

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

1. **Contenido**: agregá una o más secciones. Cada una tiene:
   - Título (obligatorio).
   - Imagen opcional (URL, debe empezar con `https://`). Si se carga una imagen, la descripción (alt) es obligatoria, y el preview indica si la URL cargó correctamente o no.
   - Texto enriquecido opcional.
   - Botón opcional, con texto y link (URL, debe empezar con `https://`).
2. **Exportar**: copiá el HTML generado y pegalo directamente en el editor del [SIA](https://sia.frba.utn.edu.ar/) — no se sube ningún archivo. Opcionalmente, descargá el `.html` como respaldo o abrí una vista previa antes de usarlo.

## Deploy

Desplegado en Vercel (`vercel.json` incluido): <a href="https://mailing-sectip.vercel.app/" target="_blank" rel="noopener noreferrer">https://mailing-sectip.vercel.app/</a>
