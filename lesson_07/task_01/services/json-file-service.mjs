import fs from 'fs/promises';
import path from 'path';

class JsonFileService {
  constructor(fileName) {
    this.filePath = path.join('data', `${fileName}.json`);
  }

  async _readDataFromFile() {
    try {
      const data = await fs.readFile(this.filePath, 'utf8');
      return JSON.parse(data);
    } catch (err) {
      if (err.code === 'ENOENT') {
        return [];
      }
      throw err;
    }
  }

  async _writeDataToFile(data) {
    const jsonData = JSON.stringify(data, null, 2);
    await fs.writeFile(this.filePath, jsonData, 'utf8');
  }

  async getAll() {
    return await this._readDataFromFile();
  }

  async getById(id) {
    const data = await this._readDataFromFile();
    return data.find(item => item.id === id);
  }

  async add(item) {
    const data = await this._readDataFromFile();
    const maxId = data.length > 0 ? Math.max(...data.map(item => item.id)) : 0;
    item.id = maxId + 1;
    data.push(item);
    await this._writeDataToFile(data);
    return item;
  }

  async update(id, updatedItem) {
    const data = await this._readDataFromFile();
    const index = data.findIndex(item => item.id === id);
    
    if (index !== -1) {
      const updatedData = { ...data[index], ...updatedItem, id: data[index].id };
      data[index] = updatedData;
  
      await this._writeDataToFile(data);
      return updatedData;
    }
    throw Error('Failed to update product.');
  }

  async delete(id) {
    const data = await this._readDataFromFile();
    const index = data.findIndex(item => item.id === id);
    if (index !== -1) {
      const deletedItem = data.splice(index, 1);
      await this._writeDataToFile(data);
      return deletedItem[0];
    }
    throw Error('Failed to delete product.');
  }
}

export default JsonFileService;
