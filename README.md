# SEABNB

SEABNB is a Spongebob themed clone of [AirBnB](https://www.airbnb.com/). Users are able to create, update, delete, and view spots and reviews for now.
[Link to site](https://airbnb-clone-2u2s.onrender.com/)
## Technologies
- JavaScript
- React
- Redux
- Express
- NodeJS
- Sequelize
- PostgreSQL
- HTML5
- CSS3
## SEABNB Showcase
![](https://i.imgur.com/1wwBpdh.png)

## Get Started Locally
1. Clone and open repository
2. Navigate to `backend`
   1. Set up a `.env` with the following:
      ```
      PORT=8000 
      DB_FILE=db/dev.db
      ```
   2. Set up database by running the following:
      ```
      npx dotenv sequelize db:migrate
      npx dotenv sequelize db:seed:all
      ```  
   3. Run `npm install` then `npm start`
3. Navigate to `frontend`
   1. Run `npm install` then `npm start`

NOTE: Must have 2 active terminals running the backend and frontend.

