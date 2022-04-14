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

# Register user with stripe
```
curl http://localhost:5000/api/auth/register \
  -X POST \
  -H "Content-Type: application/json" \
  -d '{"password":"test","name":"ruslan","email":"ruslanmalovichko@gmail.com","address":{"city":"Kyiv","country":"UA","line1":"test"},"phone":"test"}'
```

```
curl http://localhost:5000/api/auth/register \
  -X POST \
  -H "Content-Type: application/json" \
  -d '{"password":"test","name":"ruslan2","email":"ruslan.malovichko@wearebrain.com","address":{"city":"Kyiv","country":"UA","line1":"test"},"phone":"test"}'
```

# Login user
```
curl http://localhost:5000/api/auth/login \
  -X POST \
  -H "Content-Type: application/json" \
  -d '{"name":"ruslan", "password":"test"}'
```

# Get user
```
curl http://localhost:5000/api/user \
  -X GET \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer [TOKEN]"
```

```
curl http://localhost:5000/api/user \
  -X GET \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer eyJhbGciOiJIUzI1NiJ9.cnVzbGFu.ZWTUSprdW9zn3_4h66c0QxKrNoyzN-YsgOW3x0iJReU"
```

# Update user with stripe
```
curl http://localhost:5000/api/user \
  -X PUT \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer [TOKEN]" \
  -d '{"name":"ruslan","email":"ruslanmalovichko@gmail.com","address":{"city":"Kyiv","country":"UA","line1":"test"},"phone":"test"}'
```

```
curl http://localhost:5000/api/user \
  -X PUT \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer eyJhbGciOiJIUzI1NiJ9.cnVzbGFu.ZWTUSprdW9zn3_4h66c0QxKrNoyzN-YsgOW3x0iJReU" \
  -d '{"name":"ruslan","email":"ruslanmalovichko@gmail.com","address":{"city":"Kyiv","country":"UA","line1":"test"},"phone":"test"}'
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

# Add cart with stripe block
```
curl http://localhost:5000/api/cart \
  -X POST \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer eyJhbGciOiJIUzI1NiJ9.cnVzbGFu.ZWTUSprdW9zn3_4h66c0QxKrNoyzN-YsgOW3x0iJReU" \
  -d '{"product":"6231ad75c8f2d0977937eb62","quantity":2}'
```

```
curl http://localhost:5000/api/cart \
  -X POST \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer eyJhbGciOiJIUzI1NiJ9.cnVzbGFu.ZWTUSprdW9zn3_4h66c0QxKrNoyzN-YsgOW3x0iJReU" \
  -d '{"product":"6231ad76c8f2d0977937eb65","quantity":3}'
```

# Get cart
```
curl http://localhost:5000/api/cart \
  -X GET \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer eyJhbGciOiJIUzI1NiJ9.cnVzbGFu.ZWTUSprdW9zn3_4h66c0QxKrNoyzN-YsgOW3x0iJReU" \
```

# Change cart with stripe block
```
curl http://localhost:5000/api/cart \
  -X PUT \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer eyJhbGciOiJIUzI1NiJ9.cnVzbGFu.ZWTUSprdW9zn3_4h66c0QxKrNoyzN-YsgOW3x0iJReU" \
  -d '{"cartId":"6234427ad664b3d7e132ea11","itemId":"62344374744c648cf68b110a"}'
```

```
curl http://localhost:5000/api/cart \
  -X PUT \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer eyJhbGciOiJIUzI1NiJ9.cnVzbGFu.ZWTUSprdW9zn3_4h66c0QxKrNoyzN-YsgOW3x0iJReU" \
  -d '{"cartId":"6232fee1e054ac953f9f35ae","itemId":"62330010612faadb5321a3f7"}'
```

# Delete cart with stripe block
```
curl http://localhost:5000/api/cart?id=6232fee1e054ac953f9f35ae \
  -X DELETE \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer eyJhbGciOiJIUzI1NiJ9.cnVzbGFu.ZWTUSprdW9zn3_4h66c0QxKrNoyzN-YsgOW3x0iJReU"
```

# Create stripe checkout session
```
curl http://localhost:5000/api/order/create-checkout-session?id=6233245f3802f6c6adbc4b84 \
  -X POST \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer eyJhbGciOiJIUzI1NiJ9.cnVzbGFu.ZWTUSprdW9zn3_4h66c0QxKrNoyzN-YsgOW3x0iJReU"
```

# Checkout stripe session with saving data
```
curl http://localhost:5000/api/order/checkout-session-save?session_id=cs_test_b1VbsEuQUosBWEHzTXpZgydzBKyANgC5S5Q0U8TfNgGh0sJzIIEy0Z9Gdi \
  -X GET \
  -H "Content-Type: application/json"
```

# Send form contact
```
curl http://localhost:5000/api/form/contact \
  -X POST \
  -H "Content-Type: application/json" \
  -d '{"name":"Ruslan Malovichko","email": "ruslanmalovichko@gmail.com", "message": "Test message"}'
```

# Send message
```
curl http://localhost:5000/api/message \
  -X POST \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer eyJhbGciOiJIUzI1NiJ9.cnVzbGFu.ZWTUSprdW9zn3_4h66c0QxKrNoyzN-YsgOW3x0iJReU" \
  -d '{"message": "Test message", "to": "ruslan.malovichko@wearebrain.com"}'
```

```
curl http://localhost:5000/api/message \
  -X POST \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer eyJhbGciOiJIUzI1NiJ9.cnVzbGFuMg.kSqL9KVEjiBgFFrAZCIKHfKPbTEyhZxlTiQ29W2OVqM" \
  -d '{"message": "Test message 2", "to": "ruslanmalovichko@gmail.com"}'
```

# Post comment
```
curl http://localhost:5000/api/comment \
  -X POST \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer eyJhbGciOiJIUzI1NiJ9.cnVzbGFu.ZWTUSprdW9zn3_4h66c0QxKrNoyzN-YsgOW3x0iJReU" \
  -d '{"message": "Test message", "product": "Apple iPhone 8 Plus"}'
```

```
curl http://localhost:5000/api/comment \
  -X POST \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer eyJhbGciOiJIUzI1NiJ9.cnVzbGFuMg.kSqL9KVEjiBgFFrAZCIKHfKPbTEyhZxlTiQ29W2OVqM" \
  -d '{"message": "Test message 2", "product": "Apple iPhone X"}'
```

