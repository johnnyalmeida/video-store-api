# AUTHENTICATE
Set up authorization:

- Login 	
```
Set header authorization with the token receveid from the `/auth` endpoint :
`bearer {token}`
```

- Logout 	
```
The authentication is based in JWT, so the logout should be on the client side by removing the token from the requests
The token expires by default after 60 minutes
```

# ROUTES

## Users

### POST `/user`
Create a user

- Send:
```
  body data: {
    name: 'string',
    email: 'string',
    password: 'string'
  }
```

- Return created entity JSON:

```
{
  id: 'integer' // Created user ID
  name: 'string' // Created user name
  password: 'string' // Created user password encripted
}
```

### GET `/user/parse`
Return user data

- Return JSON: 
```
  {
    id: 'integer' // The user id
    name: 'string' // The user name
  }
```

## Auth 
 
### POST `/auth`
Authenticate an user

- Send: 
```
  {
    email: 'string',
    password: 'string'
  }
```

- Return	JSON
```
  {
    token: 'string' // The Authentication token
  } 
```

## Movies

### GET `/movies`
Return all available movies

Return JSON
```
  [{
    id: 'integer' // Movie ID
    title: 'integer' // Movie title
    director_id: // Movie director ID
  }]
```

### GET `/movies/{title}`
Return a movie by title if available

- Param:
```
 'title' - string // The movie title
```

- Return JSON: 
```
 	{
 		id: 'integer' // Movie ID
 		title: 'integer' // Movie title
 		director_id: // Movie director ID
 	}
```

## Rents

### GET `/rents/{id}`
Return user active rents

- Param:
```
  'id' - int // The user id
```    
		
- Return JSON
```
	[{
		id: 'integer' // Rent ID
		'movie_copy_id': 'integer' // The movie copy ID
		'user_id': 'integer' // User ID
    'returned': 'boolean' // Rent returned status
	}]
```


### POST `/rents/create`
Create a new rent

- Send
```
  {
		movie_id: 'integer',
		user_id: 'integer'
	}
```

- Return created entity JSON
```
  {
    id: 'integer' // Rent ID
    movie_copy_id: 'integer' // Movie copy ID
    user_id: 'integer' // User ID
		returned: 'boolean' // Rent returned status
  }
```

### PUT `/rents/return/{id}`
Update rent status to returned

- Params		
```
  'id' - string // The rent ID
```

- Send
```
  {
    id: 'integer' // The rent ID
    user_id: 'integer' // The user ID
  }
```

- Return JSON
```
  rent_updated: 'array' // Items updated in  Rents
  movie_copy_updated: 'array' // Items update in Movie Copies
```

