<template>
  <div class="list row">
    <div class="col-md-12">
    <router-link to="/add"><button class="btn btn-success btn-xs" >Add</button></router-link>
    <router-link to="/import"><button class="btn btn-success btn-xs" >Import</button></router-link>
    <button @click="onClickExport()" class="btn btn-success btn-xs">Export</button>
    </div>
    <div class="col-md-6">

      <h4>Notes List</h4>
      
      <ul class="list-group">
        <li class="list-group-item"
          :class="{ active: index == currentIndex }"
          v-for="(note, index) in notes"
          :key="index"
        >
          {{ note.title }}
           <button class="btn btn-info btn-xs mr-2"
          @click="setActivenote(note, index)"
        >View</button>


         <router-link :to="'/notes/' + note._id" ><button class="btn btn-success btn-xs mr-2">Edit</button></router-link>

          <button class="btn btn-danger btn-xs"
          @click="deletenote(note._id)"
        >Delete</button>

        </li>
      </ul>
    </div>
    <div class="col-md-6">
      <div v-if="currentnote">
        <h4>Note</h4>
        <div>
          <label><strong>Title:</strong></label> {{ currentnote.title }}
        </div>
        <div>
          <label><strong>Content:</strong></label> {{ currentnote.content }}
        </div>
        <div>
          <router-link :to="'/notes/' + currentnote._id" ><button class="btn btn-info btn-xs mr-2" >Edit</button></router-link>
          <button class="btn btn-danger btn-xs"
          @click="deletenote(currentnote._id)"
        >Delete</button>
        </div>
        
      </div>
    </div>
  </div>
</template>

<script>
import NoteDataService from "../services/NoteDataService";

export default {
  name: "notes-list",
  data() {
    return {
      notes: [],
      currentnote: null,
      currentIndex: -1,
      title: ""
    };
  },
  methods: {

    retrievenotes() {
      NoteDataService.getAll()
        .then(response => {
          this.notes = response.data;
          console.log(response.data);
        })
        .catch(e => {
          console.log(e);
        });
    },

    refreshList() {
      this.retrievenotes();
      this.currentnote = null;
      this.currentIndex = -1;
    },
    

    setActivenote(note, index) {
      this.currentnote = note;
      this.currentIndex = note ? index : -1;
    },

    removeAllnotes() {
      NoteDataService.deleteAll()
        .then(response => {
          console.log(response.data);
          this.refreshList();
        })
        .catch(e => {
          console.log(e);
        });
    },

    deletenote(_id) {
      NoteDataService.delete(_id)
        .then(response => {
          console.log(response.data);
          this.refreshList();
        })
        .catch(e => {
          console.log(e);
        });
    },
    
    searchTitle() {
      NoteDataService.findByTitle(this.title)
        .then(response => {
          this.notes = response.data;
          this.setActivenote(null);
          console.log(response.data);
        })
        .catch(e => {
          console.log(e);
        });
    },
     onClickExport(){
      NoteDataService.getAll()
        .then(response => {
          var string = '"title","content" ';
          response.data.forEach(element => {
              string += '"'+element.title+'"'+','+'"'+element.content+'" ';
          });
          var fileURL = window.URL.createObjectURL(new Blob([string]));
          var fURL = document.createElement('a');

          fURL.href = fileURL;
          fURL.setAttribute('download', 'data.csv');
          document.body.appendChild(fURL);

          fURL.click();
        })
        .catch(e => {
          console.log(e);
        });
    }
  },
  mounted() {
    this.retrievenotes();
  }
};
</script>

<style>
.list {
  text-align: left;
  margin: auto;
}
.floatright
{
  float: right;
}
.btn-xs
{
    padding: 1px 5px;
    font-size: 12px;
    line-height: 1.5;
    border-radius: 3px;
}

</style>
