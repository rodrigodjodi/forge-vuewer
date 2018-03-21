<template>
  <div class="home">
    <Viewer></Viewer>
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
