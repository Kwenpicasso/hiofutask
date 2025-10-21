A simple CRUD application built with Next.js, TypeScript, Zustand, Tailwind CSS, and ShadCN/UI.
The app interacts with the JSONPlaceholder API to display, create, update, and delete posts — featuring both SSR (Server-Side Rendering) and CSR (Client-Side Rendering).

 ## 🚀 Features
Core Features

## List (SSR):
Displays a list of posts rendered on the server at /posts.

## Details (SSR):
Shows details of a single post rendered on the server at /posts/[id].

Client-Side Features:

Search and pagination on the posts list.

Create, update, and delete posts with optimistic updates and rollback on failure.

Real-time UI updates powered by Zustand.

## State Management:
Global state handled with Zustand, storing:

Posts list

Loading and error states

Pagination and search queries

## UI/UX:

Clean and responsive layout using TailwindCSS.

Accessible forms for creating and editing posts.

Clear loading, empty, and error states.


##🧠 Tech Stack

Framework: Next.js (App Router)

Language: TypeScript

State Management: Zustand

UI Library: ShadCN/UI

Styling: Tailwind CSS

API: JSONPlaceholder
## Getting Started

Installation and Setup:
1) Clone the repository
```bash
git clone https://github.com/Kwenpicasso/hiofutask
cd hiofutask
```
2) Install dependencies
```bash
npm install
# or
yarn install
```
3) Run the development server
```bash
npm run dev
# or
yarn dev
```
4) Open in your browser
```bash
http://localhost:3000
```
## 🔄 SSR vs CSR Explanation

SSR (Server-Side Rendering):

Used for /posts and /posts/[id] pages.

Fetches and renders post data on the server before sending it to the client.

Improves SEO and ensures faster initial load.

CSR (Client-Side Rendering):

Used for search, pagination, create, update, and delete operations.

Enhances user interactivity and responsiveness without full page reloads.

Handled through Zustand and client-side API calls.

## 🧭 Trade-Offs & Possible Improvements

Pagination: Currently client-based; could be improved with server-side pagination.

Error Handling: Can be enhanced with toast notifications and detailed messages.

API Limitations: JSONPlaceholder is mock data only — a real backend would support persistent CRUD.

Testing: With more time, unit and integration tests could be added (e.g., Jest + React Testing Library).

## 🌍 Deployment

You can easily deploy this app using Vercel:
```bash
https://hiofutask.vercel.app/
```
