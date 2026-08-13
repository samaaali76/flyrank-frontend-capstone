'use client';

import { useRef, ReactNode, KeyboardEvent } from 'react';

export interface TabItem {
  id: string;
  label: string;
  content: ReactNode;
}

interface TabsProps {
  items: TabItem[];
  activeId: string;
  onChange: (id: string) => void;
  label: string;
}

export function Tabs({ items, activeId, onChange, label }: TabsProps) {
  const tabRefs = useRef<Record<string, HTMLButtonElement | null>>({});

  function focusTab(id: string) {
    tabRefs.current[id]?.focus();
    onChange(id);
  }

  function handleKeyDown(event: KeyboardEvent<HTMLButtonElement>, index: number) {
    const lastIndex = items.length - 1;

    switch (event.key) {
      case 'ArrowRight': {
        event.preventDefault();
        const nextIndex = index === lastIndex ? 0 : index + 1;
        focusTab(items[nextIndex].id);
        break;
      }
      case 'ArrowLeft': {
        event.preventDefault();
        const prevIndex = index === 0 ? lastIndex : index - 1;
        focusTab(items[prevIndex].id);
        break;
      }
      case 'Home': {
        event.preventDefault();
        focusTab(items[0].id);
        break;
      }
      case 'End': {
        event.preventDefault();
        focusTab(items[lastIndex].id);
        break;
      }
    }
  }

  const activeItem = items.find((item) => item.id === activeId);

  return (
    <div className="tabs">
      <div role="tablist" aria-label={label} className="tabs__list">
        {items.map((item, index) => {
          const isActive = item.id === activeId;
          return (
            <button
              key={item.id}
              ref={(el) => {
                tabRefs.current[item.id] = el;
              }}
              role="tab"
              id={`tab-${item.id}`}
              aria-selected={isActive}
              aria-controls={`panel-${item.id}`}
              tabIndex={isActive ? 0 : -1}
              className={`tabs__tab ${isActive ? 'is-active' : ''}`}
              onClick={() => onChange(item.id)}
              onKeyDown={(e) => handleKeyDown(e, index)}
            >
              {item.label}
            </button>
          );
        })}
      </div>

      {activeItem && (
        <div
          role="tabpanel"
          id={`panel-${activeItem.id}`}
          aria-labelledby={`tab-${activeItem.id}`}
          tabIndex={0}
          className="tabs__panel"
        >
          {activeItem.content}
        </div>
      )}
    </div>
  );
}