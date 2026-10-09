import React from 'react';
import { Check } from 'lucide-react';

export const COLOR_OPTIONS = [
  { id: 'white', name: 'White', bgClass: 'bg-white', borderClass: 'border-gray-200', hex: '#ffffff' },
  { id: 'yellow', name: 'Light Yellow', bgClass: 'bg-amber-100/80', borderClass: 'border-amber-200', hex: '#fef3c7' },
  { id: 'green', name: 'Light Green', bgClass: 'bg-emerald-100/80', borderClass: 'border-emerald-200', hex: '#dcfce7' },
  { id: 'blue', name: 'Light Blue', bgClass: 'bg-sky-100/80', borderClass: 'border-sky-200', hex: '#e0f2fe' },
  { id: 'pink', name: 'Light Pink', bgClass: 'bg-pink-100/80', borderClass: 'border-pink-200', hex: '#fce7f3' },
  { id: 'purple', name: 'Light Purple', bgClass: 'bg-purple-100/80', borderClass: 'border-purple-200', hex: '#f3e8ff' },
];

export function getColorConfig(colorId) {
  return COLOR_OPTIONS.find((c) => c.id === colorId) || COLOR_OPTIONS[0];
}

export default function ColorPicker({ selectedColor, onSelectColor }) {
  return (
    <div className="flex items-center gap-1.5 py-1">
      <span className="text-xs font-medium text-gray-500 mr-1">Color:</span>
      {COLOR_OPTIONS.map((color) => {
        const isSelected = selectedColor === color.id;
        return (
          <button
            key={color.id}
            type="button"
            title={color.name}
            onClick={() => onSelectColor(color.id)}
            className={`w-6 h-6 rounded-full border ${color.borderClass} ${color.bgClass} transition-transform flex items-center justify-center focus:outline-none focus:ring-2 focus:ring-amber-400 ${
              isSelected ? 'scale-110 ring-2 ring-gray-400 ring-offset-1 shadow-sm' : 'hover:scale-105'
            }`}
            aria-label={`Select ${color.name} color`}
          >
            {isSelected && <Check className="w-3.5 h-3.5 text-gray-700" />}
          </button>
        );
      })}
    </div>
  );
}
