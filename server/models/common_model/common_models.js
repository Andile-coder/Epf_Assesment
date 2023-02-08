const Pool = require("pg").Pool;
const pool = new Pool({
  user: "postgres",
  host: "localhost",
  database: "epft",
  password: "",
  port: 5432,
});

const getData = () => {
  return new Promise(function (resolve, reject) {
    pool.query(
      "SELECT amount  FROM expenditures UNION SELECT amount FROM salaries",
      (error, results) => {
        if (error) {
          reject(error);
        }
        resolve(results?.rows);
      }
    );
  });
};
module.exports = {
  getData,
};
