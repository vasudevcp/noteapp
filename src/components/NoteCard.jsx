import React from 'react';
import { Pin, Pencil, Trash2 } from 'lucide-react';

export default function NoteCard({ note, onEdit, onDelete, onTogglePin }) {
  const formatDate = (isoString) => {
    if (!isoString) return '';
    const d = new Date(isoString);
    return d.toLocaleDateString(undefined, {
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  return (
    <div
      className={`group relative flex flex-col justify-between bg-white rounded-2xl p-4 border transition-all duration-200 hover:shadow-md ${
        note.isPinned ? 'border-amber-300 bg-amber-50/30' : 'border-slate-200 hover:border-slate-300'
      }`}
    >
      <div>
        {/* Top bar: Title & Pin button */}
        <div className="flex items-start justify-between gap-2 mb-2">
          {note.title ? (
            <h3 className="font-semibold text-slate-900 text-base leading-snug break-words">
              {note.title}
            </h3>
          ) : (
            <div />
          )}

          <button
            type="button"
            onClick={() => onTogglePin(note.id)}
            className={`p-1.5 rounded-lg transition-colors ${
              note.isPinned
                ? 'text-amber-600 bg-amber-100'
                : 'text-slate-300 hover:text-slate-600 hover:bg-slate-100 opacity-0 group-hover:opacity-100 sm:opacity-100'
            }`}
            title={note.isPinned ? 'Unpin note' : 'Pin note'}
          >
            <Pin className={`w-4 h-4 ${note.isPinned ? 'fill-amber-500' : ''}`} />
          </button>
        </div>

        {/* Note Body */}
        {note.content && (
          <p className="text-sm text-slate-700 whitespace-pre-wrap leading-relaxed break-words">
            {note.content}
          </p>
        )}
      </div>

      {/* Footer: Timestamp & Edit / Delete */}
      <div className="flex items-center justify-between pt-3 mt-3 border-t border-slate-100 text-xs text-slate-400">
        <span>{formatDate(note.updatedAt || note.createdAt)}</span>

        <div className="flex items-center gap-1 opacity-90 sm:opacity-0 group-hover:opacity-100 transition-opacity">
          <button
            type="button"
            onClick={() => onEdit(note)}
            className="p-1.5 text-slate-400 hover:text-indigo-600 hover:bg-indigo-50 rounded-lg transition-colors"
            title="Edit note"
          >
            <Pencil className="w-3.5 h-3.5" />
          </button>
          <button
            type="button"
            onClick={() => onDelete(note.id)}
            className="p-1.5 text-slate-400 hover:text-rose-600 hover:bg-rose-50 rounded-lg transition-colors"
            title="Delete note"
          >
            <Trash2 className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </div>
  );
}
