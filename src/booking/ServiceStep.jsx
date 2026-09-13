import React from 'react';
import { GROUPS, PEDI_INCLUDES } from './bookingData';
import { money, fmtDur } from './bookingHelpers';

export default function ServiceStep({ service, onSelect }) {
  return (
    <div className="animate-in fade-in duration-500">
      <div className="inline-block rounded-full bg-brand-pink/40 px-4 py-1 font-display text-sm font-semibold tracking-[.18em] uppercase text-brand-purple">
        Step one
      </div>
      <h2 className="mt-4 font-display text-[clamp(2rem,4vw,2.75rem)] leading-tight font-bold tracking-tight text-brand-charcoal">
        What are we doing today?
      </h2>
      <p className="mt-3.5 max-w-lg text-base text-brand-charcoal/70">
        New set prices start at the listed rate. Nail art is added on the next step, so pick your base service here.
      </p>
      {GROUPS.map((g) => (
        <div key={g.g} className="mt-10">
          <div className="flex items-baseline justify-between gap-4 border-b border-[#E6E1EC] pb-2.5">
            <h3 className="font-display text-[1.375rem] font-bold tracking-tight text-brand-charcoal">{g.g}</h3>
            <div className="text-xs font-semibold uppercase tracking-[.16em] text-brand-charcoal/45">
              {g.items.length} option{g.items.length === 1 ? '' : 's'}
            </div>
          </div>
          {g.g === 'Pedicure' && (
            <p className="mt-3.5 text-[0.8438rem] italic leading-relaxed text-brand-charcoal/60">{PEDI_INCLUDES}</p>
          )}
          <div className="mt-4.5 grid gap-3.5" style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(14.5rem, 1fr))' }}>
            {g.items.map((s) => {
              const on = service === s.id;
              return (
                <button
                  key={s.id}
                  type="button"
                  onClick={() => onSelect(s.id)}
                  aria-label={(on ? 'Selected: ' : 'Choose ') + s.n + ', ' + money(s.p)}
                  className={`text-left rounded-2xl p-5 transition-all box-border border ${
                    on ? 'border-brand-purple bg-brand-purple/[0.04] shadow-[0_0_0_3px_rgba(140,82,255,0.12)]' : 'border-[#E6E1EC] bg-white hover:border-brand-purple hover:-translate-y-0.5'
                  }`}
                >
                  <div className="flex items-start justify-between gap-3">
                    <h4 className="font-display text-[1.1875rem] font-bold leading-tight text-brand-charcoal">{s.n}</h4>
                    <div className={`font-display text-xl font-bold flex-shrink-0 ${on ? 'text-brand-purple' : 'text-brand-charcoal'}`}>{money(s.p)}</div>
                  </div>
                  {s.t && <p className="mt-2 text-[0.8438rem] leading-relaxed text-brand-charcoal/60">{s.t}</p>}
                  <div className="mt-3.5 flex items-center justify-between gap-2.5">
                    <div className="inline-flex items-center gap-1.5 text-[0.7812rem] text-brand-charcoal/50">about {fmtDur(s.d)}</div>
                    {on && (
                      <span className="inline-flex items-center gap-1 rounded-full bg-brand-purple text-white px-2.5 py-0.5 text-[0.6875rem] font-semibold uppercase tracking-wider">
                        Selected
                      </span>
                    )}
                  </div>
                </button>
              );
            })}
          </div>
        </div>
      ))}
    </div>
  );
}
