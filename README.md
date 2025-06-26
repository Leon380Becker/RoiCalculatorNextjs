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

---

# 📄 Project Overview

This project is a **client-side ROI calculator** that allows users to:

* Fill in a form with their name and email
* Automatically generate and download a PDF with the calculated results
* Send the name and email directly to HubSpot as new Contacts (via the backend API)

All calculations are handled client-side. The only backend functionality is for sending submissions to HubSpot.

---

## ⚙️ Backend API Endpoint

The backend logic for sending user data to HubSpot is implemented in the following API route:

**File:** `/pages/api/save-user.ts`

This API:

* Accepts `POST` requests
* Expects a JSON body with `name` and `email`
* Sends the data to HubSpot CRM via the official API
* Requires a valid `HUBSPOT_ACCESS_TOKEN` in your environment variables

---

## 🔐 Configure Environment Variables

To use the HubSpot API, you need to set the following environment variable:

```env
HUBSPOT_ACCESS_TOKEN=your_private_app_token_here
```

This can be done either:

* Locally (create a `.env.local` file in the root of the project)
* On Vercel (go to your project → Settings → Environment Variables)

---

## 🛠️ Install Dependencies

If you're setting this up from scratch or handing off to a new developer, run:

```bash
npm install
```

This installs required dependencies such as:

* `next`, `react`, `react-dom` — core framework packages
* Any additional API packages used to connect to HubSpot

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

## 🧲 Calculation Logic

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
* Sends data to `/api/save-user` to create a new HubSpot contact
* Automatically generates and triggers a PDF download with the calculated data

> ✅ No server-side rendering or server-side PDF generation is used — everything runs on the client.

---

## 🔒 Security Notes

* `.env.local` must be listed in `.gitignore`
* Access tokens must never be committed to GitHub
* Only `POST` is allowed on the `/api/save-user` endpoint (already enforced in code)

---

## 🔗 HubSpot Integration Guide

To enable HubSpot integration:

### 1. Create a HubSpot Private App

1. Log in to your HubSpot account
2. Go to **Settings → Integrations → Private Apps**
3. Click **"Create a Private App"**
4. Enable the following scope:

```
crm.objects.contacts.write
```

5. Copy your **Access Token**

---

### 2. Add the Token to Your Environment

#### Locally

Create a `.env.local` file in the root:

```env
HUBSPOT_ACCESS_TOKEN=your_token_here
```

#### On Vercel

1. Go to your project on [vercel.com](https://vercel.com)
2. Click **Settings → Environment Variables**
3. Add:

```
Key:    HUBSPOT_ACCESS_TOKEN
Value:  your_token_here
```

Click **Save** and **Redeploy** your project.

---

### ⚠️ Notes on Testing

* HubSpot does **not** allow duplicate email addresses.
* A 500 error may occur if the email already exists in your CRM.
* Always test with **unique** emails when checking submissions.

---

## ▲ Deploying on Vercel (Hosting)

To deploy your Next.js app on Vercel:

1. Push your project to GitHub

2. Go to [vercel.com](https://vercel.com), sign in, and click "Add New Project"

3. Import your GitHub repository

   Vercel will detect it as a Next.js project automatically.

4. Set Environment Variables:

```
Key:    HUBSPOT_ACCESS_TOKEN
Value:  your_private_app_token
```

5. Deploy the project

📅 Done! Your app is now live, and leads submitted through the form go directly into HubSpot.

---

Feel free to reach out with any setup questions or integration support.
