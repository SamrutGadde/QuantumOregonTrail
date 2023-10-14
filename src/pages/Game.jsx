import React from 'react';
import ProgressBar from '../../components/ProgressBar';

export default function Game() {
  return (
    <div>
      <ProgressBar stage={[1, 2, 3]}/>

    </div>
  );
}