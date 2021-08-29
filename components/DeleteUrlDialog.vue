<template>
  <v-dialog v-model="internalValue" width="500">
    <v-form @submit.prevent="onSubmit">
      <v-card>
        <v-card-title>Delete Shortened URL</v-card-title>

        <v-card-text>
          <v-alert type="error" text v-if="error.show">
            {{ error.message }}
          </v-alert>

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
            color="error"
            dark
          >
            Delete
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
    ...mapGetters(["deleteUrl", "code"])
  },

  methods: {
    async onSubmit() {
      this.isLoading = true;
      this.error.show = false;

      const { code } = this.form;
      const { _id: id } = this.deleteUrl;

      try {
        await this.$store.dispatch("deleteURL", { id, code });

        this.form = {
          code: null
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
        this.form = {
          code: this.code
        };
      } else {
        this.error.show = false;

        this.form = {
          code: null
        };
      }
    }
  }
};
</script>

<style>
</style>