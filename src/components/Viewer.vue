<template>
  <div id="forgeViewer"></div>
</template>
<script>
/* global Autodesk:false */
import axios from "axios";

var viewerApp;

export default {
  props: {
    documentId: {
      type: String,
      required: true
    }
  },
  data() {
    return {
      options: {
        env: "AutodeskProduction",
        getAccessToken: this.getForgeToken
      }
    };
  },
  created() {
    Autodesk.Viewing.Initializer(this.options, this.onInitialized);
  },
  watch: {
    documentId (val) {
      console.log("urn changed to " + val);
      viewerApp.loadDocument(
        this.documentId,
        this.onDocumentLoadSuccess,
        this.onDocumentLoadFailure
      );
    }
  },
  methods: {
    getForgeToken(callback) {
      axios("/api/forge/oauth/token")
        .then(response => {
          let token = response.data.access_token;
          let expire = response.data.expires_in;
          callback(token, expire);
        })
        .catch(err => {
          console.error("Erro response: " + err);
        });
    },
    onInitialized() {
      console.log("initialized");
      viewerApp = new Autodesk.Viewing.ViewingApplication("forgeViewer");
      viewerApp.registerViewer(
        viewerApp.k3D,
        Autodesk.Viewing.Private.GuiViewer3D
      );
      console.log("pre-load document");
      viewerApp.loadDocument(
        this.documentId,
        this.onDocumentLoadSuccess,
        this.onDocumentLoadFailure
      );
    },
    onDocumentLoadSuccess(doc) {
      var viewables = viewerApp.bubble.search({ type: "geometry" });
      console.log(viewables.length);
      if (viewables.length === 0) {
        console.error("Document contains no viewables.");
        return;
      }
      // Choose any of the avialble viewables
      viewerApp.selectItem(
        viewables[0].data,
        this.onItemLoadSuccess,
        this.onItemLoadFail
      );
    },
    onDocumentLoadFailure(viewerErrorCode) {
      console.error("onDocumentLoadFailure() - errorCode:" + viewerErrorCode);
    },
    onItemLoadSuccess(viewer, item) {
      console.log("Model loaded");
    },
    onItemLoadFail(errorCode) {
      console.error("onItemLoadFail() - errorCode:" + errorCode);
    }
  },

  mounted() {}
};
</script>
<style>
#forgeViewer {
  position: relative;
  width: 100%;
  height: 600px;
  margin: 0;
  background-color: #00f8ff;
}
</style>
