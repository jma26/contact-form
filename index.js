const form = document.querySelector('.contact-form__form');

form.addEventListener('submit', function(event) {
  event.preventDefault();

  const formDataObj = {};
  const formData = new FormData(form);
  for (const [key, value] of formData.entries()) {
    formDataObj[key] = value;
    console.log(key, value);
  }

  console.log('What is this', formDataObj);

  if (isFormValid(formDataObj)) {
    console.log('Successful form submission');
    form.submit();
  }
});

function isFormValid({ consent, email, firstName, lastName, message, queryType}) {
  const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  const errors = {};
  let hasErrors = false;

  if (!consent || consent !== 'on') {
    errors.consent = true;
    hasErrors = true;
    console.log('errors', errors);
  }
  if (!email || !emailRegex.test(email)) {
    errors.email = true;
    hasErrors = true;
    console.log('errors', errors);
  }
  if (!firstName || firstName.length < 0) {
    errors.firstName = true;
    hasErrors = true;
  }
  if (!lastName || lastName.length < 0) {
    errors.lastName = true;
    hasErrors = true;
  }
  if (!message || message.length < 0) {
    errors.message = true;
    hasErrors = true;
  }
  if (!queryType) {
    errors.queryType = true;
    hasErrors = true;
  }
  
  console.log('What is the errors', errors);
  if (hasErrors) {
    displayErrors(errors);
    return false;
  } 

  return true;
}

function displayErrors({ consent, email, firstName, lastName, message, queryType}) {
  const labelElements = document.querySelectorAll('.contact-form__label');
  // Clear all error messages
  labelElements.forEach(function(label) {
    label.classList.remove('error');
  });
  console.log(labelElements);

  if (consent) {
    document.querySelector('.contact-form__checkbox-label').classList.add('error')
  }
  if (email) {
    document.querySelector('.contact-form__email-label').classList.add('error');
  }
  if (firstName) {
    document.querySelector('.contact-form__firstname-label').classList.add('error');
  }
  if (lastName) {
    document.querySelector('.contact-form__lastname-label').classList.add('error');
  }
  if (message) {
    document.querySelector('.contact-form__message-label').classList.add('error');
  }
  if (queryType) {
    document.querySelector('.contact-form__querytype-label').classList.add('error');
  }
}
