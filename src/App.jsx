import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import NoteForm from './components/NoteForm';
import NoteList from './components/NoteList';
import EditModal from './components/EditModal';

const STORAGE_KEY = 'super_basic_notes_v1';

const INITIAL_NOTES = [
  {
    id: 'starter-1',
    title: 'Welcome to Notes! 📝',
    content: 'A super simple note-taking app. Create, edit, and organize your notes effortlessly.',
    isPinned: true,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: 'starter-2',
    title: 'Quick Tip 💡',
    content: 'All your notes are automatically saved to your browser local storage.',
    isPinned: false,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
];

export default function App() {
  const [notes, setNotes] = useState(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) return JSON.parse(saved);
    } catch (e) {
      console.error('Error loading notes from localStorage', e);
    }
    return INITIAL_NOTES;
  });

  const [searchTerm, setSearchTerm] = useState('');
  const [editingNote, setEditingNote] = useState(null);

  // Sync to local storage
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(notes));
    } catch (e) {
      console.error('Error saving notes to localStorage', e);
    }
  }, [notes]);

  // Add Note
  const handleAddNote = ({ title, content }) => {
    const newNote = {
      id: 'note-' + Date.now(),
      title,
      content,
      isPinned: false,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
    setNotes((prev) => [newNote, ...prev]);
  };

  // Update Note
  const handleSaveEditedNote = (id, updatedFields) => {
    setNotes((prev) =>
      prev.map((n) =>
        n.id === id
          ? {
              ...n,
              ...updatedFields,
              updatedAt: new Date().toISOString(),
            }
          : n
      )
    );
  };

  // Delete Note
  const handleDeleteNote = (id) => {
    setNotes((prev) => prev.filter((n) => n.id !== id));
  };

  // Toggle Pin
  const handleTogglePin = (id) => {
    setNotes((prev) =>
      prev.map((n) =>
        n.id === id
          ? { ...n, isPinned: !n.isPinned, updatedAt: new Date().toISOString() }
          : n
      )
    );
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-800 flex flex-col font-sans">
      {/* Header */}
      <Header
        searchTerm={searchTerm}
        onSearchChange={setSearchTerm}
        totalNotes={notes.length}
      />

      {/* Main Content Area */}
      <main className="flex-1 max-w-5xl w-full mx-auto px-4 sm:px-8 py-8 space-y-8">
        {/* Create Note Form */}
        <NoteForm onAddNote={handleAddNote} />

        {/* Note List */}
        <NoteList
          notes={notes}
          searchTerm={searchTerm}
          onEdit={(note) => setEditingNote(note)}
          onDelete={handleDeleteNote}
          onTogglePin={handleTogglePin}
        />
      </main>

      {/* Edit Note Modal */}
      <EditModal
        note={editingNote}
        isOpen={!!editingNote}
        onClose={() => setEditingNote(null)}
        onSave={handleSaveEditedNote}
      />
    </div>
  );
}
