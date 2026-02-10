const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

if (!reducedMotion) {
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.16 }
  );

  document.querySelectorAll('.reveal').forEach((node) => observer.observe(node));
} else {
  document.querySelectorAll('.reveal').forEach((node) => node.classList.add('is-visible'));
}

document.querySelectorAll('.copy-btn').forEach((btn) => {
  btn.addEventListener('click', async () => {
    const value = btn.getAttribute('data-copy') || '';
    if (!value) return;

    try {
      await navigator.clipboard.writeText(value);
      const previous = btn.textContent;
      const copiedLabel = btn.getAttribute('data-copied') || 'Copied';
      btn.textContent = copiedLabel;
      setTimeout(() => {
        btn.textContent = previous;
      }, 1400);
    } catch {
      window.prompt('Copy manually:', value);
    }
  });
});
