import React, { useEffect, useRef } from 'react';
import useBookingState from './useBookingState';
import BookingStepper from './BookingStepper';
import ServiceStep from './ServiceStep';
import ArtStep from './ArtStep';
import WhenStep from './WhenStep';
import YouStep from './YouStep';
import ReviewStep from './ReviewStep';
import BookingSidebar from './BookingSidebar';
import BookingConfirm from './BookingConfirm';
import { RotateCcw } from 'lucide-react';

export default function BookingWizard() {
  const b = useBookingState();
  const rootRef = useRef(null);

  // Tell the parent Webflow page how tall this content is, so a fixed-height
  // iframe never clips the wizard. The Webflow embed's script listens for
  // this message and resizes the iframe to match (see the embed snippet).
  useEffect(() => {
    if (!rootRef.current || typeof window === 'undefined' || window.parent === window) return;
    const send = () => {
      const h = rootRef.current ? rootRef.current.scrollHeight : 0;
      window.parent.postMessage({ type: 'reign-booking-height', height: h }, '*');
    };
    send();
    const ro = new ResizeObserver(send);
    ro.observe(rootRef.current);
    window.addEventListener('resize', send);
    return () => {
      ro.disconnect();
      window.removeEventListener('resize', send);
    };
  }, [b.step, b.sent]);

  return (
    <div ref={rootRef}>
      <section className="bg-black">
        <div className="px-6 sm:px-10 lg:px-20 pt-8 sm:pt-10 pb-6">
          <div className="max-w-6xl mx-auto text-center">
            <div className="inline-block rounded-full bg-white/15 px-4 py-1 font-display text-sm font-semibold uppercase tracking-[.18em] text-brand-beige">
              Book in five steps
            </div>
          </div>
        </div>
        <div className="px-6 sm:px-10 lg:px-20 pb-8 sm:pb-12">
          <div className="max-w-6xl mx-auto overflow-x-auto">
            <BookingStepper step={b.step} maxStep={b.maxStep} sent={b.sent} onJump={b.goToStep} />
          </div>
        </div>
      </section>

      <section id="booking" className="bg-white scroll-mt-6">
        <div className="px-6 sm:px-10 lg:px-20 py-12 sm:py-20">
          <div className="max-w-6xl mx-auto">
            {b.sent ? (
              <BookingConfirm b={b} />
            ) : (
              <>
                {b.restored && (
                  <div className="mb-6 flex flex-wrap items-center gap-3 rounded-2xl border border-brand-purple/25 bg-brand-purple/[0.06] px-4.5 py-3.5">
                    <RotateCcw className="w-4 h-4 text-brand-purple flex-shrink-0" />
                    <div className="flex-1 min-w-[12rem] text-sm text-brand-charcoal">
                      We kept your place — {b.svc ? b.svc.n : 'your picks'} is still selected.
                    </div>
                    <button type="button" onClick={b.dismissResumed} className="text-[0.8125rem] font-semibold text-brand-purple underline">
                      Start over
                    </button>
                  </div>
                )}
                <div className="flex flex-wrap gap-8 items-start">
                  <div className="flex-1 min-w-0" style={{ flexBasis: '28rem' }}>
                    {b.step === 0 && <ServiceStep service={b.service} onSelect={b.selectService} />}
                    {b.step === 1 && (
                      <ArtStep tier={b.tier.id} extras={b.extras} onSelectTier={b.selectTier} onToggleExtra={b.toggleExtra} />
                    )}
                    {b.step === 2 && (
                      <WhenStep
                        monthOffset={b.monthOffset} date={b.date} slot={b.slot} dur={b.dur}
                        onMonthOffset={b.setMonthOffset} onSelectDate={b.selectDate} onSelectSlot={b.selectSlot}
                      />
                    )}
                    {b.step === 3 && (
                      <YouStep
                        name={b.name} phone={b.phone} inspo={b.inspo} notes={b.notes} firstTime={b.firstTime}
                        onName={b.setName} onPhone={b.setPhone} onInspo={b.setInspo} onNotes={b.setNotes} onFirstTime={b.setFirstTime}
                      />
                    )}
                    {b.step === 4 && <ReviewStep b={b} />}

                    <div className="mt-10 flex flex-wrap items-center gap-3 border-t border-[#E6E1EC] pt-6">
                      {b.step > 0 && (
                        <button
                          type="button" onClick={b.back}
                          className="inline-flex items-center justify-center rounded-full border border-[#E6E1EC] bg-white text-brand-charcoal px-7 py-3.5 text-[0.9375rem] font-medium hover:border-brand-purple hover:text-brand-purple"
                        >
                          Back
                        </button>
                      )}
                      <button
                        type="button" onClick={b.next} disabled={!b.canGo}
                        className={`inline-flex items-center justify-center rounded-full px-9 py-3.5 text-[0.9375rem] font-medium tracking-wide transition-all ${
                          b.canGo ? 'bg-brand-purple text-white cursor-pointer' : 'bg-[#EDE8F4] text-[#B4ABC4] cursor-not-allowed'
                        }`}
                      >
                        {b.step === 4 ? 'Send booking request' : 'Continue'}
                      </button>
                      {b.navHint && <div className="text-[0.8438rem] text-brand-charcoal/50">{b.navHint}</div>}
                    </div>
                  </div>

                  <BookingSidebar b={b} />
                </div>
              </>
            )}
          </div>
        </div>
      </section>
    </div>
  );
}
