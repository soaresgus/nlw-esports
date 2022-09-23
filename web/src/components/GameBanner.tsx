interface IGameBannerProps {
  title: string;
  bannerUrl: string;
  adsCount: number;
}

export function GameBanner({ title, bannerUrl, adsCount }: IGameBannerProps) {
  return (
    <a href="#" className="relative rounded-lg overflow-hidden">
      <img src={bannerUrl} className="w-full h-full" />

      <div className="w-full pt-16 pb-4 px-4 bg-game-gradient absolute bottom-0 left-0">
        <strong className="font-bold text-white block">{title}</strong>
        <span className="text-sm text-zinc-300 block">
          {adsCount} anúncio{adsCount != 1 && 's'}
        </span>
      </div>
    </a>
  );
}
