# Finance Data Processing & Access Control Backend

A role-based backend system for managing financial records with structured access control and analytical dashboard APIs.

## Problem Statement

This backend simulates a finance dashboard system where users interact with financial data based on their roles.

The system focuses on:
- Managing financial records (income & expenses)
- Enforcing role-based access control (RBAC)
- Providing processed financial insights for dashboards

## Tech Stack

- Node.js
- Express.js
- MongoDB (Mongoose)
- JWT Authentication

## Role-Based Access Control

The system implements RBAC with three roles:

- Viewer: Can only view financial data
- Analyst: Can view data and access analytical insights
- Admin: Full control over records and users

Access is enforced at the backend using middleware to ensure security and consistency.

| Action            | Viewer | Analyst | Admin |
|------------------|--------|---------|-------|
| View Records     | Yes    | Yes      | Yes    |
| Create Records   | No     |  No      | Yes    |
| Update Records   | No     |  No      | Yes    |
| Delete Records   | No     |  No      | Yes    |
| View Analytics   | No     |  Yes     | Yes    |

