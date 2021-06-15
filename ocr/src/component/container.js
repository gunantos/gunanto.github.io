
const homePage = () => import(BASE_URL + "/src/page/homePage.js");

const BASE_URL_API = 'https://dev.app-kita.net/'
const bodyCmp = {
  template: `    <v-app id="inspire">
  <v-app-bar
  app
  color="#F57C00"
  dark
  flat
  >
  <v-container class="py-0 fill-height">
    <div style="font-weight: 800; font-size: 25px;"> PDF OCR</div>
  <v-spacer></v-spacer>
  <v-btn class="mr-2" @click="dialogSetting = true">
      <v-icon >mdi-settings</v-icon>
    </v-btn>
<v-btn color="success" class="ml-2" @click="dialogDocument = true">
      <v-icon height="55px">mdi-tune</v-icon>
    </v-btn>
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
    
   <v-btn  style="margin-top: -18px; height: 55px" outlined v-if="logFiles !== null && logFiles !== ''" color="info" class="mb-2" @click="callculateAgain()">
      <v-icon height='55px'>mdi-reload</v-icon>
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
  <v-card>
    <v-toolbar color="orange lighten-2">
      <v-chip label color="teal lighten-4"> <span v-if="!$vuetify.breakpoint.xs">Halaman PDF : </span>{{ ttlHalaman }}</v-chip>
      <v-chip label class="ml-2" color="cyan lighten-4"><span v-if="!$vuetify.breakpoint.xs">Halaman Diditeksi: </span>{{ttlDitek}}</v-chip>
      <v-spacer></v-spacer>



    </v-toolbar>
         <v-sheet class="p-2"
              min-height="68vh"
              rounded="lg"
            >
             
                <home-page></home-page>
            </v-sheet>
    </v-card>

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

     <v-dialog
      v-model="dialogSetting" 
      max-width="690"
    >
      <v-card>
        <v-card-title class="headline bg-info mb-4">
         Configuration
        </v-card-title>

        <v-card-text>
        <v-select
          :items="pilihan_convert"
          item-value="value"
          item-text="label"
          hide-details
          filled
          label="Methode"
          v-model="config.method"
        ></v-select>
        <v-select
          :items="pilihan_img_convert"
          item-value="value"
          item-text="label"
          hide-details
          filled
          label="Convert By"
          v-model="config.convert"
        ></v-select>
        <v-slider
        class="mt-4"
          v-model="config.dpi"
          max="300"
          thumb-label="always"
          thumb-color="red"
          label="DPI"
          min="0"
        ></v-slider>
        <v-slider
        class="mt-4"
          v-model="config.quality"
          max="100"
          thumb-label="always"
          thumb-color="green"
          label="Quality"
          min="0"
        ></v-slider>
        </v-card-text>

        <v-card-actions>
        <v-btn
            color="primary"
            @click="dialogSetting = false"
          >
            CANCEL
          </v-btn>
          <v-spacer></v-spacer>
          <v-btn
            color="success"
            @click="saveConfigImg()"
          >
            SAVE
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>

       <v-dialog
       fullscreen
        hide-overlay
        transition="dialog-bottom-transition"
        scrollable
      v-model="dialogDocument"
      max-width="690"
    >
    <v-card tile>
          <v-toolbar
            flat
            dark
            color="primary"
          >
            <v-btn
              icon
              dark
              @click="dialogDocument = false"
            >
              <v-icon>mdi-close</v-icon>
            </v-btn>
            <v-toolbar-title>Settings</v-toolbar-title>
            <v-spacer></v-spacer>
            <v-toolbar-items>
              <v-btn
                dark
                text
                @click="dialogDocument = false"
              >
                Close
              </v-btn>
            </v-toolbar-items>
          </v-toolbar>
        <v-card-text>
      <v-row>
        <v-col sm="4" md="3" lg="2">
        <v-list dense>
      <v-subheader>List Configuration</v-subheader>
      <v-list-item-group
        v-model="selectIndexConfig"
        color="primary"
      >
        <v-list-item
          v-for="(item, i) in settingListConfig"
          :key="i"
        >
          <v-list-item-content>
            <v-list-item-title v-text="item"></v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list-item-group>
    </v-list>
        </v-col>
        <v-col sm="8" md="9" lg="10">
      <v-card>
        <v-card-title class="headline">
         Document Rules <code>{{ seletConfig }}</code>
        </v-card-title>
        <v-card-text>
           <v-textarea
           v-model="document_setting"
      filled
      auto-grow
      hide-details
    ></v-textarea>
        </v-card-text>

        <v-card-actions>
        <v-btn
            color="primary"
            @click="dialogDocument = false"
          >
            CANCEL
          </v-btn>
          <v-spacer></v-spacer>
          <v-btn
            color="success"
            @click="saveDocumentRule()"
          >
            SAVE
          </v-btn>
        </v-card-actions>
      </v-card>
      </v-col>
      </v-row>
      
      </v-card-text>
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
      ],
      dialog: false,
      teksLoading: '',
      dialogResult: {
        value: false,
        title: 'Error',
        message: '',
        color: '#F44336'
      },
      dialogSetting: false,
      dialogDocument: false,
      convert_img_setting: '',
      listConfig: [],
      pilihan_convert: [
        { label: 'Library', value: 'library' },
        { label: 'Google', value: 'google' }
      ],
      pilihan_img_convert: [
        { label: 'Ghostscript', value: 'ghostscript' },
        { label: 'Imagick', value: 'imagick' }
      ],
      config: {
        method: 'library',
        convert: 'ghostscript',
        dpi: 150,
        quality: 100
      },
      selectIndexConfig: null,
      document_setting: ''
    }
  },
  watch: {
    selectIndexConfig(val) {
      this.getConfigFile(this.seletConfig)
    }
  },
  computed: {
    seletConfig() {
      return this.settingListConfig[this.selectIndexConfig]
    },
    files: {
      set: function (val) {
        console.log(val);
        this.$store.commit('setFiles', val)
      },
      get: function () {
        const fil = this.$store.getters.getFiles;console.log(fil);
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
    },
    ttlHalaman() {
      return this.$store.getters.getCountPagePDF
    },
    ttlDitek() {
       return this.$store.getters.getCountPageDetect
    },
    settingIMG() {
      return localStorage.getItem('settingIMG');
    },
    settingListConfig() {
      const _json = localStorage.getItem('settingListConfig');
      if (_json !== undefined && _json !== null && _json !== 'undefined' && _json !== '') {
        return this.isJson(_json) ? JSON.parse(_json) : []
      } else {
        return []
      }
    }
  },
  mounted() {
    if (this.settingIMG !== undefined && this.settingIMG !== null && this.settingIMG !== '' && this.settingIMG !== 'undefined') {
      this.convert_img_setting = this.settingIMG;
    } else {
      this.loadConfig(true, false)
    }
    if (this.settingListConfig !== undefined && this.settingListConfig !== null && this.settingListConfig !== '' && this.settingListConfig !== 'undefined') {
      this.listConfig = this.settingListConfig;
    } else {
      this.loadConfig(false, true)
    }
  },
  created() {
    this.loadConfig(true, true)
  },
  methods: {
    isJson(str) {
      try {
        JSON.parse(str)
      } catch (e) {
        return false;
      }
      return true;
    },
    saveDocumentRule() {
      this.dialog = true
      this.teksLoading = 'Save Configuration Rules Document ' + this.seletConfig
      var formData = new FormData();
      formData.append('filename', this.seletConfig);
      formData.append('json', this.document_setting);
      axios.post(BASE_URL_API+'dev/config', formData).then(res => {
        if (res.data.status) {
          this.document_setting = JSON.stringify(res.data.data, undefined, 2)
          this.dialogDocument = false
          this.dialog = false
        } else {
          this.dialogResult = {
            value: true,
            title: 'Error',
            message: res.data.message,
            color: '#F44336'
          }
          this.dialogDocument = false
          this.dialog = false
        }
      });
    },
    saveConfigImg() {
      this.dialog = true
      this.teksLoading = 'Save Configuration Convert Image'
      var formData = new FormData();
      formData.append('json', JSON.stringify(this.config));
      axios.post(BASE_URL_API+'dev/config_convert', formData).then(res => {
        if (res.data.status) {
          this.document_setting = JSON.stringify(res.data.data, undefined, 2)
          this.loadConfig(true, false)
          this.dialogSetting = false
          this.dialog = false
        } else {
          this.dialogResult = {
            value: true,
            title: 'Error',
            message: res.data.message,
            color: '#F44336'
          }
          this.dialog = false
          this.dialogSetting = false
        }
      });
    },
    getConfigFile(file) {
        axios.get(BASE_URL_API+'dev/config?filename='+ file).then(res => {
          this.document_setting = JSON.stringify(res.data.data, undefined, 4)
        });
    },
    loadConfig(img = false, doc = false) {
      if (img) {
        
      this.dialog = true
      this.teksLoading = 'Load configuration file'
        axios.get(BASE_URL_API+'dev/config_convert').then(res => {
          if (res.data.data !== undefined) {
            this.config = res.data.data
            console.log(this.config)
            this.dialog = false
          }
        });
      }
      if (doc) {
        this.dialog = true
      this.teksLoading = 'Load configuration Rules Document'
        axios.get(BASE_URL_API+'dev/config_file').then(res => {
          if (res.data.data !== undefined) {
            localStorage.setItem('settingListConfig', JSON.stringify(res.data.data, undefined, 2))
            this.listConfig = this.settingDocument
            this.dialog = false
          }
        });
      }
    },
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
      axios.post(BASE_URL_API+'dev/upload', formData, {
                    headers: {
                        'Content-Type': 'multipart/form-data'
                    }
                }).then(resp => {
                  const data = resp.data
                if (data.status) {
                  this.$store.commit('setLoading', false);
                  this.$store.commit('setResult_upload', data.file)
                  this.$store.commit('setResult_toText', data.data)
                  this.$store.commit('setHasil', data.result)
                  this.$store.commit('setResult_toImg', data.image)
                  this.$store.commit('setLogFile', data.temp)
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
      axios.post(BASE_URL_API+'dev/convert_to_img', formData).then(res => {
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
      axios.post(BASE_URL_API+'dev/convert_to_text', formData).then(res => {
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
      axios.post(BASE_URL_API+'dev/calculate_again', formData).then(res => {
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
