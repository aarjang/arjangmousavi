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

const form = document.getElementById('contact-form');
if (form) {
  form.addEventListener('submit', (event) => {
    const action = form.getAttribute('action') || '';
    if (action.includes('REPLACE_WITH_FORM_ID')) {
      event.preventDefault();
      const mail = form.getAttribute('data-mailto') || 'hello@yourdomain.com';
      const name = form.querySelector('input[name="name"]')?.value || '';
      const email = form.querySelector('input[name="email"]')?.value || '';
      const message = form.querySelector('textarea[name="message"]')?.value || '';
      const subject = encodeURIComponent(`Website contact from ${name}`);
      const body = encodeURIComponent(`Name: ${name}\nEmail: ${email}\n\n${message}`);
      window.location.href = `mailto:${mail}?subject=${subject}&body=${body}`;
    }
  });
}
