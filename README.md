<h1 align="center">Welcome to WannaBnB 👋</h1>
<p>
  <a href="https://github.com/Syndux/WannaBnB" target="_blank">
    <img alt="Documentation" src="https://img.shields.io/badge/documentation-yes-brightgreen.svg" />
  </a>
</p>

> [WannaBnB](https://wannabnb.onrender.com/) is inspired by the online marketplace for short and long-term homestays and experiences, AirBnB. WannaBnB allows you to find a spot you'd be interested in staying at and see if it's as good as the pictures look by reading a previous stayers' reviews.

## Technologies Used

WannaBnB was built using the following technologies:

- JavaScript
- HTML
- CSS
- NodeJS
- Express
- Sequelize
- Postgres
- React


### 🏠 [Homepage](https://wannabnb.onrender.com/)

## Table of Contents
- [Installing/Getting Started](https://github.com/Syndux/WannaBnB#installation)
  - [Initial Configuration](https://github.com/Syndux/WannaBnB#initial-configuration)
  - [Operating](https://github.com/Syndux/WannaBnB#operating)
- [Project Showcase](https://github.com/Syndux/WannaBnB#project-showcase)
- [Wiki Documents](https://github.com/Syndux/WannaBnB#wiki-documents)
	- [API Routes](https://github.com/Syndux/WannaBnB/wiki/API-Routes)
 	- [Database Schema](https://github.com/Syndux/WannaBnB/wiki/Database-Schema)
 	- [Features](https://github.com/Syndux/WannaBnB/wiki/Feature-Documentation)
 	- [Redux Store Tree](https://github.com/Syndux/WannaBnB/wiki/Redux-State-Pseudocode)
- [To-Dos/Future Features](https://github.com/Syndux/WannaBnB#to-dosfuture-features)
- [Technical Implementation Details](https://github.com/Syndux/WannaBnB#technical-implementation-details)
	- [Code Snippets](https://github.com/Syndux/WannaBnB#code-snippets)
- [Authors](https://github.com/Syndux/WannaBnB#author)

## Installation

### Initial Configuration
#### Express/Sequelize
To install and run this project locally, start off with your backend server.

1. Clone this repository
    ```bash
    git clone https://github.com/Syndux/Om-Nom.git
    ```

2. Install dependencies
    ```bash
    cd backend
    npm install
    ```

3. Create a **.env** file based on the example with proper settings for your
   development environment
    - Make sure the SQLite3 database connection URL is in the **.env** file
    - The env example organizes all tables inside the `schema_name_here` schema, defined
        by the `SCHEMA` environment variable.  Replace the value for
        `SCHEMA` with a unique name, **making sure you use the snake_case
        convention**.
    <br></br>

4. Migrate your database, seed your database, and run your Express app

   ```bash
    npx dotenv sequelize db:migrate
    npx dotenv sequelize db:seed:all
    npm start
   ```
5. Now that you have your backend Flask server running. You need to run the React App in development in a different terminal instance.

#### React
1. Make sure you have a new terminal instance separate from your terminal for your backend. Navigate into the Om Nom project folder and then into react-app folder.
    ```bash
    cd frontend
    ```

2. Install all your dependencies before starting up the application.
    ```bash
    npm install &&
    npm start
    ```

3. Now that you have both your Express backend and React App frontend running, WannaBnB is operable.

### Operating
To run the application, navigate into the project folder in two separate terminal windows.

1. Ensure that the database has already been migrated and seeded. If it hasn't been done yet, refer to [Intitial Configuration](https://github.com/Syndux/WannaBnB/blob/main/README.md#initial-configuration)

2. In one terminal, go into backend and run the Express app
    ```bash
    npm start
    ```

3. In the other terminal, start the React app.
    ```bash
    npm start
    ```

4. WannaBnB will open in your browser and you can now enjoy using WannaBnB. Find your stay and get away!

## Project Showcase
![image](https://github.com/Syndux/WannaBnB/assets/78172054/49f5f54d-362f-46d4-9a5e-fd867a4fe090)

## [Wiki Documents](https://github.com/Syndux/WannaBnB/wiki)
- [API Routes](https://github.com/Syndux/WannaBnB/wiki/API-Routes)
- [Database Schema](https://github.com/Syndux/WannaBnB/wiki/Database-Schema)
- [Features](https://github.com/Syndux/WannaBnB/wiki/Feature-Documentation)
- [Redux Store Tree](https://github.com/Syndux/WannaBnB/wiki/Redux-State-Pseudocode)

## To-Dos/Future Features

The project is fully functional in its current state, but some other features we would like to implement in the future include:

- Ability to make a reservation/booking on a spot

## Technical Implementation Details
### Code Snippets

**Spot Details**
```javascript
<div className="spot-details">
	<div className="spot-location-rating">
		<div className="spot-city-state">{`${spot.city}, ${spot.state}`}</div>
			<span>
				<i className="fa-solid fa-star spot-rating" />
				{spot.avgRating
					? spot.avgRating.toFixed(Number.isInteger(spot.avgRating) ? 1 : 2)
					: "New"}
			</span>
		</div>
	<div className="spot-price">
		<span className="spot-price-value">${spot.price} </span>
		<span>night</span>
	</div>
</div>
```

## Author

👤 **Huey Nguyen**
* [![GitHub](https://img.shields.io/badge/github-%23121011.svg?style=for-the-badge&logo=github&logoColor=white)](https://github.com/Syndux)
* [![LinkedIn](https://img.shields.io/badge/linkedin-%230077B5.svg?style=for-the-badge&logo=linkedin&logoColor=white)](https://www.linkedin.com/in/huey-nguyen/)
