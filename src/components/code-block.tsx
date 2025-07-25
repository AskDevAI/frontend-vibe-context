'use client';

import CopyButton from './copy-button';

interface CodeBlockProps {
  code: string;
  className?: string;
}

export default function CodeBlock({ code, className = '' }: CodeBlockProps) {
  return (
    <div className={`relative bg-gray-900 text-white rounded-lg ${className}`}>
      <div className="absolute top-3 right-3 z-10">
        <CopyButton
          text={code}
          variant="ghost"
          color="default"
          className="text-gray-400 hover:text-white"
        />
      </div>
      <pre className="p-4 pr-12 text-sm overflow-x-auto">
        <code>{code}</code>
      </pre>
    </div>
  );
}