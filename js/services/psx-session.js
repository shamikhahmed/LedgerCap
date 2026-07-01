'use strict';
/** PSX session clock — Asia/Karachi, weekdays 9:15–15:45 */
const PsxSession = (() => {
  const TZ = 'Asia/Karachi';
  const OPEN_MIN = 9 * 60 + 15;
  const CLOSE_MIN = 15 * 60 + 45;

  function pktParts(now) {
    now = now || new Date();
    const fmt = new Intl.DateTimeFormat('en-US', {
      timeZone: TZ,
      weekday: 'short',
      hour: 'numeric',
      minute: 'numeric',
      hour12: false,
    });
    const parts = fmt.formatToParts(now);
    const get = (t) => parts.find((p) => p.type === t)?.value;
    const weekday = get('weekday') || '';
    const hour = parseInt(get('hour') || '0', 10);
    const minute = parseInt(get('minute') || '0', 10);
    const dateKey = new Intl.DateTimeFormat('en-CA', { timeZone: TZ }).format(now);
    return { weekday, hour, minute, dateKey, mins: hour * 60 + minute };
  }

  function isWeekday(pkt) {
    pkt = pkt || pktParts();
    return pkt.weekday && !['Sat', 'Sun'].includes(pkt.weekday);
  }

  function isOpen(pkt) {
    pkt = pkt || pktParts();
    if (!isWeekday(pkt)) return false;
    return pkt.mins >= OPEN_MIN && pkt.mins < CLOSE_MIN;
  }

  function priceLabel(pkt) {
    pkt = pkt || pktParts();
    if (isOpen(pkt)) return 'Live';
    if (!isWeekday(pkt)) return 'Last close';
    if (pkt.mins < OPEN_MIN) return 'Pre-market';
    return 'Last close';
  }

  return { pktParts, isWeekday, isOpen, priceLabel };
})();
window.PsxSession = PsxSession;
