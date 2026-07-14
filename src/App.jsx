import { useState } from "react";
import SectionCard from "./components/SectionCard";
import ExportStep from "./components/ExportStep";
import { generateHTML } from "./utils/generateHTML";
import { Analytics } from "@vercel/analytics/react";

function newSection() {
  return {
    id: crypto.randomUUID(),
    title: "",
    imageUrl: "",
    imageAlt: "",
    body: "",
    hasButton: false,
    buttonText: "",
    buttonHref: "",
  };
}

function isBodyEmpty(html) {
  if (!html || html.trim() === "") return true;
  return html.replace(/<[^>]*>/g, "").trim() === "";
}

function isValidHttpsUrl(value) {
  try {
    return new URL(value).protocol === "https:";
  } catch {
    return false;
  }
}

function validateSections(sections) {
  const errors = {};
  sections.forEach((s) => {
    const e = {};
    if (!s.title.trim()) e.title = "El título es obligatorio";
    if (!s.imageUrl.trim() && isBodyEmpty(s.body))
      e.content = "Ingresá al menos una imagen o texto";
    if (s.imageUrl.trim() && !isValidHttpsUrl(s.imageUrl.trim()))
      e.imageUrl = "La URL de la imagen debe ser válida y empezar con https://";
    if (s.imageUrl.trim() && !s.imageAlt.trim())
      e.imageAlt = "La descripción de la imagen es obligatoria";
    if (s.hasButton) {
      if (!s.buttonText.trim()) e.buttonText = "Ingresá el texto del botón";
      if (!s.buttonHref.trim()) e.buttonHref = "Ingresá la URL del botón";
      else if (!isValidHttpsUrl(s.buttonHref.trim()))
        e.buttonHref = "La URL debe ser válida y empezar con https://";
    }
    if (Object.keys(e).length > 0) errors[s.id] = e;
  });
  return errors;
}

export default function App() {
  const [step, setStep] = useState(1);
  const [sections, setSections] = useState([newSection()]);
  const [sectionErrors, setSectionErrors] = useState({});

  function updateSection(id, changes) {
    setSections((prev) =>
      prev.map((s) => (s.id === id ? { ...s, ...changes } : s)),
    );
    // clear errors for changed fields
    if (sectionErrors[id]) {
      setSectionErrors((prev) => {
        const updated = { ...prev[id] };
        Object.keys(changes).forEach((k) => {
          if (k === "title") delete updated.title;
          if (k === "imageUrl" || k === "body") delete updated.content;
          if (k === "imageUrl") delete updated.imageUrl;
          if (k === "imageUrl" || k === "imageAlt") delete updated.imageAlt;
          if (k === "buttonText") delete updated.buttonText;
          if (k === "buttonHref") delete updated.buttonHref;
        });
        return Object.keys(updated).length > 0
          ? { ...prev, [id]: updated }
          : (() => {
              const n = { ...prev };
              delete n[id];
              return n;
            })();
      });
    }
  }

  function addSection() {
    setSections((prev) => [...prev, newSection()]);
  }

  function removeSection(id) {
    setSections((prev) => prev.filter((s) => s.id !== id));
  }

  function moveSection(id, dir) {
    setSections((prev) => {
      const idx = prev.findIndex((s) => s.id === id);
      if (idx < 0) return prev;
      const swapIdx = dir === "up" ? idx - 1 : idx + 1;
      if (swapIdx < 0 || swapIdx >= prev.length) return prev;
      const next = [...prev];
      [next[idx], next[swapIdx]] = [next[swapIdx], next[idx]];
      return next;
    });
  }

  function handleGoToStep2() {
    const errors = validateSections(sections);
    if (Object.keys(errors).length > 0) {
      setSectionErrors(errors);
      return;
    }
    setSectionErrors({});
    setStep(2);
  }

  const html = generateHTML(sections);

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      {/* Header */}
      <header className="bg-[#b71234] text-white shadow-md">
        <div className="max-w-3xl mx-auto px-4 py-4 relative flex items-center justify-center">
          <div className="text-center">
            <h1 className="text-lg font-bold leading-tight">
              MAILING NOVEDADES
            </h1>
            <p className="text-sm opacity-75">SECTIP · UTN FRBA</p>
          </div>
        </div>
      </header>

      {/* Step indicator */}
      <div className="bg-white border-b border-gray-200 sticky top-0 z-10 shadow-sm">
        <div className="max-w-3xl mx-auto px-4 py-0">
          <div className="flex">
            <button
              onClick={() => setStep(1)}
              className={`px-5 py-3 text-sm font-semibold border-b-2 transition-colors ${
                step === 1
                  ? "border-[#b71234] text-[#b71234]"
                  : "border-transparent text-gray-400 hover:text-gray-600 cursor-pointer"
              }`}
            >
              1. Contenido
            </button>
            <button
              onClick={step === 1 ? handleGoToStep2 : undefined}
              className={`px-5 py-3 text-sm font-semibold border-b-2 transition-colors ${
                step === 2
                  ? "border-[#b71234] text-[#b71234]"
                  : "border-transparent text-gray-400 hover:text-gray-600 cursor-pointer"
              }`}
            >
              2. Exportar
            </button>
          </div>
        </div>
      </div>

      <main className="flex-1 max-w-3xl mx-auto px-4 py-8 w-full">
        {step === 1 ? (
          <>
            {/* Info banner */}
            <div className="mb-6 bg-blue-50 border border-blue-200 rounded-lg px-4 py-3 text-sm text-blue-800">
              <strong>
                El encabezado y el pie con las redes sociales son fijos.
              </strong>{" "}
              Acá editás solo el contenido del mailing. Podés agregar múltiples
              secciones con título, imagen, texto y botón.
            </div>

            <div className="space-y-4">
              {sections.map((section, idx) => (
                <SectionCard
                  key={section.id}
                  section={section}
                  index={idx}
                  total={sections.length}
                  errors={sectionErrors[section.id] || {}}
                  onChange={(changes) => updateSection(section.id, changes)}
                  onRemove={() => removeSection(section.id)}
                  onMove={(dir) => moveSection(section.id, dir)}
                />
              ))}
            </div>

            <div className="mt-6 flex items-center gap-3 flex-wrap">
              <button
                onClick={addSection}
                className="flex items-center gap-2 px-4 py-2.5 border-2 border-dashed border-gray-300 text-gray-500 rounded-lg text-sm hover:border-[#b71234] hover:text-[#b71234] transition-colors"
              >
                + Agregar sección
              </button>

              <div className="flex-1" />

              <button
                onClick={handleGoToStep2}
                className="px-6 py-2.5 bg-[#b71234] text-white rounded-lg font-semibold text-sm hover:bg-[#9a0f2a] transition-colors shadow-sm"
              >
                Siguiente →
              </button>
            </div>
          </>
        ) : (
          <ExportStep html={html} onBack={() => setStep(1)} />
        )}
      </main>

      <div className="flex justify-between px-4 py-3">
        <span className="text-xs text-black font-medium">
          v{__APP_VERSION__}
        </span>
        <a
          href="https://salvadorcastro.vercel.app/"
          target="_blank"
          rel="noreferrer"
          className="text-xs text-black font-medium hover:underline"
        >
          Desarrollado por salvaCastro
        </a>
      </div>
      <Analytics />
    </div>
  );
}
