# Torchlight Infinite Crafting Calculator

A full-stack web application that calculates the expected cost of crafting specific gear in **Torchlight Infinite** based on chosen item type, affixes, and desired tiers.

## 🧰 Tech Stack

- **Frontend**: React, Tailwind CSS, Vite
- **Backend**: Node.js, Express, MongoDB (Atlas)
- **Database**: MongoDB Atlas
- **Tools**: Git, VS Code, Postman

## 🚀 Features

- Submit desired affixes, tiers, and item type
- Calculates and stores estimated crafting costs
- View saved builds pulled from MongoDB
- Full-stack with RESTful API endpoints

## 📦 Install and Run Locally

```bash
git clone https://github.com/zachcary1/tli-crafting-calculator
cd tli-crafting-calculator

# Backend setup
cd backend
npm install
npm run dev

# In new terminal:
cd ../frontend
npm install
npm run dev
