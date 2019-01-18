# App

## Running the App

Install all the dependencies with
```
cd backend
npm i

cd ../client
npm i
```

Start the Express server with

`node backend/server.js`

Then start the client with

```
cd client
npm start
```


## Communicating with Backend

To get the frontend talking with the backend, you can use the Fetch API to make requests to the API, and then set whatever state you need. The `fetch` request returns a `Promise`, so any data manipulation must be handled in `.then` statements.

For example, if a component needs to `GET` user data from `/api/users`, you would call it with the following

```javascript
componentDidMount(){
  fetch('/api/users')
   .then(res => res.json())
   .then(users => this.setState({ users }));
}
```

`POST` requests take a little extra work, but not too much. If you had a method that needed to send a new user to the backend, it would simply need to specify the method, headers, and body as parameters.

```javascript
createNewUser(user){
  fetch('/api/users', {
    method: 'POST',
    headers: new Headers(),
    body: JSON.stringify(user)
  }).then()
}
```
