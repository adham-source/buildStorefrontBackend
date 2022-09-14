# Storefront Backend Project
- create simple APIs and an online storefront to showcase the company's fantastic product ideas.

## Getting Started
This repo contains a basic Node and Express app to get you started in constructing an API. To get started, clone this repo and run `npm i` in your terminal at the project root.

## Required Technologies
Your application must make use of the following libraries:
- Postgres for the database
- Node/Express for the application logic
- dotenv from npm for managing environment variables
- db-migrate from npm for migrations
- jsonwebtoken from npm for working with JWTs
- jasmine from npm for testing

## Steps to Completion
Setup and connect to database:
- Clone the repo on the machine.
- Install all dependencies and devDependencies by running `npm i` or `npm install` command.
- Create two database using postgreSQL then Added user role and password to access this databases. 
- Create file `.env` and using the same keys into the environment file `.env.example` and added values to these keys.
- The project running port on: `4000`.
- Run project using script `npm run watch` or `npm run dev` to insure that any thing working done.
- Run migrations file after create database and set valuses into `.env` using script `npm run migate` or `db-migarte up` to added table into database.

Scripting using:
- Use `npm run start` to run the application locally in production mode.
- Use `npm run dev` or `npm run watch` to run the application locally in development mode. 
- Use `npm run prettier` to format code by config formater.
- Use `npm run lint` to format and watch if any wrong or errors in the application.
- Use `npm run migrate` to make migrate up 2 version database (test & dev).
- Use `npm run build` to convert files.ts to files.js
- Use `npm run test` to test any things as well done on the database's test using plat form ( MAC or LINUX)  beacuse i was keyword `export` into the script test.

## Main Endpoint
[http//localhost://4000](http//localhost://4000)