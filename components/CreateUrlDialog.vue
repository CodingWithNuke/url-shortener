<template>
  <v-dialog v-model="internalValue" width="500">
    <v-form @submit.prevent="onSubmit">
      <v-card>
        <v-card-title>Create Shortened URL</v-card-title>

        <v-card-text>
          <v-alert type="error" text v-if="error.show">
            {{ error.message }}
          </v-alert>

          <v-text-field type="text" label="URL" v-model="form.url" />
          <v-text-field type="text" label="Slug" v-model="form.slug" />
          <v-text-field
            label="Code"
            v-model="form.code"
            persistent-hint
            hint="Code is needed for authorization."
            :type="showCode ? 'text' : 'password'"
            @click:append="showCode = !showCode"
            :append-icon="showCode ? 'mdi-eye-off' : 'mdi-eye'"
          />
        </v-card-text>

        <v-card-actions>
          <v-btn
            type="submit"
            :loading="isLoading"
            block
            depressed
            color="primary"
            dark
          >
            Create
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-form>
  </v-dialog>
</template>

<script>
import { mapGetters } from "vuex";

export default {
  props: {
    value: Boolean
  },

  data: () => ({
    isLoading: false,
    showCode: false,
    form: {
      url: null,
      slug: null,
      code: null
    },
    error: {
      show: false,
      message: null
    }
  }),

  computed: {
    internalValue: {
      get() {
        return this.value;
      },
      set(value) {
        this.$emit("input", value);
      }
    },
    ...mapGetters(["code"])
  },

  methods: {
    async onSubmit() {
      this.isLoading = true;
      this.error.show = false;

      const { url, slug, code } = this.form;

      try {
        await this.$store.dispatch("createURL", { code, url: { url, slug } });

        this.form = {
          url: null,
          slug: null,
          code
        };
      } catch (error) {
        const { statusCode, message } = error.response.data;

        this.error = {
          show: true,
          message: `Error ${statusCode}: ${message}`
        };
      } finally {
        this.isLoading = false;
        this.showCode = false;
      }
    }
  },

  watch: {
    value(value) {
      if (value) {
        this.form.code = this.code;
      } else {
        this.error.show = false;

        this.form = {
          url: null,
          slug: null,
          code: null
        };
      }
    }
  }
};
</script>

<style>
</style>