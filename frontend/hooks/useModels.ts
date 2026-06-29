import { useState, useEffect } from 'react';
import { ModelOption } from '@/types';

export function useModels() {
  const [models, setModels] = useState<ModelOption[]>([]);
  const [selectedModel, setSelectedModel] = useState<string>('');

  useEffect(() => {
    fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/chat/models`)
      .then((res) => res.json())
      .then((data: ModelOption[]) => {
        setModels(data);
        if (data.length > 0) setSelectedModel(data[0].id);
      })
      .catch(() => {});
  }, []);

  return { models, selectedModel, setSelectedModel };
}