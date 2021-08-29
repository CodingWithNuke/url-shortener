<template>
  <v-app>
    <v-app-bar color="primary" dark app>
      <v-app-bar-title>URL Shortener</v-app-bar-title>

      <v-spacer></v-spacer>

      <v-btn
        @click="setShowCreateUrlDialog(true)"
        depressed
        color="white"
        light
      >
        Add URL
      </v-btn>
    </v-app-bar>

    <CreateUrlDialog v-model="showCreateUrlDialog" />
    <EditUrlDialog v-model="showEditUrlDialog" />
    <DeleteUrlDialog v-model="showDeleteUrlDialog" />

    <v-main class="grey lighten-5">
      <Nuxt />
    </v-main>
  </v-app>
</template>

<script>
import { mapActions } from "vuex";

export default {
  computed: {
    showCreateUrlDialog: {
      get() {
        return this.$store.getters["showCreateUrlDialog"];
      },
      set(value) {
        this.setShowCreateUrlDialog(value);
      }
    },
    showEditUrlDialog: {
      get() {
        return this.$store.getters["showEditUrlDialog"];
      },
      set(value) {
        this.setShowEditUrlDialog(value);
      }
    },
    showDeleteUrlDialog: {
      get() {
        return this.$store.getters["showDeleteUrlDialog"];
      },
      set(value) {
        this.setShowDeleteUrlDialog(value);
      }
    }
  },

  methods: {
    ...mapActions([
      "setShowCreateUrlDialog",
      "setShowEditUrlDialog",
      "setShowDeleteUrlDialog"
    ])
  }
};
</script>
