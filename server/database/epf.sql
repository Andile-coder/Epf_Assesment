DO $$
DECLARE
    table_record record;
BEGIN
    FOR table_record IN (SELECT tablename FROM pg_tables WHERE schemaname = 'public') LOOP
        EXECUTE 'DROP TABLE IF EXISTS ' || table_record.tablename || ' CASCADE';
    END LOOP;
END $$;

CREATE TABLE customers (
  id SERIAL PRIMARY KEY,
  unique_id VARCHAR(255) NOT NULL,
  first_name VARCHAR(255) NOT NULL,
  last_name VARCHAR(255) NOT NULL,
  date_of_birth DATE NOT null,
  UNIQUE(unique_id)
  
);

CREATE TABLE salaries (
  id SERIAL PRIMARY KEY,
  salary_id VARCHAR(255) NOT NULL,
  amount NUMERIC(10, 2) NOT NULL,
  date_paid VARCHAR(255) NOT NULL,
  customer_id VARCHAR(255) NOT NULL REFERENCES customers(unique_id),
  UNIQUE (customer_id, date_paid),
  UNIQUE(salary_id)
);

CREATE TABLE expenditures (
  id SERIAL PRIMARY KEY,
  amount NUMERIC(10, 2) NOT NULL,
  salary_id VARCHAR(255) NOT NULL REFERENCES salaries(salary_id),
  UNIQUE (salary_id)
);
