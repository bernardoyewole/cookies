'use strict';

import { onEvent, select, selectAll, create, print } from "./utils.js";

const modalBg = select('.modal-bg');
const modalOne = select('.modal-one');
const acceptBtn = select('.accept');
const settingsBtn = select('.settings');
const modalTwo = select('.modal-two');
const saveBtn= select('.save');

function showModal() {
    modalOne.classList.add('block');
    modalBg.classList.add('modal-bg-dark');
}

onEvent('load', window, () => {
    if (!document.cookie.length > 0) {
        setTimeout(showModal, 2000);
    }
});

onEvent('click', settingsBtn, () => {
    modalTwo.classList.add('block');
});

onEvent('click', acceptBtn, () => {
    setCookie('Browser', getBrowser(), 15);
    setCookie('Operating system', getOS(), 15);
    setCookie('Screen width', getScreenWidth(), 15);
    setCookie('Screen height', getScreenHeight(), 15);
    // print(document.cookie);
    // print(getCookie('Browser'));
});

onEvent('click', saveBtn, () => {
    let inputs = selectAll('.modal-two input');
    setPreferences(inputs);
})

function setPreferences(arr) {
    let options = ['Browser', 'Operating System', 'Screen width', 'Screen Height']
    let functions = [getBrowser(), getOS(), getScreenWidth(), getScreenHeight()];
    for (let i = 0; i < arr.length; i++) {
        if (arr[i].checked) {
            setCookie(`${options[i]}`, functions[i], 15);
        }
    }
}

function getBrowser() {
    let browserArr = navigator.userAgent.split(' ');
    for (let i = browserArr.length - 1; i >= 0;  i--) {
        if (browserArr[i].match(/firefox/i)) {
            return `Firefox`;
        } else if (browserArr[i].match(/edg/i)) {
            return `Edge`;
        } else {
            return `Chrome`;
        }
    }
}

function getOS() {
    if (navigator.userAgent.indexOf("Windows") != -1) {
        return 'Windows';
    } else if (navigator.userAgent.indexOf("Mac OS") != -1) {
        return 'Mac OS';
    } else {
        return 'Linux';
    } 
}

function getScreenHeight() {
    return window.innerHeight;
}

function getScreenWidth() {
    return window.innerWidth;
}

function getCookie(name) {
    let matches = document.cookie.match(new RegExp(
        "(?:^|; )" + name.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g, '\\$1') + "=([^;]*)"
    ));

    return matches ? decodeURIComponent(matches[1]) : undefined;
}

// print(getCookie('Browser'));

function setCookie(name, value, life) {
    document.cookie = `${name}=${value}; path=/; max-age=${life}; SameSite=Lax`;
}

print(document.cookie);