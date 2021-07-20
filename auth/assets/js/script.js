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
    code: '62',
    flag: 'flag-icon-id'
}
const lng_eng = {
   register: 'Register',
   contry: 'Country',
   fullname: 'Fullname',
   email: 'Email',
   telp: 'Telp',
   password: 'Password',
    confpass: 'Conf. Password',
    code: '44',
   flag: 'flag-icon-gb'
}
const default_language = navigator.language;
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
const f_flag = $('#flag');

function changelanguage(type = 'en') {
    var lang = lng_eng
    type = type.toLowerCase();
    if (type == 'id' || type == 'id-ID') {
        lang = lng_indo
    }
    lbl_register.html(lang.register)
    lbl_contry.html(lang.contry)
    lbl_fullname.html(lang.fullname)
    lbl_email.html(lang.email)
    lbl_telp.html(lang.telp)
    lbl_pass.html(lang.password)
    lbl_confpass.html(lang.confpass)
    
    btn_register.html(lang.register)

}

function changeTelp(type='en') {
    var lang = lng_eng
    type = type.toLowerCase();
    if (type == 'id' || type == 'id-ID') {
        lang = lng_indo
    }
    code_telp.attr({ disabled: false })
    code_telp.val(lang.code)
    code_telp.attr({ disabled: true })
    
    f_flag.removeClass('flag-icon-id')
    f_flag.removeClass('flag-icon-gb')
    f_flag.addClass(lang.flag)
}

    f_contry.change(function () {
        changelanguage(f_contry.val())
    })

    function getLocation() {
    return new Promise((reslove, reject) => {
        $.get('https://www.cloudflare.com/cdn-cgi/trace', function (data) {
            data = data.trim().split('\n').reduce(function(obj, pair) {
                pair = pair.split('=');
                return obj[pair[0]] = pair[1], obj;
            }, {});
            console.log(data.loc)
            if (data.loc) {
                changeTelp(data.loc.toLowerCase())
            }
        })
    })
}

$(document).ready(function () {
    if (default_language == 'id' || default_language == 'id-ID') {
        f_contry.children('[value="id"]').prop("selected", true)
    }
    getLocation()
    changelanguage(f_contry.val())
    
})