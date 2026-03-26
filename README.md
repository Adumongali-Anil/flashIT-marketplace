# 🚀 FlashIT Marketplace

A full-stack marketplace web application where customers can browse products, vendors can manage their products, and admins can control the platform.

---

## 🌐 Live Demo
👉 https://flash-it-marketplace-1fvnf0nkx-adumongali-anils-projects.vercel.app/

---

## 📌 Features

### 👤 Authentication
- Secure login & registration
- Role-based access (Admin / Vendor / Customer)
- JWT authentication

---

### 🛍️ Customer Features
- Browse products
- View stalls and vendors
- Add products to cart
- Increase / decrease quantity
- Place orders

---

### 🏪 Vendor Features
- Add new products
- Edit products
- Delete products
- Manage stalls
- View orders & revenue

---

### 🛠️ Admin Features
- Manage users
- Manage vendors
- Manage products
- View all orders
- Revenue analytics

---

## 🖼️ Tech Stack

### Frontend
- React.js
- React Router
- Material UI
- Axios

### Backend
- Spring Boot
- Spring Security
- JWT Authentication

### Database
- MySQL/for online deployement i used postgreSQL

### Deployment
- Frontend: Vercel
- Backend: Render

---

## 📂 Project Structure
flash-marketplace/
│
├── stalls-frontend/ # React frontend
├── stalls-springboot/ # Spring Boot backend
└── README.md

---

## ⚙️ Installation & Setup

### 1️⃣ Clone Repository
```bash
git clone https://github.com/Adumongali-Anil/flash-it-marketplace.git
cd flash-it-marketplace

2️⃣ Frontend Setup
cd stalls-frontend
npm install
npm start

3️⃣ Backend Setup
cd stalls-springboot
mvn spring-boot:run

