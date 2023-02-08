const express = require("express");
const { v1: uuidv1, v4: uuidv4 } = require("uuid");
const app = express();
const port = 3001;

app.use(express.json());
app.use(function (req, res, next) {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET,POST,PUT,DELETE,OPTIONS");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Content-Type, Access-Control-Allow-Headers"
  );
  next();
});

const expediture_model = require("./models/expediture_model/expediture_model");
const employee_model = require("./models/employee_models/employee_models");
const salary_model = require("./models/salary_model/salary_model");
const common_model = require("./models/common_model/common_models");
app.post("/", async (req, res) => {
  const uniqueId = uuidv1().replace(/-/g, "");

  const body = req.body;
  return employee_model
    .insertEmployee(uniqueId, body.body.employee)
    .then(() => {
      for (let i = 0; i < body.body.data.length; i++) {
        const salary_id = uuidv4().replace(/-/g, "");
        salary_model
          .insertSalary(uniqueId, salary_id, body.body.data[i])
          .then(() => {
            console.log("expediture");
            expediture_model
              .insertExpenditure(salary_id, body.body.data[i])
              .catch((error) => console.log(error));
          });
      }
    })
    .catch((error) => {
      res.status(500).send(error);
    });
});
app.get("/employees", (req, res) => {
  employee_model.getEmployees().then((response) => {
    res.status(200).send(response);
  });
});

app.get("/all", (req, res) => {
  common_model.getData().then((response) => {
    res.status(200).send(response);
  });
});
app.get("/salaries", (req, res) => {
  salary_model.getSalaries().then((response) => {
    res.status(200).send(response);
  });
});
app.get("/salaries/:id", (req, res) => {
  salary_model.getSalariesByCustomerId(req).then((response) => {
    res.status(200).send(response);
  });
});

app.get("/expenditures", (req, res) => {
  expediture_model.getExpeditures().then((response) => {
    res.status(200).send(response);
  });
});
app.get("/expenditures/:id", (req, res) => {
  expediture_model.getExpenditureBySalaryId(req).then((response) => {
    res.status(200).send(response);
  });
});
app.listen(port, () => {
  console.log(`App running on port ${port}.`);
});
