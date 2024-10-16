class InMemoryProductService {
  constructor() {
    this.products = [
      { id: 1, name: 'Сухий корм для котів', category: 'Корм', price: 300, brand: 'Whiskas', country: 'Україна', forPets: 'Коти' },
      { id: 2, name: 'Іграшка для собак', category: 'Іграшки', price: 150, brand: 'PetSafe', country: 'США', forPets: 'Собаки' },
      { id: 3, name: 'Клітка для птахів', category: 'Аксесуари', price: 500, brand: 'AviaryPro', country: 'Німеччина', forPets: 'Птахи' },
      { id: 4, name: 'Лежак для котів', category: 'Меблі', price: 200, brand: 'CatNap', country: 'Франція', forPets: 'Коти' },
      { id: 5, name: 'Миска для собак', category: 'Аксесуари', price: 120, brand: 'DoggieStyle', country: 'Китай', forPets: 'Собаки' },
      { id: 6, name: 'Грілка для тварин', category: 'Техніка', price: 350, brand: 'PetHeat', country: 'Японія', forPets: 'Усі' },
      { id: 7, name: 'Туалет для котів', category: 'Аксесуари', price: 400, brand: 'LitterMatic', country: 'США', forPets: 'Коти' },
      { id: 8, name: 'Ласощі для собак', category: 'Ласощі', price: 100, brand: 'BarkTreat', country: 'Німеччина', forPets: 'Собаки' },
      { id: 9, name: 'Гребінець для котів', category: 'Гігієна', price: 80, brand: 'PetGroom', country: 'Україна', forPets: 'Коти' },
      { id: 10, name: 'Корм для риб', category: 'Корм', price: 90, brand: 'AquaFeed', country: 'Китай', forPets: 'Риби' },
      { id: 11, name: 'Шлея для собак', category: 'Аксесуари', price: 150, brand: 'WalkEasy', country: 'США', forPets: 'Собаки' },
      { id: 12, name: 'Корм для гризунів', category: 'Корм', price: 200, brand: 'RodentDiet', country: 'Австралія', forPets: 'Гризуни' },
      { id: 13, name: 'Зоомагазинна сумка', category: 'Меблі', price: 250, brand: 'PetBag', country: 'Франція', forPets: 'Усі' },
      { id: 14, name: 'Вигул для собак', category: 'Аксесуари', price: 500, brand: 'PetWalk', country: 'Німеччина', forPets: 'Собаки' },
      { id: 15, name: 'Гамак для птахів', category: 'Меблі', price: 200, brand: 'BirdNest', country: 'Канада', forPets: 'Птахи' }
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
