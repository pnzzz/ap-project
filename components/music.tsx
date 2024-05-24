'use client'

// components/BackgroundMusic.js
import { music } from '@/store/atom';
import { useAtom } from 'jotai';
import React, { useState } from 'react';

const BackgroundMusic = () => {
  const [playing, setPlaying] = useAtom(music);

  const togglePlay = () => {
    setPlaying(!playing);
  };

  return (
    <>
      <audio src={'/music.mp3'} autoPlay loop muted={playing} />
      <button onClick={togglePlay}>
        {playing ? '🔇' : '🔊'}
      </button>
    </>
  );
};

export default BackgroundMusic;
