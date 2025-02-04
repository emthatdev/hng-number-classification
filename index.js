const express = require("express");
const app = express();
const axios = require("axios");
const cors = require("cors");
const PORT = process.env.PORT || 3000;

app.use(cors());

app.get('/api/classify-number', async (req, res) => {
    if (! req.query.number) {
        return res.status(400).json({message: "Query parameter 'number' is required"});
    }

    const number = Number(req.query.number);

    if (isNaN(number)) {
        return res.status(400).json({
            "number": getTypeOf(req.query.number),
            "error": true,
        });
    }

    let funFact = null;

    try {
        const response = await axios.get(`http://numbersapi.com/${number}/math`);
        funFact = response.data;
    } catch {
        funFact = "Oops, something went wrong. Couldn't access the fact.";
    }

    return res.json({
        "number": number,
        "is_prime": isPrime(number),
        "is_perfect": isPerfect(number),
        "properties": getProperties(number),
        "digital_sum": sumOfDigits(number),
        "fun_fact": funFact,
    });
});

const getProperties = (number) => {
    let properties = [];
    if (isArmstrong(number)) properties.push("armstrong");
    if (isEven(number)) properties.push("even");
    else properties.push("odd");

    return properties;
}

const getTypeOf = (value) => {
    if (/^[A-Za-z]+$/.test(value)) return "alphabet";
    if (/[^A-Za-z0-9]/.test(value)) return "symbol";
}

const isPrime = (num) => {
    if (num === 2 || num === 3) return true;
    if (num <= 1 || isEven(num) || ! Number.isInteger(num)) return false;

    for (let i = 3; i <= Math.sqrt(num); i++) {
        if (num % i === 0) return false;
    }
    return true;
}

const isPerfect = (num) => {
    if (num < 6 || ! Number.isInteger(num) || isPrime(num) || ! isEven(num)) return false;
    let sumOfDivisors = 0;
    for (let i = 1; i < num / 2; i++) {
        if (num % i === 0) sumOfDivisors += i;
    }
    return num === sumOfDivisors;
}

const isArmstrong = (num) => {
    if (! Number.isInteger(num) || num < 1) return false;
    const numAsString = num.toString();
    const numberOfDigits = numAsString.length;
    let sum = 0;
    for (let i = 0; i < numberOfDigits; i++) {
        sum += Math.pow(Number(numAsString[i]), numberOfDigits);
    }
    return num === sum;
}

const isEven = (num) => (num % 2 === 0);

const sumOfDigits = (num) => {
    const numAsString = num.toString();
    const numberOfDigits = numAsString.length;
    let sum = 0;
    let counter = num >= 0 ? 0 : 1;
    for (let i = counter; i < numberOfDigits; i++) {
        sum += Number(numAsString[i]);
    }
    return sum;
};

app.listen(PORT, () => console.log(`Server running at ${PORT}`));
