
const homePage = () => import(BASE_URL + "/src/page/homePage.js");
const bodyCmp = {
  template: `    <v-app id="inspire">
  <v-app-bar
  app
  color="#F57C00"
  dark
  flat
  >
  <v-container class="py-0 fill-height">
  <v-avatar class="mr-10" color="grey darken-1" size="32"></v-avatar>
 <v-btn
          v-for="link in links"
          :key="link"
          text
        >
          {{ link }}
        </v-btn>
  <v-spacer></v-spacer>
  <v-responsive max-width="260">
          <v-text-field
            dense
            flat
            hide-details
            rounded
            solo-inverted
          ></v-text-field>
        </v-responsive>
      </v-container>
  </v-app-bar>
   <v-main class="grey lighten-3">
      <v-container>
      <v-file-input
      :loading="loading"
    v-model="files"
    color="deep-purple accent-4"
    counter
    label="File input"
    prepend-icon="mdi-paperclip"
    accept="application/pdf"
    placeholder="Select your files"
    outlined
    :show-size="1000"
  >
  <template v-slot:prepend>
    <div>Input File PDF</div>
  </template>
  <template v-slot:append-outer>
    <v-btn
    dark
    :disabled="files.length < 1"
    style="margin-top: -18px; height: 55px"
    :loading="loading"
    color="green"
    @click="uploadFiles">
      <v-icon left dark>mdi-cloud-upload</v-icon> Upload
    </v-btn>
  </template>
    <template v-slot:selection="{ index, text }">
      <v-chip
        v-if="index < 2"
        color="deep-purple accent-4"
        dark
        label
        small
      >
        {{ text }}
      </v-chip>

      <span
        v-else-if="index === 2"
        class="overline grey--text text--darken-3 mx-2"
      >
        +{{ files.length - 2 }} File(s)
      </span>
    </template>
  </v-file-input>
   <v-btn v-if="logFiles !== null && logFiles !== ''" color="info" class="mb-2" @click="callculateAgain()">
      Calculate
    </v-btn>
         <v-sheet class="p-2"
              min-height="70vh"
              rounded="lg"
            >
             
                <home-page></home-page>
            </v-sheet>
             <v-dialog
      v-model="dialog"
      hide-overlay
      persistent
      width="300"
    >
      <v-card
        color="primary"
        dark
      >
        <v-card-text>
          Please stand by
          <v-progress-linear
            indeterminate
            color="white"
            class="mb-0"
          ></v-progress-linear>
          {{ teksLoading }}
        </v-card-text>
      </v-card>
    </v-dialog>
    <v-dialog
      v-model="dialogResult.value"
      max-width="390"
    >
      <v-card  :color="dialogResult.color" dark>
        <v-card-title class="headline">
          {{ dialogResult.title }}
        </v-card-title>

        <v-card-text>
          {{ dialogResult.message }}
        </v-card-text>

        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn
            color="primary"
            @click="dialogResult.value = false"
          >
            OK
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
      </v-container>
    </v-main>
</v-app>
    `,
  components: {
    homePage
  },
  data: function () {
    return {
      drawer: false,
      group: null,
      links: [
        'Dashboard'
      ],
      dialog: false,
      teksLoading: '',
      dialogResult: {
        value: false,
        title: 'Error',
        message: '',
        color: '#F44336'
      }
    }
  },
  computed: {
    files: {
      set: function (val) {
        this.$store.commit('setFiles', val)
      },
      get: function () {
        const fil = this.$store.getters.getFiles;
        return (fil !== undefined && fil !== null && fil !== '' ? fil : [])
      }
    },
    loading: {
      set: function (val) {
        this.$store.commit('setLoading', val)
      },
      get: function () {
        return this.$store.getters.getLoading;
      }
    },
    hasil() {
      return this.$store.getters.hasil;
    },
    logFiles() {
      return this.$store.getters.logfile
    }
  },
  methods: {
    reset(files = true) {
      this.$store.commit('setLogFile',null)
      this.$store.commit('setResult', {
            upload: '',
            convert_img: [],
            convert_text: []
      })
      
      this.$store.commit('setLogFile', null)
      this.$store.commit('setHasil', [])
      if (files) {
        this.$store.commit('setFiles', [])
      }
    },
    uploadFiles() {
      this.reset(false)
      this.dialog = true
      this.teksLoading = 'Upload file PDF to server'
      this.$store.commit('setLoading', true);
      var formData = new FormData();
       formData.append('files', this.files);
      axios.post('https://oleo-ocr.app-kita.net/api/upload', formData, {
                    headers: {
                        'Content-Type': 'multipart/form-data'
                    }
                }).then(resp => {
                  const data = resp.data
                  if (data.status) {
                    this.$store.commit('setResult_upload', resp.data.data)
                    this.$store.commit('setLoading', false);
                    this.teksLoading = 'Upload file PDF done'
                    this.convertToImg(resp.data.data)
                  } else {
                    this.dialogResult = {
                      value: true,
                      title: 'Error',
                      message: data.message,
                      color: '#F44336'
                    }
                    this.$store.commit('setLoading', false);
                    this.dialog = false
                    this.reset()
                  }
                }).catch(err => {
                  this.reset()
                  console.log(err)
                  this.teksLoading = ''
                  this.dialog = false
                    this.$store.commit('setResult', [])
                    this.$store.commit('setLoading', false);
                })
    },
    convertToImg(file) {
      this.$store.commit('setLoading', true);
       this.teksLoading = 'Convert PDF File to Image'
      var formData = new FormData();
       formData.append('files', file);
      axios.post('https://oleo-ocr.app-kita.net/api/convert_to_img', formData).then(res => {
        const data = res.data
        if (data.status) {
          this.$store.commit('setResult_toImg', res.data.data)
          this.$store.commit('setLoading', false);
          this.teksLoading = 'Convert PDF File to Image done'
          this.convertToText(res.data.data)
        } else {
          this.dialogResult = {
                      value: true,
                      title: 'Error',
                      message: data.message,
                      color: '#F44336'
          }
          this.$store.commit('setLoading', false);
                    this.dialog = false
                    this.reset()
        }
        }).catch(err => {
          console.log(err)
          this.dialogResult = {
                      value: true,
                      title: 'Error',
                      message: 'Terjadi Kesalahan',
                      color: '#F44336'
                    }
          this.$store.commit('setLoading', false);
          this.teksLoading = ''
           this.dialog = false
        })
    },
    convertToText(file) {
      this.$store.commit('setLoading', true);
      var formData = new FormData();
      for (let i = 0; i < file.length; i++) {
          formData.append('files[]', file[i]);
      }
      this.teksLoading = 'Convert Image to Text and initialitation document'
      axios.post('https://oleo-ocr.app-kita.net/api/convert_to_text', formData).then(res => {
        const data = res.data
        if (data.status) {
          this.$store.commit('setLoading', false);
          this.$store.commit('setResult_toText', res.data.data)
          this.$store.commit('setHasil', res.data.hasil)
          this.$store.commit('setLogFile', res.data.temp)
          this.teksLoading = 'process done'
          this.dialog = false
          this.dialogResult = {
                      value: true,
                      title: 'done',
                      message: 'Berhasil menconversi data',
                      color: '#4CAF50'
                    }
       } else {
          this.dialogResult = {
                      value: true,
                      title: 'Error',
                      message: data.message,
                      color: '#F44336'
          }
          this.$store.commit('setLoading', false);
                    this.dialog = false
                    this.reset()
        }
        }).catch(err => {
          console.log(err)
          this.dialogResult = {
                      value: true,
                      title: 'Error',
                      message: 'Terjadi Kesalahan',
                      color: '#F44336'
                    }
          this.$store.commit('setLoading', false);
          this.teksLoading = ''
           this.dialog = false
        })
    },
    callculateAgain() {
      this.$store.commit('setLoading', true);
      var formData = new FormData();
      formData.append('filename', this.logFiles);
      this.teksLoading = 'Callculate log file'
      axios.post('https://oleo-ocr.app-kita.net/api/calculate_again', formData).then(res => {
        const data = res.data
        if (data.status) {
          this.$store.commit('setLoading', false);
          this.$store.commit('setResult_toText', res.data.data)
          this.$store.commit('setHasil', res.data.hasil)
          this.$store.commit('setLogFile', res.data.temp)
          this.teksLoading = 'process done'
          this.dialog = false
          this.dialogResult = {
                      value: true,
                      title: 'done',
                      message: 'Berhasil menconversi data',
                      color: '#4CAF50'
                    }
       } else {
          this.dialogResult = {
                      value: true,
                      title: 'Error',
                      message: data.message,
                      color: '#F44336'
          }
          this.$store.commit('setLoading', false);
                    this.dialog = false
                    this.reset()
        }
        }).catch(err => {
          console.log(err)
          this.dialogResult = {
                      value: true,
                      title: 'Error',
                      message: 'Terjadi Kesalahan',
                      color: '#F44336'
                    }
          this.$store.commit('setLoading', false);
          this.teksLoading = ''
           this.dialog = false
        })
    }
  }
}

export default bodyCmp;