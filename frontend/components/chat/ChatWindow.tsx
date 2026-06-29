'use client';
import { useEffect, useRef } from 'react';
import { useChat } from '@/hooks/useChat';
import { useModels } from '@/hooks/useModels';
import MessageBubble from './MessageBubble';
import MessageInput from './MessageInput';
import TypingIndicator from './TypingIndicator';
import ModelSelector from './ModelSelector';

interface Props {
  namespace: string;
  pdfName: string;
}

export default function ChatWindow({ namespace, pdfName }: Props) {
  const { messages, isStreaming, sendMessage } = useChat(namespace);
  const { models, selectedModel, setSelectedModel } = useModels();
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isStreaming]);

  const handleSend = (question: string) => {
    sendMessage(question, selectedModel);
  };

  return (
    <div className="flex flex-col h-full">
      {/* Header */}
      <div className="px-4 md:px-6 py-4 border-b border-gray-800 bg-gray-950 pl-14 md:pl-6 flex items-center justify-between gap-3">
        <div className="min-w-0">
          <h2 className="text-white font-semibold text-sm truncate">{pdfName}</h2>
          <p className="text-gray-500 text-xs mt-0.5">Ask anything about this document</p>
        </div>
        <div className="w-44 shrink-0">
          <ModelSelector
            models={models}
            selectedModel={selectedModel}
            onChange={setSelectedModel}
            disabled={isStreaming}
          />
        </div>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto px-3 md:px-6 py-4 md:py-6 space-y-4 md:space-y-6">
        {messages.map((msg) => (
          <MessageBubble key={msg.id} message={msg} />
        ))}
        {isStreaming && messages[messages.length - 1]?.content === '' && (
          <TypingIndicator />
        )}
        <div ref={bottomRef} />
      </div>

      {/* Input */}
      <MessageInput onSend={handleSend} disabled={isStreaming} />
    </div>
  );
}