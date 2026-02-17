import React, { useEffect, useRef, useState } from 'react';

type AdBannerProps = {
  dataAdSlot: string;
  dataAdFormat?: string;
  dataFullWidthResponsive?: boolean;
};

type AdStatus = 'loading' | 'filled' | 'unfilled' | 'blocked';

const AdBanner: React.FC<AdBannerProps> = ({
  dataAdSlot,
  dataAdFormat = "auto",
  dataFullWidthResponsive = true,
}) => {
  const [status, setStatus] = useState<AdStatus>('loading');
  const adRef = useRef<HTMLModElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const initializedRef = useRef(false);

  useEffect(() => {
    if (initializedRef.current) return;

    const checkAdStatus = () => {
      if (!adRef.current) return;
      const googleStatus = adRef.current.getAttribute('data-ad-status');
      
      if (googleStatus === 'filled') {
        setStatus('filled');
        return true;
      } else if (googleStatus === 'unfilled') {
        setStatus('unfilled');
        return true;
      }
      return false;
    };

    const observer = new MutationObserver((mutations) => {
      for (const mutation of mutations) {
        if (mutation.type === 'attributes' && mutation.attributeName === 'data-ad-status') {
          if (checkAdStatus()) {
            observer.disconnect();
          }
        }
      }
    });

    if (adRef.current) {
      observer.observe(adRef.current, { attributes: true });
    }

    const initAd = () => {
      // CRITICAL FIX: Ensure container has width before pushing to prevent availableWidth=0 error
      if (!containerRef.current || containerRef.current.offsetWidth === 0) {
        requestAnimationFrame(initAd);
        return;
      }

      try {
        // @ts-ignore
        (window.adsbygoogle = window.adsbygoogle || []).push({});
        initializedRef.current = true;
        checkAdStatus();
      } catch (e) {
        console.debug(`[AdBanner:${dataAdSlot}] AdSense push error:`, e);
      }
    };

    // Use a slight delay to allow layout to settle in SPA transitions
    const timer = setTimeout(initAd, 50);

    const statusCheckInterval = setInterval(() => {
      if (checkAdStatus()) {
        clearInterval(statusCheckInterval);
      }
    }, 1000);

    const blockCheckTimeout = setTimeout(() => {
      // @ts-ignore
      const reallyLoaded = window.adsbygoogle && window.adsbygoogle.loaded === true;
      const isFilled = adRef.current?.getAttribute('data-ad-status') === 'filled';
      
      if (!reallyLoaded && !isFilled && status === 'loading') {
        setStatus('blocked');
        clearInterval(statusCheckInterval);
      }
    }, 8000);

    const finalCheckTimeout = setTimeout(() => {
      if (status === 'loading') {
        if (!checkAdStatus()) {
          setStatus('unfilled');
        }
        clearInterval(statusCheckInterval);
      }
    }, 12000);

    return () => {
      clearTimeout(timer);
      observer.disconnect();
      clearInterval(statusCheckInterval);
      clearTimeout(blockCheckTimeout);
      clearTimeout(finalCheckTimeout);
    };
  }, [dataAdSlot, status]);

  return (
    <div className="my-8 flex flex-col items-center justify-center w-full min-h-[120px] transition-all duration-500 overflow-hidden">
      {/* Label */}
      {(status === 'loading' || status === 'filled') && (
        <div className="flex items-center gap-2 mb-4 select-none opacity-20 hover:opacity-40 transition-opacity">
          <div className="h-[1px] w-6 bg-slate-500"></div>
          <span className="text-[9px] uppercase tracking-[0.3em] text-slate-400 font-bold">
            {status === 'loading' ? 'Checking Sponsorship' : 'Partner Support'}
          </span>
          <div className="h-[1px] w-6 bg-slate-500"></div>
        </div>
      )}
      
      {/* Container Ref used to verify width calculation */}
      <div 
        ref={containerRef}
        className="w-full max-w-5xl relative min-h-[90px] block"
        style={{ width: '100%', minWidth: '250px' }}
      >
        {/* The AdSense Element */}
        <ins
          ref={adRef}
          className="adsbygoogle"
          style={{ 
            display: (status === 'blocked' || status === 'unfilled') ? "none" : "block", 
            width: "100%",
            textAlign: "center",
            minHeight: status === 'filled' ? "90px" : "1px",
            opacity: status === 'filled' ? 1 : 0,
            transition: 'opacity 0.4s ease'
          }}
          data-ad-client="ca-pub-2514992641687016"
          data-ad-slot={dataAdSlot}
          data-ad-format={dataAdFormat}
          data-full-width-responsive={dataFullWidthResponsive.toString()}
        />

        {/* Loading Spinner */}
        {status === 'loading' && (
          <div className="absolute inset-0 flex flex-col items-center justify-center gap-3 animate-pulse bg-slate-900/50 rounded-xl z-10 p-4">
            <div className="relative flex items-center justify-center">
              <div className="w-8 h-8 border-2 border-cyan-500/10 rounded-full"></div>
              <div className="absolute top-0 left-0 w-8 h-8 border-2 border-transparent border-t-cyan-500 rounded-full animate-spin"></div>
            </div>
            <span className="text-[10px] text-slate-500 uppercase tracking-[0.2em] font-bold">Syncing Network...</span>
          </div>
        )}

        {/* AdBlock Detected UI */}
        {status === 'blocked' && (
          <div className="p-6 border border-dashed border-slate-700 rounded-xl bg-slate-800/30 text-center animate-in fade-in zoom-in duration-300 w-full max-w-md mx-auto">
            <p className="text-slate-400 text-xs font-medium">
              Help keep this project decentralized.
            </p>
            <p className="text-cyan-500 text-[10px] mt-1 font-bold uppercase tracking-wider">
              Please consider white-listing our ads
            </p>
          </div>
        )}

        {/* Unfilled UI */}
        {status === 'unfilled' && (
          <div className="p-4 border border-slate-800/50 rounded-xl bg-slate-900/10 text-center w-full max-w-md mx-auto">
            <p className="text-slate-700 text-[10px] italic">
              Space reserved for community partners
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default AdBanner;