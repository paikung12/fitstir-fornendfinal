<template>
  <v-app>
    <router-view></router-view>
  </v-app>
</template>

<script>

  export default {
    name: 'App',
    data: () => ({

    }),
    async created() {
      this.$vuetify.theme.dark = true

    }
  };
</script>
