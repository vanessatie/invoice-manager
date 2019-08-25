This project is a final project of the neuefische Web Development Bootcamp.
It is an app to manage invoices for small enterprises and freelancer.

## Setup the project

- Clone the project and set it up in your local environment
- Check all dependencies in package.json
- Install all dependencies with `npm init` and `npm install`

### Database

- This project uses MongoDB
- Create a file called `.env.local` and put your DB_URL into the file
- With your terminal you can start MongoDB with `mongod`

### Storage of images/ files

- This project uses [Cloudinary](https://cloudinary.com/) to store images and files uploaded by the image upload
- Put `REACT_APP_CLOUDINARY_CLOUDNAME=[your code]` and `REACT_APP_CLOUDINARY_PRESET=[your code]` into the file `.env.local` to make it work

### Start

- You can start the server with `npm run server` via your terminal
- The project can be started with `npm start`
