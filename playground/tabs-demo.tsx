'use client';

import { useState } from 'react';
import { Tabs } from './Tabs/Tabs';
import './Tabs/Tabs.css';

export default function TabsDemo() {
  const [activeTab, setActiveTab] = useState('tab1');

  return (
    <div style={{ padding: '40px' }}>
      <h1>Tabs Playground</h1>
      <Tabs
        label="Example Tabs"
        activeId={activeTab}
        onChange={setActiveTab}
        items={[
          { id: 'tab1', label: 'First Tab', content: <p>Content for the first tab.</p> },
          { id: 'tab2', label: 'Second Tab', content: <p>Content for the second tab.</p> },
          { id: 'tab3', label: 'Third Tab', content: <p>Content for the third tab.</p> },
        ]}
      />
    </div>
  );
}