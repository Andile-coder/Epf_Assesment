const Pool = require("pg").Pool;
const { v1: uuidv1, v4: uuidv4 } = require("uuid");
const pool = new Pool({
  user: "postgres",
  host: "localhost",
  database: "epft",
  password: "Masela@2018",
  port: 5432,
});

const insertSalary = async (uniqueId, salary_id, data) => {
  let [amount, date_paid, customer_id] = [data?.Income, data?.Month, uniqueId];
  const salaryQuery =
    "INSERT INTO salaries ( salary_id,amount, date_paid,customer_id) VALUES ($1, $2, $3,$4)";
  await new Promise(function (resolve, reject) {
    pool.query(
      salaryQuery,
      [salary_id, amount, date_paid, customer_id],
      (error, results) => {
        if (error) {
          console.log(error);
          reject(error);
        }
        resolve(results);
      }
    );
  });
};

const getSalaries = () => {
  return new Promise(function (resolve, reject) {
    pool.query("SELECT * FROM salaries", (error, results) => {
      if (error) {
        reject(error);
      }
      resolve(results?.rows);
    });
  });
};
const getSalariesByCustomerId = (req) => {
  return new Promise(function (resolve, reject) {
    console.log(req.params.id);
    pool.query(
      `SELECT * FROM salaries where customer_id like ${JSON.stringify(
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
  insertSalary,
  getSalaries,
  getSalariesByCustomerId,
};
