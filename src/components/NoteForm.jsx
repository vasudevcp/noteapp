import React, { useState } from 'react';
import { Plus } from 'lucide-react';

export default function NoteForm({ onAddNote }) {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [isFocused, setIsFocused] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!content.trim() && !title.trim()) return;

    onAddNote({
      title: title.trim(),
      content: content.trim(),
    });

    setTitle('');
    setContent('');
    setIsFocused(false);
  };

  return (
    <form
      onSubmit={handleSubmit}
      className={`bg-white border rounded-2xl p-4 shadow-sm transition-all duration-200 max-w-xl mx-auto ${
        isFocused ? 'border-indigo-400 ring-4 ring-indigo-50 shadow-md' : 'border-slate-200 hover:border-slate-300'
      }`}
    >
      {/* Title Input (shows when focused or when title has content) */}
      {(isFocused || title) && (
        <input
          type="text"
          placeholder="Title (optional)"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          onFocus={() => setIsFocused(true)}
          className="w-full text-base font-semibold text-slate-800 placeholder-slate-400 border-none outline-none mb-2 bg-transparent"
        />
      )}

      {/* Content Input */}
      <textarea
        placeholder="Take a note..."
        value={content}
        onChange={(e) => setContent(e.target.value)}
        onFocus={() => setIsFocused(true)}
        rows={isFocused || content ? 3 : 1}
        className="w-full text-sm text-slate-700 placeholder-slate-400 border-none outline-none resize-none bg-transparent"
      />

      {/* Action Footer */}
      {(isFocused || content || title) && (
        <div className="flex items-center justify-end gap-2 pt-2 mt-2 border-t border-slate-100 animate-fadeIn">
          <button
            type="button"
            onClick={() => {
              setTitle('');
              setContent('');
              setIsFocused(false);
            }}
            className="px-3 py-1.5 text-xs font-medium text-slate-500 hover:text-slate-800 hover:bg-slate-100 rounded-lg transition-colors"
          >
            Cancel
          </button>
          <button
            type="submit"
            disabled={!content.trim() && !title.trim()}
            className="inline-flex items-center gap-1.5 px-4 py-1.5 bg-indigo-600 hover:bg-indigo-700 disabled:opacity-50 disabled:hover:bg-indigo-600 text-white rounded-lg text-xs font-semibold shadow-sm transition-all cursor-pointer"
          >
            <Plus className="w-3.5 h-3.5" />
            Add Note
          </button>
        </div>
      )}
    </form>
  );
}
