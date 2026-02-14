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
  const initializedRef = useRef(false);

  useEffect(() => {
    if (initializedRef.current) return;

    const checkStatus = () => {
      if (!adRef.current) return;

      // Google AdSense sets 'data-ad-status' attribute
      const googleStatus = adRef.current.getAttribute('data-ad-status');
      
      if (googleStatus === 'filled') {
        setStatus('filled');
      } else if (googleStatus === 'unfilled') {
        setStatus('unfilled');
      }
    };

    // Observe changes to the ad element's attributes
    const observer = new MutationObserver((mutations) => {
      mutations.forEach((mutation) => {
        if (mutation.type === 'attributes' && mutation.attributeName === 'data-ad-status') {
          checkStatus();
        }
      });
    });

    if (adRef.current) {
      observer.observe(adRef.current, { attributes: true });
    }

    try {
      // @ts-ignore
      const adsbygoogle = window.adsbygoogle || [];
      
      // If the script didn't load at all, it's likely blocked
      // @ts-ignore
      if (typeof window.adsbygoogle === 'undefined' || (Array.isArray(adsbygoogle) && adsbygoogle.length === 0 && !document.querySelector('script[src*="adsbygoogle.js"]'))) {
        setStatus('blocked');
      } else {
        adsbygoogle.push({});
        initializedRef.current = true;
      }
    } catch (e) {
      console.debug(`[AdBanner:${dataAdSlot}] AdSense initialization error:`, e);
      setStatus('blocked');
    }

    // Fallback: If after 5 seconds it's still "loading", check if it's actually blocked
    const timeout = setTimeout(() => {
      if (status === 'loading') {
        if (adRef.current && adRef.current.offsetHeight === 0) {
          setStatus('blocked');
        } else {
          checkStatus();
        }
      }
    }, 5000);

    return () => {
      observer.disconnect();
      clearTimeout(timeout);
    };
  }, [dataAdSlot, status]);

  return (
    <div className="my-8 flex flex-col items-center justify-center w-full min-h-[120px] transition-all duration-500">
      {/* Header Label - Only show if not definitively blocked */}
      {status !== 'blocked' && (
        <div className="flex items-center gap-2 mb-4 select-none opacity-20 hover:opacity-40 transition-opacity">
          <div className="h-[1px] w-6 bg-slate-500"></div>
          <span className="text-[9px] uppercase tracking-[0.3em] text-slate-400 font-bold">
            {status === 'loading' ? 'Checking Sponsorship' : 'Partner Support'}
          </span>
          <div className="h-[1px] w-6 bg-slate-500"></div>
        </div>
      )}
      
      <div className="w-full max-w-5xl flex items-center justify-center relative">
        {/* The Actual Ad */}
        <ins
          ref={adRef}
          className="adsbygoogle"
          style={{ 
            display: status === 'blocked' || status === 'unfilled' ? "none" : "block", 
            width: "100%",
            textAlign: "center",
            minHeight: "90px"
          }}
          data-ad-client="ca-pub-2514992641687016"
          data-ad-slot={dataAdSlot}
          data-ad-format={dataAdFormat}
          data-full-width-responsive={dataFullWidthResponsive.toString()}
        />

        {/* AdBlock Detected UI */}
        {status === 'blocked' && (
          <div className="p-6 border border-dashed border-slate-700 rounded-xl bg-slate-800/50 text-center animate-in fade-in zoom-in duration-300">
            <p className="text-slate-400 text-sm font-medium">
              Ads help us keep the servers running.
            </p>
            <p className="text-cyan-500 text-xs mt-1 font-bold uppercase tracking-wider">
              Please consider disabling your adblocker
            </p>
          </div>
        )}

        {/* Unfilled (No inventory) UI */}
        {status === 'unfilled' && (
          <div className="p-6 border border-slate-800 rounded-xl bg-slate-900/30 text-center">
            <p className="text-slate-500 text-xs italic">
              Space reserved for partners
            </p>
          </div>
        )}

        {/* Loading Spinner / Placeholder */}
        {status === 'loading' && (
          <div className="flex flex-col items-center gap-2 animate-pulse">
            <div className="w-8 h-8 border-2 border-cyan-500/20 border-t-cyan-500 rounded-full animate-spin"></div>
            <span className="text-[10px] text-slate-600 uppercase tracking-widest">Loading...</span>
          </div>
        )}
      </div>
    </div>
  );
};

export default AdBanner;