# ExpressCRUD

- Get all users
    url: http://localhost:3000/user/

- Get user by id
    url: http://localhost:3000/user/id/:id

- Get user by name
    url: http://localhost:3000/user/name

    body:
    {
     "name": "testuser"
    }

- Create a new user
    url: http://localhost:3000/user/create

    body:
    {
     "name": "testuser_2",
     "password": "123456",
     "age": "99",
     "email": "testuser_2@endava.com"
    }

- Update user 
    url: http://localhost:3000/user/update/:id

    body:
    {
     "name": "testuser",
     "age": "21",
     "email": "testuser21@endava.com"
    }

- Delete user
    url: http://localhost:3000/user/delete/:id


- **Login
    url: http://localhost:3000/login

    body:
    {
     "name": "testuser",
     "password": "123456"
    }