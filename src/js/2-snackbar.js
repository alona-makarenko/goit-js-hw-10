import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

const form = document.querySelector('.form');

const toastOptions = {
  position: 'topRight',
  timeout: 3000,
};

form.addEventListener('submit', event => {
  event.preventDefault();

  const delay = Number(event.target.elements.delay.value);
  const state = event.target.elements.state.value;

  new Promise((resolve, reject) => {
    setTimeout(() => {
      state === 'fulfilled' ? resolve(delay) : reject(delay);
    }, delay);
  })
    .then(delay => {
      console.log(`✅ Fulfilled promise in ${delay}ms`);
      iziToast.success({
        ...toastOptions,
        title: 'Fulfilled',
        message: `Promise in ${delay}ms`,
      });
    })
    .catch(delay => {
      console.log(`❌ Rejected promise in ${delay}ms`);
      iziToast.error({
        ...toastOptions,
        title: 'Rejected',
        message: `Promise in ${delay}ms`,
      });
    })
    .finally(() => {
      form.reset();
    });
});
