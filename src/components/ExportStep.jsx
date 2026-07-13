import { useState } from 'react'

export default function ExportStep({ html, onBack }) {
  const [copied, setCopied] = useState(false)

  function handleCopy() {
    navigator.clipboard.writeText(html).then(() => {
      setCopied(true)
      setTimeout(() => setCopied(false), 2500)
    })
  }

  function handleDownload() {
    const blob = new Blob([html], { type: 'text/html;charset=utf-8' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = 'mailing-sectip.html'
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
    URL.revokeObjectURL(url)
  }

  function handlePreview() {
    const blob = new Blob([html], { type: 'text/html' })
    const url = URL.createObjectURL(blob)
    window.open(url, '_blank')
  }

  return (
    <div className="space-y-6">
      {/* Main export card */}
      <div className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm">
        <h2 className="text-lg font-semibold text-gray-800 mb-1">Listo para exportar</h2>
        <p className="text-sm text-gray-500 mb-6">
          Copiá el HTML y pegalo en tu cliente de correo, o descargá el archivo .html.
        </p>

        <div className="flex flex-wrap gap-3">
          <button
            onClick={handleCopy}
            className={`flex items-center gap-2 px-5 py-2.5 rounded-lg font-semibold transition-all ${copied
                ? 'bg-green-600 text-white'
                : 'bg-[#b71234] text-white hover:bg-[#9a0f2a]'
              }`}
          >
            {copied ? '✓ ¡Copiado!' : 'Copiar HTML'}
          </button>

          <button
            onClick={handleDownload}
            className="flex items-center gap-2 px-5 py-2.5 bg-white border border-gray-300 text-gray-700 rounded-lg font-semibold hover:bg-gray-50 transition-colors"
          >
            Descargar .html
          </button>

          <button
            onClick={handlePreview}
            className="flex items-center gap-2 px-5 py-2.5 bg-white border border-gray-300 text-gray-700 rounded-lg font-semibold hover:bg-gray-50 transition-colors"
          >
            Vista previa ↗
          </button>
        </div>
      </div>

      {/* HTML code preview */}
      <div className="bg-white border border-gray-200 rounded-xl overflow-hidden shadow-sm">
        <div className="flex items-center justify-between px-4 py-2.5 bg-gray-50 border-b border-gray-200">
          <span className="text-xs font-semibold text-gray-500 uppercase tracking-wide">
            HTML generado
          </span>
          <span className="text-xs text-gray-400">{html.length.toLocaleString()} caracteres</span>
        </div>
        <pre className="p-4 text-xs text-gray-600 overflow-x-auto max-h-72 overflow-y-auto whitespace-pre-wrap font-mono leading-relaxed">
          {html}
        </pre>
      </div>

      <button
        onClick={onBack}
        className="flex items-center gap-1.5 text-sm text-gray-500 hover:text-[#b71234] transition-colors"
      >
        ← Volver a editar
      </button>
    </div>
  )
}
