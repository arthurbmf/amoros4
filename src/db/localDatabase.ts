interface Furniture {
  id: number;
  name: string;
  quantity: number;
  model: string;
  imageUrl: string;
}

interface Database {
  furniture: Furniture[];
  logo: string | null;
}

const DB_KEY = 'amorosa_decoracoes_db';

function readDatabase(): Database {
  const data = localStorage.getItem(DB_KEY);
  if (!data) {
    return { furniture: [], logo: null };
  }
  return JSON.parse(data);
}

function writeDatabase(data: Database) {
  localStorage.setItem(DB_KEY, JSON.stringify(data));
}

export const addFurniture = (name: string, quantity: number, model: string, imageUrl: string): void => {
  const db = readDatabase();
  const newId = db.furniture.length > 0 ? Math.max(...db.furniture.map(f => f.id)) + 1 : 1;
  db.furniture.push({ id: newId, name, quantity, model, imageUrl });
  writeDatabase(db);
};

export const getFurniture = (): Furniture[] => {
  const db = readDatabase();
  return db.furniture;
};

export const deleteFurniture = (id: number): void => {
  const db = readDatabase();
  db.furniture = db.furniture.filter(f => f.id !== id);
  writeDatabase(db);
};

export const updateLogo = (logoUrl: string): void => {
  const db = readDatabase();
  db.logo = logoUrl;
  writeDatabase(db);
};

export const getLogo = (): string | null => {
  const db = readDatabase();
  return db.logo;
};

export default { addFurniture, getFurniture, deleteFurniture, updateLogo, getLogo };