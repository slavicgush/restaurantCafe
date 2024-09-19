import mysql from "mysql2/promise";

const db = await mysql.createConnection({
  host: 'yours',
  user: 'yours',
  password: 'yours',
  database: 'yours'
});
 try { 
  await db.connect();
  console.log('Connected to MYSQL restaurant database');
 } catch(err){
  console.error('Database connection error:',err); 
}
  

export async function getUser(query = {}) {
    const queryElements = [];
    const values =[];
    if (query) {
      for (const key in query) {
        queryElements.push(`${key} = ?`);
        values.push(query[key]);
      }
    }
       
    const queryString = `SELECT * FROM users WHERE ${queryElements.join(' AND ')}`;
    //console.log('Generated SQL query:', queryString);
    //console.log('Query values:', values);
    try {
      const [data] = await db.query(queryString, values);
     // console.log(data);
      return data;
  } catch (error) {
      console.error('Error executing query:', error);
      throw error;
  }
}


export async function createUser(query = {}){
  const queryElements = [];
    const values =[];
    if (query) {
      for (const key in query) {
        queryElements.push(`${key} = ?`);
        values.push(query[key]);
      }
    }
       
    const queryString = `INSERT INTO users (username,password) VALUES(?,?)`;
   // console.log('Generated SQL query:', queryString);
   // console.log('Query values:', values);
    try {
      const [data] = await db.query(queryString, values);
      return data.insertId;
  } catch (error) {
      console.error('Error executing query:', error);
      throw error;
  }
}

export async function getIcons(){
  const query = `SELECT TO_BASE64(photos) AS icon FROM iconpng_photos WHERE id < 6`;
  const [icons] = await db.query(query);
 return icons;
}

export async function getSocialIcons(){
  const query = `SELECT TO_BASE64(photos) AS sicon FROM iconpng_photos WHERE id > 5 `;
  const [sicons] = await db.query(query);
 return sicons;
}

export async function getBackgroundImage(){
  const query = `SELECT TO_BASE64(image) AS background FROM background_images WHERE id = 2`;
  const [background] = await db.query(query);
 return background;
} 

export async function getWallpapers(){
  const query = `SELECT TO_BASE64(photos) AS wallpaper FROM homepage_photos WHERE id < 13`;
  const [wallpapers] = await db.query(query);
  return wallpapers;
}
export async function getAllMenu(){
  const query = `SELECT 'breakfast' AS category, id, name, TO_BASE64(photo) AS image, info, price FROM breakfast
  UNION ALL
  SELECT 'lunch' AS category, id, name, TO_BASE64(photo) AS image, info, price FROM lunch
  UNION ALL
  SELECT 'dinner' AS category, id, name, TO_BASE64(photo) AS image, info, price FROM dinner
  UNION ALL
  SELECT 'kienyeji' AS category, id, name, TO_BASE64(photo) AS image, info, price FROM kienyeji_classics 
  UNION ALL
  SELECT 'softdrinks' AS category, id, name, TO_BASE64(photo) AS image, info, price FROM softdrinks`;
  const [data] = await db.query(query);
  return data;
}

export async function getBreakfastMenu(){
  const query = `SELECT id,name FROM breakfast`;
  const [data] = await db.query(query);
  return data ; 
}


export async function getBreakfastItem(id = 1){
  const query = `SELECT name, TO_BASE64(photo) AS image,info,price FROM breakfast WHERE id = ?`;
  const [data] = await db.query(query,[id]);
  return data ; 
}

export async function getSoftdrinkMenu(){
  const query = `SELECT id,name FROM softdrinks`;
  const [data] = await db.query(query);
  return data ; 
}


export async function getSoftdrinkItem(id = 1){
  const query = `SELECT name, TO_BASE64(photo) AS image,info,price FROM softdrinks WHERE id = ?`;
  const [data] = await db.query(query,[id]);
  return data ; 
}

export async function getLunchMenu(){
  const query = `SELECT id,name FROM lunch`;
  const [data] = await db.query(query);
  return data ; 
}


export async function getLunchItem(id = 1){
  const query = `SELECT name, TO_BASE64(photo) AS image,info,price FROM lunch WHERE id = ?`;
  const [data] = await db.query(query,[id]);
  return data ; 
}

export async function getDinnerMenu(){
  const query = `SELECT id,name FROM dinner`;
  const [data] = await db.query(query);
  return data ; 
}


export async function getDinnerItem(id = 1){
  const query = `SELECT name, TO_BASE64(photo) AS image,info,price FROM dinner WHERE id = ?`;
  const [data] = await db.query(query,[id]);
  return data ; 
}

export async function getKienyejiMenu(){
  const query = `SELECT id,name FROM kienyeji_classics`;
  const [data] = await db.query(query);
  return data ; 
}


export async function getKienyejiItem(id = 1){
  const query = `SELECT name, TO_BASE64(photo) AS image,info,price FROM kienyeji_classics WHERE id = ?`;
  const [data] = await db.query(query,[id]);
  return data ; 
}
