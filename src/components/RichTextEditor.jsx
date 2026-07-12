import { useEditor, EditorContent } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'
import Underline from '@tiptap/extension-underline'

export default function RichTextEditor({ value, onChange }) {
  const editor = useEditor({
    extensions: [StarterKit, Underline],
    content: value || '',
    onUpdate({ editor }) {
      onChange(editor.getHTML())
    },
  })

  if (!editor) return null

  const btn = (active) =>
    `w-8 h-8 text-sm rounded flex items-center justify-center border transition-colors ${
      active
        ? 'bg-[#b71234] text-white border-[#b71234]'
        : 'bg-white text-gray-600 border-gray-300 hover:border-gray-400'
    }`

  return (
    <div className="border border-gray-300 rounded-lg overflow-hidden focus-within:ring-2 focus-within:ring-[#b71234]/30 focus-within:border-[#b71234] transition-colors">
      <div className="flex items-center gap-1 px-2 py-1.5 bg-gray-50 border-b border-gray-200">
        <button
          type="button"
          onMouseDown={(e) => { e.preventDefault(); editor.chain().focus().toggleBold().run() }}
          className={btn(editor.isActive('bold'))}
          title="Negrita (Ctrl+B)"
        >
          <strong>N</strong>
        </button>
        <button
          type="button"
          onMouseDown={(e) => { e.preventDefault(); editor.chain().focus().toggleItalic().run() }}
          className={btn(editor.isActive('italic'))}
          title="Cursiva (Ctrl+I)"
        >
          <em>I</em>
        </button>
        <button
          type="button"
          onMouseDown={(e) => { e.preventDefault(); editor.chain().focus().toggleUnderline().run() }}
          className={btn(editor.isActive('underline'))}
          title="Subrayado (Ctrl+U)"
        >
          <span className="underline">S</span>
        </button>
        <div className="w-px h-5 bg-gray-200 mx-1" />
        <span className="text-xs text-gray-400 ml-1 select-none">Podés pegar texto directamente</span>
      </div>
      <EditorContent
        editor={editor}
        className="px-3 py-2.5 text-sm text-gray-800"
      />
    </div>
  )
}
