# Auto Token Refresh Workflow

## Overview
Automatic access token refresh mechanism khi token hết hạn (401 error).

## Flow

```
1. User makes API request with access token
   ↓
2. Backend validates token
   ↓
3a. Token valid → Return data ✅
   ↓
3b. Token expired → Return 401
   ↓
4. Frontend intercept 401 error
   ↓
5. Call PATCH /auth/refresh-token (with cookies: session_id, refresh_token)
   ↓
6a. Refresh token valid → Get new access token
   ├─ Update localStorage
   ├─ Retry original request
   └─ Return data ✅
   ↓
6b. Refresh token invalid/expired → Logout
   ├─ Clear localStorage
   ├─ Redirect to /auth/login
   └─ Show "Session expired" ❌
```

## Implementation

### 1. API Utility (`/utils/api.ts`)

**Features:**
- Automatic token refresh on 401
- Request queue during refresh
- Singleton pattern (prevent multiple concurrent refreshes)
- Retry original request after refresh

**Usage:**
```typescript
import { api, apiFetch } from '@/utils/api';

// Method 1: Use convenience methods
const response = await api.get('http://localhost:4000/auth/me');
const data = await response.json();

// Method 2: Use apiFetch directly
const response = await apiFetch('http://localhost:4000/api/stock/predictions/VCB', {
  method: 'GET',
});
```

### 2. AuthContext Integration

AuthContext now uses `apiFetch` instead of native `fetch`, automatically benefiting from token refresh:

```typescript
const res = await apiFetch("http://localhost:4000/auth/me", {
  method: "GET",
  cache: "no-cache" as RequestCache,
});
```

### 3. Backend Requirements

**Refresh Token Endpoint:**
```
PATCH /auth/refresh-token
Cookies: session_id, refresh_token
Returns: { tokens: { accessToken, refreshToken } }
```

## Singleton Pattern

Prevents multiple concurrent refresh attempts:

```typescript
let isRefreshing = false;
let refreshSubscribers: Array<(token: string) => void> = [];

// If already refreshing, queue the request
if (isRefreshing) {
  const newToken = await new Promise((resolve) => {
    subscribeTokenRefresh(resolve);
  });
  // Retry with new token
}
```

## Error Handling

**Scenarios:**

1. **Access token expired, refresh token valid**
   - Auto refresh ✅
   - User unaware

2. **Both tokens expired**
   - Redirect to login
   - Show message: "Session expired. Please login again."

3. **Network error during refresh**
   - Logout user
   - Redirect to login

## Security Notes

- Refresh token stored in **httpOnly cookie** (backend)
- Access token stored in **localStorage** (frontend)
- Session ID for tracking user sessions
- Auto-logout on refresh failure

## Testing

```typescript
// Test case 1: Normal request
const res = await api.get('http://localhost:4000/auth/me');
// Expected: 200 OK

// Test case 2: Expired access token
localStorage.setItem('accessToken', 'expired_token');
const res = await api.get('http://localhost:4000/auth/me');
// Expected: 401 → auto refresh → 200 OK

// Test case 3: Both tokens expired
// Expected: 401 → refresh fails → redirect to login
```

## Benefits

✅ **Seamless UX** - User không bị logout bất ngờ
✅ **Security** - Tokens có thời gian sống ngắn
✅ **Automatic** - Không cần manual token management
✅ **Efficient** - Singleton pattern tránh duplicate refreshes
✅ **Centralized** - Tất cả API calls đều được protect
