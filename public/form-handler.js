document.querySelectorAll('[data-inline-form]').forEach(form => {
  form.addEventListener('submit', async event => {
    event.preventDefault();

    const messageBox = form.querySelector('[data-form-message]');
    const submitButton = form.querySelector('button[type="submit"]');
    const originalButtonHtml = submitButton.innerHTML;

    messageBox.classList.add('hidden');
    submitButton.disabled = true;
    submitButton.textContent = 'Please wait...';

    try {
      const response = await fetch(form.action, {
        method: form.method,
        headers: { Accept: 'application/json' },
        body: new URLSearchParams(new FormData(form))
      });
      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.message);
      }

      window.location.assign(result.redirect);
    } catch (error) {
      messageBox.textContent = error.message || 'Something went wrong. Please retry.';
      messageBox.className = 'rounded-xl px-4 py-3 text-sm bg-orange bg-opacity-15 text-orange';
      submitButton.disabled = false;
      submitButton.innerHTML = originalButtonHtml;
    }
  });
});
