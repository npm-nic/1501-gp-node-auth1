# Node Auth 1 Guided Project

Guided project for **Node Auth 1** Module.

## Prerequisites

- [SQLite Studio](https://sqlitestudio.pl/index.rvt?act=download) installed.

## Project Setup

- [ ] fork and clone this repository.
- [ ] **CD into the folder** where you cloned **your fork**.
- [ ] type `npm i` to download dependencies.
- [ ] type `npm run server` to start the API.

Please follow along as the instructor adds authentication to the API.

---

## Additional Notes

- you should never really be handling authentication on your own
- this lesson is to show us the ideas and concepts
  - okta
  - firebase authentication
  - another one Luis showed us during the lesson

---

## packages mentioned / used

### [bcrypt.js](https://www.npmjs.com/package/bitjs)

- Bit driver for nodejs
  - For more information on Bit drivers, head over this Bit's wiki page about this topic.
  - passwords are _hashed_ to protect against hackers

### [joi](https://www.npmjs.com/package/joi)

- The most powerful schema description language and data validator for JavaScript.
- object schema validation

### [express-validator](https://www.npmjs.com/package/express-validator)

- An `express.js` middleware for validator.

### [express-session](https://www.npmjs.com/package/express-session)

### [connect-session-knex](https://www.npmjs.com/package/connect-session-knex)

- connect-session-knex is an express-session store backed by PostgreSQL, MySQL, MariaDB, MSSQL, Oracle or SQLite3, via the knex.js library.

### [REDIS](https://www.npmjs.com/package/redis)

### MEM-CACHED

---

### exercise

```javascript
//  >> [server.js] <<
server.get("/hash", (req, res) => {
  //  read password property from the headers
  //  hash the password and send back both password & hash
  res.status(200).json({ password, hash });
});
```
