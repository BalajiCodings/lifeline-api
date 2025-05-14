# 💓 Lifeline API

A secure and scalable backend API for user authentication built using **Node.js**, **Express.js**, and **MongoDB**.

---

## 🚀 Features

- User Registration & Login (JWT Auth)
- Passwords hashed with `bcryptjs`
- Token-based protected routes
- Input validation using `express-validator`
- Secure headers with `helmet`
- CORS enabled for frontend integration
- Logging with `morgan`
- Rate limiting to prevent brute-force attacks

---

## 🛠️ Tech Stack

| Technology    | Purpose                         |
|---------------|---------------------------------|
| Node.js       | JavaScript runtime              |
| Express.js    | Web framework                   |
| MongoDB       | NoSQL database                  |
| Mongoose      | ODM for MongoDB                 |
| bcryptjs      | Hash passwords securely         |
| jsonwebtoken  | JWT-based authentication        |
| dotenv        | Environment variable handling   |
| helmet        | Set secure HTTP headers         |
| cors          | Allow cross-origin requests     |
| morgan        | Request logging in dev mode     |
| nodemon       | Auto-restart during development |

---

## 📦 Installation

```bash
git clone https://github.com/your-username/lifeline-api.git
cd lifeline-api
npm install
```

---

## 🔐 Environment Setup

Create a `.env` file:

```env
PORT=5000
MONGODB_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret_key
```

---

## ⚙️ Running the Server

```bash
# Development
npm run dev

# Production
npm start
```

---

## 📌 API Endpoints

### 🔹 Register

`POST /register`  
**Body**:
```json
{
  "name": "Balaji",
  "email": "balaji@example.com",
  "password": "yourPassword"
}
```

---

### 🔹 Login

`POST /login`  
**Body**:
```json
{
  "email": "balaji@example.com",
  "password": "yourPassword"
}
```

**Response**:
```json
{
  "token": "your_jwt_token"
}
```

---

## ✅ How It Works (Flow Diagram)

1. `register()` → Saves user with hashed password  
2. `login()` → Verifies password → Sends back JWT  
3. `authMiddleware` → Validates token → Grants access  
4. `Protected Routes` → Read `req.user` from decoded token

---

## 👨‍💻 Author

- **Balaji**  
- [GitHub](https://github.com/BalajiCodings)

---

## 🛡️ License

This project is licensed under the [ISC License](LICENSE).