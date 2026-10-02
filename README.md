
# ForgeDesk

ForgeDesk is an inventory management platform for small and midsized businesses that handles stock tracking, purchasing and suppliers through which businesses can maintain accurate inventory records, identify shortage of supplies and manage day to day inventory related tasks.



## Features

Authentication - Secure user login backed by custom JWT based system

Database - MariaDB for products, inventory, suppliers data.

Frontend - Blazingly fast UI built with Next.js + React + JavaScript + CSS

Backend - Authentication and database management done using Node.js, Next.js API Routes


## Tech Stack

Language:Javascript

Runtime: Node.js

Frontend: JavaScript, HTML, CSS

UI Library: React

Backend: Node.js, Next,js API Routes

Database: MariaDB

Auth: Custom JWT-Token, Cookies, Refresh token flow


## Quick Start

### Prerequisites

• Node.js 20+ 

• MariaDB (or MySQL 8.0+)

### Installation

#### 1. Clone the repository
git clone https://github.com/RohanPopat92/forgedesk.git 

cd forgedesk

#### 2. Install Dependencies
npm install

#### 3. Environment setup


    1. In the project root create a `.env` file 

    2. Copy your variable names from the `.env.example` and paste them into your `.env` file 

    3. Enter the required values from your local MariaDB config and protect your JWT secrets

Required environment variables:

* `DB_HOST`
* `DB_USER`
* `DB_PW`
* `DB_NAME`
* `JWT_SECRET`
* `JWT_REFRESH_SECRET`

**Important:** Don't commit your `.env` files to any public repository as numerous bots would start taking over the website leading to massive data breaches, loss of data, etc.


## Repository Structure


```text
forgedesk/
├── public/                         # Static assets
├── src/
│   ├── app/
│   │   ├── api/
│   │   │   ├── login/
│   │   │   │   └── route.js        # Login API
│   │   │   ├── logout/
│   │   │   │   └── route.js        # Logout API
│   │   │   ├── refresh/
│   │   │   │   └── route.js        # Token refresh API
│   │   │   ├── register/
│   │   │   │   └── route.js        # Registration API
│   │   │   └── test/
│   │   │       └── route.js        # Test API endpoint
│   │   ├── dashboard/
│   │   │   ├── page.js
│   │   │   └── page.module.css
│   │   ├── login/
│   │   │   ├── page.js
│   │   │   └── page.module.css
│   │   ├── register/
│   │   │   ├── page.js
│   │   │   └── page.module.css
│   │   ├── lib/
│   │   │   ├── auth.js             # Authentication utilities
│   │   │   ├── db.js               # Database connection
│   │   │   └── fetchWrapper.js     # API fetch wrapper
│   │   ├── page.js                 # Home page
│   │   ├── page.module.css
│   │   ├── layout.js               # Root layout
│   │   ├── globals.css
│   │   └── favicon.ico
│   └── proxy.js                    # Request proxy
├── .gitignore
├── package.json
├── package-lock.json
├── next.config.mjs
├── jsconfig.json
├── eslint.config.mjs
└── README.md
```
## Project Status

ForgeDesk is currently under development. I have decided to divide this project into 6 phases and each phase represents a section of how the project is being progressed.

### Current Progress

#### Phase 1 — Authentication & Authorization

* [x] User registration and login
* [x] Authentication and authorization
* [x] JWT-based access and refresh token flow
* [x] Session management

#### Phase 1.5 — Workspace Foundation *(In Progress)*

* [ ] Workspace creation page
* [ ] `workspaces` table
* [ ] `workspace_members` table
* [ ] First user becomes Owner
* [ ] User belongs to a workspace
* [ ] Workspace-aware application

#### Phase 1.75 — ForgeDesk Shell *(Planned)*

* [ ] Sidebar and top navigation
* [ ] User/profile menu
* [ ] Workspace/business name
* [ ] Dashboard placeholder
* [ ] Empty states

### Roadmap

#### Phase 2 — Products & Inventory

* [ ] Product management
* [ ] Categories and product details
* [ ] Stock quantity and low-stock thresholds
* [ ] Low-stock and out-of-stock states
* [ ] Inventory adjustments
* [ ] Inventory history

#### Phase 3 — Suppliers & Purchasing

* [ ] Supplier management
* [ ] Purchase orders
* [ ] Receiving stock

#### Phase 4 — Sales & Stock Movement

* [ ] Sales management
* [ ] Automatic stock reduction
* [ ] Stock movement history
* [ ] Track who performed each action

#### Phase 5 — Dashboard & Reporting

* [ ] Stock overview
* [ ] Low-stock and out-of-stock products
* [ ] Recent activity
* [ ] Business statistics

#### Phase 6 — Polish & Deployment

* [ ] Refine permissions
* [ ] Loading and empty states
* [ ] Error handling
* [ ] Responsive UI
* [ ] Production cleanup
* [ ] Deployment

*The roadmap represents planned features and may evolve as development progresses.*
