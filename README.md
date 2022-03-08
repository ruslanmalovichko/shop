# Install packages
```
npm i
```

# Generate tsconfig.json
```
npx tsc --init
```

# Run TypeScript linter
```
npx ts-standard
```

# Run TypeScript linter with fixing
```
npx ts-standard --fix
```

# Build command
```
npm run build
```

# Run command
```
npm run start
```

# Example post query to register user
```
curl http://localhost:5000/api/auth/register \
  -X POST \
  -H "Content-Type: application/json" \
  -d '{"username":"ruslan", "password":"test", "email":"ruslanmalovichko@gmail.com", "address":"test", "phone":"test"}'
```

# Example post query to login user
```
curl http://localhost:5000/api/auth/login \
  -X POST \
  -H "Content-Type: application/json" \
  -d '{"username":"ruslan", "password":"test"}'
```

# Get user
```
curl http://localhost:5000/api/user \
  -X GET \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer eyJhbGciOiJIUzI1NiJ9.cnVzbGFu.ZWTUSprdW9zn3_4h66c0QxKrNoyzN-YsgOW3x0iJReU"
```

```
curl http://localhost:5000/api/user \
  -X GET \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer eyJhbGciOiJIUzI1NiJ9.cnVzbGFuMg.kSqL9KVEjiBgFFrAZCIKHfKPbTEyhZxlTiQ29W2OVqM"
```

# Update user
```
curl http://localhost:5000/api/user \
  -X PUT \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer eyJhbGciOiJIUzI1NiJ9.cnVzbGFu.ZWTUSprdW9zn3_4h66c0QxKrNoyzN-YsgOW3x0iJReU" \
  -d '{"email":"ruslanmalovichko4@gmail.com", "address":"test4", "phone":"test4"}'
```

```
curl http://localhost:5000/api/user \
  -X PUT \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer eyJhbGciOiJIUzI1NiJ9.cnVzbGFuMg.kSqL9KVEjiBgFFrAZCIKHfKPbTEyhZxlTiQ29W2OVqM" \
  -d '{"email":"ruslanmalovichko3@gmail.com", "address":"test3", "phone":"test3"}'
```

# Import products
```
curl http://localhost:5000/api/product/import \
  -X GET \
  -H "Content-Type: application/json"
```

# Get catalog
```
curl http://localhost:5000/api/catalog \
  -X GET \
  -H "Content-Type: application/json"
```

