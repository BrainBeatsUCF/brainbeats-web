import React from 'react';
import Beat from './Beat';
import PublicBeat from './PublicBeat';
import PublicSample from './PublicSample';

export default function HomePage() {
  return (
    <div style={{backgroundColor: '#292423'}}>
      <Beat />
      <PublicSample />
      <PublicBeat />
    </div>
  );
}
