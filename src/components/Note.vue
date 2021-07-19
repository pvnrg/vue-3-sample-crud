<template>
  <div v-if="currentnote" class="edit-form">
    <h4>Note</h4>
    <form>
      <div class="form-group">
        <label for="title">Title</label>
        <input type="text" class="form-control" id="title"
          v-model="currentnote.title"
        />
        <p v-if="errnote.title" class="errorcolor">
          {{ errnote.title }}
        </p>
      </div>
      <div class="form-group">
        <label for="content">Content</label>
        <input type="text" class="form-control" id="content"
          v-model="currentnote.content"
        />
        <p v-if="errnote.content"  class="errorcolor">
          {{ errnote.content }}
        </p>
      </div>

    </form>


    <button class="badge badge-danger mr-2"
      @click="deletenote"
    >
      Delete
    </button>

    <button type="submit" class="badge badge-success mr-2"
      @click="updatenote"
    >
      Update
    </button>

    <button class="badge badge-info"
      @click="listnote"
    >
      Back
    </button>
    <p>{{ message }}</p>
  </div>

  <div v-else>
    <br />
    <p>Please click on a note...</p>
  </div>
</template>

<script>
import NoteDataService from "../services/NoteDataService";

export default {
  name: "note",
  data() {
    return {
      currentnote: null,
      errnote:{
        title: "",
        content: ""
      },
      message: ''
    };
  },
  methods: {
    getnote(id) {
      NoteDataService.get(id)
        .then(response => {
          this.currentnote = response.data;
          console.log(response.data);
        })
        .catch(e => {
          console.log(e);
        });
    },

    updatenote() {

      var respose = this.validatenote({title:this.currentnote.title,content:this.currentnote.content});
      // console.log("respose",respose);
      if(respose)
      {
        NoteDataService.update(this.currentnote._id, this.currentnote)
          .then(response => {
            console.log(response.data);
            this.message = 'The note was updated successfully!';
            // this.$router.push({ name: "notes" });
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

    deletenote() {
      NoteDataService.delete(this.currentnote._id)
        .then(response => {
          console.log(response.data);
          this.$router.push({ name: "notes" });
        })
        .catch(e => {
          console.log(e);
        });
    },

    listnote() {
      this.$router.push({ name: "notes" });
    }
  },
  mounted() {
    this.message = '';
    this.getnote(this.$route.params.id);
  }
};
</script>

<style>
.edit-form {
  max-width: 300px;
  margin: auto;
}
.errorcolor
{
  color: red;
}
</style>
