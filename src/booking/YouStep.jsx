import React from 'react';

export default function YouStep({ name, phone, inspo, notes, firstTime, onName, onPhone, onInspo, onNotes, onFirstTime }) {
  return (
    <div className="animate-in fade-in duration-500">
      <div className="inline-block rounded-full bg-brand-pink/40 px-4 py-1 font-display text-sm font-semibold tracking-[.18em] uppercase text-brand-purple">
        Step four
      </div>
      <h2 className="mt-4 font-display text-[clamp(2rem,4vw,2.75rem)] leading-tight font-bold tracking-tight text-brand-charcoal">
        Who are we booking?
      </h2>
      <p className="mt-3.5 max-w-lg text-base text-brand-charcoal/70">
        Your mobile number is the important one — that is how we confirm.
      </p>
      <div className="mt-8 grid gap-5" style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(15rem, 1fr))' }}>
        <div>
          <label htmlFor="rn-name" className="block text-[0.8438rem] font-semibold text-brand-charcoal mb-2">Your name</label>
          <input
            id="rn-name" type="text" placeholder="First and last" value={name} onChange={(e) => onName(e.target.value)}
            className="w-full box-border border border-[#E0DAE8] rounded-xl bg-white px-4 py-3.5 text-[0.9375rem] focus:outline-none focus:border-brand-purple"
          />
        </div>
        <div>
          <label htmlFor="rn-phone" className="block text-[0.8438rem] font-semibold text-brand-charcoal mb-2">Mobile number</label>
          <input
            id="rn-phone" type="tel" inputMode="tel" placeholder="506-000-0000" value={phone} onChange={(e) => onPhone(e.target.value)}
            className="w-full box-border border border-[#E0DAE8] rounded-xl bg-white px-4 py-3.5 text-[0.9375rem] focus:outline-none focus:border-brand-purple"
          />
        </div>
        <div>
          <label htmlFor="rn-inspo" className="block text-[0.8438rem] font-semibold text-brand-charcoal mb-2">
            Inspo link <span className="font-normal text-brand-charcoal/50">— optional</span>
          </label>
          <input
            id="rn-inspo" type="text" placeholder="Instagram or Pinterest link" value={inspo} onChange={(e) => onInspo(e.target.value)}
            className="w-full box-border border border-[#E0DAE8] rounded-xl bg-white px-4 py-3.5 text-[0.9375rem] focus:outline-none focus:border-brand-purple"
          />
        </div>
        <div>
          <div className="block text-[0.8438rem] font-semibold text-brand-charcoal mb-2">First time at Reign?</div>
          <div className="flex gap-2">
            {[{ v: true, label: 'Yes, first time' }, { v: false, label: 'I have been before' }].map((o) => (
              <button
                key={String(o.v)}
                type="button"
                onClick={() => onFirstTime(o.v)}
                className={`flex-1 text-center rounded-xl py-3.5 px-3 text-sm border transition-all ${
                  firstTime === o.v ? 'bg-brand-purple text-white border-brand-purple font-semibold' : 'bg-white text-brand-charcoal border-[#E6E1EC]'
                }`}
              >
                {o.label}
              </button>
            ))}
          </div>
        </div>
      </div>
      <div className="mt-5">
        <label htmlFor="rn-notes" className="block text-[0.8438rem] font-semibold text-brand-charcoal mb-2">
          Anything we should know? <span className="font-normal text-brand-charcoal/50">— optional</span>
        </label>
        <textarea
          id="rn-notes" rows={4}
          placeholder="Shape and length you want, allergies, removal of an old set, running late — anything helps."
          value={notes} onChange={(e) => onNotes(e.target.value)}
          className="w-full box-border border border-[#E0DAE8] rounded-xl bg-white px-4 py-3.5 text-[0.9375rem] leading-relaxed resize-vertical focus:outline-none focus:border-brand-purple"
        />
      </div>
    </div>
  );
}
