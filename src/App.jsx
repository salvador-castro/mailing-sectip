import { useState } from 'react'
import SectionCard from './components/SectionCard'
import ExportStep from './components/ExportStep'
import { generateHTML } from './utils/generateHTML'

function newSection() {
  return {
    id: crypto.randomUUID(),
    title: '',
    imageUrl: '',
    imageAlt: '',
    body: '',
    hasButton: false,
    buttonText: 'Más información',
    buttonHref: '',
  }
}

export default function App() {
  const [step, setStep] = useState(1)
  const [sections, setSections] = useState([newSection()])

  function updateSection(id, changes) {
    setSections((prev) => prev.map((s) => (s.id === id ? { ...s, ...changes } : s)))
  }

  function addSection() {
    setSections((prev) => [...prev, newSection()])
  }

  function removeSection(id) {
    setSections((prev) => prev.filter((s) => s.id !== id))
  }

  function moveSection(id, dir) {
    setSections((prev) => {
      const idx = prev.findIndex((s) => s.id === id)
      if (idx < 0) return prev
      const swapIdx = dir === 'up' ? idx - 1 : idx + 1
      if (swapIdx < 0 || swapIdx >= prev.length) return prev
      const next = [...prev]
      ;[next[idx], next[swapIdx]] = [next[swapIdx], next[idx]]
      return next
    })
  }

  const html = generateHTML(sections)

  return (
    <div className="min-h-screen bg-gray-50">

      {/* Header */}
      <header className="bg-[#b71234] text-white shadow-md">
        <div className="max-w-3xl mx-auto px-4 py-4 flex items-center gap-4">
          <div>
            <h1 className="text-lg font-bold leading-tight">Editor de Mailing</h1>
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
                  ? 'border-[#b71234] text-[#b71234]'
                  : 'border-transparent text-gray-400 hover:text-gray-600 cursor-pointer'
              }`}
            >
              1. Contenido
            </button>
            <button
              onClick={() => setStep(2)}
              className={`px-5 py-3 text-sm font-semibold border-b-2 transition-colors ${
                step === 2
                  ? 'border-[#b71234] text-[#b71234]'
                  : 'border-transparent text-gray-400 hover:text-gray-600 cursor-pointer'
              }`}
            >
              2. Exportar
            </button>
          </div>
        </div>
      </div>

      <main className="max-w-3xl mx-auto px-4 py-8">

        {step === 1 ? (
          <>
            {/* Info banner */}
            <div className="mb-6 bg-blue-50 border border-blue-200 rounded-lg px-4 py-3 text-sm text-blue-800">
              <strong>El encabezado y el pie con las redes sociales son fijos.</strong>{' '}
              Acá editás solo el contenido del mailing. Podés agregar múltiples secciones con título, imagen, texto y botón.
            </div>

            <div className="space-y-4">
              {sections.map((section, idx) => (
                <SectionCard
                  key={section.id}
                  section={section}
                  index={idx}
                  total={sections.length}
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
                onClick={() => setStep(2)}
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
    </div>
  )
}
