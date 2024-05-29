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
      <button title="Kakariko Village - The Legend of Zelda: A Link Between Worlds (Extended Music)" onClick={togglePlay}>
        {playing ? '🔇' : '🔊'}
      </button>
    </>
  );
};

export default BackgroundMusic;
