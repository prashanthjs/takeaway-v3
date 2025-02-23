'use client';

export function useNumberFormatter() {
  const locale = 'en-GB';
  const currency = 'GBP';

  const currencySymbol = new Intl.NumberFormat(locale, {
    style: 'currency',
    currency,
  }).formatToParts(1)[0].value;

  const formatCurrencyNumber = (number: number, options?: Intl.NumberFormatOptions) => {
    return number.toLocaleString(locale, {
      style: 'currency',
      currency: currency,
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
      ...options,
    });
  };

  const formatNumber = (number: number, options?: Intl.NumberFormatOptions) => {
    return number.toLocaleString(locale, {
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
      ...options,
    });
  };

  return {
    currency,
    locale,
    currencySymbol,
    formatCurrencyNumber,
    formatNumber,
  };
}
