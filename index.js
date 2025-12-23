const sectionEl = document.querySelector('.contact-form__section');
const form = document.querySelector('.contact-form__form');
const modal = document.querySelector('#messageSentModal');

const fieldLabels = {
  consent: document.querySelector('.contact-form__checkbox-label'),
  email: document.querySelector('.contact-form__email-label'),
  firstName: document.querySelector('.contact-form__firstname-label'),
  lastName: document.querySelector('.contact-form__lastname-label'),
  message: document.querySelector('.contact-form__message-label'),
  queryType: document.querySelector('.contact-form__querytype-label')
}

form.addEventListener('submit', function(event) {
  event.preventDefault();

  const formDataObj = {};
  const formData = new FormData(form);
  for (const [key, value] of formData.entries()) {
    formDataObj[key] = value;
  }

  if (isFormValid(formDataObj)) {
    form.reset();

    // Calculate height of form to consistently place modal slightly on top of it
    modal.show();
    const sectionRect = sectionEl.getBoundingClientRect();
    modal.style.top = `${sectionRect.top - modal.offsetHeight + 10}px`;
    modal.style.opacity = 1;
    autoCloseDialog(modal, 5000);
  }
});

function autoCloseDialog(dialog, delay = 5000) {
  setTimeout(() => {
    dialog.style.top = '-100%';
    dialog.style.opacity = 0;
    dialog.close();
  }, delay);
}

function isFormValid({ consent, email, firstName, lastName, message, queryType}) {
  const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  const errors = {};

  if (!consent || consent !== 'on') {
    errors.consent = true;
  }
  if (!email || !emailRegex.test(email)) {
    errors.email = true;
  }
  if (!firstName || firstName.trim().length === 0) {
    errors.firstName = true;
  }
  if (!lastName || lastName.trim().length === 0) {
    errors.lastName = true;
  }
  if (!message || message.trim().length === 0) {
    errors.message = true;
  }
  if (!queryType) {
    errors.queryType = true;
  }
  
  displayErrors(errors);

  if (Object.keys(errors).length === 0) {
    return true;
  } else {
    return false;
  }
}

function displayErrors(errors) {
  // Clear all error messages
  Object.values(fieldLabels).forEach(function(label) {
    label.classList.remove('error');
  })

  // Show applicable errors
  Object.keys(errors).forEach(function(field) {
    fieldLabels[field]?.classList.add('error');
  })
}
