'use client';

import { Disclosure } from './Disclosure/Disclosure';
import './Disclosure/Disclosure.css';

export default function DisclosureDemo() {
  return (
    <div style={{ padding: '40px' }}>
      <h1>Disclosure Playground</h1>
      <Disclosure id="1" summary="What is this project about?">
        <p>This is a skeleton portfolio site built with Next.js.</p>
      </Disclosure>
      <Disclosure id="2" summary="How do I contact you?">
        <p>A working contact form will be added in a future assignment.</p>
      </Disclosure>
      <Disclosure id="3" summary="What tech stack do you use?">
        <p>React, TypeScript, Next.js, and Tailwind CSS.</p>
      </Disclosure>
    </div>
  );
}