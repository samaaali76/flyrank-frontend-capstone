'use client';
import { useState } from 'react';
import { Modal } from './Modal/Modal';
import './Modal/Modal.css';

export default function ModalDemo() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div style={{ padding: '40px' }}>
      <h1>Modal Playground</h1>
      <button type="button" onClick={() => setIsOpen(true)}>
        Open Modal
      </button>

      <Modal
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        titleId="demo-modal-title"
        title="Example Modal"
      >
        <p>This is the modal content.</p>
        <input type="text" placeholder="Try tabbing here" />
        <br />
        <br />
        <button type="button" onClick={() => setIsOpen(false)}>
          Close
        </button>
      </Modal>
    </div>
  );
}