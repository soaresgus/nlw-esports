import './styles/global.css';

import LogoImg from './assets/logo.svg';

import { GameBanner } from './components/GameBanner';
import { CreateAdBanner } from './components/CreateAdBanner';
import { useEffect, useState } from 'react';

export function App() {
  const [] = useState();

  useEffect(() => {}, []);

  return (
    <div className="max-w-[1344px] mx-auto flex flex-col items-center my-20">
      <img src={LogoImg} />

      <h1 className="text-6xl text-white font-black mt-20">
        Seu{' '}
        <span className="text-transparent bg-nlw-gradient bg-clip-text">
          duo
        </span>{' '}
        está aqui.
      </h1>

      <div className="grid grid-cols-6 gap-6 mt-16">
        <GameBanner title="CS:GO" bannerUrl="/game-1.png" adsCount={1} />
      </div>

      <CreateAdBanner />
    </div>
  );
}
