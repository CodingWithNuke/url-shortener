import { MutationTree, ActionTree, GetterTree } from "vuex";

export const state = () => ({
  urls: [] as object[],
  editUrl: null,
  deleteUrl: null,
  code: null,
  showCreateUrlDialog: false,
  showEditUrlDialog: false,
  showDeleteUrlDialog: false
});

type RootState = ReturnType<typeof state>;

export const mutations: MutationTree<RootState> = {
  SET_URLS(state, payload) {
    state.urls = payload;
  },

  ADD_URL(state, payload) {
    state.urls.push(payload);
  },

  UPDATE_URL(state, { id, url: updatedUrl }) {
    let url: any = state.urls.find((item: any) => item._id === id);

    if (url) {
      Object.assign(url, updatedUrl);
    }
  },

  DELETE_URL(state, id) {
    state.urls = state.urls.filter((item: any) => item._id != id);
  },

  SET_EDIT_URL(state, payload) {
    state.editUrl = payload;
  },

  SET_DELETE_URL(state, payload) {
    state.deleteUrl = payload;
  },

  SET_CODE(state, payload) {
    state.code = payload;
  },

  SET_SHOW_CREATE_URL_DIALOG(state, payload) {
    state.showCreateUrlDialog = payload;
  },

  SET_SHOW_EDIT_URL_DIALOG(state, payload) {
    state.showEditUrlDialog = payload;
  },

  SET_SHOW_DELETE_URL_DIALOG(state, payload) {
    state.showDeleteUrlDialog = payload;
  }
};

export const actions: ActionTree<RootState, RootState> = {
  async nuxtServerInit({ dispatch }) {
    try {
      await dispatch("fetchURLs");
    } catch (err) {
      console.log(err);
    }
  },

  nuxtClientInit({ dispatch }) {
    const code = localStorage.getItem("code");

    if (code) {
      console.log(code);

      dispatch("setCode", code);
    }
  },

  async fetchURLs({ commit }) {
    const urls = await this.$axios.$get("/v1/urls");

    commit("SET_URLS", urls);
  },

  async createURL({ commit }, { code, url }) {
    const newUrl = await this.$axios.$post("/v1/urls", { code, ...url });

    commit("ADD_URL", newUrl);
  },

  async updateURL({ commit }, { id, code, url }) {
    const updatedUrl = await this.$axios.$put(`/v1/urls/${id}`, {
      code,
      ...url
    });

    commit("UPDATE_URL", { id, url: updatedUrl });
  },

  async deleteURL({ commit }, { id, code }) {
    await this.$axios.$delete(`/v1/urls/${id}`, {
      data: {
        code
      }
    });

    commit("DELETE_URL", id);
  },

  setEditURL({ commit }, payload) {
    commit("SET_EDIT_URL", payload);
  },

  setDeleteURL({ commit }, payload) {
    commit("SET_DELETE_URL", payload);
  },

  setCode({ commit }, payload) {
    commit("SET_CODE", payload);
  },

  setShowCreateUrlDialog({ commit }, payload) {
    commit("SET_SHOW_CREATE_URL_DIALOG", payload);
  },

  setShowEditUrlDialog({ commit }, payload) {
    commit("SET_SHOW_EDIT_URL_DIALOG", payload);
  },

  setShowDeleteUrlDialog({ commit }, payload) {
    commit("SET_SHOW_DELETE_URL_DIALOG", payload);
  }
};

export const getters: GetterTree<RootState, RootState> = {
  urls: state => state.urls,
  editUrl: state => state.editUrl,
  deleteUrl: state => state.deleteUrl,
  code: state => state.code,
  showCreateUrlDialog: state => state.showCreateUrlDialog,
  showDeleteUrlDialog: state => state.showDeleteUrlDialog,
  showEditUrlDialog: state => state.showEditUrlDialog
};
