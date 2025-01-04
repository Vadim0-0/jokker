
document.addEventListener("DOMContentLoaded", () => {
  const nameInput = document.getElementById('nameInput');
  const nextButton = document.getElementById('nextButton');

  if (!nameInput || !nextButton) {
    return;
  }

  const maxLength = parseInt(nameInput.getAttribute('maxlength'), 10) || 15;

  nameInput.addEventListener('keypress', (event) => {
    const char = String.fromCharCode(event.keyCode);
    // Разрешаем латиницу и кириллицу
    if (!/^[a-zA-ZА-яЁё]+$/.test(char)) {
      event.preventDefault();
    }
  });

  nameInput.addEventListener('input', () => {
    // Проверяем, что ввод содержит от 1 до maxLength символов латиницы или кириллицы
    const isValid = new RegExp(`^[a-zA-ZА-яЁё]{1,${maxLength}}$`).test(nameInput.value);
    if (isValid) {
      nextButton.classList.add('active');
      nextButton.disabled = false;
    } else {
      nextButton.classList.remove('active');
      nextButton.disabled = true;
    }
  });

  nextButton.addEventListener('click', () => {
    const targetUrl = nextButton.getAttribute('data-href');
    if (targetUrl) {
      window.location.href = targetUrl;
    } else {
      alert('Next page not set');
    }
  });

  const updateButtonPosition = () => {
    if (window.visualViewport) {
      const viewportHeight = window.visualViewport.height;
      const totalHeight = window.innerHeight;
      nextButton.style.bottom = `${totalHeight - viewportHeight}px`;
    }
  };

  window.visualViewport?.addEventListener('resize', updateButtonPosition);
  window.addEventListener('resize', updateButtonPosition);
  updateButtonPosition();
});

document.addEventListener("DOMContentLoaded", () => {
  const dayInputs = document.querySelectorAll('.day');
  const monthInputs = document.querySelectorAll('.month');
  const yearInputs = document.querySelectorAll('.year');
  const nextButton = document.getElementById('nextButton');

  if (!dayInputs || !monthInputs || !yearInputs || !nextButton) {
    return;
  }

  // Функция для ограничения ввода только цифр
  const restrictInput = (inputs) => {
    inputs.forEach((input, index) => {
      input.addEventListener('keydown', (event) => {
        if (event.key === "Backspace" || event.key === "Delete") {
          return;
        }

        if (input.value.length >= 1) {
          event.preventDefault();
        }
      });

      input.addEventListener('input', (event) => {
        if (input.value.length === 1 && index < inputs.length - 1) {
          inputs[index + 1].focus();
        }

        if (input.value.length === 0 && index > 0 && !input.hasFocusMoved) {
          input.hasFocusMoved = true;
          inputs[index - 1].focus();
        }

        if (input.value.length > 0) {
          input.hasFocusMoved = false;
        }

        validateForm();
      });

      input.addEventListener('focus', () => {
        input.hasFocusMoved = false;
      });
    });
  };

  // Функция для валидации формы
  const validateForm = () => {
    const day = Array.from(dayInputs).map(input => input.value).join('');
    const month = Array.from(monthInputs).map(input => input.value).join('');
    const year = Array.from(yearInputs).map(input => input.value).join('');

    const dayValid = day.length === 2 && parseInt(day) >= 1 && parseInt(day) <= 31;
    const monthValid = month.length === 2 && parseInt(month) >= 1 && parseInt(month) <= 12;
    const yearValid = year.length === 4 && parseInt(year) >= 1900 && parseInt(year) <= new Date().getFullYear();

    if (dayValid && monthValid && yearValid) {
      nextButton.classList.add('active');
      nextButton.disabled = false;
    } else {
      nextButton.classList.remove('active');
      nextButton.disabled = true;
    }
  };

  restrictInput(dayInputs);
  restrictInput(monthInputs);
  restrictInput(yearInputs);

  nextButton.addEventListener('click', () => {
    const targetUrl = nextButton.getAttribute('data-href');
    if (targetUrl) {
      window.location.href = targetUrl;
    }
  });

  // Функция для корректного позиционирования кнопки
  const updateButtonPosition = () => {
    if (window.visualViewport) {
      const viewportHeight = window.visualViewport.height;
      const totalHeight = window.innerHeight;
      nextButton.style.bottom = `${totalHeight - viewportHeight}px`;
    }
  };

  window.visualViewport?.addEventListener('resize', updateButtonPosition);
  window.addEventListener('resize', updateButtonPosition);
  updateButtonPosition();
});

document.addEventListener("DOMContentLoaded", () => {
  const heightInputs = document.querySelectorAll('.enterHeight');
  const nextButton = document.getElementById('nextButton');

  if (!heightInputs || heightInputs.length === 0 || !nextButton) {
    return;
  }

  // Функция для ограничения ввода только цифр
  const restrictInput = (inputs) => {
    inputs.forEach((input, index) => {
      input.addEventListener('keydown', (event) => {
        if (event.key === "Backspace" || event.key === "Delete" || event.key === "Tab") {
          return;
        }

        if (isNaN(event.key)) {
          event.preventDefault();
        }

        if (input.value.length >= 1 && !isNaN(event.key)) {
          event.preventDefault();
        }
      });

      input.addEventListener('input', (event) => {
        if (input.value.length === 1 && !isNaN(input.value) && index < inputs.length - 1) {
          inputs[index + 1].focus();
        }

        if (input.value.length === 0 && index > 0 && !input.hasFocusMoved) {
          input.hasFocusMoved = true;
          inputs[index - 1].focus();
        }

        if (input.value.length > 0) {
          input.hasFocusMoved = false;
        }

        validateForm();
      });

      input.addEventListener('focus', () => {
        input.hasFocusMoved = false;
      });
    });
  };

  const validateForm = () => {
    const height = Array.from(heightInputs).map(input => input.value).join('');

    const heightValid = height.length === 3 && !isNaN(height) && parseInt(height) >= 100 && parseInt(height) <= 250; // Пример диапазона

    if (heightValid) {
      nextButton.classList.add('active');
      nextButton.disabled = false;
    } else {
      nextButton.classList.remove('active');
      nextButton.disabled = true;
    }
  };

  restrictInput(heightInputs);

  nextButton.addEventListener('click', () => {
    const height = Array.from(heightInputs).map(input => input.value).join('');
    const targetUrl = nextButton.getAttribute('data-href');
    if (targetUrl) {
      window.location.href = `${targetUrl}?height=${height}`;
    } else {
      alert(`Height: ${height} cm`);
    }
  });

  const updateButtonPosition = () => {
    if (window.visualViewport) {
      const viewportHeight = window.visualViewport.height;
      const totalHeight = window.innerHeight;
      nextButton.style.bottom = `${totalHeight - viewportHeight}px`;
    }
  };

  window.visualViewport?.addEventListener('resize', updateButtonPosition);
  window.addEventListener('resize', updateButtonPosition);
  updateButtonPosition();
});


document.addEventListener("DOMContentLoaded", () => {
  const choiceButtons = document.querySelectorAll('.choise-btn');
  const selectedContainer = document.getElementById('infoChoice');
  const nextButton = document.getElementById('nextButton');
  const maxSelections = parseInt(nextButton.getAttribute('data-max-selections'));
  const nextUrl = nextButton.getAttribute('data-next-url');

  if (!choiceButtons || !selectedContainer || !nextButton) {
    return;
  }

  let selectedItems = [];

  function updateNextButton() {
    nextButton.textContent = `Далее ${selectedItems.length}/${maxSelections}`;
    nextButton.disabled = selectedItems.length === 0;
    nextButton.classList.toggle('active', selectedItems.length > 0);
  }

  function createSelectedItem(text) {
    const item = document.createElement('div');
    item.classList.add('selected-item');

    const descr = document.createElement('p');
    descr.textContent = text;

    const removeBtn = document.createElement('button');
    removeBtn.classList.add('remove-btn');
    removeBtn.innerHTML = '<svg width="10" height="10" viewBox="0 0 10 10" fill="none" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" clip-rule="evenodd" d="M8.65542 0L10 1.34458L6.34326 4.99868L10 8.65542L8.65542 10L5.00132 6.34326L1.34458 10L0 8.65542L3.65674 4.99868L0 1.34458L1.34458 0L5.00132 3.65674L8.65542 0Z" fill="white"/></svg>';
    removeBtn.addEventListener('click', () => {
      selectedItems = selectedItems.filter(selected => selected !== text);
      selectedContainer.removeChild(item);
      updateNextButton();
    });

    item.appendChild(descr);
    item.appendChild(removeBtn);

    return item;
  }

  choiceButtons.forEach(button => {
    button.addEventListener('click', () => {
      const text = button.textContent;

      if (!selectedItems.includes(text) && selectedItems.length < maxSelections) {
        selectedItems.push(text);
        const newItem = createSelectedItem(text);
        selectedContainer.appendChild(newItem);
        updateNextButton();
      }
    });
  });

  nextButton.addEventListener('click', () => {
    if (!nextButton.disabled) {
      window.location.href = nextUrl;
    }
  });
});


document.addEventListener("DOMContentLoaded", () => {
  const contentBlocks = document.querySelectorAll(".enterLifestyle__content-blocks__block-choice__btns");
  const submitButton = document.querySelector(".enterLifestyle__content-bottom__content-btn");
  const errorMessage = document.querySelector(".error-message-button");

  if (!contentBlocks.length || !submitButton || !errorMessage) {
    return;
  }

  const checkBlocksCompletion = () => {
    let allComplete = true;

    contentBlocks.forEach((block) => {
      const parentBlock = block.closest(".enterLifestyle__content-blocks__block");
      const isChecked = block.querySelector("input:checked");

      const iconError = parentBlock.querySelector(".icon-error");
      if (isChecked) {
        parentBlock.classList.remove("error");
        if (iconError) {
          iconError.style.display = "none";
        }
      } else {
        allComplete = false;
        parentBlock.classList.add("error");
        if (iconError) {
          iconError.style.display = "inline-block";
        }
      }
    });

    if (allComplete) {
      submitButton.classList.add("active");
      submitButton.disabled = false;
    } else {
      submitButton.classList.remove("active");
      submitButton.disabled = true;
    }

    errorMessage.style.display = allComplete ? "none" : "block";
  };

  contentBlocks.forEach((block) => {
    block.addEventListener("click", (event) => {
      const item = event.target.closest(".item");

      if (item) {
        const checkbox = item.querySelector("input[type='checkbox']");
        if (checkbox) {
          checkbox.checked = !checkbox.checked;
          item.classList.toggle("active", checkbox.checked);
        }
        checkBlocksCompletion();
      }
    });
  });

  submitButton.addEventListener("click", (event) => {
    checkBlocksCompletion();

    if (submitButton.disabled) {
      contentBlocks.forEach((block) => {
        const parentBlock = block.closest(".enterLifestyle__content-blocks__block");
        const isChecked = block.querySelector("input:checked");

        const iconError = parentBlock.querySelector(".icon-error");
        if (!isChecked) {
          parentBlock.classList.add("error");
          if (iconError) {
            iconError.style.display = "inline-block";
          }
        }
      });
      event.preventDefault();
    } else {
      const nextPage = submitButton.getAttribute("data-href");
      if (nextPage) {
        window.location.href = nextPage;
      }
    }
  });
});

document.addEventListener("DOMContentLoaded", () => {
  const contentBlocks = document.querySelectorAll(".about__content-blocks__block-choice__btns");
  const submitButton = document.querySelector(".about__content-bottom__content-btn");
  const errorMessage = document.querySelector(".error-message-button");
  const textarea = document.querySelector("#about-descr");
  const charCounter = document.querySelector("#aboutDescrValue");

  if (!contentBlocks.length || !submitButton || !errorMessage || !charCounter || !textarea) {
    return;
  }

  // Получаем максимальное количество символов из атрибута maxlength
  const MAX_CHAR_COUNT = parseInt(textarea.getAttribute("maxlength"), 10) || 300;

  // Инициализируем значение счётчика символов
  charCounter.textContent = `0/${MAX_CHAR_COUNT}`;

  const checkBlocksCompletion = () => {
    let allComplete = true;

    contentBlocks.forEach((block) => {
      const parentBlock = block.closest(".about__content-blocks__block");
      const isChecked = block.querySelector("input:checked");

      const iconError = parentBlock.querySelector(".icon-error");
      if (isChecked) {
        parentBlock.classList.remove("error");
        if (iconError) {
          iconError.style.display = "none";
        }
      } else {
        allComplete = false;
        parentBlock.classList.add("error");
        if (iconError) {
          iconError.style.display = "inline-block";
        }
      }
    });

    if (allComplete) {
      submitButton.classList.add("active");
      submitButton.disabled = false;
      errorMessage.style.display = "none";
    } else {
      submitButton.classList.remove("active");
      submitButton.disabled = true;
      errorMessage.style.display = "flex";
    }
  };

  contentBlocks.forEach((block) => {
    block.addEventListener("click", (event) => {
      const item = event.target.closest(".item");

      if (item) {
        const checkbox = item.querySelector("input[type='checkbox']");
        if (checkbox) {
          checkbox.checked = !checkbox.checked;
          item.classList.toggle("active", checkbox.checked);
        }
        checkBlocksCompletion();
      }
    });
  });

  if (textarea) {
    textarea.addEventListener("input", () => {
      const charCount = textarea.value.length;
      charCounter.textContent = `${charCount}/${MAX_CHAR_COUNT}`;

      if (charCount > MAX_CHAR_COUNT) {
        charCounter.classList.add("error");
      } else {
        charCounter.classList.remove("error");
      }
    });
  }

  submitButton.addEventListener("click", (event) => {
    checkBlocksCompletion();

    if (submitButton.disabled) {
      contentBlocks.forEach((block) => {
        const parentBlock = block.closest(".about__content-blocks__block");
        const isChecked = block.querySelector("input:checked");

        const iconError = parentBlock.querySelector(".icon-error");
        if (!isChecked) {
          parentBlock.classList.add("error");
          if (iconError) {
            iconError.style.display = "inline-block";
          }
        }
      });
      event.preventDefault();
    } else {
      const nextPage = submitButton.getAttribute("data-href");
      if (nextPage) {
        window.location.href = nextPage;
      }
    }
  });
});
