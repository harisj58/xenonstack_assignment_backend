
# TechForge Projects API

The API serving the website of TechForge Projects - an assignment submission as part of hiring process for XenonStack.


## API Reference

#### Signing Up

```http
  POST /api/users/signup
```

| Parameter | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `Name` | `string` | **Required**. Your full name |
| `Username` | `string` | **Required**. Your username |
| `Email` | `string` | **Required**. Your email ID |
| `Password` | `string` | **Required**. Your access password |

#### Logging In

```http
  POST /api/users/login
```

| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `Username/Email`      | `string` | **Required**. Your unique identifier in form of email/username|
| `Password`      | `string` | **Required**. Your access password |

Both endpoints return user details to be stored in local storage (browser cache).


## Environment Variables

To run this project, you will need to add the following environment variables to your .env file

`CONNECTION_STRING` - for connecting to MongoDB

`JWT_SECRET` - a secret phrase for JWT authentication


## Deployment

To deploy this project run

```bash
  npm i && node server.js
```

