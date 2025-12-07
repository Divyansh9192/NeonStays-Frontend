export const formatPrice = (p) => {
  if (!p && p !== 0) return '-';
  return new Intl.NumberFormat('en-IN').format(p);
};
