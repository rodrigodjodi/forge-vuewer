<template>
  <div class="home">
    <Viewer 
      :documentId="docId"
    ></Viewer>
    <button @click="docId='urn:dXJuOmFkc2sub2JqZWN0czpvcy5vYmplY3Q6YnJpZ2FkZWlyby9BUFRPX0RFQ09SQURPX0JSR19SMTcuZHdmeA'">
      Apartamento
    </button>
  </div>
</template>

<script>
// @ is an alias to /src
import Viewer from "@/components/Viewer.vue";

export default {
  name: "home",
  components: {
    Viewer
  },
  data () {
    return {
      docId: "urn:dXJuOmFkc2sub2JqZWN0czpvcy5vYmplY3Q6dXJiYW5lbmdlL1VSQkFORU5HRS1SMi5kd2Z4"
    }
  }
};
</script>
