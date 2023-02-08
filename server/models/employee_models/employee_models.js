const Pool = require("pg").Pool;
const pool = new Pool({
  user: "postgres",
  host: "localhost",
  database: "epft",
  password: "",
  port: 5432,
});

const getEmployees = () => {
  return new Promise(function (resolve, reject) {
    pool.query("SELECT * FROM customers", (error, results) => {
      if (error) {
        reject(error);
      }
      resolve(results?.rows);
    });
  });
};

const insertEmployee = (uniqueId, employee) => {
  const [first_name, last_name, hire_date] = [
    employee.firstName,
    employee.lastName,
    employee.dob.split("T")[0],
  ];
  const expeditureQuery =
    "INSERT INTO customers (unique_id,first_name,last_name, date_of_birth) VALUES ($1, $2, $3,$4)";
  return new Promise(function (resolve, reject) {
    pool.query(
      expeditureQuery,
      [uniqueId, first_name, last_name, hire_date],
      (error, results) => {
        if (error) {
          reject(error);
        }
        resolve(results);
      }
    );
  });
};
module.exports = {
  insertEmployee,
  getEmployees,
};
