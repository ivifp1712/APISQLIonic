const db = require("./db");
const helper = require("../helper");
const config = require("../config");

async function getMultiple(page = 1) {
  const offset = helper.getOffset(page, config.listPerPage);
  const rows = await db.query(
    `SELECT * FROM libros LIMIT ${offset},${config.listPerPage}`
  );
  const data = helper.emptyOrRows(rows);
  const meta = { page };

  return data;
}

async function getSingle(isbn) {
  const rows = await db.query(
    `SELECT * FROM libros WHERE isbn = ?`,
    [isbn]
  );
  const data = helper.emptyOrRows(rows);

  return data;
}


async function create(libros) {
  const result = await db.query(
    `INSERT INTO libros 
    (isbn, titulo, autor, editorial, precio, stock, year, categoria, idioma) 
    VALUES 
    ("${libros.isbn}", "${libros.titulo}", "${libros.autor}", "${libros.editorial}", ${parseFloat(libros.precio)}, ${parseInt(libros.stock)}, ${parseInt(libros.year)}, "${libros.categoria}", "${libros.idioma}")`
  );

  let message = "Error in creating libros";

  if (result.affectedRows) {
    message = "libros created successfully";
  }

  return { message };
}

async function update(isbn, libros) {
  const result = await db.query(
    `UPDATE libros
    SET isbn="${libros.isbn}", titulo="${libros.titulo}", autor="${libros.autor}", editorial="${libros.editorial}", precio=${libros.precio}, stock=${libros.stock}, year=${libros.year}, categoria="${libros.categoria}", idioma="${libros.idioma}" 
    WHERE isbn=${isbn}`
  );

  let message = "Error in updating libros";

  if (result.affectedRows) {
    message = "libros updated successfully";
  }

  return { message };
}

async function remove(isbn) {
  const result = await db.query(
    `DELETE FROM libros WHERE isbn=${isbn}`
  );

  let message = "Error in deleting libros";

  if (result.affectedRows) {
    message = "libros deleted successfully";
  }

  return { message };
}

module.exports = {
  getMultiple,
  getSingle,
  create,
  update,
  remove,
};
