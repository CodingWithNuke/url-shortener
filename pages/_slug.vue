<template></template>

<script>
export default {
  async asyncData({ redirect, error, $axios, params }) {
    const url = await $axios.$get(`/v1/urls/${params.slug}`);

    if (url) {
      redirect(url.url);
    } else {
      error({
        statusCode: 404,
        message: `No shortened URL found with slug "${params.slug}"`
      });
    }
  }
};
</script>

<style>
</style>