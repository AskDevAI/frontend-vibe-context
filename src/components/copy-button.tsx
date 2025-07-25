'use client';

import { useState } from 'react';
import { Button } from '@heroui/react';
import { Copy, Check } from 'lucide-react';

interface CopyButtonProps {
  text: string;
  size?: 'sm' | 'md' | 'lg';
  variant?: 'light' | 'solid' | 'bordered' | 'flat' | 'faded' | 'shadow' | 'ghost';
  color?: 'default' | 'primary' | 'secondary' | 'success' | 'warning' | 'danger';
  className?: string;
  showText?: boolean;
}

export default function CopyButton({
  text,
  size = 'sm',
  variant = 'light',
  color = 'default',
  className = '',
  showText = false
}: CopyButtonProps) {
  const [copied, setCopied] = useState(false);

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy text: ', err);
    }
  };

  return (
    <Button
      isIconOnly={!showText}
      size={size}
      variant={variant}
      color={copied ? 'success' : color}
      onPress={copyToClipboard}
      className={className}
      startContent={copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
    >
      {showText && (copied ? 'Copied!' : 'Copy')}
    </Button>
  );
}