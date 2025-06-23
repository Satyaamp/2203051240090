
---

````markdown
# 🌐 URL Shortener Microservice

A robust HTTP URL Shortener Microservice built with **Node.js**, **Express.js**, **MongoDB**, and a **reusable Logging Middleware** integrated with the Affordmed Logging API.

---

## 🧩 Features

✅ Shorten long URLs  
✅ Optional custom shortcodes  
✅ Automatic expiry (default: 30 minutes)  
✅ Redirect support  
✅ MongoDB 
✅ Integrated reusable logging middleware  
❌ No login required  

---

## 🛠️ Setup

### 1. Clone & Install

```bash
git clone https://github.com/Satyaamp/2203051240090.git
cd Backend Test Submission
npm install
````

### 2. Configure MongoDB

```js
mongoose.connect("mongodb://127.0.0.1:27017/satyamurlshort")
```

### 3. Set Headers for Authenticated Routes

```http
Content-Type: application/json
Authorization: Bearer YOUR_ACCESS_TOKEN
```

---

## 🚀 Run the Server

```bash
node server.js
```

---

## 🔗 API Endpoints

### 🔸 POST `/shorturls`

**Request Body:**

```json
{
  "url": "https://example.com",
  "validity": 15,
  "shortcode": "mycustom"
}
```

**Response:**

```json
{
  "shortLink": "http://localhost:3000/mycustom",
  "expiry": "2025-06-23T15:30:00Z"
}
```

---

### 🔸 GET `/:shortcode`

**Example:**
`GET http://localhost:3000/mycustom`
🔁 Redirects to original URL if not expired.

---

### 🔸 GET `/shorturls/:shortcode`

**Response:**

```json
{
  "originalURL": "https://example.com",
  "createdAt": "2025-06-23T14:00:00.000Z",
  "expiry": "2025-06-23T14:30:00.000Z",
  "totalClicks": 2,
  "clickDetails": [
    {
      "timestamp": "2025-06-23T14:15:00.000Z",
      "referrer": "direct",
      "location": "::1"
    }
  ]
}
```

---

## 🛡️ Logging Middleware

This project includes a **reusable logging function** that captures and sends logs to the Affordmed test server using:

```js
Log(stack, level, package, message)
```

The middleware ensures all critical actions and errors are reported via HTTP POST requests.

---

## 👨‍💻 Author

**Satyam Kumar**
Roll No: `2203051240090`
Email: `2203051240090@paruluniversity.ac.in`

---

```
