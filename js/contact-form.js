(function () {
  "use strict";

  const VALIDATION_RULES = {
    name: {
      required: true,
      minLength: 2,
      maxLength: 80,
      pattern: /^[\p{L}\p{M}'\-. ]+$/u,
      messages: {
        required: "Full name is required.",
        minLength: "Name must be at least 2 characters.",
        maxLength: "Name must be 80 characters or fewer.",
        pattern: "Name can only contain letters, spaces, hyphens, and apostrophes.",
      },
    },
    email: {
      required: true,
      maxLength: 120,
      pattern: /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/,
      messages: {
        required: "Email address is required.",
        maxLength: "Email must be 120 characters or fewer.",
        pattern: "Enter a valid email address (e.g. name@example.com).",
      },
    },
    phone: {
      required: false,
      maxLength: 20,
      pattern: /^[+]?[\d\s().-]{7,20}$/,
      messages: {
        maxLength: "Phone number must be 20 characters or fewer.",
        pattern: "Enter a valid phone number.",
      },
    },
    subject: {
      required: true,
      minLength: 3,
      maxLength: 120,
      messages: {
        required: "Subject is required.",
        minLength: "Subject must be at least 3 characters.",
        maxLength: "Subject must be 120 characters or fewer.",
      },
    },
    message: {
      required: true,
      minLength: 10,
      maxLength: 1000,
      messages: {
        required: "Message is required.",
        minLength: "Message must be at least 10 characters.",
        maxLength: "Message must be 1000 characters or fewer.",
      },
    },
  };

  const form = document.getElementById("contact-form");
  const successBanner = document.getElementById("form-success");
  const errorSummary = document.getElementById("form-error-summary");
  const errorSummaryList = document.getElementById("error-summary-list");
  const submitBtn = document.getElementById("submit-btn");
  const messageField = document.getElementById("message");
  const messageCounter = document.getElementById("message-counter");

  if (!form) return;

  function getField(name) {
    return form.elements.namedItem(name);
  }

  function getErrorElement(name) {
    return document.getElementById(name + "-error");
  }

  function trimValue(value) {
    return typeof value === "string" ? value.trim() : "";
  }

  function validateField(name) {
    const rules = VALIDATION_RULES[name];
    const field = getField(name);
    const value = trimValue(field.value);
    const errors = [];

    if (rules.required && !value) {
      errors.push(rules.messages.required);
    }

    if (value && rules.minLength && value.length < rules.minLength) {
      errors.push(rules.messages.minLength);
    }

    if (value && rules.maxLength && value.length > rules.maxLength) {
      errors.push(rules.messages.maxLength);
    }

    if (value && rules.pattern && !rules.pattern.test(value)) {
      errors.push(rules.messages.pattern);
    }

    return errors[0] || "";
  }

  function setFieldState(name, errorMessage) {
    const field = getField(name);
    const errorEl = getErrorElement(name);
    const isInvalid = Boolean(errorMessage);

    field.setAttribute("aria-invalid", isInvalid ? "true" : "false");
    field.classList.toggle("contact-form__input--invalid", isInvalid);
    field.classList.toggle("contact-form__textarea--invalid", isInvalid);
    errorEl.textContent = errorMessage;
  }

  function validateForm() {
    const fieldNames = Object.keys(VALIDATION_RULES);
    const errors = [];

    fieldNames.forEach(function (name) {
      const message = validateField(name);
      setFieldState(name, message);

      if (message) {
        errors.push({ name: name, message: message });
      }
    });

    return errors;
  }

  function updateErrorSummary(errors) {
    errorSummaryList.innerHTML = "";

    if (errors.length === 0) {
      errorSummary.hidden = true;
      return;
    }

    errors.forEach(function (error) {
      const item = document.createElement("li");
      const link = document.createElement("a");
      const field = getField(error.name);
      const label = form.querySelector('label[for="' + error.name + '"]');

      link.href = "#" + error.name;
      link.textContent =
        (label ? label.textContent.replace("*", "").trim() : error.name) +
        ": " +
        error.message;

      link.addEventListener("click", function (event) {
        event.preventDefault();
        field.focus();
      });

      item.appendChild(link);
      errorSummaryList.appendChild(item);
    });

    errorSummary.hidden = false;
  }

  function updateMessageCounter() {
    const length = messageField.value.length;
    const max = VALIDATION_RULES.message.maxLength;

    messageCounter.textContent = length + " / " + max;
    messageCounter.classList.toggle(
      "contact-form__counter--warning",
      length > max * 0.9
    );
  }

  function setSubmitting(isSubmitting) {
    form.classList.toggle("contact-form--submitting", isSubmitting);
    submitBtn.disabled = isSubmitting;
  }

  function showSuccess() {
    successBanner.hidden = false;
    form.hidden = true;
    successBanner.focus({ preventScroll: true });
  }

  function resetFormState() {
    Object.keys(VALIDATION_RULES).forEach(function (name) {
      setFieldState(name, "");
    });

    updateErrorSummary([]);
    updateMessageCounter();
    successBanner.hidden = true;
    form.hidden = false;
    setSubmitting(false);
  }

  function handleFieldBlur(event) {
    const name = event.target.name;
    if (!VALIDATION_RULES[name]) return;

    const message = validateField(name);
    setFieldState(name, message);
  }

  function handleFieldInput(event) {
    const name = event.target.name;

    if (name === "message") {
      updateMessageCounter();
    }

    const field = getField(name);
    if (field.getAttribute("aria-invalid") === "true") {
      const message = validateField(name);
      setFieldState(name, message);
    }
  }

  function handleSubmit(event) {
    event.preventDefault();

    const errors = validateForm();
    updateErrorSummary(errors);

    if (errors.length > 0) {
      getField(errors[0].name).focus();
      return;
    }

    setSubmitting(true);

    // Simulates an API call — replace with fetch() when a backend is available.
    window.setTimeout(function () {
      setSubmitting(false);
      showSuccess();
    }, 900);
  }

  form.addEventListener("submit", handleSubmit);
  form.addEventListener("reset", function () {
    window.setTimeout(resetFormState, 0);
  });

  form.addEventListener("blur", handleFieldBlur, true);
  form.addEventListener("input", handleFieldInput, true);

  updateMessageCounter();
})();
