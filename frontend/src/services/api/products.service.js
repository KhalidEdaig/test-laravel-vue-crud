import axios from "axios";

export default {
  getProducts(payload) {
    const query = `products?page=${payload.page}`;
    return axios.get(query).then((response) => response.data.payload || []);
  },
  getAllProducts() {
    const query = "products/all";
    return axios.post(query).then((response) => response.data.payload || []);
  },
  addProduct(company) {
    return axios
      .post("products", company)
      .then((response) => response.data.payload || null);
  },
  editProduct(company) {
    return axios
      .put(`products/${company.id}`, company)
      .then((response) => response.data.payload || null);
  },
  deleteProduct(id) {
    return axios.delete(`products/${id}`);
  },
};
