import mongoose from 'mongoose';
import config from './../config/default.mjs';
const { Schema } = mongoose;

const productSchema = new Schema({
  brand: {
    type: String,
    required: [true, 'Brand is required'],
    minlength: [1, 'Brand must be at least 1 character long'],
    maxlength: [30, 'Brand must be at most 30 characters long'],
    trim: true,
  },
  model: {
    type: String,
    required: [true, 'Model is required'],
    minlength: [1, 'Model must be at least 1 character long'],
    maxlength: [30, 'Model must be at most 30 characters long'],
    trim: true,
  },
  year: {
    type: Number,
    required: [true, 'Year of manufacture is required'],
    min: [1900, 'Year must be at least 1900'],
    max: [new Date().getFullYear(), `Year cannot exceed ${new Date().getFullYear()}`],
  },
  number: {
    type: String,
    required: [true, 'Number is required'],
    minlength: [4, 'Number must be at least 4 characters long'],
    maxlength: [10, 'Number must be at most 10 characters long'],
    trim: true,
  },
  imagePath: {
    type: String,
    required: false,
    trim: true,
  },
});

productSchema.statics.checkDatabaseExists = async () => {
  const databases = await mongoose.connection.listDatabases();
  return databases.databases.some((db) => db.name === config.databaseName);
  }

productSchema.statics.checkCollectionExists = async function () {
  const collections = await mongoose.connection.db.listCollections({ name: 'products' }).toArray();
  return collections.length > 0;
};

const Product = mongoose.model('Product', productSchema);
export default Product;
