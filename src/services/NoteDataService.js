import http from "../http-common";

class NoteDataService {
  getAll() {
    return http.get("/notes");
  }

  get(id) {
    return http.get(`/notes/${id}`);
  }

  create(data) {
    return http.post("/notes", data);
  }

  update(id, data) {
    return http.put(`/notes/${id}`, data);
  }

  upload(data)
  {
    return http.post("/notes/upload", data);
  }

  delete(id) {
    return http.delete(`/notes/${id}`);
  }
}

export default new NoteDataService();
