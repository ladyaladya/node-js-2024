import { checkSchema } from 'express-validator';

class ProductValidation {
  static productSchema = {
    brand: {
      exists: {
        errorMessage: 'Марка є обов\'язковою',
      },
      isString: {
        errorMessage: 'Марка повинна бути рядком',
      },
      isLength: {
        options: { min: 1, max: 30 },
        errorMessage: 'Марка повинна бути від 1 до 30 символів',
      },
    },
    model: {
      exists: {
        errorMessage: 'Модель є обов\'язковою',
      },
      isString: {
        errorMessage: 'Модель повинна бути рядком',
      },
      isLength: {
        options: { min: 1, max: 30 },
        errorMessage: 'Модель повинна бути від 1 до 30 символів',
      },
    },
    year: {
      exists: {
        errorMessage: 'Рік є обов\'язковим',
      },
      isInt: {
        options: { min: 1900, max: new Date().getFullYear() },
        errorMessage: 'Рік повинен бути числом між 1900 і поточним роком',
      },
    },
    number: {
      exists: {
        errorMessage: 'Номер є обов\'язковим',
      },
      isString: {
        errorMessage: 'Номер повинен бути рядком',
      },
      isLength: {
        options: { min: 4, max: 10 },
        errorMessage: 'Номер повинен бути від 4 до 10 символів',
      },
    }
  };

  static addProductValidation() {
    return checkSchema(this.productSchema);
  }
}

export default ProductValidation;