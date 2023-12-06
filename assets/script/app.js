'use strict';

import { onEvent, select, selectAll, create, print } from "./utils.js";

const modalBg = select('.modal-bg');
const modalOne = select('.modal-one');
const acceptBtn = select('.accept');
const settingsBtn = select('.settings');
const modalTwo = select('.modal-two');
const inputs = selectAll('.modal-two input');

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
    setCookie('Operating System', getOS(), 15);
    print(document.cookie);
    // print(getCookie('Browser'));
});

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

