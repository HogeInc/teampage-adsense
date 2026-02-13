import React, { useEffect, useRef } from 'react';

type AdBannerProps = {
  dataAdSlot: string;
  dataAdFormat?: string;
  dataFullWidthResponsive?: boolean;
};

const AdBanner: React.FC<AdBannerProps> = ({
  dataAdSlot,
  dataAdFormat = "auto",
  dataFullWidthResponsive = true,
}) => {
  const initializedRef = useRef(false);

  useEffect(() => {
    // Only push once per component mount
    if (initializedRef.current) return;

    try {
      // @ts-ignore
      const ads = window.adsbygoogle || [];
      ads.push({});
      initializedRef.current = true;
    } catch (e) {
      console.debug(`[AdBanner:${dataAdSlot}] AdSense push skipped or failed.`, e);
    }
  }, [dataAdSlot]);

  return (
    <div className="my-8 flex flex-col items-center justify-center w-full min-h-[100px]">
      <div className="flex items-center gap-2 mb-2 select-none opacity-10">
        <div className="h-[1px] w-4 bg-slate-500"></div>
        <span className="text-[8px] uppercase tracking-[0.4em] text-slate-500 font-bold">
          Advertisement
        </span>
        <div className="h-[1px] w-4 bg-slate-500"></div>
      </div>
      
      <div className="w-full max-w-5xl flex items-center justify-center overflow-hidden">
        <ins
          className="adsbygoogle"
          style={{ 
            display: "block", 
            width: "100%",
            textAlign: "center"
          }}
          data-ad-client="ca-pub-2514992641687016"
          data-ad-slot={dataAdSlot}
          data-ad-format={dataAdFormat}
          data-full-width-responsive={dataFullWidthResponsive.toString()}
        />
      </div>
    </div>
  );
};

export default AdBanner;