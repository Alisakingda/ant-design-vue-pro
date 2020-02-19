<template>
  <div class="home">
    <h1>{{ get_username }}</h1>
    <!-- <h1>{{}}</h1> -->
    <img alt="Vue logo" src="../assets/logo.png" />
  </div>
</template>

<script>
import { mapGetters } from "vuex";
export default {
  name: "Home",
  components: {},
  computed: {
    ...mapGetters("a", ["get_username"])
    // ...mapGetters("b", ["get_product"])
  }
};
</script>
