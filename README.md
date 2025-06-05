This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

# 📄 Project Overview

This project is a **client-side ROI calculator** that allows users to:

* Fill in a form with their name and email
* Automatically generate and download a PDF with the calculated results
* Send the name and email to a MongoDB database via a backend API

All calculations are handled client-side. The only backend functionality is for storing form submissions in the database.

---

## ⚙️ Backend API Endpoint

The backend logic for saving user data is implemented in the following API route:

**File:** `/pages/api/save-user.ts`

This API:

* Accepts `POST` requests
* Expects a JSON body with `name` and `email`
* Saves the data to a MongoDB collection

The API uses **Mongoose** to connect to MongoDB. To enable it, you must set up your own MongoDB database and configure your environment variables.

---

## ☁️ Set Up MongoDB

### 1. Create a MongoDB Account

1. Go to [https://www.mongodb.com](https://www.mongodb.com)
2. Click **"Start Free"** and create an account
3. Select **MongoDB Atlas** (cloud hosting)
4. Create a **Shared Cluster** (Free Tier is fine)

### 2. Set Up a Database

1. Create a new project
2. Click **"Build a Database"**
3. Choose the free **M0 cluster**
4. Once the cluster is created:

   * Go to **Database Access**, add a user with a username and password
   * Go to **Network Access**, add your IP address (or `0.0.0.0` to allow all)
   * Go to **Clusters → Connect → Drivers**, and copy your connection string

It will look like:

```
mongodb+srv://<username>:<password>@cluster0.mongodb.net/?retryWrites=true&w=majority
```

---

## 🔐 Configure Environment Variables

In the root of the project, create a `.env.local` file with the following contents:

```env
MONGODB_URI=mongodb+srv://<username>:<password>@cluster0.mongodb.net/roi-database?retryWrites=true&w=majority
```

> ⚠️ Replace `<username>` and `<password>` with your actual credentials. (From the connection string you copied "mongodb+srv://<username>:<password>@cluster0.mongodb.net/?retryWrites=true&w=majority")
> The database name `roi-database` can be changed to whatever you prefer.

---

## 🛠 Install Dependencies

If you're setting this up from scratch or handing off to a new developer, instruct them to run:

```bash
npm install
```

This installs required dependencies such as:

* `mongoose` — for MongoDB interactions
* `next`, `react`, `react-dom` — core framework packages

Ensure `mongoose` is listed in your `package.json` dependencies:

```json
"dependencies": {
  "mongoose": "^7.4.0",
  "next": "...",
  "react": "...",
  "react-dom": "..."
}
```

---

## 💻 Development Setup

### 1. Recommended: Install Visual Studio Code

VS Code is the preferred editor for this project. It provides:

* Easy `.env` management
* Git integration
* Extensions for formatting and debugging

### 2. Run the Development Server

To start the project locally:

```bash
npm run dev
```

Your app should be available at [http://localhost:3000](http://localhost:3000)

---

## 🧮 Calculation Logic

All calculation formulas and helper functions used in the ROI calculator live in the `/helpers` folder.

This folder contains modular JavaScript or TypeScript files that:

* Receive inputs from the user form (Calculator inputs)
* Calculate financial metrics or return on investment values
* Provide formatted data to the PDF builder and UI components

These are imported and used directly in the form submission logic and PDF generation process.

---

## 📩 Form Submission + PDF Download

The popup form:

* Collects user input (name, email)
* Calls the `/api/save-user` route to save to MongoDB
* Automatically generates and triggers a PDF download with the calculated data

> ✅ No server-side rendering or server-side PDF generation is used — everything runs on the client.

---

## 🔒 Security Notes

* `.env.local` must be listed in `.gitignore`
* Database credentials must never be committed to GitHub
* Only `POST` is allowed on the `/api/save-user` endpoint (already enforced in code)

---

▲ Deploying on Vercel (Hosting)

To deploy your Next.js app on Vercel:

1. Push to GitHub

Make sure your project is version controlled and pushed to a GitHub repository.

2. Connect to Vercel

Go to vercel.com

Sign in and click "Add New Project"

Import your GitHub repository

Vercel will detect it as a Next.js project automatically

3. Add Environment Variables

After import, go to the "Settings" tab of the project

Click "Environment Variables"

Add:

MONGODB_URI=mongodb+srv://<username>:<password>@cluster0.mongodb.net/roi-database?retryWrites=true&w=majority

Click Save and Deploy your app

Vercel will build and host your frontend, and your backend API routes (like /api/save-user) will run as serverless functions.

✅ Done!

You now have a client-side ROI calculator with PDF generation and backend user data capture, ready for local development and live deployment via Vercel.

##Bonus
To allow your local development environment or server (e.g., VS Code on your PC) to connect to the database, add your machine’s IP address under Network Access in your MongoDB Atlas dashboard.

Feel free to reach out with any setup questions or integration support!
