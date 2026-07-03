/** PKR per gram from COMEX spot — purity = karat/24 */
const TROY_OZ_GRAMS = 31.1034768;

export function pkrPerGram(gcUsdOz, usdPkr, karat) {
  const gc = Number(gcUsdOz);
  const fx = Number(usdPkr);
  const k = Number(karat);
  if (!(gc > 0) || !(fx > 0) || !(k > 0) || k > 24) return 0;
  return Math.round((gc * fx) / TROY_OZ_GRAMS * (k / 24));
}

export const KARAT_IDS = [24, 22, 21, 18, 12];
