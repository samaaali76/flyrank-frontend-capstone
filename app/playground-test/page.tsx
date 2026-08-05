'use client';

import ModalDemo from '../../playground/demo';
import TabsDemo from '../../playground/tabs-demo';

export default function PlaygroundTestPage() {
  return (
    <div>
      <ModalDemo />
      <hr style={{ margin: '40px 0' }} />
      <TabsDemo />
    </div>
  );
}