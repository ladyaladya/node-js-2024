import JsonFileService from '../services/json-file-service.mjs';

class Product {
  constructor() {
    this.service = new JsonFileService('products');
  }

  async getAll() {
    return await this.service.getAll();
  }

  async getById(id) {
    return await this.service.getById(id);
  }

  async add(product) {
    return await this.service.add(product);
  }

  async update(id, updatedProduct) {
    return await this.service.update(id, updatedProduct);
  }

  async delete(id) {
    return await this.service.delete(id);
  }
}

export default Product;