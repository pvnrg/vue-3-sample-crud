<template>
  <div class="submit-form">
    <div v-if="!submitted">
      <div class="form-group">
        <label for="title">Title</label>
        <input
          type="text"
          class="form-control"
          id="title"
          required
          v-model="note.title"
          name="title" 
        />
        <p v-if="errnote.title" class="errorcolor">
          {{ errnote.title }}
        </p>
      </div>

      <div class="form-group">
        <label for="content">Content</label>
        <input
          class="form-control"
          id="content"
          required
          v-model="note.content"
          name="content"
        />
        <p v-if="errnote.content"  class="errorcolor">
          {{ errnote.content }}
        </p>
      </div>

      <button @click="savenote" class="btn btn-success mr-2 btn-xs">Submit</button>
      <button class="btn btn-info btn-xs" @click="listnote">Back</button>
    </div>

    <div v-else>
      <h4>You submitted successfully!</h4>
      <button class="btn btn-success mr-2 btn-xs" @click="newnote">Add More</button>
      <button class="btn btn-info btn-xs" @click="listnote">Back to list</button>
    </div>
  </div>
</template>

<script>
import NoteDataService from "../services/NoteDataService";

export default {
  name: "add-note",
  data() {
    return {
      note: {
        title: "",
        content: ""
      },
      errnote: {
        title: "",
        content: ""
      },
      submitted: false
    };
  },
  methods: {
    savenote() {
      var data = {
        title: this.note.title,
        content: this.note.content
      };

      var respose = this.validatenote(data);
      // console.log("respose",respose);
      if(respose)
      {
        
        NoteDataService.create(data)
          .then(response => {
            this.note.id = response.data.id;
            console.log(response.data);
            this.submitted = true;
          })
          .catch(e => {
            console.log(e);
          });
      }
        
    },
    validatenote(data){
      console.log(data);
      this.errnote = [];
      if (data.title && data.content) {
        return true;
      }


      if (!data.title) {
        this.errnote.title = "title required." ;
      }
      if (!data.content) {
        this.errnote.content = "content required." ;
      }

      return false;
    },
    
    newnote() {
      this.submitted = false;
      this.note = {};
    },
    listnote() {
      this.$router.push({ name: "notes" });
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
