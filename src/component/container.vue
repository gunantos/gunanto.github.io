<template>   
<v-app id="inspire">
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
    multiple
    accept="image/*, application/pdf"
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
         <v-sheet class="p-2"
              min-height="70vh"
              rounded="lg"
            >
              <transition>
                <router-view></router-view>
             </transition>
            </v-sheet>
      </v-container>
    </v-main>
</v-app>
</template>
<script>
    module.exports = {
        name: 'body-cmp',
        data () {
            return {
                drawer: false,
                group: null,
                links: ['Dashboard'],
                loading: false,
                files: []
            }
        },
        methods: {
            uploadFiles (){
                this.$emit('UploadFiles', this.files)
            }
        }
    }
</script>