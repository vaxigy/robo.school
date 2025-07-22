(() => {
  const submitButton = document.getElementById('submit');

  const nameForm = document.getElementById('name');
  const phoneForm = document.getElementById('phone');
  const emailForm = document.getElementById('email');

  const nameErrorArea = document.getElementById('name-error-msg');
  const phoneErrorArea = document.getElementById('phone-error-msg');
  const emailErrorArea = document.getElementById('email-error-msg');

  function collectUserInput() {
    const name = nameForm.value.trim();
    const phone = phoneForm.value.trim();
    const email = emailForm.value.trim();

    return {
      name: name,
      phone: phone,
      email: email
    }
  }

  function validate(userInput) {
    const errorObjects = [];

    if (!isValidName(userInput.name)) {
      errorObjects.push({
        forElement: nameErrorArea,
        text: 'Invalid name format'
      });
    }

    if (!isValidPhone(userInput.phone)) {
      errorObjects.push({
        forElement: phoneErrorArea,
        text: 'Invalid phone format'
      });
    }

    if (!isValidEmail(userInput.email)) {
      errorObjects.push({
        forElement: emailErrorArea,
        text: 'Invalid email format'
      });
    }

    return errorObjects;
  }

  function isValidName(name) {
    return /^[\w ]{3,50}$/.test(name);
  }

  function isValidPhone(phone) {
    return /^(\+\d{1,3}[ -])?\d{2,3}[ -]?\d{2}[ -]?\d{2}$/.test(phone);
  }

  function isValidEmail(email) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  }

  function sendData(dataObject) {
    // send logic...
  }

  function reportErrorMessages(errorObjects) {
    errorObjects.forEach(error => {
      const area = error.forElement;
      const text = error.text;

      area.innerHTML = text;
      area.style.display = 'block';
    });
  }

  function clearErrorMessages(...errorAreas) {
    errorAreas.forEach(area => {
      area.innerHTML = '';
      area.style.display = 'none';
    });
  }

  function handleSubmitAttempt(event) {
    event.preventDefault();

    clearErrorMessages(
      nameErrorArea,
      phoneErrorArea,
      emailErrorArea
    );

    const userInput = collectUserInput();

    const errors = validate(userInput);

    if (errors.length === 0) {
      sendData(userInput);
    } else {
      reportErrorMessages(errors);
    }
  }

  function initializeModule() {
    submitButton.addEventListener('click', handleSubmitAttempt)
  }

  document.addEventListener('DOMContentLoaded', initializeModule);
})();