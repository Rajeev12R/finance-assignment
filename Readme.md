# Finance Dashboard Backend API

A backend system for managing financial records with role-based access control and analytical dashboard APIs.

## Architecture Overview

The backend follows a modular and layered architecture:

**Routes → Controllers → Services → Database**

- **Controllers**: Handle HTTP request/response logic and input parsing.
- **Services**: Encapsulate core business logic, data processing, and aggregations.
- **Mongoose Models**: Manage data persistence, schema validation, and indexing.
- **Middleware**: Handle cross-cutting concerns like authentication, RBAC, and rate limiting.

## Request Flow

1. **Request**: The client sends a request to a specific endpoint.
2. **Authentication**: `protect` middleware validates the JWT Bearer token.
3. **Authorization**: `authorize` middleware checks user role permissions for the specific action.
4. **Controller**: The request is routed to the appropriate controller method.
5. **Service Layer**: The controller calls the service layer to handle business logic.
6. **Database**: The service intereracts with MongoDB via Mongoose models.
7. **Response**: The final data is formatted and returned via the controller.

## Key Design Decisions

- **RBAC Enforcement**: Implemented at the middleware level to ensure consistent and reusable access control across all modules.
- **Soft Delete Strategy**: Records are marked as deleted (`isDeleted: true`) rather than permanent removal to preserve financial history and support auditability.
- **Aggregation Pipelines**: Advanced MongoDB aggregation is used for dashboard APIs to efficiently compute complex summaries and trends on-demand.
- **Separation of Concerns**: Business logic is strictly isolated in services to keep controllers lightweight and facilitate unit testing.
- **Security & Rate Limiting**: Applied globally and on authentication routes to prevent abuse, brute-force attacks, and ensure system reliability.

## Assumptions

- **Single Tenancy**: The system is currently designed for a single organization.
- **Data Isolation**: Users can only access their own data unless they hold the `Admin` role.
- **Immutability**: Financial records are treated as immutable in terms of ownership (`createdBy`).
- **Real-time Analytics**: Dashboard analytics are computed on-demand from the latest data (no intermediate caching layer for simplicity).

## Features

- **RBAC (Role Based Access Control)**: Three distinct roles: `Admin`, `Analyst`, and `Viewer`.
- **Dashboard Analytics**: Real-time aggregation of income, expenses, net balance, and category-wise breakdowns.
- **Recent Activity**: Specialized endpoint for the latest transaction entries.
- **Financial Records**: Full CRUD operations with advanced keyword search (`notes`), filtering (date range, category, type), and pagination.
- **Soft Delete**: Records are marked as `isDeleted: true` instead of permanent removal, ensuring data safety.
- **Rate Limiting**: Protection against API abuse and brute-force attacks.
- **Centralized Error Handling**: Consistent API responses and error mapping for reliable integration.
- **Data Persistence**: MongoDB with custom indexing on `createdBy` and `date`.

## Tech Stack

- **Runtime**: Node.js
- **Framework**: Express.js
- **Database**: MongoDB (Mongoose)
- **Security**: JWT, Bcrypt, express-rate-limit
- **Module System**: ES Modules

## Project Structure

- `src/modules/auth`: User registration and login logic.
- `src/modules/user`: Admin-only user management (list, role/status updates).
- `src/modules/financialRecord`: Transaction management and persistence.
- `src/modules/dashboard`: Aggregation logic, trends, and summary data.
- `src/middlewares`: Security (`protect`), authorization (`authorize`), and global error handling (`errorHandler`).

## Role Mapping & Permissions

| Role        | Dashboard Access | Records View | Records CRUD | User Management |
| :---------- | :--------------: | :----------: | :----------: | :-------------: |
| **Admin**   |     ✅ Full      |   ✅ Full    |   ✅ Full    |     ✅ Full     |
| **Analyst** |   ✅ Own Data    | ✅ Own Data  |    ❌ No     |      ❌ No      |
| **Viewer**  |   ✅ Own Data    |    ❌ No     |    ❌ No     |      ❌ No      |

## API Documentation (Core Endpoints)

### Authentication

| Method | Endpoint             | Description                 |
| :----- | :------------------- | :-------------------------- |
| `POST` | `/api/auth/register` | Create a new account.       |
| `POST` | `/api/auth/login`    | Receive a JWT Bearer token. |

### Dashboard (Viewer, Analyst, Admin)

| Method | Endpoint                            | Description                             |
| :----- | :---------------------------------- | :-------------------------------------- |
| `GET`  | `/api/dashboard/summary`            | Get total income, expense, and balance. |
| `GET`  | `/api/dashboard/category-breakdown` | Get total spending/income per category. |
| `GET`  | `/api/dashboard/monthly-trends`     | Get data grouped by month (`YYYY-MM`).  |
| `GET`  | `/api/dashboard/recent-activity`    | Show the latest 5 active transactions.  |

### Financial Records (Analyst, Admin)

| Method   | Endpoint           | Description                                                                                        |
| :------- | :----------------- | :------------------------------------------------------------------------------------------------- |
| `GET`    | `/api/records`     | List records with filters (`page`, `limit`, `search`, `type`, `category`, `startDate`, `endDate`). |
| `POST`   | `/api/records`     | Create a new entry (Admin only).                                                                   |
| `PUT`    | `/api/records/:id` | Update an entry (Admin only).                                                                      |
| `DELETE` | `/api/records/:id` | Soft delete an entry (Admin only).                                                                 |

## ⚙️ Development Setup

1. **Clone the repository**.
2. **Install dependencies**:
   ```bash
   npm install
   ```
3. **Environment Configuration**: Create a `.env` file in the root directory.
   ```env
   PORT=3000
   MONGO_URI=mongodb://localhost:27017/finance
   JWT_SECRET=your_super_secret_key
   ```
4. **Start the server**:
   ```bash
   npm run start
   ```
5. **Health Check**: Visit `http://localhost:3000/health` to confirm the backend is running.
