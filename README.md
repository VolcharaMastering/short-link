**Short Link Service — Test Assignment**

This repository contains a minimal URL shortening service, split into two parts:

- **short-link-back**: The backend API for creating and resolving short URLs.
- **short-link-front**: The frontend application for users to shorten URLs and visit them.

---

## 📝 Test Assignment

Build a simple URL shortener with the following requirements:

1. **Short Link Creation**

   - Accept a long URL and (optionally) a custom alias.
   - Generate a unique short code if no alias is provided.
   - Store the mapping in a database.

2. **Redirection Endpoint**

   - Redirect requests to `http://localhost:4000/{shortCode}` (or deployed domain) to the original long URL.

3. **Validation**

   - Ensure provided URLs are valid HTTP/HTTPS addresses.
   - Check for alias collisions when a custom alias is used.

4. **User Interface**

   - A simple web form where users can enter a URL (and alias) and receive a shortened link.
   - Display recent URLs created in the current session.

---

## 🚀 Getting Started

Follow these steps to run the project locally.

### 1. Clone the repository

```bash
git clone https://github.com/your-username/short-link-service.git
cd short-link-service
```

### 2. Start Docker containers

The backend includes a `docker-compose.yml` at `short-link-back/docker-compose.yml`, which will spin up the database (PostgreSQL) and any other required services:

```bash
cd short-link-back
docker-compose up -d
```

### 3. Install dependencies

Open two separate terminal windows or tabs—one for the backend, one for the frontend.

#### Backend

```bash
cd short-link-back
npm install
```

#### Frontend

```bash
cd short-link-front
npm install
```

### 4. Prepare the database

> **Important Step:** Create a `.env` file by copying all the data from `.env.example`.

The Prisma schema is provided at `short-link-back/schema.prisma`. To set up the database schema and run migrations:

```bash
cd short-link-back
# Generate Prisma client
npx prisma generate

# Apply migrations (creates tables defined in schema.prisma)
npx prisma migrate dev --name init
```

> **Note:** Ensure your `.env` in `short-link-back` points to the Dockerized database:
>
> ```env
> DATABASE_URL="postgresql://postgres:postgres@localhost:5432/shortlink?schema=public"
> ```

### 5. Run the applications

#### Backend

```bash
cd short-link-back
npm run dev
```

By default, the API will be available at `http://localhost:4000`.

#### Frontend

```bash
cd short-link-front
npm run dev
```

By default, the frontend runs on `http://localhost:5173`.

---

## 📚 Useful Scripts

- **Backend**

  - `npm run dev` — Start the development server with hot reload.
  - `npm run start` — Start the production build.
  - `npx prisma studio` — Open Prisma Studio to explore your database.

- **Frontend**

  - `npm run dev` — Start the Vite development server.
  - `npm run build` — Build the production bundle.
  - `npm run preview` — Preview the production build locally.

---

## ⚙️ Configuration

Both services can be configured via a `.env` file in their root directories.

