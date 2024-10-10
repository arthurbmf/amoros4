import { openDB, DBSchema, IDBPDatabase } from 'idb';

interface AmorosaDB extends DBSchema {
  furniture: {
    key: number;
    value: {
      id?: number;
      name: string;
      quantity: number;
      model: string;
      imageUrl: string;
    };
    indexes: { 'by-name': string };
  };
  settings: {
    key: string;
    value: string;
  };
}

let db: IDBPDatabase<AmorosaDB>;

const initDB = async () => {
  db = await openDB<AmorosaDB>('amorosa-decoracoes', 1, {
    upgrade(db) {
      db.createObjectStore('furniture', { keyPath: 'id', autoIncrement: true });
      db.createObjectStore('settings');
    },
  });
};

export const addFurniture = async (name: string, quantity: number, model: string, imageUrl: string) => {
  await initDB();
  return db.add('furniture', { name, quantity, model, imageUrl });
};

export const getFurniture = async () => {
  await initDB();
  return db.getAll('furniture');
};

export const deleteFurniture = async (id: number) => {
  await initDB();
  return db.delete('furniture', id);
};

export const updateLogo = async (logoUrl: string) => {
  await initDB();
  return db.put('settings', logoUrl, 'logo');
};

export const getLogo = async () => {
  await initDB();
  return db.get('settings', 'logo');
};

export default { addFurniture, getFurniture, deleteFurniture, updateLogo, getLogo };