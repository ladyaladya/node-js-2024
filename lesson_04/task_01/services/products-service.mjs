class InMemoryProductService {
  constructor() {
    this.products = [
      { id: 1, name: 'Сухий корм для котів', category: 'Корм', price: 300, brand: 'Optimeal', country: 'Україна', forPets: 'Для дорослих котів', imagePath: 'optimeal.jpg' },
      { id: 2, name: 'Optimeal Cat Mix', category: 'Вологий корм', price: 98, brand: 'Optimeal', country: 'Україна', forPets: 'Для дорослих котів, Для котів похилого віку', imagePath: 'group-optimeal.jpg' },
      { id: 3, name: 'Rigor Cat Наповнювач', category: 'Наповнювачі для туалету', price: 399, brand: 'Rigor', country: 'Туреччина', forPets: 'Для котів', imagePath: 'rigor.jpg' },
      { id: 4, name: 'Josera JosiDog', category: 'Сухий корм', price: 1109, brand: 'Josera', country: 'Німеччина', forPets: 'Для дорослих собак, Для собак похилого віку', imagePath: 'josera.jpg' },
      { id: 5, name: `Trixie М'ячик`, category: 'Іграшки', price: 120, brand: 'Trixie', country: 'Німеччина, Китай', forPets: 'Для собак', imagePath: 'ball.jpg' },
      { id: 6, name: 'Beaphar Care+', category: 'Корм', price: 554, brand: 'Beaphar', country: 'Нідерланди', forPets: 'Для кроликів', imagePath: 'beaphar-care.jpg' },
    ];
  }

  getAllProducts() {
    return this.products;
  }

  getProductById(id) {
    return this.products.find(product => product.id === id);
  }

  addProduct(product) {
    product.id = this.products.length + 1;
    this.products.push(product);
    return product;
  }

  updateProduct(id, updatedProduct) {
    const index = this.products.findIndex(product => product.id === id);
    if (index !== -1) {
      this.products[index] = { ...this.products[index], ...updatedProduct };
      return this.products[index];
    }
    return null;
  }

  deleteProduct(id) {
    const index = this.products.findIndex(product => product.id === id);
    if (index !== -1) {
      const deletedProduct = this.products.splice(index, 1);
      return deletedProduct[0];
    }
    return null;
  }
}

export default InMemoryProductService;
