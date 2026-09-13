import React from 'react';
import { TIERS, EXTRAS } from './bookingData';
import { money } from './bookingHelpers';
import { Sparkles } from 'lucide-react';

export default function ArtStep({ tier, extras, onSelectTier, onToggleExtra }) {
  return (
    <div className="animate-in fade-in duration-500">
      <div className="inline-block rounded-full bg-brand-pink/40 px-4 py-1 font-display text-sm font-semibold tracking-[.18em] uppercase text-brand-purple">
        Step two
      </div>
      <h2 className="mt-4 font-display text-[clamp(2rem,4vw,2.75rem)] leading-tight font-bold tracking-tight text-brand-charcoal">
        Adding any nail art?
      </h2>
      <p className="mt-3.5 max-w-lg text-base text-brand-charcoal/70">
        Art is added to a set, never booked on its own. Not sure which tier? Pick the closest — we sort it out in the chair.
      </p>
      <div className="mt-8 grid gap-3.5" style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(13rem, 1fr))' }}>
        {TIERS.map((t) => {
          const on = tier === t.id;
          return (
            <button
              key={t.id}
              type="button"
              onClick={() => onSelectTier(t.id)}
              className={`text-left rounded-2xl p-5 transition-all box-border border ${
                on ? 'border-brand-purple bg-brand-purple/[0.04] shadow-[0_0_0_3px_rgba(140,82,255,0.12)]' : 'border-[#E6E1EC] bg-white hover:border-brand-purple hover:-translate-y-0.5'
              }`}
            >
              <div className={`inline-flex items-center justify-center h-9 w-9 rounded-lg font-display text-sm font-bold ${on ? 'bg-brand-purple text-white' : 'bg-brand-pink/35 text-brand-purple'}`}>
                {t.num}
              </div>
              <div className="mt-4 flex items-baseline justify-between gap-2.5">
                <h4 className="font-display text-xl font-bold text-brand-charcoal">{t.n}</h4>
                <div className={`text-sm font-semibold flex-shrink-0 ${on ? 'text-brand-purple' : 'text-brand-charcoal/55'}`}>
                  {t.p ? '+' + money(t.p) : 'Included'}
                </div>
              </div>
              <p className="mt-2 text-[0.8438rem] leading-relaxed text-brand-charcoal/60">{t.t}</p>
            </button>
          );
        })}
      </div>
      <h3 className="mt-10 font-display text-[1.375rem] font-bold text-brand-charcoal">Little extras</h3>
      <div className="mt-4 flex flex-wrap gap-2.5">
        {EXTRAS.map((e) => {
          const on = extras.indexOf(e.id) > -1;
          return (
            <button
              key={e.id}
              type="button"
              onClick={() => onToggleExtra(e.id)}
              className={`inline-flex items-center rounded-full px-4.5 py-2.5 text-sm font-medium transition-all border ${
                on ? 'bg-brand-purple text-white border-brand-purple' : 'bg-white text-brand-charcoal border-[#E6E1EC] hover:border-brand-purple'
              }`}
            >
              {e.n}&nbsp;&nbsp;+{money(e.p)}
            </button>
          );
        })}
      </div>
      <div className="mt-8 rounded-2xl bg-brand-beige/60 border border-brand-pink/70 p-5 flex gap-3.5 items-start">
        <Sparkles className="w-4.5 h-4.5 text-brand-purple flex-shrink-0 mt-0.5" />
        <p className="text-sm leading-relaxed text-brand-charcoal/75">
          Got an inspo photo? Drop the link on the details step — it helps us confirm the right art tier before you arrive, so the price you see is the price you pay.
        </p>
      </div>
    </div>
  );
}
