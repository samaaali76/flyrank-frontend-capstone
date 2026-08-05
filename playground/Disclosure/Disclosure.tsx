'use client';

import { useState, ReactNode } from 'react';

interface DisclosureProps {
  summary: string;
  children: ReactNode;
  id: string;
}

export function Disclosure({ summary, children, id }: DisclosureProps) {
  const [isOpen, setIsOpen] = useState(false);
  const contentId = `disclosure-content-${id}`;

  return (
    <div className="disclosure">
      <button
        type="button"
        aria-expanded={isOpen}
        aria-controls={contentId}
        className="disclosure__trigger"
        onClick={() => setIsOpen((open) => !open)}
      >
        <span className={`disclosure__icon ${isOpen ? 'is-open' : ''}`} aria-hidden="true">
          ▶
        </span>
        {summary}
      </button>

      {isOpen && (
        <div id={contentId} className="disclosure__content">
          {children}
        </div>
      )}
    </div>
  );
}