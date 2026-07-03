import holidays from './market-holidays.json';

const NY_TZ = 'America/New_York';
const PKT_TZ = 'Asia/Karachi';

function tzParts(tz, now = new Date()) {
  const fmt = new Intl.DateTimeFormat('en-US', {
    timeZone: tz,
    weekday: 'short',
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    hour: 'numeric',
    minute: 'numeric',
    hour12: false,
  });
  const parts = fmt.formatToParts(now);
  const get = (t) => parts.find((p) => p.type === t)?.value || '';
  const hour = parseInt(get('hour') || '0', 10);
  const minute = parseInt(get('minute') || '0', 10);
  const dateKey = `${get('year')}-${get('month')}-${get('day')}`;
  return {
    weekday: get('weekday'),
    hour,
    minute,
    mins: hour * 60 + minute,
    dateKey,
  };
}

export function isHoliday(market, dateKey) {
  const list = holidays[market] || [];
  return list.includes(dateKey);
}

export function pktSessionOpen(now = new Date()) {
  const p = tzParts(PKT_TZ, now);
  if (['Sat', 'Sun'].includes(p.weekday)) return false;
  if (isHoliday('psx', p.dateKey)) return false;
  return p.mins >= 9 * 60 + 15 && p.mins < 15 * 60 + 45;
}

export function usSessionOpen(now = new Date()) {
  const p = tzParts(NY_TZ, now);
  if (['Sat', 'Sun'].includes(p.weekday)) return false;
  if (isHoliday('us', p.dateKey)) return false;
  return p.mins >= 9 * 60 + 30 && p.mins < 16 * 60;
}

export function sessionLabels(now = new Date()) {
  return {
    psxOpen: pktSessionOpen(now),
    usOpen: usSessionOpen(now),
    psxLabel: pktSessionOpen(now) ? 'PSX session' : 'PSX closed',
    usLabel: usSessionOpen(now) ? 'NYSE session' : 'NYSE closed',
  };
}
