const stores = {
    state: {
        files: [],
        loading: false,
        result: {
            upload: '',
            convert_img: [],
            convert_text: [],
            parsing_data: []
        }
    },
    mutations: {
        setLoading(state, val) {
            state.loading = val
        },
        setFiles(state, val) {
            state.files = val
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
        addResult_toText(state, val) {
            state.result.convert_text.push(val)
        },
        setResult_parsing(state, val) {
            state.result.parsing_data = val
        }
    },
    actions: {
        uploadFiles(context) {
            return new Promise((resolve, reject) => {
                var formData = new FormData();
                for (let file of state.files) {
                    formData.append('files[]', file, file.name);
                }
                axios.post('api/upload.php', formData, {
                    headers: {
                        'Content-Type': 'multipart/form-data'
                    }
                }).then(resp => {
                    context.commit('setResult', resp)
                    resolve(true)
                }).catch(err => {
                    context.commit('setResult', [])
                    resolve(false)
                    console.log(err)
                })
            })
        }
    },
    getters: {
        getLoading(state) {
            return state.loading
        },
        getFiles(state) {
            return state.files
        }
    },
    modules: {}
};

export default stores;