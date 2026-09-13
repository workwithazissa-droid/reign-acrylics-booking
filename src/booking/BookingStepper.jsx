import React from 'react';
import { STEPS } from './bookingData';
import { Check } from 'lucide-react';

export default function BookingStepper({ step, maxStep, sent, onJump }) {
  return (
    <div className="flex items-center gap-2 min-w-[42rem] overflow-x-auto">
      {STEPS.map((s, i) => {
        const done = i < step || sent;
        const active = i === step && !sent;
        const reachable = !sent && i <= Math.max(maxStep, step) && i !== step;
        return (
          <div key={s.id} className="flex items-center gap-2 flex-1">
            <button
              type="button"
              disabled={!reachable}
              onClick={() => reachable && onJump(i)}
              aria-label={reachable ? 'Go back to ' + s.name : s.name}
              className={`flex items-center gap-2 whitespace-nowrap ${reachable ? 'cursor-pointer' : 'cursor-default'}`}
            >
              <span
                className={`inline-flex items-center justify-center h-7 w-7 rounded-full text-xs font-semibold flex-shrink-0 ${
                  active ? 'bg-brand-purple text-white' : done ? 'bg-brand-pink text-brand-charcoal' : 'bg-white/10 text-white/55'
                }`}
              >
                {done ? <Check className="w-3.5 h-3.5" /> : i + 1}
              </span>
              <span className={`text-[0.8125rem] ${active ? 'font-semibold text-white' : done ? 'text-white/70' : 'text-white/45'}`}>
                {s.name}
              </span>
            </button>
            {i < STEPS.length - 1 && (
              <div className={`flex-1 h-px ${done ? 'bg-brand-pink/60' : 'bg-white/15'}`} />
            )}
          </div>
        );
      })}
    </div>
  );
}
