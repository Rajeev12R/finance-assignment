# Finance Dashboard Backend

A robust, scalable backend for a finance dashboard system featuring role-based access control (RBAC), aggregated analytics, and financial record management.

## Features

- **RBAC (Role Based Access Control)**: Three distinct roles: `Admin`, `Analyst`, and `Viewer`.
- **Dashboard Analytics**: Real-time aggregation of income, expenses, net balance, and category-wise breakdowns.
- **Recent Activity**: Specialized endpoint for the latest transaction entries.
- **Financial Records**: Full CRUD operations with advanced keyword search (`notes`), filtering (date range, category, type), and pagination.
- **Soft Delete**: Records are marked as `isDeleted: true` instead of permanent removal, ensuring data safety.
- **Rate Limiting**: Global protection against API abuse (100 requests per 15 minutes).
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

