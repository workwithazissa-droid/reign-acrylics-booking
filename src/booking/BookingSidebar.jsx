import React from 'react';
import { Phone } from 'lucide-react';

export default function BookingSidebar({ b }) {
  const rows = [
    { k: 'Service', v: b.svc ? b.svc.n : 'Pick a service' },
    { k: 'Nail art', v: b.tier.p ? `${b.tier.n} (+$${b.tier.p})` : 'No art' },
    { k: 'Extras', v: b.extrasText },
    { k: 'When', v: b.timeText },
    { k: 'Time needed', v: b.durText },
  ];
  const isMuted = (v) => v.startsWith('Pick a') || v === 'Not chosen yet' || v === '—';

  return (
    <aside className="flex-none w-full lg:w-72 lg:min-w-[15rem] lg:sticky lg:top-6 self-start">
      <div className="border border-[#E6E1EC] rounded-2xl bg-white overflow-hidden">
        <div className="bg-black px-5 py-4.5">
          <div className="text-[0.6875rem] font-semibold uppercase tracking-[.18em] text-brand-pink">Your booking</div>
          <div className="mt-1 font-display text-[1.375rem] font-bold text-white">{b.svc ? b.svc.n : 'Nothing picked yet'}</div>
        </div>
        <div className="p-5">
          {rows.map((r) => (
            <div key={r.k} className="flex items-baseline justify-between gap-3 py-2 border-b border-[#F1EDF7]">
              <div className="text-[0.8125rem] text-brand-charcoal/55">{r.k}</div>
              <div className={`text-sm font-semibold text-right ${isMuted(r.v) ? 'text-brand-charcoal/40' : 'text-brand-charcoal'}`}>{r.v}</div>
            </div>
          ))}
          <div className="flex items-baseline justify-between gap-3 pt-4">
            <div className="text-[0.9375rem] font-semibold text-brand-charcoal">Estimated</div>
            <div className="font-display text-[1.75rem] font-bold leading-none text-brand-purple">{b.totalLabel}</div>
          </div>
          <p className="mt-3 text-xs leading-relaxed text-brand-charcoal/50">Final cost depends on design and add-ons. Nothing is charged online.</p>
        </div>
        <div className="border-t border-[#E6E1EC] bg-brand-beige/45 px-5 py-4.5">
          <div className="text-[0.6875rem] font-semibold uppercase tracking-wider text-brand-charcoal/50">Rather just text?</div>
          <a href={b.telHref} className="inline-flex items-center gap-2 mt-2 font-display text-lg font-bold text-brand-purple">
            <Phone className="w-4 h-4" />
            {b.salonPhone}
          </a>
        </div>
      </div>
    </aside>
  );
}
