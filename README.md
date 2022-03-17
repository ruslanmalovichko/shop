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
  -d '{"cartId":"6232fee1e054ac953f9f35ae","itemId":"6232fee1e054ac953f9f35af"}'
```

```
curl http://localhost:5000/api/cart \
  -X PUT \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer eyJhbGciOiJIUzI1NiJ9.cnVzbGFu.ZWTUSprdW9zn3_4h66c0QxKrNoyzN-YsgOW3x0iJReU" \
  -d '{"cartId":"6232fee1e054ac953f9f35ae","itemId":"62330010612faadb5321a3f7"}'
```

# Delete cart
```
curl http://localhost:5000/api/cart?id=6229e176c5bee2fea8bc2ef9 \
  -X DELETE \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer eyJhbGciOiJIUzI1NiJ9.cnVzbGFu.ZWTUSprdW9zn3_4h66c0QxKrNoyzN-YsgOW3x0iJReU"
```

```
curl http://localhost:5000/api/cart?id=6229e176c5bee2fea8bc2ef9 \
  -X DELETE \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer eyJhbGciOiJIUzI1NiJ9.cnVzbGFuMg.kSqL9KVEjiBgFFrAZCIKHfKPbTEyhZxlTiQ29W2OVqM"
```

# Order a product
```
curl http://localhost:5000/api/order \
  -X POST \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer eyJhbGciOiJIUzI1NiJ9.cnVzbGFu.ZWTUSprdW9zn3_4h66c0QxKrNoyzN-YsgOW3x0iJReU" \
  -d '{"order":[{"name":"HTC U11","price":450,"quantity":2,"dateCreated":1646916454067},{"name":"Apple iPhone X","price":950,"quantity":1,"dateCreated":1646916454067}]}'
```

# Order a product with stripe 1
```
curl http://localhost:5000/api/order/create-checkout-session \
  -X POST \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer eyJhbGciOiJIUzI1NiJ9.cnVzbGFu.ZWTUSprdW9zn3_4h66c0QxKrNoyzN-YsgOW3x0iJReU" \
  -d '{"priceId":"price_1KboFCIDiMJHXOSfMZmSRgIu"}'
```

# Order a product with stripe 2
```
curl http://localhost:5000/api/order/checkout-session?session_id=cs_test_a1RmdliBCtgRT2GD03W3hkyY5jY4f3kAfGj307R7kAZYuYsJ1OxDOMGqbu \
  -X GET \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer eyJhbGciOiJIUzI1NiJ9.cnVzbGFu.ZWTUSprdW9zn3_4h66c0QxKrNoyzN-YsgOW3x0iJReU"
```

# Order a product with stripe with saving data
curl http://localhost:5000/api/order \
```
curl http://localhost:5000/api/order/checkout-session-save?session_id=cs_test_a1RmdliBCtgRT2GD03W3hkyY5jY4f3kAfGj307R7kAZYuYsJ1OxDOMGqbu \
  -X POST \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer eyJhbGciOiJIUzI1NiJ9.cnVzbGFu.ZWTUSprdW9zn3_4h66c0QxKrNoyzN-YsgOW3x0iJReU" \
  -d '{"items":[{"product":"6226752fbd07cf0757fcdcc4","quantity":2},{"product":"6226752fbd07cf0757fcdcc5","quantity":1}]}'
```

