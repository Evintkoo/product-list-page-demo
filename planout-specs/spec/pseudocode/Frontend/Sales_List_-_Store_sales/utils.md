export const formatDate = (dateString) => {
  // Format: dd-mmm-yyyy hh:mm AM/PM (GMT+7)
  return new Intl.DateTimeFormat('en-GB', {
    day: '2-digit', month: 'short', year: 'numeric',
    hour: '2-digit', minute: '2-digit', hour12: true
  }).format(new Date(dateString));
};

export const formatCurrency = (amount) => {
  // Indonesian format: Dot for thousands, Comma for decimal
  return new Intl.NumberFormat('id-ID', {
    minimumFractionDigits: 2
  }).format(amount);
};