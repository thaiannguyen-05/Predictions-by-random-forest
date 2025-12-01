# API Documentation - Swagger Endpoints Overview

## Tổng quan
Tài liệu này mô tả chi tiết tất cả các API endpoints trong hệ thống, bao gồm input/output data structures và error handling.

---

## 1. Authentication Module (`/auth`)

### 1.1. POST `/auth/register`
**Mục đích**: Đăng ký tài khoản mới

**Input (CreateAccountDto)**:
```typescript
{
  email: string;           // Required, email hợp lệ
  username: string;        // Required, unique
  password: string;        // Required, min 8 ký tự
  firstName: string;       // Required
  lastName: string;        // Required
  phoneNumber?: string;    // Optional
  dateOfBirth: string;     // Required, format: "DD/MM/YYYY"
}
```

**Output (Success - 201)**:
```typescript
{
  status: true,
  data: {
    newUser: {
      id: string;
      email: string;
      username: string;
      firstName: string;
      lastName: string;
      fullname: string;
      isActive: boolean;      // false - chờ verify
      state: "pending";
      createdAt: Date;
    }
  }
}
```

**Errors**:
- `409 Conflict`: Email/username đã tồn tại
- `400 Bad Request`: Validation error

**Flow**:
1. Tạo user mới với `state: 'pending'`, `isActive: false`
2. Generate 6-digit verification code
3. Lưu code vào Redis với key `verify_code_{userId}`
4. Gửi email chứa verification code
5. Return user data

---

### 1.2. PUT `/auth/verify`
**Mục đích**: Xác thực tài khoản bằng code từ email

**Input (VerifyAccount)**:
```typescript
{
  email: string;    // Required
  code: string;     // Required, 6 digits
}
```

**Output (Success - 200)**:
```typescript
{
  status: true
}
```

**Errors**:
- `404 Not Found`: Account không tồn tại
- `409 Conflict`: Account đã được active
- `400 Bad Request`: Code không đúng hoặc đã hết hạn

**Flow**:
1. Tìm user theo email
2. Kiểm tra user chưa active
3. Lấy code từ Redis với key `verify_code_{userId}`
4. So sánh code
5. Update `isActive: true`
6. Xóa code khỏi Redis

---

### 1.3. POST `/auth/login`
**Mục đích**: Đăng nhập hệ thống

**Input (LoginDto)**:
```typescript
{
  access: string;     // Email hoặc username
  password: string;   // Password
}
```

**Output (Success - 200)**:
```typescript
{
  data: {
    id: string;
    email: string;
    username: string;
    firstName: string;
    lastName: string;
    fullname: string;
    isActive: boolean;
    provider: string;
    // ... (không có hashedPassword)
  },
  session: {
    id: string;
    userAgent: string;
    userIp: string;
    loginedAt: Date;
  },
  tokens: {
    accessToken: string;    // JWT, expires in 1h
    refreshToken: string;   // JWT, expires in 10 years
    expiresIn: number;      // milliseconds
  }
}
```

**Cookies được set**:
- `access_token`: JWT access token
- `refresh_token`: JWT refresh token
- `session_id`: Session identifier

**Errors**:
- `404 Not Found`: User không tồn tại hoặc chưa active
- `403 Forbidden`: Password sai hoặc account không có password (OAuth2)

**Flow**:
1. Tìm user theo email/username và `isActive: true`
2. Kiểm tra hashedPassword tồn tại
3. Verify password với argon2
4. Lấy thông tin hardware (IP, UserAgent)
5. Tạo session mới
6. Generate access token và refresh token
7. Set cookies
8. Return user data, session, tokens

---

### 1.4. PATCH `/auth/logout`
**Mục đích**: Đăng xuất

**Headers**: `Authorization: Bearer {accessToken}`

**Input**: 
- Cookie: `session_id` (optional, có thể lấy từ cookie)

**Output (Success - 200)**:
```typescript
{
  status: true
}
```

**Flow**:
1. Lấy session_id từ cookie hoặc parameter
2. Update session: set `hashedRefreshToken: null`
3. Clear cookies: `access_token`, `refresh_token`, `session_id`

---

### 1.5. PATCH `/auth/change-password`
**Mục đích**: Đổi mật khẩu

**Headers**: `Authorization: Bearer {accessToken}`

**Input (ChangePasswordDto)**:
```typescript
{
  accessor: string;      // Email hoặc username
  password: string;      // Mật khẩu hiện tại
  newPassword: string;   // Mật khẩu mới
}
```

**Output (Success - 200)**:
```typescript
{
  status: true
}
```

**Errors**:
- `401 Unauthorized`: Không có token hoặc token invalid
- `404 Not Found`: User không tồn tại
- `400 Bad Request`: User trong request không match với authenticated user
- `403 Forbidden`: Password hiện tại sai hoặc account không có password

**Flow**:
1. Lấy userId từ JWT token (req.user.id)
2. Tìm user theo accessor (email/username)
3. Verify user.id === requestId
4. Kiểm tra hashedPassword tồn tại
5. Verify password hiện tại
6. Hash password mới
7. Update hashedPassword
8. Gửi email thông báo đổi password

---

### 1.6. PATCH `/auth/refresh-token`
**Mục đích**: Làm mới access token

**Headers**: `Authorization: Bearer {accessToken}` (có thể expired)

**Input**:
- Cookie: `session_id`
- Cookie: `refresh_token`

**Output (Success - 200)**:
```typescript
{
  accessToken: string;
  refreshToken: string;
  expiresIn: number;
}
```

**Errors**:
- `401 Unauthorized`: Refresh token invalid hoặc expired

**Flow**:
1. Lấy session_id và refresh_token từ cookies
2. Verify refresh token
3. Kiểm tra session tồn tại và match với refresh token
4. Generate access token mới
5. Generate refresh token mới (optional)
6. Update session với refresh token mới
7. Set cookies mới
8. Return tokens

---

### 1.7. GET `/auth/me`
**Mục đích**: Lấy thông tin user hiện tại

**Headers**: `Authorization: Bearer {accessToken}`

**Output (Success - 200)**:
```typescript
{
  loggedIn: true,
  user: {
    id: string;
    email: string;          // Có thể được format lại cho Facebook
    username: string;
    name: string;           // fullname hoặc firstName + lastName
    avatar?: string;        // picture hoặc avtUrl
    provider?: string;      // EMAIL, GOOGLE, FACEBOOK
    isActive: boolean;
  }
}
```

**Errors**:
- `401 Unauthorized`: Token required, invalid, hoặc user inactive

**Flow**:
1. Lấy token từ Authorization header
2. Verify JWT token
3. Lấy user từ database
4. Kiểm tra user active
5. Format email cho Facebook users (nếu cần)
6. Return user data

---

### 1.8. GET `/auth/google` & `/auth/google/callback`
**Mục đích**: OAuth2 login với Google

**Flow**:
1. User click login with Google
2. Redirect đến Google OAuth
3. Google callback với user profile
4. Tạo/update user và OAuth2User record
5. Tạo session và tokens
6. Redirect về frontend với access token

---

### 1.9. GET `/auth/facebook` & `/auth/facebook/callback`
**Mục đích**: OAuth2 login với Facebook

**Flow**: Tương tự Google OAuth

---

## 2. Stock Module (`/api/stock`)

### 2.1. GET `/api/stock/health`
**Mục đích**: Kiểm tra kết nối ML service

**Output (Success - 200)**:
```typescript
{
  status: "ok",
  ml_service: "connected"
}
```

**Errors**:
- `503 Service Unavailable`: ML service không khả dụng

---

### 2.2. GET `/api/stock/current-price/:ticker`
**Mục đích**: Lấy giá hiện tại của cổ phiếu

**Parameters**:
- `ticker`: Mã cổ phiếu (VD: AAPL, FPT)

**Output (Success - 200)**:
```typescript
{
  ticker: string;
  price: number;
  time: string;
  timestamp: number;
}
```

**Errors**:
- `400 Bad Request`: Ticker invalid hoặc không lấy được giá

---

### 2.3. GET `/api/stock/financial/:ticker`
**Mục đích**: Lấy dữ liệu tài chính chi tiết

**Parameters**:
- `ticker`: Mã cổ phiếu

**Output (Success - 200)**:
```typescript
{
  ticker: string;
  previousClose: number | null;
  open: number | null;
  high: number | null;
  low: number | null;
  volume: number | null;
  marketCap: number | null;
  peRatio: number | null;
  eps: number | null;
  beta: number | null;
  yahooPrice: number | null;
  timestamp: string;
}
```

**Errors**:
- `400 Bad Request`: Không lấy được dữ liệu

---

### 2.4. GET `/api/stock/predictions/:ticker`
**Mục đích**: Dự đoán giá cổ phiếu nhiều giờ tới

**Parameters**:
- `ticker`: Mã cổ phiếu

**Output (Success - 200)**:
```typescript
{
  ticker: string;
  prediction: string;
  current_price: number;
  current_time: string;
  predictions: Array<{
    hour: number;
    predicted_price: number;
    confidence: number;
  }>;
  timestamp: number;
}
```

**Errors**:
- `400 Bad Request`: Prediction failed

---

### 2.5. GET `/api/stock/analysis/:ticker`
**Mục đích**: Phân tích toàn diện (giá + dự đoán)

**Parameters**:
- `ticker`: Mã cổ phiếu

**Output (Success - 200)**:
```typescript
{
  ticker: string;
  current_price: number;
  current_time: string;
  predictions: Array<{
    hour: number;
    predicted_price: number;
    confidence: number;
  }>;
  price_success: boolean;
  prediction_success: boolean;
  errors: {
    price_error: string | null;
    prediction_error: string | null;
  }
}
```

---

### 2.6. POST `/api/stock/train`
**Mục đích**: Train ML model cho cổ phiếu

**Input**:
```typescript
{
  ticker: string;    // Required
}
```

**Output (Success - 200)**:
```typescript
{
  message: string;
  ticker: string;
  features_count: number;
  timestamp: number;
}
```

**Errors**:
- `400 Bad Request`: Ticker required hoặc training failed

---

## 3. User Module (`/user`)

### 3.1. PUT `/user/change-detail-user`
**Mục đích**: Cập nhật thông tin profile

**Headers**: `Authorization: Bearer {accessToken}`

**Input (ChangeDetailDto)**:
```typescript
{
  username?: string;
  firstName?: string;
  lastName?: string;
  phoneNumber?: string;
  dateOfBirth?: string;    // Format: "DD/MM/YYYY"
  avtUrl?: string;
}
```

**Output (Success - 200)**:
```typescript
{
  status: true,
  data: {
    id: string;
    username: string;
    firstName: string;
    lastName: string;
    phoneNumber: string | null;
    dateOfBirth: Date | null;
    avtUrl: string | null;
  }
}
```

**Errors**:
- `401 Unauthorized`: Token invalid
- `404 Not Found`: User không tồn tại hoặc không active
- `400 Bad Request`: Validation error

---

## 4. Support Chat Module (`/chat`)

### 4.1. POST `/chat/call-chat`
**Mục đích**: Gửi tin nhắn đến AI support chat

**Input (ResponseMessageDto)**:
```typescript
{
  prompt: string;        // Required, max 1000 chars
  sessionId?: string;    // Optional, cho conversation continuity
  userId?: string;       // Optional, cho personalization
}
```

**Output (Success - 200)**:
```typescript
{
  response: string;           // AI-generated response
  sessionId: string;          // Session ID
  timestamp: string;          // ISO 8601 format
}
```

**Errors**:
- `400 Bad Request`: Prompt empty hoặc quá dài
- `500 Internal Server Error`: AI service unavailable

---

### 4.2. GET `/chat/init-chat`
**Mục đích**: Khởi tạo chat session mới

**Query Parameters**:
- `userId`: string (Required)

**Output (Success - 200)**:
```typescript
{
  sessionId: string;
  welcomeMessage: string;
  userId: string;
  timestamp: string;
}
```

**Errors**:
- `400 Bad Request`: userId required
- `500 Internal Server Error`: Failed to initialize

---

## Error Response Format (Chuẩn hóa)

Tất cả errors đều follow format:

```typescript
{
  statusCode: number;           // HTTP status code
  message: string | string[];   // Error message hoặc validation errors
  error: string;                // Error type name
  timestamp?: string;           // ISO 8601
  path?: string;                // Request path
}
```

**Common Error Codes**:
- `400 Bad Request`: Validation error, missing required fields
- `401 Unauthorized`: Authentication required hoặc token invalid
- `403 Forbidden`: Không có quyền truy cập
- `404 Not Found`: Resource không tồn tại
- `409 Conflict`: Resource đã tồn tại (duplicate)
- `500 Internal Server Error`: Server error
- `503 Service Unavailable`: External service unavailable

---

## Authentication Flow

### 1. Email/Password Registration & Login
```
1. POST /auth/register
   → User created with state: 'pending', isActive: false
   → Verification code sent to email
   → Code stored in Redis

2. PUT /auth/verify
   → Verify code from Redis
   → Update user: isActive: true
   → Delete code from Redis

3. POST /auth/login
   → Verify credentials
   → Create session
   → Generate tokens
   → Set cookies
   → Return user + session + tokens
```

### 2. OAuth2 (Google/Facebook) Login
```
1. GET /auth/google (or /auth/facebook)
   → Redirect to OAuth provider

2. GET /auth/google/callback
   → Receive user profile
   → Create/update user with accountType: 'OAUTH2'
   → Create OAuth2User record
   → Create session
   → Generate tokens
   → Redirect to frontend with access token
```

### 3. Token Refresh
```
1. PATCH /auth/refresh-token
   → Verify refresh token from cookie
   → Generate new access token
   → Generate new refresh token (optional)
   → Update session
   → Set new cookies
```

---

## Best Practices Implemented

### 1. **Type Safety**
- Tất cả DTOs có validation decorators
- Response types được định nghĩa rõ ràng
- Không sử dụng `any` type

### 2. **Security**
- Password hashing với argon2
- JWT tokens với expiration
- HttpOnly cookies cho tokens
- Không trả về sensitive data (hashedPassword)
- Session tracking với IP và UserAgent

### 3. **Error Handling**
- Standardized error responses
- Specific error messages
- Proper HTTP status codes
- Validation errors với chi tiết

### 4. **API Documentation**
- Swagger decorators đầy đủ
- Clear descriptions
- Example values
- Request/Response schemas

### 5. **Code Organization**
- Separation of concerns (Controller → Service → Repository)
- DTOs riêng cho input/output
- Constants file cho magic values
- Utility functions cho logic dùng chung

---

## Swagger UI Access

Truy cập Swagger documentation tại:
```
http://localhost:{PORT}/api
```

Hoặc JSON spec:
```
http://localhost:{PORT}/api-json
```

---

## Notes

1. **Redis Usage**: Verification codes được lưu trong Redis với TTL (Time To Live)
2. **Session Management**: Sessions được lưu trong database với refresh token hash
3. **Cookie Security**: Cookies được set với `httpOnly`, `secure` (production), `sameSite`
4. **Token Expiration**: 
   - Access Token: 1 hour
   - Refresh Token: 10 years
   - Session: 10 years
5. **ML Service**: Stock predictions sử dụng TCP connection đến Python ML service
