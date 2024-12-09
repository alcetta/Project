# Blog API Application

This is a application for blog where someone post a blog and other post a comment

## Features

- Creating a article
- Viewing a article
- Commenting a article

## Setup

### Prerequisites

- Nodejs (Tested on 22)
- Database (Mysql)

### Installation

```
git clone https://github.com/
cd
npm install
npx sequilize db:migrate
npm start
```

Access the app [http://localhost:3000](http://localhost:3000)
Access the documentation [http://localhost:3000/api-docs](http://localhost:3000/api-docs)

### Testing and coverage

Running the integration tests

```
npm test
```

Checking the application coverage

```
npm coverage
```

## API Documentation

| Endpoint             | Body                    | Description               |
| -------------------- | ----------------------- | ------------------------- |
| POST: /user/         | name,username,password  | Creating a new user       |
| POST: /auth/user/    | username,password       | Login a user              |
| POST: /article/      | title, content, on_date | Creating a new article    |
| GET: /article/       | N/A                     | Getting all articles      |
| PUT: /article/       | title, content, on_date | Updating article          |
| GET: /article/:id    | id                      | Getting specific article  |
| DELETE: /article/:id | id                      | Delete a specific article |
| POST: /comment/      | content, articleId      | Commenting article        |
| PUT: /comment/       | content, articleId      | Updating a comment        |
