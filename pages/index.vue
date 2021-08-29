<template>
  <v-container fluid>
    <v-card outlined>
      <client-only>
        <v-data-table hide-default-footer :headers="headers" :items="urls">
          <template v-slot:item.actions="{ item }">
            <v-btn @click="editURL(item)" icon>
              <v-icon>
                mdi-pencil
              </v-icon>
            </v-btn>
            <v-btn @click="deleteURL(item)" icon>
              <v-icon>
                mdi-delete
              </v-icon>
            </v-btn>
            <v-btn target="_blank" :href="item.slug" icon>
              <v-icon>
                mdi-open-in-new
              </v-icon>
            </v-btn>
          </template>
        </v-data-table>
      </client-only>
    </v-card>
  </v-container>
</template>

<script>
import { mapGetters } from "vuex";

export default {
  data: () => ({
    headers: [
      {
        text: "ID",
        value: "_id"
      },
      {
        text: "URL",
        value: "url"
      },
      {
        text: "Slug",
        value: "slug"
      },
      {
        text: "Actions",
        value: "actions",
        sortable: false,
        align: "right"
      }
    ]
  }),

  computed: {
    ...mapGetters(["urls"])
  },

  methods: {
    editURL(url) {
      this.$store.dispatch("setEditURL", url);
      this.$store.dispatch("setShowEditUrlDialog", true);
    },
    deleteURL(url) {
      this.$store.dispatch("setDeleteURL", url);
      this.$store.dispatch("setShowDeleteUrlDialog", true);
    }
  }
};
</script>

<style>
</style>