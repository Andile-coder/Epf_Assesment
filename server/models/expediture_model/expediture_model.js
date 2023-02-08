const Pool = require("pg").Pool;
const pool = new Pool({
  user: "postgres",
  host: "localhost",
  database: "epft",
  password: "",
  port: 5432,
});

const getExpeditures = () => {
  return new Promise(function (resolve, reject) {
    pool.query("SELECT * FROM expenditures", (error, results) => {
      if (error) {
        reject(error);
      }
      resolve(results?.rows);
    });
  });
};

const insertExpenditure = (uniqueId, data) => {
  const expeditureQuery =
    "INSERT INTO expenditures ( amount,salary_id) VALUES ($1, $2)";
  const [amount, salary_id] = [data?.Expenses, uniqueId];
  return new Promise((reject, resolve) => {
    pool.query(expeditureQuery, [amount, salary_id], (error, result) => {
      if (error) {
        reject(error);
      }
      resolve(result?.rows);
    });
  });
};
const getExpenditureBySalaryId = (req) => {
  return new Promise(function (resolve, reject) {
    console.log(req.params.id);
    pool.query(
      `SELECT * FROM expenditures where salary_id like ${JSON.stringify(
        req.params.id
      ).replace(/"/g, "'")}`,
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
  insertExpenditure,
  getExpeditures,
  getExpenditureBySalaryId,
};
