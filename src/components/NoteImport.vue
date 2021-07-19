<template>
  <div class="container">
    <div class="large-12 medium-12 small-12 cell">
      <label>File
        <input type="file" id="file" ref="file" v-on:change="handleFileUpload()"/>
      </label>
        <button v-on:click="submitFile()">Submit</button>
    </div>
  </div>
</template>

<script>
import NoteDataService from "../services/NoteDataService";

export default {
  name: "add-import",
  data() {
    return {
      file: '',
      submitted: false
    };
  },
  methods: {
    submitFile(){
        /*
                Initialize the form data
            */
            let formData = new FormData();

            /*
                Add the form data we need to submit
            */
            formData.append('file', this.file);

        /*
          Make the request to the POST /single-file URL
        */
          var that = this;
          NoteDataService.upload(formData)
          .then(() => {
            that.listnote();
          })
          .catch(e => {
            console.log(e);
          });
      },
      listnote() {
      this.$router.push({ name: "notes" });
    },

      /*
        Handles a change on the file upload
      */
      handleFileUpload(){
        this.file = this.$refs.file.files[0];
      }

  }
};
</script>

<style>
.submit-form {
  max-width: 300px;
  margin: auto;
}

.errorcolor
{
  color: red;
}
</style>
