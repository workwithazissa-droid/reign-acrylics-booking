import React from 'react';
import { SLOT_TIMES, MONTHS, DOW } from './bookingData';
import { startOfToday, isDayOpen, isSlotOpen, dateLabel, fmtDur } from './bookingHelpers';
import { ChevronLeft, ChevronRight, Clock } from 'lucide-react';

export default function WhenStep({ monthOffset, date, slot, dur, onMonthOffset, onSelectDate, onSelectSlot }) {
  const today = startOfToday();
  const view = new Date(today.getFullYear(), today.getMonth() + monthOffset, 1);
  const firstDow = view.getDay();
  const daysIn = new Date(view.getFullYear(), view.getMonth() + 1, 0).getDate();
  const cells = [];
  for (let i = 0; i < firstDow; i++) cells.push(null);
  for (let dnum = 1; dnum <= daysIn; dnum++) {
    cells.push(new Date(view.getFullYear(), view.getMonth(), dnum));
  }
  const chosen = date ? new Date(date.y, date.m, date.d) : null;

  return (
    <div className="animate-in fade-in duration-500">
      <div className="inline-block rounded-full bg-brand-pink/40 px-4 py-1 font-display text-sm font-semibold tracking-[.18em] uppercase text-brand-purple">
        Step three
      </div>
      <h2 className="mt-4 font-display text-[clamp(2rem,4vw,2.75rem)] leading-tight font-bold tracking-tight text-brand-charcoal">
        When suits you?
      </h2>
      <p className="mt-3.5 max-w-lg text-base text-brand-charcoal/70">
        Closed Sunday and Monday. Times shown are the openings that fit {dur ? `a ${fmtDur(dur)} appointment` : 'your appointment'}.
      </p>

      <div className="mt-8 border border-[#E6E1EC] rounded-2xl p-5">
        <div className="flex items-center justify-between gap-4">
          <button
            type="button"
            aria-label="Previous month"
            disabled={monthOffset <= 0}
            onClick={() => onMonthOffset(Math.max(monthOffset - 1, 0))}
            className={`inline-flex items-center justify-center h-9 w-9 rounded-full border border-[#E6E1EC] bg-white ${monthOffset > 0 ? 'text-brand-charcoal cursor-pointer' : 'text-[#D5CFE0] cursor-not-allowed'}`}
          >
            <ChevronLeft className="w-4 h-4" />
          </button>
          <div className="font-display text-lg font-bold text-brand-charcoal">{MONTHS[view.getMonth()]} {view.getFullYear()}</div>
          <button
            type="button"
            aria-label="Next month"
            onClick={() => onMonthOffset(Math.min(monthOffset + 1, 5))}
            className="inline-flex items-center justify-center h-9 w-9 rounded-full border border-[#E6E1EC] bg-white text-brand-charcoal cursor-pointer"
          >
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
        <div className="mt-4 grid grid-cols-7 gap-1">
          {DOW.map((w) => (
            <div key={w} className="text-center text-[0.6875rem] font-semibold uppercase tracking-wider text-brand-charcoal/45 py-1">{w.slice(0, 3)}</div>
          ))}
        </div>
        <div className="mt-1.5 grid grid-cols-7 gap-1">
          {cells.map((d, idx) => {
            if (!d) return <div key={idx} className="h-10" />;
            const open = isDayOpen(d);
            const on = date && date.y === d.getFullYear() && date.m === d.getMonth() && date.d === d.getDate();
            return (
              <button
                key={idx}
                type="button"
                disabled={!open}
                aria-label={DOW[d.getDay()] + ' ' + MONTHS[view.getMonth()] + ' ' + d.getDate() + (open ? ', openings' : ', unavailable')}
                onClick={() => open && onSelectDate({ y: d.getFullYear(), m: d.getMonth(), d: d.getDate() })}
                className={`flex items-center justify-center h-10 rounded-lg text-sm transition-all ${
                  on ? 'bg-brand-purple text-white font-semibold cursor-pointer'
                    : open ? 'bg-brand-pink/[0.28] text-brand-charcoal font-medium cursor-pointer'
                    : 'bg-[#F7F5FA] text-[#C4BED0] cursor-not-allowed'
                }`}
              >
                {d.getDate()}
              </button>
            );
          })}
        </div>
        <div className="mt-4 flex flex-wrap gap-5 border-t border-[#E6E1EC] pt-3.5">
          <div className="inline-flex items-center gap-1.5 text-xs text-brand-charcoal/55"><div className="h-2 w-2 rounded-full bg-brand-purple" />Selected</div>
          <div className="inline-flex items-center gap-1.5 text-xs text-brand-charcoal/55"><div className="h-2 w-2 rounded-full bg-brand-pink/90" />Openings</div>
          <div className="inline-flex items-center gap-1.5 text-xs text-brand-charcoal/55"><div className="h-2 w-2 rounded-full bg-[#E6E1EC]" />Closed or full</div>
        </div>
      </div>

      <div className="mt-6">
        <h3 className="font-display text-[1.375rem] font-bold text-brand-charcoal">
          {chosen ? 'Times on ' + dateLabel(chosen, true) : 'Pick a day first'}
        </h3>
        <div className="mt-4 grid gap-2.5" style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(7rem, 1fr))' }}>
          {chosen && SLOT_TIMES.map((t, i) => {
            const open = isSlotOpen(chosen, i);
            const on = slot === t;
            return (
              <button
                key={t}
                type="button"
                disabled={!open}
                onClick={() => open && onSelectSlot(t)}
                className={`flex items-center justify-center rounded-xl py-3.5 px-2 text-sm transition-all border ${
                  on ? 'bg-brand-purple text-white border-brand-purple font-semibold'
                    : open ? 'bg-white text-brand-charcoal border-[#E6E1EC]'
                    : 'bg-[#F7F5FA] text-[#C4BED0] border-[#F1EDF7] cursor-not-allowed line-through'
                }`}
              >
                {t}
              </button>
            );
          })}
        </div>
        <p className="mt-4 flex items-center gap-1.5 text-[0.8438rem] text-brand-charcoal/55">
          <Clock className="w-3.5 h-3.5" />
          {chosen ? 'Crossed-out times are already taken or too soon to fit today. Everything is Atlantic time.' : 'Days shaded pink have openings.'}
        </p>
      </div>
    </div>
  );
}
