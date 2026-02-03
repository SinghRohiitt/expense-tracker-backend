# Personal Expense Tracker – Backend

A simple backend service for tracking personal monthly expenses.  
This project is developed as part of a backend screening task to demonstrate clean API design, MongoDB schema modeling, validations, middleware usage, and aggregation using Node.js and Mongoose.

---

## 🚀 Tech Stack

- Node.js
- Express.js
- MongoDB (MongoDB Atlas – Cloud Hosted)
- Mongoose
- ES Modules (import / export)

---

## 📁 Project Structure

src/
├── config/
│ └── db.js
├── models/
│ ├── User.js
│ └── Expense.js
├── controllers/
│ ├── user.controller.js
│ └── expense.controller.js
├── routes/
│ ├── user.routes.js
│ └── expense.routes.js
├── app.js
└── server.js

## ⚙️ Setup Instructions

### 1️⃣ Clone the repository

````bash
git clone https://github.com/SinghRohiitt/expense-tracker-backend.git
cd expense-tracker-backend

npm install

PORT=5000

MONGO_URI=mongodb+srv://expenseuser:expense123@cluster0.biclrze.mongodb.net/?appName=Cluster0

npm run dev

📌 API Endpoints
👤 User APIs
➕ Create User

POST /users

{
  "name": "Rohit Singh",
  "email": "rohit@gmail.com",
  "monthlyBudget": 30000
}

📄 Get User by ID

GET /users/:id

💸 Expense APIs
➕ Add Expense

POST /expenses

{
  "userId": "USER_ID",
  "title": "Groceries",
  "amount": 1200,
  "category": "Food",
  "date": "2026-02-01"
}

📄 Get All Expenses for a User

GET /users/:id/expenses?page=1&limit=10

📊 Monthly Expense Summary

GET /users/:id/summary

Sample Response

{
  "success": true,
  "data": {
    "totalExpenses": 12500,
    "remainingBudget": 17500,
    "expenseCount": 18
  }
}

🧠 Design Decisions

User and Expense are stored in separate collections to maintain clean data modeling.

Expenses reference users using MongoDB ObjectId.

Mongoose pre-save middleware is used to ensure expenses cannot be created for non-existing users.

Monthly expense summary is calculated using MongoDB aggregation to keep computation efficient and close to the database layer.

Pagination is implemented while fetching expenses to handle larger datasets gracefully.

✅ Validations Implemented

Monthly budget must be a positive number.

Expense amount must be greater than zero.

User email must be unique.

Expenses must reference an existing user.

Proper HTTP status codes and meaningful error messages are returned.

⚠️ Assumptions

Monthly summary is calculated based on the server’s current month.

Authentication and authorization are intentionally excluded as they were not part of the assignment scope.

🤖 AI Usage Disclosure

A file named PROMPTS_USED.md is included to document the usage of AI tools during development, as requested in the assignment.

🏁 Conclusion

This project focuses on core backend fundamentals such as schema design, validations, middleware usage, and aggregation logic while keeping the codebase simple, readable, and maintainable.


---

## 🧾 Git Commit for README

```bash
git add README.md
git commit -m "docs: add README with setup instructions and API documentation"
````
