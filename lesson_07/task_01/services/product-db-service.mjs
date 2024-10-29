import Product from './../models/product.mjs';

class ProductsDBService {
  static async getList() {
    try {
      const exists = await Product.checkCollectionExists();
      if (exists) {
        const data = await Product.find().exec();
        console.log(data);
        return data;
      }
      return [];
    } catch (error) {
      console.error('Error retrieving product list:', error);
      return [];
    }
  }

  static async create(data) {
    try {
      const product = new Product(data);
      return await product.save();
    } catch (error) {
      console.error('Error creating product:', error);
      throw error;
    }
  }

  static async getById(id) {
    try {
      return await Product.findById(id);
    } catch (error) {
      console.error(`Error retrieving product with id ${id}:`, error);
      return null;
    }
  }

  static async update(id, data) {
    try {
      return await Product.findByIdAndUpdate(id, data, {
        new: true,
        runValidators: true,
      });
    } catch (error) {
      console.error(`Error updating product with id ${id}:`, error);
      throw error;
    }
  }

  static async deleteById(id) {
    try {
      return await Product.findByIdAndDelete(id);
    } catch (error) {
      console.error(`Error deleting product with id ${id}:`, error);
      return null;
    }
  }
}

export default ProductsDBService;
