import React from 'react';
import CssBaseline from '@material-ui/core/CssBaseline';
import AudioPlayer from './AudioPlayer';

export default function HomePage() {
  return (
    <React.Fragment>
      <CssBaseline />
      <AudioPlayer></AudioPlayer>
    </React.Fragment>
  );
}