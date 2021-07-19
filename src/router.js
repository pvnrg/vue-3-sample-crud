import { createWebHistory, createRouter } from "vue-router";

const routes =  [
  {
    path: "/",
    alias: "/notes",
    name: "notes",
    component: () => import("./components/NotesList")
  },
  {
    path: "/notes/:id",
    name: "note-details",
    component: () => import("./components/Note")
  },{
    path: "/import",
    name: "note-import",
    component: () => import("./components/NoteImport")
  },
  {
    path: "/add",
    name: "add",
    component: () => import("./components/AddNote")
  }
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;