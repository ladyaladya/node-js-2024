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
    item.id = data.length + 1;
    data.push(item);
    await this._writeDataToFile(data);
    return item;
  }

  async update(id, updatedItem) {
    const data = await this._readDataFromFile();
    const index = data.findIndex(item => item.id === id);
    if (index !== -1) {
      data[index] = { ...data[index], ...updatedItem };
      await this._writeDataToFile(data);
      return data[index];
    }
    return null;
  }

  async delete(id) {
    const data = await this._readDataFromFile();
    const index = data.findIndex(item => item.id === id);
    if (index !== -1) {
      const deletedItem = data.splice(index, 1);
      await this._writeDataToFile(data);
      return deletedItem[0];
    }
    return null;
  }
}

export default JsonFileService;
