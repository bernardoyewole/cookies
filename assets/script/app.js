'use strict';

const dialog = document.querySelector('.dialog');
const login = document.querySelector('.login');
const submit = document.querySelector('.submit');
const modalBg = document.querySelector('.modal-bg');
const input = document.querySelector('.dialog form input')

login.addEventListener('click', function() {
    dialog.classList.remove('is-hidden');
    dialog.classList.add('is-visible');
    modalBg.classList.add('modal-bg-dark');
});

window.addEventListener('click', (event) => {
    if (event.target == modalBg || event.target == submit) {
        if (input.value !== "") {
            dialog.classList.remove('is-visible');
            dialog.classList.add('is-hidden');
            modalBg.classList.remove('modal-bg-dark');
        }
    }
});