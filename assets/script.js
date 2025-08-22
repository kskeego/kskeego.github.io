
document.addEventListener('DOMContentLoaded', () => {
  document.querySelectorAll('.btn').forEach(btn => {
    btn.addEventListener('pointerdown', () => {
      btn.animate([{transform:'scale(0.98)'},{transform:'scale(1)'}], {duration:150, easing:'ease-out'});
    });
  });
});
