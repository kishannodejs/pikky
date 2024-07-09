const express = require('express');

// Simulated data (replace with actual data fetching logic)
const foodData = {
  pizza: {
    name: "Pizza",
    description: "A delicious Italian dish with various toppings.",
    price: 12.99,
  },
  pasta: {
    name: "Pasta",
    description: "A versatile pasta dish with endless variations.",
    price: 9.99,
  },
  burger: {
    name: "Burger",
    description: "A classic sandwich with a patty, bun, and toppings.",
    price: 10.99,
  },
};

const locations = ["Goa", "Mumbai", "Delhi"]; // Example locations

const nutritionalInfo = {
  pizza: { calories: 300, protein: 10 },
  pasta: { calories: 400, carbs: 50 },
  burger: { calories: 500, fat: 20 },
};

const stock = {
  pasta: false, // Out of stock
};

// Function to simulate data fetching with different delays
function fetchDataWithDelay(delay, data) {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(data);
    }, delay);
  });
}

// Functions to fetch specific data with delays
async function getFoodList() {
  const foodList = Object.values(foodData).map((item) => ({
    name: item.name,
    description: item.description,
    price: item.price,
  }));
  return await fetchDataWithDelay(115, foodList);
}

async function getAvailableLocations() {
  return await fetchDataWithDelay(2 * 60 * 1000, locations); // 2 minutes in milliseconds
}

async function getNutritionalInfo() {
  return await fetchDataWithDelay(300, nutritionalInfo);
}

async function getStockStatus() {
  return await fetchDataWithDelay(100, stock);
}

// Function to merge data with error handling
async function getAllFoodData(location) {
  try {
    const [foodList, availableLocations, nutritionalData, stockData] = await Promise.all([
      getFoodList(),
      getAvailableLocations(),
      getNutritionalInfo(),
      getStockStatus(),
    ]);

    // Filter food based on location (optional)
    const filteredFood = foodList.filter((item) => /* logic based on location */ true);

    // Combine data into a single object
    const mergedData = {
      location,
      availableLocations,
      food: filteredFood.map((item) => ({
        ...item,
        nutritionalInfo: nutritionalData[item.name],
        stock: !stockData[item.name], // Invert stock status (true if in stock)
      })),
    };
    return mergedData;
  } catch (error) {
    console.error(error);
    throw new Error('Internal Server Error');
  }
}

const app = express();

app.get('/food-descriptions/:location', async (req, res) => {
  const { location } = req.params;
  try {
    const allData = await getAllFoodData(location);
    res.json(allData);
  } catch (error) {
    res.status(500).send(error.message);
  }
});

app.listen(4000, () => console.log('Server listening on port 4000'));
