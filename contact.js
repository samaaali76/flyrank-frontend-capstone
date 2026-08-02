(function () {
  "use strict";

  var EMAIL_REGEX = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

  var form = document.getElementById("contact-form");
  var submitBtn = document.getElementById("contact-submit");
  var successEl = document.getElementById("contact-success");

  var fields = {
    name: {
      input: document.getElementById("contact-name"),
      error: document.getElementById("contact-name-error"),
      validate: validateName,
    },
    email: {
      input: document.getElementById("contact-email"),
      error: document.getElementById("contact-email-error"),
      validate: validateEmail,
    },
    message: {
      input: document.getElementById("contact-message"),
      error: document.getElementById("contact-message-error"),
      validate: validateMessage,
    },
  };

  var touched = {
    name: false,
    email: false,
    message: false,
  };

  function trimValue(input) {
    return input.value.trim();
  }

  function validateName(value) {
    if (!value) {
      return "Name is required.";
    }
    if (value.length < 2) {
      return "Name must be at least 2 characters.";
    }
    return "";
  }

  function validateEmail(value) {
    if (!value) {
      return "Email is required.";
    }
    if (!EMAIL_REGEX.test(value)) {
      return "Please enter a valid email address.";
    }
    return "";
  }

  function validateMessage(value) {
    if (!value) {
      return "Message is required.";
    }
    if (value.length < 10) {
      return "Message must be at least 10 characters.";
    }
    return "";
  }

  function showFieldError(field, message) {
    field.error.textContent = message;
    field.input.classList.toggle("contact-form__input--invalid", Boolean(message));
    field.input.setAttribute("aria-invalid", message ? "true" : "false");
  }

  function validateField(key, showError) {
    var field = fields[key];
    var value = trimValue(field.input);
    var message = field.validate(value);

    if (showError) {
      showFieldError(field, message);
    }

    return !message;
  }

  function hideSuccess() {
    successEl.hidden = true;
    successEl.textContent = "";
  }

  Object.keys(fields).forEach(function (key) {
    var field = fields[key];

    field.input.addEventListener("blur", function () {
      touched[key] = true;
      validateField(key, true);
    });

    field.input.addEventListener("input", function () {
      hideSuccess();
      if (touched[key]) {
        validateField(key, true);
      }
    });
  });

  form.addEventListener("submit", function (event) {
    event.preventDefault();
    hideSuccess();

    Object.keys(touched).forEach(function (key) {
      touched[key] = true;
    });

    var isValid = Object.keys(fields).every(function (key) {
      return validateField(key, true);
    });

    if (!isValid || submitBtn.disabled) {
      return;
    }

    submitBtn.disabled = true;
    submitBtn.textContent = "Sending…";

    window.setTimeout(function () {
      successEl.textContent = "Thank you! Your message has been sent successfully.";
      successEl.hidden = false;
      form.reset();

      Object.keys(touched).forEach(function (key) {
        touched[key] = false;
      });

      Object.keys(fields).forEach(function (key) {
        showFieldError(fields[key], "");
      });

      submitBtn.disabled = false;
      submitBtn.textContent = "Send Message";
    }, 1000);
  });
})();
