"use strict";

    console.log('test')
const lng_indo = {
    register: 'Daftar',
    contry: 'Negara',
    fullname: 'Nama Lengkap',
    email: 'Surel',
    telp: 'Telp',
    password: 'Sandi',
    confpass: 'Ulangi Sandi',
    code: '+62'
}
const lng_eng = {
   register: 'Register',
   contry: 'Country',
   fullname: 'Fullname',
   email: 'Email',
   telp: 'Telp',
   password: 'Password',
    confpass: 'Conf. Password',
   code: '+44'
}

const lbl_register = $('#lbl-register');
const lbl_contry = $('#lbl-contry');
const lbl_fullname = $('#lbl-fullname');
const lbl_email = $('#lbl-email');
const lbl_telp = $('#lbl-telp');
const lbl_pass = $('#lbl-password');
const lbl_confpass = $('#lbl-cnfpass');
const btn_register = $('#lbl-btn');
const f_contry = $('#country');
const f_fullname = $('#fullname');
const f_email = $('#email')
const f_telp = $('#telp');
const f_pass = $('#password');
const code_telp = $('#code-telp');
const f_confpass = $('#confpass');

function changelanguage(type = 'en') {
    var lang = lng_eng
    if (type == 'id') {
        console.log('test')
        lang = lng_indo
    }
    console.log(type)
    lbl_register.html(lang.register)
    lbl_contry.html(lang.contry)
    lbl_fullname.html(lang.fullname)
    lbl_email.html(lang.email)
    lbl_telp.html(lang.telp)
    lbl_pass.html(lang.password)
    lbl_confpass.html(lang.password)
    code_telp.attr({ disabled: false })
    code_telp.val(lang.code)
    code_telp.attr({ disabled: true })
    btn_register.html(lang.register)
}

    f_contry.change(function () {
        changelanguage(f_contry.val())
    })
$(document).ready(function () {
    changelanguage(f_contry.val())
})