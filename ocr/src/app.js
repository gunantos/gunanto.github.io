"use strict";
const homePage = () => import(BASE_URL + "/src/page/homePage.js");
const JsonEditor = () => import(BASE_URL+"/src/vue-json-edit.js");
Vue.use(JsonEditor)
Vue.use(Vuex)
Vue.use(VueRouter)
const store = new Vuex.Store({
    state: {
        files:  [],
        loading: false,
        result: {
            upload: '',
            convert_img: [],
            convert_text: []
        },
        hasil: [],
        logfile: localStorage.getItem('jsontemp') || null
    },
    mutations: {
        setLoading(state, val) {
            state.loading = val
        },
        setFiles(state, val) {
            state.files = val
        },
        setResult(state, val) {
            state.result = val
        },
         setResult_upload(state, val) {
            state.result.upload = val
        },
        setResult_toImg(state, val) {
            state.result.convert_img = val
        },
        setResult_toText(state, val) {
            state.result.convert_text = val
        },
        setHasil(state, val) {
            state.hasil = val
        },
        setLogFile(state, val) {
            if (val !== undefined) {
                state.logfile = val
                localStorage.setItem('jsontemp', val)
            }
        }
    },
    getters: {
        getLoading(state) {
            return state.loading
        },
        getFiles(state) {
            return state.files
        },
        hasil(state) {
            return state.hasil
        },
        logfile(state) {
            return state.logfile
        },
        getCountPagePDF(state) {
            const d = state.result.convert_text
            if (typeof d == 'object' || typeof d == 'array') {
                return d.length;
            }
            return 0
        },
        getCountPageDetect(state) {
            const h = state.hasil
            var ttl = 0
            if (typeof h == 'array' || typeof h == 'object')
            {
                h.forEach(el => { 
            console.log(el)
                    if (el.data !== undefined) {
                        if (el.data.page !== undefined) {
                            if (typeof el.data.page == 'array' || typeof el.data.page == 'object') {
                                ttl += el.data.page.length
                            }
                        }
                    }
                })
            }
            return ttl
        }
    }
})
const routes = [
    { path: '/', component: homePage, alias: '/home' },
    {
        path: '/test', redirect: to => {
        return '/path'
        }
    },
     { path: '*', component: homePage },
]

var router = new VueRouter({
    mode: 'history',
    routes: routes,

})
const bodyCmp = () => import(BASE_URL + '/src/component/container.js')
const APP = new Vue({
    router: router,
    store: store,
    template: `<body-cmp></body-cmp>`,
    components: {
        'home-page': homePage,
        'body-cmp': bodyCmp
    },
     JsonEditor,
    vuetify: new Vuetify()
}).$mount('#app')