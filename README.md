# HNG Stage 1 Backend Task - Number Classification API

This is a simple API built using Node.js and Express for the [HNG12](https://hng.tech/hire/nodejs-developers) Stage 1 Backend task. It has a single endpoint that takes a number and returns interesting mathematical properties about it, along with a fun fact.
The fun fact is obtained using the wonderful [Numbers API](http://numbersapi.com).

## How To Setup

### 1. Requirements
Make sure you have the following installed:
- [Node.js](https://nodejs.org/) (version 14+ recommended)
- [Git](https://git-scm.com/)

### 2. Clone the Repository
```sh
git clone https://github.com/emthatdev/hng-number-classification.git
cd hng-number-classification
```

### 3. Install Dependencies
```sh
npm install
```

### 4. Set Up Environment Variables (Optional)
Feel free to create a `.env` file in the root directory and add:
```env
PORT=3000
```
The server will run on 3000 without this step anyway.
> **Note:** Do **not** commit `.env` to Git for security reasons. (I know this is a basic project and all but...best practices y'know?)

### 5. Start the Server
```sh
npm start
```
or
```sh
node .
```
The server should now be running at `http://localhost:3000` or on whatever port you set.

## API Endpoints

### 1. Get Properties of Number
```http
GET /classify-number?number={371}
```
**Response:**
```json
{
  "number": 371,
  "is_prime": false,
  "is_perfect": false,
  "properties": ["armstrong", "odd"],
  "digit_sum": 11,
  "fun_fact": "371 is a narcissistic number"
}
```
