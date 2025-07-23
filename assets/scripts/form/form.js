(() => {
  const submitButton = document.getElementById('submit');

  const nameForm = document.getElementById('name');
  const phoneForm = document.getElementById('phone');
  const emailForm = document.getElementById('email');

  const nameErrorArea = document.getElementById('name-error-msg');
  const phoneErrorArea = document.getElementById('phone-error-msg');
  const emailErrorArea = document.getElementById('email-error-msg');

  const namePattern = /^[\w ']{3,50}$/;
  const phonePattern = /^(\+\d{1,3}[ -]?|0)(\(\d{1,4}\)|\d{1,4})[ -]?\d{3}[ -]?\d{2}[ -]?\d{2}$/;
  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  function collectUserInput() {
    const name = nameForm.value.trim();
    const phone = phoneForm.value.trim();
    const email = emailForm.value.trim();

    return {
      name: name,
      phone: phone,
      email: email
    };
  }

  function validate(userInput) {
    const errorObjects = [];

    const nameErrorMessage = validateName(userInput.name);
    if (nameErrorMessage) {
      errorObjects.push({
        forElement: nameErrorArea,
        text: nameErrorMessage
      });
    }

    const phoneErrorMessage = validatePhone(userInput.phone);
    if (phoneErrorMessage) {
      errorObjects.push({
        forElement: phoneErrorArea,
        text: phoneErrorMessage
      });
    }

    const emailErrorMessage = validateEmail(userInput.email);
    if (emailErrorMessage) {
      errorObjects.push({
        forElement: emailErrorArea,
        text: emailErrorMessage
      });
    }

    return errorObjects;
  }

  function validateName(name) {
    if (!name) {
      return 'Заполните поле';
    }
    if (!namePattern.test(name)) {
      return 'Недопустимое имя';
    }
    return '';
  }

  function validatePhone(phone) {
    if (!phone) {
      return 'Заполните поле';
    }
    if (!phonePattern.test(phone)) {
      return 'Убедитесь, что это правильный номер'
    }
    return '';
  }

  function validateEmail(email) {
    if (!email) {
      return 'Заполните поле';
    }
    if (!emailPattern.test(email)) {
      return 'Убедитесь, что это правильный e-mail'
    }
    return '';
  }

  function sendData(dataObject) {
    // send logic...
  }

  function reportErrorMessages(errorObjects) {
    errorObjects.forEach(error => {
      const area = error.forElement;
      const text = error.text;

      area.innerText = text;
      area.style.display = 'block';
    });
  }

  function clearErrorMessages(...errorAreas) {
    errorAreas.forEach(area => {
      area.innerText = '';
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
    submitButton.addEventListener('click', handleSubmitAttempt);
  }

  document.addEventListener('DOMContentLoaded', initializeModule);
})();