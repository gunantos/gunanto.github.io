const homePage = {
    template: `
        <v-container>
            <v-list dense>
                <v-list-item-group value="position" color="primary">
                    <v-list-item v-for="(item, index) in hasil" :key="index" @click="showGambar(item, item.data.page.length)">
                        <v-list-item-icon>
                            <v-icon color="green" v-if="item.data.page.length > 0">mdi-check-circle</v-icon>
                            <v-icon color="red" v-else>mdi-close-circle</v-icon>
                        </v-list-item-icon>
                        <v-list-item-content><v-list-item-title>{{ item.label }}</v-list-item-title></v-list-item-content>
                        <v-list-item-action>
<v-chip
      class="ma-2"
      color="orange"
      label
      outlined
    >
      {{ item.data.page.length}}
    </v-chip>
                        </v-list-item-action>
                    </v-list-item>
                </v-list-item-group>
            </v-list>
            <v-dialog
      v-model="dialog"
      fullscreen
        hide-overlay
      persistent
    >
      <v-card color="#00000094" title >
      <v-toolbar
            flat
            dark
            color="transparent"
            small
          >
          <v-spacer></v-spacer>
        <v-btn
            color="red darken-1"
            @click="closeCorousel()"
          >
            <v-icon>mdi-close</v-icon>
          </v-btn>
        </v-toolbar>
        <v-carousel v-model="carolusel" hide-delimiters style="height: 100%">
    <v-carousel-item style="height: 100%"
      v-for="(itm, i) in listGambar"
    ><center>
    <v-img :src="itm" contain max-width="400" style="height: 100%"></v-img>
    </center>
    </v-carousel-item>
  </v-carousel>
      </v-card>
    </v-dialog>
        </v-container>
        `,
    computed: {
        hasil() {
            return this.$store.getters.hasil;
        },
        logFiles() {
        return this.$store.getters.logfile
        }
    },
    data: () => ({
        files: [],
        dialog: false,
        carolusel: 0,
        listGambar: []
    }),
    methods: {
        showGambar(item, length) {
            if (length > 0) {
                this.listGambar = item.data.file
                this.dialog = true
            }
        },
        closeCorousel() {
            this.dialog = false
            this.listGambar = []
        }
    }
}
export default homePage;
