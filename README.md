# Simple-Crud API with Users and Posts

This repository contains a simple API built with Node.js, Express, mongoose and TypeScript. The API includes routes for managing users and posts, with support for JWT-based authentication. It also supports features like filtering, sorting, pagination, and selecting specific fields.

## Table of Contents

- [Getting Started](#getting-started)
- [Routes](#routes)
  - [User Routes](#user-routes)
  - [Post Routes](#post-routes)
- [Authentication](#authentication)
- [Features](#features)
  - [Filtering](#filtering)
  - [Sorting](#sorting)
  - [Pagination](#pagination)
  - [Selecting Fields](#selecting-fields)
- [Environment Variables](#environment-variables)
- [Technologies Used](#technologies-used)

## Getting Started

### Prerequisites

- Node.js (>= 14.x)
- MongoDB or Connection on MongoAtlas (i use mongoAtlas)
- Yarn or npm

### Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/yourusername/simple-api.git
   cd simple-api
   ```

2. Install dependencies:

   ```bash
   yarn install
   # or
   npm install
   ```

3. Create a `.env` file in the root directory with the necessary environment variables (see [Environment Variables](#environment-variables) section).

4. Start the development server:

   ```bash
   yarn dev
   # or
   npm run dev
   ```

The server will start on the port defined in your `.env` file.

## Routes

### User Routes

- **GET /api/v1/users**: Get a list of users (supports filtering, sorting, pagination, and selecting fields).
- **GET /api/v1/users/:id**: Get a single user by ID.
- **POST /api/v1/users**: Create a new user.
- **PATCH /api/v1/users/:id**: Update a user by ID.
- **DELETE /api/v1/users/:id**: Delete a user by ID.

### User Profile Routes

- **GET /api/v1/profile**: Get a user profile.
- **PATCH /api/v1/profile**: Update a user profile.
- **PATCH /api/v1/profile/password**: Update a user password loggin user.

### Post Routes

- **GET /api/v1/posts**: Get a list of posts (supports filtering, sorting, pagination, and selecting fields).
- **GET /api/v1/posts/:id**: Get a single post by ID.
- **POST /api/v1/posts**: Create a new post.
- **PATCH /api/v1/posts/:id**: Update a post by ID.
- **DELETE /api/v1/posts/:id**: Delete a post by ID.
- **GET /api/v1/posts/me**: Get a posts loggin user .

## Authentication

- **POST /api/v1/auth/login**: login user.
- **POST /api/v1/auth/register**: register user.

This API uses JWT for authentication. To access protected routes, include a valid JWT in the `Authorization` header of your request:

Protected routes include:

- All route protected

## Features

### Filtering

You can filter results by passing query parameters. For example, to filter users by `email`:

### Sorting

You can sort results by passing the `sort` query parameter. For example, to sort users by `firstName` in ascending order:

To sort in descending order, prefix the field name with `-`

### Pagination

You can paginate results by using the `page` and `limit` query parameters. For example, to get the second page of users with 10 users per page

### Selecting Fields

You can select specific fields to return by using the `fields` query parameter. For example, to get only the `name` and `email` fields of users

## Environment Variables

Create a `.env` file in the root of your project with the following variables:

- NODE_ENV is development or production
- PORT
- DATABASE like mongodb+srv://USERNAME:<PASSWORD>@CLUSTER/DATABASENAME
- DATABASE_PASSWORD
- JWT_SECRET
