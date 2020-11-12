<template>
  <v-app id="inspire">
    <v-navigation-drawer
            v-model="drawer"
            app
            clipped
            color="#22273A"
    >
      <v-list dense>
        <v-list-item
                link
                :to="{name : 'VideoexerciseIndex'}"


        >
          <v-list-item-action>
            <v-icon color="white">mdi-play-box-outline</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title>Video</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
        <v-list-item
                link
                :to="{name : 'PlaylistIndex'}"

        >
          <v-list-item-action>
            <v-icon>mdi-playlist-play</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title>Playlist Video</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
        <v-list-item
                link
                :to="{name : 'challengeIndex'}"


        >
          <v-list-item-action>
            <v-icon color="white">mdi-human</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title>Challenge Exercise</v-list-item-title>
          </v-list-item-content>
        </v-list-item>

        <v-list-item
                link
                :to="{name : 'UserProfileIndex'}"
        >
          <v-list-item-action>
            <v-icon color="white">mdi-account-box</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title> User Profile</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
          <v-list-group>
            <v-list-item
                         v-for="item,index in items"
                         :key="index"
                         @click="$router.push(`/app/Tagvideo/index?id=${item.id}`)"
            >
            <v-list-item-action>
              <v-icon color="white"></v-icon>
            </v-list-item-action>
            <v-list-item-content >
              <v-list-item-title >{{ item.name }}</v-list-item-title>
            </v-list-item-content>
            </v-list-item>
          </v-list-group>

      </v-list>
      <template v-slot:append>
        <v-btn
                block
                color="red"
                @click="$store.dispatch('user/logout') & $router.push({ name: 'Login' })"


        >
          Log out
        </v-btn>
      </template>
    </v-navigation-drawer>

    <v-app-bar
            :clipped-left="$vuetify.breakpoint.lgAndUp"
            app
            color="#22273A"
            dark
    >
      <v-app-bar-nav-icon @click.stop="drawer = !drawer"></v-app-bar-nav-icon>
      <v-toolbar-title
              style="width: 300px"
              class="ml-0 pl-4"
      >
        <span class="hidden-sm-and-down">Fitstir</span>
      </v-toolbar-title>
      <v-spacer></v-spacer>
      <v-chip
              class="ma-2"
              color="primary"
      >
        BMI: 18.4
      </v-chip>
      <v-chip
              class="ma-2"
              color="primary"
        >
        Username: {{user.username}}
      </v-chip>
    </v-app-bar>
    <v-main>
      <router-view></router-view>
    </v-main>

  </v-app>
</template>

<script>
  import {call,sync} from 'vuex-pathify'
  import {mapState} from 'vuex'
  export default {
    name: "MainTemplate",
    props: {
      source: String,
    },
    data () {
      return {
        user:[],
        drawer: null,
        items:[],
        response:false,


      }

    },
    created () {
      this.$vuetify.theme.dark = true
    },
    computed: {
      ...mapState({
        user: state => state.user.user,
      })
    },
    async mounted() {
      await this.checkHasUser()
      await this.loadData()
      await this.getTaglist()
    },
    methods: {
      async loadData() {
        this.user = await this.$store.dispatch('user/getUser')
        console.log(this.user);
      },
      async checkHasUser() {
        if (!this.user) {
          let data = await this.$store.dispatch('user/getUser')
          if (!data) {
            await this.$router.push({
              name: 'Login'
            })
          }
        }
      },
      async getTaglist() {
        this.items = await this.$store.dispatch('tag/getTagList')
        // console.log(this.items)
        this.response=true


      },


        // async savedata() {
      //     let data  = await axios.post('/backend/playlist',this.form)
      // }

    }
  }
</script>