<template>
  <div id="MyViewerDiv"></div>
</template>
<script>
/* global Autodesk:false */
import axios from "axios";

var viewer;
export default {
  data() {
    return {
      documentId:
        "urn:dXJuOmFkc2sub2JqZWN0czpvcy5vYmplY3Q6dXJiYW5lbmdlL1VSQkFORU5HRS1SMi5kd2Z4",
      options: {
        env: "AutodeskProduction",
        getAccessToken: this.getForgeToken
      }
    };
  },
  created() {
    Autodesk.Viewing.Initializer(this.options, this.onInitialized);
  },
  methods: {
    getForgeToken(callback) {
      /*const config = {
        method: "post",
        url:
          "https://developer.api.autodesk.com/authentication/v1/authenticate",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded"
          //"Access-Control-Allow-Origin" : "*"
          //"Cache-Control": "no-cache"
        },
        data:
          "grant_type=client_credentials&client_id=KiBrx6pRDrpUVB4ELA3zJj3PAh99REug&client_secret=Tx1eeUPGeCCt9P7g&scope=viewables%3Aread"
      };
      axios(config)
        .then(response => {
          console.log(response);*/
          let token = "eyJhbGciOiJIUzI1NiIsImtpZCI6Imp3dF9zeW1tZXRyaWNfa2V5In0.eyJjbGllbnRfaWQiOiJLaUJyeDZwUkRycFVWQjRFTEEzekpqM1BBaDk5UkV1ZyIsImV4cCI6MTUyMTQyMDEzOCwic2NvcGUiOlsidmlld2FibGVzOnJlYWQiXSwiYXVkIjoiaHR0cHM6Ly9hdXRvZGVzay5jb20vYXVkL2p3dGV4cDYwIiwianRpIjoic3poQmlWMmo3aXpOTDdmZ1VDd3VhOWtHcEFiUkJiczdBbXMyZ3hFUlpqNldNS3FBWjNnbENkdG9kOTE2OXVwMiJ9.CEscAyGLJHpEbVaHB8PxzW3u3uiU9tMYXoSOS6gifpw"
          let expire = 3599;
          callback(token, expire);
        /*})
        .catch(err => {
          console.error("Erro response: " + err);
        });*/
    },
    onInitialized() {
      console.log("initialized");
      Autodesk.Viewing.Document.load(
        this.documentId,
        this.onDocumentLoadSuccess,
        this.onDocumentLoadFailure
      );
    },
    onDocumentLoadSuccess(doc) {
      var viewables = Autodesk.Viewing.Document.getSubItemsWithProperties(
        doc.getRootItem(),
        { type: "geometry" },
        true
      );
      if (viewables.length === 0) {
        console.error("Document contains no viewables.");
        return;
      }
      var initialViewable = viewables[0];
      var svfUrl = doc.getViewablePath(initialViewable);
      var modelOptions = {
        sharedPropertyDbPath: doc.getPropertyDbPath()
      };
      var viewerDiv = document.getElementById("MyViewerDiv");
      viewer = new Autodesk.Viewing.Private.GuiViewer3D(viewerDiv);
      viewer.start(
        svfUrl,
        modelOptions,
        this.onLoadModelSuccess,
        this.onLoadModelError
      );
    },
    onDocumentLoadFailure(viewerErrorCode) {
      console.error("onDocumentLoadFailure() - errorCode:" + viewerErrorCode);
    },
    onLoadModelSuccess(model) {
      console.log("Validate model loaded: " + (viewer.model === model));
    },
    onLoadModelError(viewerErrorCode) {
      console.error("onLoadModelError() - errorCode:" + viewerErrorCode);
    }
  },

  mounted() {}
};
</script>
<style>
#MyViewerDiv {
  position: relative;
  width: 100%;
  height: 600px;
  margin: 0;
  background-color: #00f8ff;
}
</style>
