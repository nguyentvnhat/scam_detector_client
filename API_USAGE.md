# API Usage Guide

## Architecture

The API layer follows a **senior dev architecture** pattern with:

- ✅ **Centralized Configuration**: Single source of truth for API base URL
- ✅ **Environment Variables**: Secure configuration via Vercel
- ✅ **Axios Instance**: Reusable HTTP client with interceptors
- ✅ **Error Handling**: Comprehensive error catching and logging
- ✅ **Type Safety**: Full TypeScript interfaces
- ✅ **Scalable Structure**: Easy to add new endpoints

---

## Configuration

### Environment Variables

**Local Development** (`.env`):
```env
VITE_API_BASE_URL=https://scam-detect.techainer.com
```

**Vercel Deployment** (Settings → Environment Variables):
```
VITE_API_BASE_URL = https://scam-detect.techainer.com
```

### Base Configuration

```typescript
// src/utils/api.ts
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'https://scam-detect.techainer.com';
const API_VERSION = 'v1';
```

**Full API URL Structure**: `{API_BASE_URL}/api/{API_VERSION}/{endpoint}`

---

## Available Endpoints

### 1. Detect Scam (`/detect-scam`)

**Method**: `POST`  
**Content-Type**: `multipart/form-data`  
**Param**: `file` (audio file)

**Usage**:
```typescript
import { analyzeAudio } from '@/utils/api';

const file = event.target.files[0];
const result = await analyzeAudio(file);

console.log(result.transcript);    // "Xin chào, tôi gọi từ..."
console.log(result.riskScore);     // 82
console.log(result.flagged);       // [{ text: "...", reason: "..." }]
```

**Response Interface**:
```typescript
interface AnalysisResult {
  transcript: string;
  riskScore: number;
  flagged: Array<{
    text: string;
    reason: string;
  }>;
}
```

---

### 2. Health Check (`/health`)

**Method**: `GET`  
**Purpose**: Check API availability

**Usage**:
```typescript
import { healthCheck } from '@/utils/api';

const health = await healthCheck();
console.log(health.status);        // "ok"
console.log(health.timestamp);     // "2025-01-XX..."
```

---

## Adding New Endpoints

### Step 1: Update Types

```typescript
// src/utils/api.ts

export interface NewApiResponse {
  data: string;
  count: number;
}
```

### Step 2: Create Service Function

```typescript
// src/utils/api.ts

/**
 * Your new API function
 * @param param - Parameter description
 * @returns Response data
 * @throws ApiError if request fails
 */
export const yourNewFunction = async (param: string): Promise<NewApiResponse> => {
  try {
    const response = await apiClient.post<NewApiResponse>('/your-endpoint', {
      param,
    });
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      const apiError: ApiError = {
        message: error.response?.data?.message || error.message,
        code: error.code,
        status: error.response?.status,
      };
      throw apiError;
    }
    throw error;
  }
};
```

### Step 3: Use in Components

```typescript
import { yourNewFunction, NewApiResponse } from '@/utils/api';

const MyComponent = () => {
  const handleAction = async () => {
    try {
      const result = await yourNewFunction('value');
      console.log(result);
    } catch (error) {
      console.error('API error:', error);
    }
  };
};
```

---

## Error Handling

### Automatic Error Handling

The API client automatically handles:

- ✅ **401 Unauthorized**: Missing/invalid credentials
- ✅ **403 Forbidden**: Access denied
- ✅ **404 Not Found**: Endpoint doesn't exist
- ✅ **429 Rate Limit**: Too many requests
- ✅ **500 Server Error**: API is down
- ✅ **Network Error**: No internet connection

### Custom Error Handling

```typescript
try {
  const result = await analyzeAudio(file);
} catch (error) {
  if (axios.isAxiosError(error)) {
    // Access error details
    console.error(error.message);     // Error message
    console.error(error.code);        // Error code (e.g., "NETWORK_ERROR")
    console.error(error.response?.status); // HTTP status (e.g., 500)
  }
}
```

---

## Interceptors

### Request Interceptor

Automatically adds:
- Auth tokens (if needed)
- Request logging
- Default headers

**To Add Auth Tokens**:
```typescript
apiClient.interceptors.request.use((config) => {
  const token = getAuthToken();
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});
```

### Response Interceptor

Automatically:
- Logs all errors
- Transforms error responses
- Provides meaningful error messages

---

## Best Practices

### ✅ DO

- Always use try-catch blocks
- Check network errors before user feedback
- Use TypeScript interfaces for type safety
- Add JSDoc comments for new functions
- Follow the existing code structure

### ❌ DON'T

- Don't hardcode API URLs in components
- Don't skip error handling
- Don't use fetch directly (use apiClient)
- Don't ignore TypeScript errors
- Don't create duplicate API calls

---

## Troubleshooting

### API returns 404

1. Check `VITE_API_BASE_URL` in environment variables
2. Verify endpoint path is correct
3. Check API version matches

### CORS Error

1. Ensure API server allows your domain
2. Check Vercel deployment has correct environment variables
3. Verify `baseURL` in apiClient configuration

### Network Timeout

Default timeout is **60 seconds**. Adjust in:
```typescript
const apiClient = axios.create({
  timeout: 60000, // milliseconds
});
```

---

## Migration from Old Code

**Before**:
```typescript
const response = await fetch('https://scam-detect.techainer.com/api/v1/detect-scam', {
  method: 'POST',
  body: formData,
});
```

**After**:
```typescript
import { analyzeAudio } from '@/utils/api';

const result = await analyzeAudio(file);
```

**Benefits**:
- ✅ Type safety
- ✅ Automatic error handling
- ✅ Centralized configuration
- ✅ Reusable across app
- ✅ Easy to mock for tests

---

## Testing

### Mock API for Development

```typescript
// src/utils/api.test.ts
import axios from 'axios';
jest.mock('axios');

const mockedAxios = axios as jest.Mocked<typeof axios>;
mockedAxios.create.mockReturnThis();

test('analyzeAudio calls correct endpoint', async () => {
  const file = new File([''], 'test.mp3');
  await analyzeAudio(file);
  
  expect(mockedAxios.post).toHaveBeenCalledWith(
    '/detect-scam',
    expect.any(FormData)
  );
});
```

---

## Resources

- **API Documentation**: https://scam-detect.techainer.com/docs
- **Vercel Env Variables**: https://vercel.com/docs/environment-variables
- **Axios Docs**: https://axios-http.com/

