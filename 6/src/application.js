import keyBy from 'lodash/keyBy.js';
import has from 'lodash/has.js';
import isEmpty from 'lodash/isEmpty.js';
import * as yup from 'yup';
import onChange from 'on-change';
import axios from 'axios';

const routes = {
  usersPath: () => '/users',
};

const schema = yup.object().shape({
  name: yup.string().trim().required(),
  email: yup.string().required('email must be a valid email').email(),
  password: yup.string().required().min(6),
  passwordConfirmation: yup.string()
    .required('password confirmation is a required field')
    .oneOf(
      [yup.ref('password'), null],
      'password confirmation does not match to password',
    ),
});

// Этот объект можно использовать для того, чтобы обрабатывать ошибки сети.
// Это необязательное задание, но крайне рекомендуем попрактиковаться.
const errorMessages = {
  network: {
    error: 'Network Problems. Try again.',
  },
};

// Используйте эту функцию для выполнения валидации.
// Выведите в консоль её результат, чтобы увидеть, как получить сообщения об ошибках.
const validate = (fields) => {
  try {
    schema.validateSync(fields, { abortEarly: false });
    return {};
  } catch (e) {
    return keyBy(e.inner, 'path');
  }
};

// BEGIN

const signUpFormHandler = () => {
  const form = document.querySelector('form');

  const fields = {
    name: form.querySelector('#sign-up-name'),
    email: form.querySelector('#sign-up-email'),
    password: form.querySelector('#sign-up-password'),
    passwordConfirmation: form.querySelector('#sign-up-password-confirmation'),
  };

  const containerForm = document.querySelector('[data-container="sign-up"]');

  let complition = false;

  const button = form.querySelector('[type="submit"]');


  const updateInputs = () => {
    const { name, email, password, passwordConfirmation } = fields;
    const inputsText = {
      name: name.value,
      email: email.value,
      password: password.value,
      passwordConfirmation: passwordConfirmation.value,
    };

    const errors = validate(inputsText);

    form.querySelectorAll('.is-invalid').forEach(element => {
      element.classList.remove('is-invalid');
    });
    form.querySelectorAll('.invalid-feedback').forEach(element => {
      element.remove();
    });

    Object.entries(errors).forEach(([key, error]) => {
      const input = fields[key];
      if (input) {
        const messageAboutErr = document.createElement('div');
        messageAboutErr.classList.add('invalid-feedback');
        messageAboutErr.textContent = error.message;
        input.classList.add('is-invalid');
        input.after(messageAboutErr);
      }
    });

    complition = Object.values(fields).every(input => input.value !== '');

    if (isEmpty(errors) && complition) {
      button.removeAttribute('disabled');
    } else {
      button.setAttribute('disabled', true);
    }
  };

  form.querySelectorAll('.form-control').forEach(input => {
    input.addEventListener('input', (event) => {  
      event.preventDefault();
      updateInputs();
    });
  });

  form.addEventListener('submit', async (event) => {
    event.preventDefault();
    const {name, email, password} = fields;
    const inputsValues = {
      name: name.value,
      email: email.value,
      password: password.value,
    };
    await axios.post(routes.usersPath(), inputsValues);
    containerForm.innerHTML = 'User Created!';
  });
};

export default signUpFormHandler;

// END
