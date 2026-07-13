import RichTextEditor from './RichTextEditor'

export default function SectionCard({ section, index, total, errors, onChange, onRemove, onMove }) {
  const { title, imageUrl, imageAlt, body, hasButton, buttonText, buttonHref } = section

  return (
    <div className="bg-white border border-gray-200 rounded-xl shadow-sm overflow-hidden">
      {/* Card header */}
      <div className="flex items-center gap-2 px-4 py-2.5 bg-gray-50 border-b border-gray-200">
        <span className="w-6 h-6 rounded-full bg-[#b71234] text-white text-xs font-bold flex items-center justify-center flex-shrink-0">
          {index + 1}
        </span>
        <span className="text-sm font-medium text-gray-600">
          {title.trim() || 'Sección sin título'}
        </span>
        <div className="flex-1" />
        <button
          onClick={() => onMove('up')}
          disabled={index === 0}
          className="w-7 h-7 flex items-center justify-center text-gray-400 hover:text-gray-700 disabled:opacity-25 rounded hover:bg-gray-100 transition-colors"
          title="Mover arriba"
        >
          ↑
        </button>
        <button
          onClick={() => onMove('down')}
          disabled={index === total - 1}
          className="w-7 h-7 flex items-center justify-center text-gray-400 hover:text-gray-700 disabled:opacity-25 rounded hover:bg-gray-100 transition-colors"
          title="Mover abajo"
        >
          ↓
        </button>
        {total > 1 && (
          <button
            onClick={onRemove}
            className="w-7 h-7 flex items-center justify-center text-gray-400 hover:text-red-500 rounded hover:bg-red-50 transition-colors ml-1"
            title="Eliminar sección"
          >
            ✕
          </button>
        )}
      </div>

      {/* Card body */}
      <div className="p-5 space-y-5">

        {/* Title */}
        <div>
          <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wide mb-1.5">
            Título <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            value={title}
            onChange={(e) => onChange({ title: e.target.value })}
            placeholder="Ej: Convocatoria PID UTN 2026"
            className={`w-full border rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 transition-colors ${
              errors.title
                ? 'border-red-400 focus:ring-red-200 focus:border-red-400'
                : 'border-gray-300 focus:ring-[#b71234]/30 focus:border-[#b71234]'
            }`}
          />
          {errors.title && <p className="mt-1 text-xs text-red-500">{errors.title}</p>}
        </div>

        {/* Image */}
        <div>
          <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wide mb-1.5">
            Imagen{' '}
            <span className="font-normal normal-case text-gray-400">(opcional — pegá la URL)</span>
          </label>
          <input
            type="url"
            value={imageUrl}
            onChange={(e) => onChange({ imageUrl: e.target.value })}
            placeholder="https://..."
            className={`w-full border rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 transition-colors ${
              errors.content || errors.imageUrl
                ? 'border-red-400 focus:ring-red-200 focus:border-red-400'
                : 'border-gray-300 focus:ring-[#b71234]/30 focus:border-[#b71234]'
            }`}
          />
          {errors.imageUrl && <p className="mt-1 text-xs text-red-500">{errors.imageUrl}</p>}
          {imageUrl.trim() && (
            <>
              <input
                type="text"
                value={imageAlt}
                onChange={(e) => onChange({ imageAlt: e.target.value })}
                placeholder="Descripción de la imagen (para lectores de pantalla)"
                className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm mt-2 focus:outline-none focus:ring-2 focus:ring-[#b71234]/30 focus:border-[#b71234] transition-colors"
              />
              <div className="mt-3 rounded-lg overflow-hidden border border-gray-200 bg-gray-50 p-2">
                <img
                  src={imageUrl}
                  alt={imageAlt || 'Preview'}
                  className="max-w-full max-h-40 mx-auto object-contain rounded"
                  onError={(e) => { e.target.style.display = 'none' }}
                  onLoad={(e) => { e.target.style.display = 'block' }}
                />
              </div>
            </>
          )}
        </div>

        {/* Body */}
        <div>
          <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wide mb-1.5">
            Texto{' '}
            <span className="font-normal normal-case text-gray-400">(opcional)</span>
          </label>
          <div className={errors.content ? 'rounded-lg ring-1 ring-red-400' : ''}>
            <RichTextEditor
              key={section.id}
              value={body}
              onChange={(val) => onChange({ body: val })}
            />
          </div>
          {errors.content && <p className="mt-1 text-xs text-red-500">{errors.content}</p>}
        </div>

        {/* Button */}
        <div>
          <label className="flex items-center gap-2 cursor-pointer select-none">
            <input
              type="checkbox"
              checked={hasButton}
              onChange={(e) => onChange({ hasButton: e.target.checked })}
              className="w-4 h-4 rounded accent-[#b71234] cursor-pointer"
            />
            <span className="text-sm font-medium text-gray-700">Agregar botón</span>
          </label>

          {hasButton && (
            <div className="mt-3 space-y-2 pl-6 border-l-2 border-[#b71234]/20">
              <div>
                <input
                  type="text"
                  value={buttonText}
                  onChange={(e) => onChange({ buttonText: e.target.value })}
                  placeholder="Texto del botón"
                  className={`w-full border rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 transition-colors ${
                    errors.buttonText
                      ? 'border-red-400 focus:ring-red-200 focus:border-red-400'
                      : 'border-gray-300 focus:ring-[#b71234]/30 focus:border-[#b71234]'
                  }`}
                />
                {errors.buttonText && <p className="mt-1 text-xs text-red-500">{errors.buttonText}</p>}
              </div>
              <div>
                <input
                  type="url"
                  value={buttonHref}
                  onChange={(e) => onChange({ buttonHref: e.target.value })}
                  placeholder="URL de destino (https://...)"
                  className={`w-full border rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 transition-colors ${
                    errors.buttonHref
                      ? 'border-red-400 focus:ring-red-200 focus:border-red-400'
                      : 'border-gray-300 focus:ring-[#b71234]/30 focus:border-[#b71234]'
                  }`}
                />
                {errors.buttonHref && <p className="mt-1 text-xs text-red-500">{errors.buttonHref}</p>}
              </div>
              {buttonText.trim() && (
                <div className="pt-1">
                  <span className="inline-block px-4 py-2 text-xs font-bold text-white bg-[#b71234] rounded">
                    {buttonText}
                  </span>
                </div>
              )}
            </div>
          )}
        </div>

      </div>
    </div>
  )
}
