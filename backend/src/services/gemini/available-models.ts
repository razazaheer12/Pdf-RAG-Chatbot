export interface ModelOption {
  id: string;
  label: string;
}

export const AVAILABLE_MODELS: ModelOption[] = [
  { id: 'nvidia/nemotron-3-nano-30b-a3b:free', label: 'Nemotron Nano (Fast)' },
  { id: 'google/gemma-4-31b-it:free', label: 'Gemma 4 31B' },
  { id: 'openai/gpt-oss-20b:free', label: 'GPT-OSS 20B' },
  { id: 'nvidia/nemotron-3-super-120b-a12b:free', label: 'Nemotron Super (Large)' },
  { id: 'nvidia/nemotron-3-ultra-550b-a55b:free', label: 'Nemotron Ultra (Most Powerful)' },
];

export const DEFAULT_MODEL = AVAILABLE_MODELS[0].id;