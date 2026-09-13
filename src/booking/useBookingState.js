import { useState, useEffect, useCallback } from 'react';
import { ALL, TIERS, EXTRAS, SALON_PHONE, SALON_ADDRESS } from './bookingData';
import { money, fmtDur, dateLabel } from './bookingHelpers';

const STORE_KEY = 'reign-booking-draft-v1';
const HINTS = ['Pick a service to continue', '', 'Choose a day, then a time', 'Name and mobile number, please', ''];

const initialState = {
  step: 0, service: null, tier: 'none', extras: [],
  monthOffset: 0, date: null, slot: null,
  name: '', phone: '', inspo: '', notes: '', firstTime: null,
  sent: false, restored: false,
};

export default function useBookingState() {
  const [state, setState] = useState(initialState);
  const [isNarrow, setIsNarrow] = useState(false);

  useEffect(() => {
    try {
      const raw = window.localStorage.getItem(STORE_KEY);
      if (!raw) return;
      const d = JSON.parse(raw);
      if (d && typeof d === 'object') {
        setState((s) => ({
          ...s,
          step: d.step || 0, service: d.service || null, tier: d.tier || 'none',
          extras: Array.isArray(d.extras) ? d.extras : [], date: d.date || null, slot: d.slot || null,
          name: d.name || '', phone: d.phone || '', inspo: d.inspo || '', notes: d.notes || '',
          firstTime: typeof d.firstTime === 'boolean' ? d.firstTime : null, restored: !!d.service,
        }));
      }
    } catch (e) { /* private browsing, nothing to restore */ }
  }, []);

  useEffect(() => {
    if (!window.matchMedia) return;
    const mq = window.matchMedia('(max-width: 767px)');
    const onChange = (e) => setIsNarrow(e.matches);
    setIsNarrow(mq.matches);
    if (mq.addEventListener) mq.addEventListener('change', onChange);
    else mq.addListener(onChange);
    return () => {
      if (mq.removeEventListener) mq.removeEventListener('change', onChange);
      else mq.removeListener(onChange);
    };
  }, []);

  useEffect(() => {
    try {
      if (state.sent) { window.localStorage.removeItem(STORE_KEY); return; }
      window.localStorage.setItem(STORE_KEY, JSON.stringify({
        step: state.step, service: state.service, tier: state.tier, extras: state.extras,
        date: state.date, slot: state.slot, name: state.name, phone: state.phone,
        inspo: state.inspo, notes: state.notes, firstTime: state.firstTime,
      }));
    } catch (e) { /* storage unavailable */ }
  }, [state]);

  const patch = useCallback((p) => setState((s) => ({ ...s, ...p })), []);

  const svc = ALL.find((s) => s.id === state.service) || null;
  const tierObj = TIERS.find((t) => t.id === state.tier) || TIERS[0];
  const dur = svc ? svc.d + (tierObj.p > 0 ? 20 : 0) + (state.extras.indexOf('paraffin') > -1 ? 15 : 0) : 0;
  const total = (svc ? svc.p : 0) + tierObj.p + state.extras.reduce((sum, id) => {
    const e = EXTRAS.find((x) => x.id === id);
    return sum + (e ? e.p : 0);
  }, 0);
  const phoneOk = state.phone.replace(/\D/g, '').length >= 10;

  function canAdvance(step) {
    if (step === 0) return !!state.service;
    if (step === 2) return !!state.date && !!state.slot;
    if (step === 3) return state.name.trim().length > 1 && phoneOk;
    return true;
  }
  const canGo = canAdvance(state.step);

  function maxStep() {
    if (!state.service) return 0;
    if (!state.date || !state.slot) return 2;
    if (!(state.name.trim().length > 1 && phoneOk)) return 3;
    return 4;
  }

  const dateObj = state.date ? new Date(state.date.y, state.date.m, state.date.d) : null;
  const timeText = dateObj ? dateLabel(dateObj, true) + (state.slot ? ' at ' + state.slot : '') : 'Not chosen yet';
  const extrasText = state.extras.length ? state.extras.map((id) => (EXTRAS.find((e) => e.id === id) || {}).n).join(', ') : 'None';
  const durText = dur ? 'About ' + fmtDur(dur) : '—';
  const totalLabel = money(total);

  const digits = SALON_PHONE.replace(/\D/g, '');
  const telHref = 'tel:+1' + digits;
  const mapHref = 'https://maps.google.com/?q=' + encodeURIComponent('Reign Acrylics Nail Services, ' + SALON_ADDRESS);

  const smsBody = 'Hi Reign Acrylics! Booking request from the website:\n'
    + 'Service: ' + (svc ? svc.n + ' (' + money(svc.p) + ')' : '-') + '\n'
    + 'Nail art: ' + (tierObj.p ? tierObj.n + ' (+' + money(tierObj.p) + ')' : 'None') + '\n'
    + 'Extras: ' + extrasText + '\n'
    + 'Preferred time: ' + timeText + '\n'
    + 'Name: ' + state.name + '\n'
    + (state.firstTime === true ? 'First visit: yes\n' : '')
    + (state.inspo ? 'Inspo: ' + state.inspo + '\n' : '')
    + (state.notes ? 'Notes: ' + state.notes + '\n' : '')
    + 'Estimated total: ' + money(total);
  const smsHref = 'sms:+1' + digits + '?&body=' + encodeURIComponent(smsBody);

  const sentBlurb = 'Thanks ' + (state.name.split(' ')[0] || 'so much') + '. We have your request for ' + timeText + ' and will text ' + (state.phone || 'you') + ' to confirm.';

  function selectService(id) { patch({ service: id, slot: null }); }
  function selectTier(id) { patch({ tier: id }); }
  function toggleExtra(id) {
    setState((s) => {
      if (s.extras.indexOf(id) > -1) return { ...s, extras: s.extras.filter((x) => x !== id) };
      const stones = id === 'stones-few' || id === 'stones-lots';
      const kept = stones ? s.extras.filter((x) => x !== 'stones-few' && x !== 'stones-lots') : s.extras;
      return { ...s, extras: kept.concat([id]) };
    });
  }
  function setMonthOffset(v) { patch({ monthOffset: v }); }
  function selectDate(d) { patch({ date: d, slot: null }); }
  function selectSlot(t) { patch({ slot: t }); }
  function setName(v) { patch({ name: v }); }
  function setPhone(v) { patch({ phone: v }); }
  function setInspo(v) { patch({ inspo: v }); }
  function setNotes(v) { patch({ notes: v }); }
  function setFirstTime(v) { patch({ firstTime: v }); }
  function goToStep(i) { patch({ step: i }); }
  function next() {
    if (!canGo) return;
    if (state.step === 4) patch({ sent: true });
    else patch({ step: state.step + 1 });
  }
  function back() { if (state.step > 0) patch({ step: state.step - 1 }); }
  function restart() {
    setState({ ...initialState, restored: false });
  }
  function dismissResumed() { patch({ restored: false }); }

  return {
    ...state, isNarrow,
    svc, tier: tierObj, dur, total, phoneOk, canGo, maxStep: maxStep(),
    timeText, extrasText, durText, totalLabel,
    salonPhone: SALON_PHONE, telHref, mapHref, smsHref, sentBlurb,
    navHint: canGo ? '' : HINTS[state.step],
    selectService, selectTier, toggleExtra, setMonthOffset, selectDate, selectSlot,
    setName, setPhone, setInspo, setNotes, setFirstTime,
    goToStep, next, back, restart, dismissResumed,
  };
}
