# Event-Driven Architecture with Next.js

A modern **Event-Driven Todo Application** built with **Next.js 16**, **Clerk Authentication**, **Prisma ORM**, and **PostgreSQL (Neon)**. The application demonstrates how to use **Clerk Webhooks** to synchronize authenticated users with your own database using an event-driven architecture.

---

## 🚀 Features

- 🔐 Authentication with Clerk
- 📧 Email verification
- 🪝 Clerk Webhooks using Svix
- 🗄️ PostgreSQL database (Neon)
- ⚡ Prisma ORM
- 🎯 Event-driven user synchronization
- ✅ Todo model with user relationship
- 🌐 Next.js 16 App Router
- 🎨 TypeScript support

---

## 🛠 Tech Stack

- Next.js 16
- React 19
- TypeScript
- Clerk Authentication
- Svix
- Prisma ORM
- PostgreSQL (Neon)
- Turbopack

---

## 📂 Project Structure

```
app/
│
├── api/
│   └── webhooks/
│       └── register/
│           └── route.ts
│
├── sign-in/
├── sign-up/
│
lib/
│   └── prisma.ts
│
prisma/
│   └── schema.prisma
│
middleware.ts
```

---

## 📦 Installation

Clone the repository

```bash
git clone https://github.com/yourusername/event-driven-architecture.git
```

Navigate to the project

```bash
cd event-driven-architecture
```

Install dependencies

```bash
npm install
```

---

## ⚙️ Environment Variables

Create a `.env` file in the root directory.

```env
DATABASE_URL="your_neon_database_url"

NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=pk_test_xxxxxxxxx
CLERK_SECRET_KEY=sk_test_xxxxxxxxx

WEBHOOK_SECRET=whsec_xxxxxxxxx
```

---

## 🗄 Database Setup

Generate Prisma Client

```bash
npx prisma generate
```

Push schema to PostgreSQL

```bash
npx prisma db push
```

Open Prisma Studio

```bash
npx prisma studio
```

---

## ▶️ Run the Application

```bash
npm run dev
```

The application runs on

```
http://localhost:3000
```

---

## 🔔 Clerk Webhook Setup

Create a webhook inside the Clerk Dashboard.

### Endpoint

```
https://your-domain.com/api/webhooks/register
```

For local development, expose your app using a tunnel such as LocalTunnel or ngrok.

Example:

```
https://your-subdomain.loca.lt/api/webhooks/register
```

### Subscribe to Events

- user.created
- session.created
- email.created

Copy the **Signing Secret** into your `.env` file as:

```env
WEBHOOK_SECRET=whsec_xxxxxxxxx
```

---

## ⚡ Event Flow

```
User Signs Up
        │
        ▼
Clerk Authentication
        │
        ▼
user.created Event
        │
        ▼
Webhook (/api/webhooks/register)
        │
        ▼
Verify Signature (Svix)
        │
        ▼
Create User in PostgreSQL
        │
        ▼
Application Database Updated
```

---

## 🗃 Prisma Schema

### User

- id
- email
- isSubscribed
- subscriptionEnds
- username
- name
- createdAt

### Todo

- id
- title
- createdAt
- updatedAt
- userId

---

## 📜 API

### POST `/api/webhooks/register`

Receives Clerk webhook events.

Supported events:

- user.created
- session.created
- email.created

Example response

```http
HTTP/1.1 200 OK

Webhook received
```

---

## 🔐 Webhook Verification

Incoming webhooks are verified using **Svix** before processing.

```ts
const wh = new Webhook(WEBHOOK_SECRET);

const evt = wh.verify(body, {
  "svix-id": svix_id,
  "svix-timestamp": svix_timestamp,
  "svix-signature": svix_signature,
});
```

---

## 📸 Application Flow

1. User signs up with Clerk.
2. Clerk sends a `user.created` event.
3. The webhook verifies the request.
4. Prisma creates a new user in PostgreSQL.
5. The application stores authenticated users in its own database.

---

## 🚧 Future Improvements

- CRUD APIs for Todos
- Background job processing
- Kafka integration
- RabbitMQ integration
- Event Queue
- Stripe subscriptions
- Docker support
- CI/CD pipeline
- Unit & Integration tests

---

## 🤝 Contributing

Contributions are welcome.

1. Fork the repository
2. Create a feature branch

```bash
git checkout -b feature/new-feature
```

3. Commit your changes

```bash
git commit -m "Add new feature"
```

4. Push the branch

```bash
git push origin feature/new-feature
```

5. Open a Pull Request

---

## 📄 License

This project is licensed under the MIT License.

---

## 👨‍💻 Author

**Shivam Yadav**

GitHub: https://github.com/your-github-username

LinkedIn: https://linkedin.com/in/your-linkedin-profile
