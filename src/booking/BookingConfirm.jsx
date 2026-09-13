import React from 'react';
import { Check, MessageCircle } from 'lucide-react';

export default function BookingConfirm({ b }) {
  const rows = [
    { k: 'Service', v: b.svc ? b.svc.n : '—' },
    { k: 'Nail art', v: b.tier.p ? b.tier.n : 'No art' },
    { k: 'When', v: b.timeText },
    { k: 'Name', v: b.name || '—' },
    { k: 'We will text', v: b.phone || '—' },
  ];

  return (
    <div className="max-w-xl mx-auto text-center animate-in fade-in zoom-in-95 duration-500">
      <div className="inline-flex items-center justify-center h-18 w-18 rounded-full bg-brand-purple/10 text-brand-purple">
        <Check className="w-9 h-9" />
      </div>
      <h2 className="mt-6 font-display text-[clamp(2rem,4vw,2.75rem)] leading-tight font-bold tracking-tight text-brand-charcoal">
        Request sent
      </h2>
      <p className="mt-4 max-w-md mx-auto text-base text-brand-charcoal/70">{b.sentBlurb}</p>
      <div className="mt-8 text-left border border-[#E6E1EC] rounded-2xl bg-brand-beige/40 p-6">
        {rows.map((r) => (
          <div key={r.k} className="flex items-baseline justify-between gap-4 py-1.5">
            <div className="text-[0.8438rem] text-brand-charcoal/60">{r.k}</div>
            <div className="text-[0.9375rem] font-semibold text-brand-charcoal text-right">{r.v}</div>
          </div>
        ))}
        <div className="flex items-baseline justify-between gap-4 border-t border-[#E6E1EC] mt-3 pt-3.5">
          <div className="text-[0.9375rem] font-semibold text-brand-charcoal">Estimated total</div>
          <div className="font-display text-2xl font-bold text-brand-purple">{b.totalLabel}</div>
        </div>
      </div>
      <div className="mt-8 flex flex-wrap justify-center gap-3">
        <a href={b.smsHref} className="inline-flex items-center gap-2 rounded-full bg-brand-purple text-white px-8 py-3.5 text-[0.9375rem] font-medium">
          <MessageCircle className="w-4 h-4" />
          Text these details to Reign
        </a>
        <a href={b.telHref} className="inline-flex items-center gap-2 rounded-full border border-[#D9D0E6] bg-white text-brand-charcoal px-8 py-3.5 text-[0.9375rem] font-medium">
          Call instead
        </a>
      </div>
      <button type="button" onClick={b.restart} className="mt-6 text-sm text-brand-purple underline">
        Book another appointment
      </button>
    </div>
  );
}
