import axios from "axios";

export default {
  getCategories(payload) {
    const query = `categories?page=${payload.page}`;
    return axios.get(query).then((response) => response.data.payload || []);
  },
  addCategory(categories) {
    return axios
      .post("categories", categories)
      .then((response) => response.data.payload || null);
  },
  editCategory(categories) {
    return axios
      .put(`categories/${categories.id}`, categories)
      .then((response) => response.data.payload || null);
  },
  deleteCategory(id) {
    return axios.delete(`categories/${id}`);
  },
  getAllCategories() {
    const query = "categories/all";
    return axios.post(query).then((response) => response.data.payload || []);
  },
};
