import React from 'react';
import NoteCard from './NoteCard';
import { StickyNote, SearchX } from 'lucide-react';

export default function NoteList({ notes, searchTerm, onEdit, onDelete, onTogglePin }) {
  // Filter notes by search term
  const filteredNotes = notes.filter((note) => {
    if (!searchTerm.trim()) return true;
    const term = searchTerm.toLowerCase();
    const titleMatch = note.title?.toLowerCase().includes(term);
    const contentMatch = note.content?.toLowerCase().includes(term);
    return titleMatch || contentMatch;
  });

  const pinnedNotes = filteredNotes.filter((n) => n.isPinned);
  const unpinnedNotes = filteredNotes.filter((n) => !n.isPinned);

  if (filteredNotes.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-16 text-slate-400">
        {searchTerm ? (
          <>
            <SearchX className="w-12 h-12 stroke-[1.5] mb-3 text-slate-300" />
            <p className="text-base font-medium text-slate-600">No matching notes found</p>
            <p className="text-xs text-slate-400 mt-1">Try a different search term</p>
          </>
        ) : (
          <>
            <StickyNote className="w-12 h-12 stroke-[1.5] mb-3 text-slate-300" />
            <p className="text-base font-medium text-slate-600">No notes yet</p>
            <p className="text-xs text-slate-400 mt-1">Create your first note above to get started!</p>
          </>
        )}
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Pinned Section */}
      {pinnedNotes.length > 0 && (
        <div>
          <h2 className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-3 px-1">
            Pinned Notes ({pinnedNotes.length})
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {pinnedNotes.map((note) => (
              <NoteCard
                key={note.id}
                note={note}
                onEdit={onEdit}
                onDelete={onDelete}
                onTogglePin={onTogglePin}
              />
            ))}
          </div>
        </div>
      )}

      {/* Others / All Notes Section */}
      {unpinnedNotes.length > 0 && (
        <div>
          {pinnedNotes.length > 0 && (
            <h2 className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-3 px-1">
              Others
            </h2>
          )}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {unpinnedNotes.map((note) => (
              <NoteCard
                key={note.id}
                note={note}
                onEdit={onEdit}
                onDelete={onDelete}
                onTogglePin={onTogglePin}
              />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
