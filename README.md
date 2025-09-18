🎟 Ticket Management System

A simple, efficient, and responsive Ticket Management System built with React, Redux Toolkit, and Tailwind CSS.
This system helps you create, track, filter, and manage tickets with ease.

🚀 Features

🔍 Search Bar – Quickly find tickets by keywords.

🎚 Filter Options – Filter by status (Open, In Progress, Resolved) and priority (Low, Medium, High).

🗂 View Modes – Toggle between Table View and Card View.

➕ Add Ticket – Create new tickets easily.

❌ Delete Confirmation – Delete tickets safely with confirmation modal.

🔔 Notifications – Instant feedback for actions (delete, update, etc.).

♻ Reset Filters – Quickly clear all filters and search inputs.

💾 Session Storage Persistence – Keeps your filters and search state even after page refresh.

🛠️ Tech Stack

React 18

Redux Toolkit (state management)

TypeScript (type safety)

Tailwind CSS (styling)

Framer Motion (animations)

📸 Screenshots
Ticket Table View

Ticket Card View

📂 Project Structure
src/
│── components/
│   ├── buttons/         # Reusable buttons (Add, Reset, Display toggle)
│   ├── cards/           # Ticket card view components
│   ├── filterOptions/   # Search + Filter UI components
│   ├── ticketComponents # Ticket table and related parts
│   └── Notification.tsx # Notification UI
│
│── slice/               # Redux slices (ticketSlice, userSlice, etc.)
│── store/               # Redux store configuration
│── utils/               # Utility functions (filterTickets, helpers, etc.)
│── pages/               # Page components (TicketListPage, DescriptionPage, etc.