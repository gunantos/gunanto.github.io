"use strict"
var filesadded = "";
function loadjscssfile(filename, filetype, async){
    if (filetype=="js"){
        var fileref=document.createElement('script')
        fileref.setAttribute("type", "text/javascript")
        fileref.setAttribute("src", filename)
        document.getElementsByTagName("body")[0].appendChild(fileref)
    }
    else if (filetype=="css"){
        var fileref=document.createElement("link")
        fileref.setAttribute("rel", "stylesheet")
        fileref.setAttribute("type", "text/css")
        fileref.setAttribute("href", filename)
        document.getElementsByTagName("head")[0].appendChild(fileref)
    }
    else if (filetype == 'module') {
        var fileref=document.createElement('script')
        fileref.setAttribute("type","module")
        fileref.setAttribute("src", filename)
        document.getElementsByTagName("body")[0].appendChild(fileref)
    }
    else if (filetype == 'vue') {
        var fileref=document.createElement('script')
        fileref.setAttribute("type","text/x-template")
        fileref.setAttribute("src", filename)
        document.getElementsByTagName("body")[0].appendChild(fileref)
    }
        
}

function _loadall(list_file, async = true) {
    for (let i = 0; i < list_file.length; i++) {
        var filename = list_file[i];
        var file_type = filename.substring(filename.lastIndexOf('.') + 1, filename.length) || 'js';
        if (file_type == 'module') {
            filename = filename.replace('.module', '');
        } else if(file_type === 'vue') {
            file_type = 'vue'
        } else if (file_type !== 'css' && file_type !== 'js') {
                file_type = 'js';
        }
        if (filesadded.indexOf("[" + filename + "]") == -1) {
                loadjscssfile(filename, file_type, async)
                filesadded += "[" + filename + "]" //List of files added in the form "[filename1],[filename2],etc"
        }
    }
}
// dev = https://cdn.jsdelivr.net/npm/vue@2.6.12/dist/vue.js
// prod = https://cdn.jsdelivr.net/npm/vue@2.6.12
_loadall([
    'https://cdn.jsdelivr.net/npm/es6-promise@4/dist/es6-promise.auto.js',
    'https://cdn.jsdelivr.net/npm/@mdi/font@4.x/css/materialdesignicons.min.css',
    'https://cdn.jsdelivr.net/npm/vuetify@2.x/dist/vuetify.min.css',
    'https://cdn.jsdelivr.net/npm/vue@2.6.12/dist/vue.min.js',
    'https://cdn.jsdelivr.net/npm/vuetify@2.x/dist/vuetify.js',
    'https://cdn.jsdelivr.net/npm/vue-router@3.5.1/dist/vue-router.min.js',
    'https://cdn.jsdelivr.net/npm/vuex@3.6.2/dist/vuex.min.js',
    'https://cdn.jsdelivr.net/npm/axios/dist/axios.min.js'
], true);

function showBody() {
    document.querySelector("#loader").style.display = "none";
        document.querySelector("body").style.visibility = "visible";
}
document.onreadystatechange = function() {
    if (document.readyState === "complete") {
        _loadall([
            BASE_URL+'/src/app.js.module'
        ], false);
        showBody()
    } else {
       document.querySelector("body").style.visibility = "hidden";
        document.querySelector("#loader").style.visibility = "visible";
    }
};

