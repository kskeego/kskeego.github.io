
document.addEventListener('DOMContentLoaded', () => {
  const track = (action, label) => {
    if (typeof gtag === 'function') {
      gtag('event', action, { event_category: 'CTA', event_label: label });
    } else {
      console.log('track', action, label);
    }
  };
  document.querySelectorAll('a.btn').forEach(a => {
    a.addEventListener('click', () => track('cta_click', a.textContent.trim()));
  });
});
