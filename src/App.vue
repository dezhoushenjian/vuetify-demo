<template>
  <v-app>
    <div id="app">
      <router-view />
      <v-overlay :value="this.$store.state.messageText.loading">
        <v-progress-circular
            indeterminate
            size="64"
        ></v-progress-circular>
      </v-overlay>
    </div>
  </v-app>

</template>


<script>
export default {
  data: () => ({})
}
</script>