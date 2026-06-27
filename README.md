# 🛍️ Shaky Cart – Full Stack E-Commerce Website

A modern full-stack e-commerce web application built using **React**, **Django REST Framework**, and **PostgreSQL**. The application allows users to browse products, view product details, manage a shopping cart, authenticate using JWT, and place orders.

---

## 🚀 Features

* User Registration & Login (JWT Authentication)
* Secure Authentication with Access & Refresh Tokens
* Product Listing
* Product Detail Page
* Shopping Cart
* Add to Cart
* Remove from Cart
* Update Product Quantity
* Checkout Page
* Order Creation
* Responsive User Interface
* RESTful API Architecture

---

## 🛠️ Tech Stack

### Frontend

* React.js
* Vite
* React Router DOM
* Context API
* Tailwind CSS
* JavaScript (ES6+)

### Backend

* Django
* Django REST Framework
* JWT Authentication
* PostgreSQL
* Python

### Database

* PostgreSQL

---

## 📂 Project Structure

```
e-commerce/
│
├── backend/
│   ├── backend/
│   ├── store/
│   ├── requirements.txt
│   └── manage.py
│
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   ├── context/
│   │   ├── pages/
│   │   ├── utils/
│   │   └── assets/
│   ├── package.json
│   └── vite.config.js
│
└── README.md
```

---

## 📸 Screenshots

Add screenshots of your project here.

### Home Page

```
/screenshots/home.png
```

### Product Details

```
/screenshots/product-details.png
```

### Shopping Cart

```
/screenshots/cart.png
```

### Checkout

```
/screenshots/checkout.png
```

### Login

```
/screenshots/login.png
```

---

## ⚙️ Installation

### Clone Repository

```bash
git clone https://github.com/shaqueelahmed/e-commerce-full-stack-website.git

cd e-commerce-full-stack-website
```

---

## Backend Setup

Navigate to backend folder

```bash
cd backend
```

Create virtual environment

```bash
python -m venv venv
```

Activate virtual environment

### Windows

```bash
venv\Scripts\activate
```

### macOS/Linux

```bash
source venv/bin/activate
```

Install dependencies

```bash
pip install -r requirements.txt
```

Create a `.env` file inside the backend folder.

Example:

```env
SECRET_KEY=your_secret_key

DEBUG=True

DATABASE_NAME=your_database_name

DATABASE_USER=your_database_user

DATABASE_PASSWORD=your_database_password

DATABASE_HOST=localhost

DATABASE_PORT=5432
```

Run migrations

```bash
python manage.py migrate
```

Create Superuser

```bash
python manage.py createsuperuser
```

Start backend server

```bash
python manage.py runserver
```

Backend runs at

```
http://127.0.0.1:8000/
```

---

## Frontend Setup

Navigate to frontend folder

```bash
cd frontend
```

Install packages

```bash
npm install
```

Create a `.env` file

```env
VITE_DJANGO_BASE_URL=http://127.0.0.1:8000
```

Start frontend

```bash
npm run dev
```

Frontend runs at

```
http://localhost:5173/
```

---

## API Endpoints

| Method | Endpoint              | Description         |
| ------ | --------------------- | ------------------- |
| GET    | `/api/products/`      | Get all products    |
| GET    | `/api/products/<id>/` | Product details     |
| GET    | `/api/categories/`    | Categories          |
| GET    | `/api/cart/`          | View cart           |
| POST   | `/api/cart/add/`      | Add product to cart |
| POST   | `/api/cart/update/`   | Update quantity     |
| POST   | `/api/cart/remove/`   | Remove item         |
| POST   | `/api/orders/create/` | Create order        |
| POST   | `/api/token/`         | Login               |
| POST   | `/api/token/refresh/` | Refresh JWT Token   |

---

## 🔒 Authentication

This project uses **JWT Authentication**.

Users receive:

* Access Token
* Refresh Token

Protected API requests include:

```
Authorization: Bearer <access_token>
```

---

## Future Improvements

* Product Search
* Product Categories Filter
* Wishlist
* User Profile
* Order History
* Payment Gateway Integration (Stripe/Razorpay)
* Product Reviews & Ratings
* Admin Dashboard
* Email Notifications
* Image Upload via Cloudinary

---

## 👨‍💻 Author

**Shaqueel Ahmed**

GitHub:
https://github.com/shaqueelahmed

LinkedIn:
(Add your LinkedIn profile here)

---

## ⭐ Support

If you found this project useful, consider giving it a ⭐ on GitHub.
