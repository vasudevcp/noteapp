import React from 'react';
import { Trash2, Filter, ArrowUpDown, Pin, Archive, Layers } from 'lucide-react';

export default function FilterBar({
  activeFilter,
  onFilterChange,
  sortBy,
  onSortChange,
  selectedCount = 0,
  onDeleteSelected,
  onDeselectAll,
  counts = { all: 0, pinned: 0, archived: 0 },
}) {
  return (
    <div className="w-full max-w-4xl mx-auto my-4 px-2">
      {selectedCount > 0 ? (
        /* Bulk Actions Banner */
        <div className="flex items-center justify-between bg-amber-50 border border-amber-200 rounded-lg p-3 shadow-xs animate-fadeIn">
          <div className="flex items-center gap-3">
            <span className="bg-amber-400 text-gray-900 font-bold px-2.5 py-0.5 rounded-full text-xs">
              {selectedCount}
            </span>
            <span className="text-sm font-medium text-amber-900">
              {selectedCount === 1 ? '1 note selected' : `${selectedCount} notes selected`}
            </span>
          </div>
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={onDeselectAll}
              className="px-3 py-1.5 text-xs font-medium text-gray-600 hover:text-gray-900 hover:bg-amber-100 rounded-md transition-colors"
            >
              Deselect All
            </button>
            <button
              type="button"
              onClick={onDeleteSelected}
              className="flex items-center gap-1.5 px-3 py-1.5 bg-red-600 hover:bg-red-700 text-white rounded-md text-xs font-medium transition-colors shadow-xs"
            >
              <Trash2 className="w-3.5 h-3.5" />
              Delete Selected ({selectedCount})
            </button>
          </div>
        </div>
      ) : (
        /* Standard Filter & Sort Controls */
        <div className="flex flex-wrap items-center justify-between gap-3 bg-white p-2.5 rounded-lg border border-gray-200 shadow-xs">
          {/* Filters */}
          <div className="flex items-center gap-1 overflow-x-auto pb-1 sm:pb-0">
            <button
              type="button"
              onClick={() => onFilterChange('all')}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-md text-xs font-medium transition-colors ${
                activeFilter === 'all'
                  ? 'bg-gray-800 text-white shadow-xs'
                  : 'text-gray-600 hover:bg-gray-100'
              }`}
            >
              <Layers className="w-3.5 h-3.5" />
              All Notes ({counts.all})
            </button>

            <button
              type="button"
              onClick={() => onFilterChange('pinned')}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-md text-xs font-medium transition-colors ${
                activeFilter === 'pinned'
                  ? 'bg-amber-500 text-white shadow-xs'
                  : 'text-gray-600 hover:bg-gray-100'
              }`}
            >
              <Pin className="w-3.5 h-3.5" />
              Pinned ({counts.pinned})
            </button>

            <button
              type="button"
              onClick={() => onFilterChange('archived')}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-md text-xs font-medium transition-colors ${
                activeFilter === 'archived'
                  ? 'bg-indigo-600 text-white shadow-xs'
                  : 'text-gray-600 hover:bg-gray-100'
              }`}
            >
              <Archive className="w-3.5 h-3.5" />
              Archived ({counts.archived})
            </button>
          </div>

          {/* Sort Dropdown */}
          <div className="flex items-center gap-2 ml-auto">
            <ArrowUpDown className="w-3.5 h-3.5 text-gray-400" />
            <span className="text-xs text-gray-500 hidden sm:inline font-medium">Sort:</span>
            <select
              value={sortBy}
              onChange={(e) => onSortChange(e.target.value)}
              className="text-xs bg-gray-50 border border-gray-300 text-gray-700 rounded-md py-1.5 px-2.5 focus:ring-1 focus:ring-amber-500 focus:border-amber-500 focus:outline-none"
            >
              <option value="newest">Newest first</option>
              <option value="oldest">Oldest first</option>
              <option value="title-asc">Title A–Z</option>
              <option value="title-desc">Title Z–A</option>
            </select>
          </div>
        </div>
      )}
    </div>
  );
}
