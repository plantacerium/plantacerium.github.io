---
title: Express js
---

## Express definition in simple terms.
Let's define first nodejs ot understand better express js.
Nodejs is a cross platform javascript runtime environment that allows developers to build server side and networking applications.
Expressjs is web application framework specially designed to extend the capabilities of Nodejs for web application. 
By using express the process of building web applications and apis is simplified. It provides a range of powerful features as:
* Routing system, that makes easy to handle different https request methods on urls.
* Middleware functions that have acces to the request response cycle. This allows for a variety of operations such as logging, authentication, data parsing.
* Http built in methods for all http requests. This  simplify request handling.
* Engine templates support that enable dynamic rendering of html content.
* Streamlines error handling and management, also with middleware functions. 
* Restful apis, it is well suited to create this kind of apis.
Its modular design makes possible to expand its functionality through additional libraries and nodejs modules.

### Code example, basic express server


```js
// Import required modules
const express = require('express');

// Create an Express application
const app = express();
const port = 3000;

// Define a route and its callback function
app.get('/', (req, res) => {
  res.send('Hello World!');
});

// Start the server
app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}/`);
});
