import { SLOT_TIMES, MONTHS, DOW } from './bookingData';

export function money(n) {
  return '$' + n;
}

export function fmtDur(m) {
  if (!m) return '';
  const h = Math.floor(m / 60);
  const r = m % 60;
  return (h ? h + ' hr' : '') + (h && r ? ' ' : '') + (r ? r + ' min' : '');
}

export function startOfToday() {
  const t = new Date();
  t.setHours(0, 0, 0, 0);
  return t;
}

export function isClosedDay(d) {
  const w = d.getDay();
  return w === 0 || w === 1;
}

export function slotMinutes(i) {
  const m = SLOT_TIMES[i].match(/(\d+):(\d+)\s*(am|pm)/);
  let h = parseInt(m[1], 10);
  if (m[3] === 'pm' && h !== 12) h += 12;
  if (m[3] === 'am' && h === 12) h = 0;
  return h * 60 + parseInt(m[2], 10);
}

export function isTooSoon(d, i) {
  const now = new Date();
  const same = d.getFullYear() === now.getFullYear() && d.getMonth() === now.getMonth() && d.getDate() === now.getDate();
  if (!same) return false;
  const lead = 3 * 60;
  return slotMinutes(i) < now.getHours() * 60 + now.getMinutes() + lead;
}

export function isSlotOpen(d, i) {
  if (isTooSoon(d, i)) return false;
  return (d.getDate() * 7 + i * 5 + d.getMonth()) % 4 !== 0;
}

export function isDayOpen(d) {
  if (isClosedDay(d) || d < startOfToday()) return false;
  for (let i = 0; i < SLOT_TIMES.length; i++) if (isSlotOpen(d, i)) return true;
  return false;
}

export function dateLabel(d, long) {
  if (!d) return '';
  return DOW[d.getDay()].slice(0, long ? 99 : 3) + ', ' + MONTHS[d.getMonth()].slice(0, long ? 99 : 3) + ' ' + d.getDate();
}
