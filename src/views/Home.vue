<template>
  <div class="home">
    <viewer></viewer>
  </div>
</template>

<script>
// @ is an alias to /src
import Viewer from "@/components/Viewer.vue";

export default {
  name: "home",
  components: {
    Viewer
  }
};
</script>
