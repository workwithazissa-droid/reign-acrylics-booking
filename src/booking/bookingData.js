export const GROUPS = [
  { g: 'New set of nails', items: [
    { id: 'acrylic', n: 'Acrylic', p: 80, d: 120, t: 'Includes 2 different colour polishes and 1 nail with a simple design.' },
    { id: 'acrylic-fill', n: 'Acrylic fill', p: 65, d: 90, t: '' },
    { id: 'gel', n: 'Gel', p: 75, d: 120, t: 'Includes 2 different colour polishes and 1 nail with a simple design.' },
    { id: 'gel-fill', n: 'Gel fill', p: 60, d: 90, t: '' },
  ] },
  { g: 'Pedicure', items: [
    { id: 'pedi-reg', n: 'Regular polish pedicure', p: 50, d: 60, t: '' },
    { id: 'pedi-gel', n: 'Gel polish pedicure', p: 60, d: 60, t: '' },
    { id: 'pedi-deluxe', n: 'Deluxe gel polish pedicure', p: 75, d: 75, t: 'Includes mask, paraffin, and take-home hydration socks.' },
    { id: 'combo-gel', n: 'Mani and pedi combo — gel', p: 90, d: 135, t: 'Gel polish quick mani and gel polish pedicure.' },
    { id: 'combo-reg', n: 'Mani and pedi combo — regular', p: 80, d: 120, t: 'Regular polish quick mani and regular polish pedi.' },
    { id: 'paraffin-solo', n: 'Paraffin wax stand alone', p: 30, d: 30, t: 'With moisturizing cream.' },
  ] },
  { g: 'Natural nail services', items: [
    { id: 'mani-reg', n: 'Regular polish manicure', p: 50, d: 45, t: '' },
    { id: 'mani-gel', n: 'Gel polish manicure', p: 55, d: 60, t: '' },
    { id: 'mens', n: "Man's mani", p: 30, d: 30, t: '' },
  ] },
  { g: 'Kid services', items: [
    { id: 'kid-gel', n: 'Kids gel polish mani', p: 25, d: 30, t: '' },
    { id: 'kid-reg', n: 'Kids regular polish mani', p: 20, d: 25, t: '' },
    { id: 'kid-combo-gel', n: 'Kids mani and pedi combo gel polish', p: 60, d: 60, t: '' },
    { id: 'kid-combo-reg', n: 'Kids mani and pedi combo regular polish', p: 50, d: 60, t: '' },
  ] },
];

export const PEDI_INCLUDES = 'Every pedicure includes cut, file, clean cuticles, shape nails, soak, scrub, callus removal, and hydrating cream.';

export const ALL = GROUPS.reduce((a, g) => a.concat(g.items), []);

export const TIERS = [
  { id: 'none', num: '—', n: 'No art', p: 0, t: 'One solid colour across the set, or a simple accent nail included with your set.' },
  { id: 't1', num: '1', n: 'Tier 1', p: 10, t: 'More than 1 nail with nail art, or more than 2 colour polishes, with minimal design.' },
  { id: 't2', num: '2', n: 'Tier 2', p: 15, t: 'More than 5 different colours, or more advanced nail art.' },
  { id: 't3', num: '3', n: 'Tier 3', p: 20, t: 'All 10 nails with different designs.' },
];

export const EXTRAS = [
  { id: 'stones-few', n: 'Rhinestones or charms, 1–10 stones', p: 3 },
  { id: 'stones-lots', n: 'Lots of stones, more than 10', p: 6 },
  { id: 'paraffin', n: 'Paraffin wax add-on', p: 10 },
];

export const STEPS = [
  { id: 'service', name: 'Service' },
  { id: 'art', name: 'Nail art' },
  { id: 'when', name: 'Date and time' },
  { id: 'you', name: 'Your details' },
  { id: 'review', name: 'Confirm' },
];

export const SLOT_TIMES = ['9:30 am', '11:00 am', '12:30 pm', '2:00 pm', '3:30 pm', '5:00 pm', '6:30 pm'];
export const MONTHS = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
export const DOW = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

export const SALON_PHONE = '902-349-9594';
export const SALON_ADDRESS = '15-255 Restigouche Rd, Oromocto, NB E2V 2H1';
