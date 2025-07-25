# Rooms.io

Welcome to **Rooms.io**!  
This project is a **React Native Expo** application using **NativeWind** for styling and **Drizzle ORM** with **SQLite** for local database management.

---

## Table of Contents

- [Overview](#overview)
- [Prerequisites](#prerequisites)
- [Getting Started](#getting-started)
- [Running the App](#running-the-app)
- [Database (SQLite & Drizzle ORM)](#database-sqlite--drizzle-orm)
  - [Schema & Migrations](#schema--migrations)
  - [Drizzle Studio](#drizzle-studio)
- [Troubleshooting](#troubleshooting)
- [Git Workflow](#git-workflow)

---

## Overview

**Rooms.io** is a hotel management app built with:

- **React Native (Expo)**
- **NativeWind** (Tailwind CSS for React Native)
- **SQLite** (local database)
- **Drizzle ORM** (type-safe database access and migrations)

All code is in the `client/` folder.  
There is **no separate server**—all logic, UI, and database are managed locally.

---

## Prerequisites

- [Node.js](https://nodejs.org/en/download/) (v18+ recommended)
- [npm](https://www.npmjs.com/) or [yarn](https://yarnpkg.com/)
- [Git](https://git-scm.com/downloads) 

---

## Getting Started

1. **Clone the repository:**

   ```bash
   git clone https://github.com/Sasank-V/Rooms.io.git
   cd Rooms.io/client
   ```

2. **Install dependencies:**

   ```bash
   npm install
   # or
   yarn install
   ```

3. **(Optional) Configure environment variables:**

   Create a `.env` file if you need to override any Expo or app settings.

---

## Running the App

Start the Expo development server:

```bash
npm run start
```

- Scan the QR code with Expo Go (on your phone)
- Or press `a` (Android emulator), `i` (iOS simulator), or `w` (web browser)

---

## Database (SQLite & Drizzle ORM)

### How it works

- **SQLite** is used for local data storage on the device.
- **Drizzle ORM** provides type-safe schema, migrations, and queries.
- Migrations are run automatically on app startup using a custom hook.

### Schema & Migrations

#### 1. **Edit your schema**

Edit your database schema in:

```
client/database/schema.ts
```

#### 2. **Generate migration files**

After editing the schema, generate migration files:

```bash
npx drizzle-kit generate
```

> **Note:**  
> Make sure your `drizzle.config.js` or `drizzle.config.json` exists in the `client/` folder and uses only Node.js-compatible code.

#### 3. **Automatic migrations in the app**

Migrations are also run automatically on app startup using the `useDatabaseMigrations` hook in `app/_layout.tsx`.  
You do **not** need to run migrations manually on the device; this is handled for you.

#### 4. **Drizzle Studio (Optional)**

- Run the Expo 
  
  ```bash
  npm run start 
  ```
- Press `shift+m` for more tools
- Select `Open expo-drizzle-studio-plugin`
---

## Troubleshooting

### Common Issues

- **No such table: users**  
  Run the migration commands above to ensure your database schema is up to date.

- **Drizzle config errors**  
  Use `.js` or `.json` for your Drizzle config, not `.ts`.

- **Expo/React Native import errors in migrations**  
  Do not import Expo/React Native modules in your schema or Drizzle config.

- **Drizzle Studio errors (`prepareAsync is not a function`)**  
  Use the async SQLite client (`openDatabase`) for Drizzle Studio, not the sync client.

- **General Expo issues**  
  Try:
  ```bash
  rm -rf node_modules .expo
  npm cache clean --force
  npm install
  npx expo start --clear
  ```

---

## Git Workflow

- Use feature branches for development.
- Do **not** push directly to `main`.
- Use clear, conventional commit messages.

---

**Need help?**  
Open an issue or discussion on GitHub. Happy
