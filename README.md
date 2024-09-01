
## Description

Sample full stack app using Nextjs 14 + prisma/postgreSQL. The goal for this project was to implement a very simplified expense manager app, that allows users to track expenses / incomes for specific periods of times.

features included:
- Google sign-in
- Dashboard with overal and detailed view
- Categories CRUD
- Accounts CRUD
- Caching
- Prisma ORM

![App Screenshot](/public/screenshots/dashboard.png)

![App Screenshot](/public/screenshots/categories.png)

![App Screenshot](/public/screenshots/accounts.png)


## Environment Variables
The following environment variables are needed in the project:

--AuthJS secret key
AUTH_SECRET=

--Google OAuth ID + Secret 
AUTH_GOOGLE_ID=
AUTH_GOOGLE_SECRET=

--PostgreSQL connection string
DATABASE_URL="postgresql://x:y@host:port/db?schema=public"


## How to run

 - create db and run script.sql
 - configure .env variables
 - npm i && npm run dev