'use client';
import { ChevronDown, Cpu } from 'lucide-react';
import { ModelOption } from '@/types';

interface Props {
  models: ModelOption[];
  selectedModel: string;
  onChange: (modelId: string) => void;
  disabled?: boolean;
}

export default function ModelSelector({ models, selectedModel, onChange, disabled }: Props) {
  if (models.length === 0) return null;

  return (
    <div className="relative">
      <div className="flex items-center gap-2 bg-gray-800 border border-gray-700 rounded-lg px-3 py-2">
        <Cpu className="w-3.5 h-3.5 text-violet-400 shrink-0" />
        <select
          value={selectedModel}
          onChange={(e) => onChange(e.target.value)}
          disabled={disabled}
          className="
            bg-transparent text-gray-200 text-xs outline-none
            appearance-none pr-5 cursor-pointer disabled:opacity-50
            disabled:cursor-not-allowed w-full
          "
        >
          {models.map((m) => (
            <option key={m.id} value={m.id} className="bg-gray-800 text-white">
              {m.label}
            </option>
          ))}
        </select>
        <ChevronDown className="w-3.5 h-3.5 text-gray-500 absolute right-3 pointer-events-none" />
      </div>
    </div>
  );
}