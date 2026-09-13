import React from 'react';
import { money, fmtDur } from './bookingHelpers';
import { Check } from 'lucide-react';

export default function ReviewStep({ b }) {
  const rows = [
    { k: 'Service', v: b.svc ? b.svc.n + ' — ' + money(b.svc.p) : '—', edit: () => b.goToStep(0) },
    { k: 'Nail art', v: b.tier.p ? b.tier.n + ' — +' + money(b.tier.p) : 'No art', edit: () => b.goToStep(1) },
    { k: 'Extras', v: b.extrasText, edit: () => b.goToStep(1) },
    { k: 'When', v: b.timeText, edit: () => b.goToStep(2) },
    { k: 'Time needed', v: 'About ' + fmtDur(b.dur), edit: null },
    { k: 'Name', v: b.name || '—', edit: () => b.goToStep(3) },
    { k: 'Mobile', v: b.phone || '—', edit: () => b.goToStep(3) },
    { k: 'Notes', v: b.notes || (b.inspo ? b.inspo : 'None'), edit: () => b.goToStep(3) },
  ];
  const policyLines = [
    'Nothing is charged online — you pay in the salon.',
    'We reply by text to confirm. If the time is gone we will offer you the closest opening.',
    'Please give us a heads-up if you need to move your appointment.',
  ];

  return (
    <div className="animate-in fade-in duration-500">
      <div className="inline-block rounded-full bg-brand-pink/40 px-4 py-1 font-display text-sm font-semibold tracking-[.18em] uppercase text-brand-purple">
        Step five
      </div>
      <h2 className="mt-4 font-display text-[clamp(2rem,4vw,2.75rem)] leading-tight font-bold tracking-tight text-brand-charcoal">
        Look right to you?
      </h2>
      <p className="mt-3.5 max-w-lg text-base text-brand-charcoal/70">
        Nothing is charged online. Sending this puts your request in front of us — we reply by text to lock the time in.
      </p>
      <div className="mt-8 border border-[#E6E1EC] rounded-2xl overflow-hidden">
        {rows.map((r, i) => (
          <div key={r.k} className={`flex flex-wrap items-baseline gap-3 px-5 py-4 ${i < rows.length - 1 ? 'border-b border-[#E6E1EC]' : ''}`}>
            <div className="text-[0.8438rem] text-brand-charcoal/55 flex-none w-36">{r.k}</div>
            <div className="text-[0.9375rem] font-semibold text-brand-charcoal flex-1">{r.v}</div>
            {r.edit && (
              <button type="button" onClick={r.edit} className="text-[0.8125rem] text-brand-purple underline flex-shrink-0">Change</button>
            )}
          </div>
        ))}
      </div>
      <div className="mt-6 rounded-2xl bg-brand-beige/60 border border-brand-pink/70 p-5">
        <h3 className="font-display text-[1.0625rem] font-bold text-brand-charcoal">Before you send</h3>
        <div className="mt-3 flex flex-col gap-2">
          {policyLines.map((p) => (
            <div key={p} className="flex gap-2 items-start text-sm leading-relaxed text-brand-charcoal/75">
              <Check className="w-3.5 h-3.5 text-brand-purple flex-shrink-0 mt-0.5" />
              {p}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
