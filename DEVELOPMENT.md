# Development Mode Configuration

## Network Error Resolution

This project has been configured to work in development mode without requiring a backend server. The following changes were made to resolve network errors:

### 1. Mock API Service (`src/services/mockApi.js`)
- Created a comprehensive mock API service that simulates all backend endpoints
- Includes mock data for rooms, authentication, and bookings
- Provides realistic response structures matching the expected API format

### 2. Development Configuration (`src/config/development.js`)
- Added feature flags to control development behavior
- `useMockData: true` - Uses mock API instead of network calls
- `bypassAuth: true` - Bypasses authentication in development

### 3. Enhanced API Client (`src/services/apiClient.js`)
- Added network error interceptor that falls back to mock data
- Graceful handling of connection failures
- Development mode logging for debugging

### 4. Updated API Services
- `roomsApi.js` - Integrated with mock data for development
- All API services check development flags before making network calls

### 5. Context Updates
- `AuthContext.jsx` - Bypasses authentication in development mode
- `useRooms.js` - Uses mock data when network calls fail

## Features Working in Development Mode

✅ **Home Page**
- Hero section with luxury branding
- Featured rooms display
- Customer reviews carousel
- Responsive design

✅ **Rooms Page**
- Room listing with filtering
- Search by room type, price range
- Sorting options (price, rating, popularity)
- Pagination
- Room details modal

✅ **Mock Data**
- 6 luxury room types with realistic pricing
- High-quality room images
- Detailed amenities and descriptions
- Booking availability simulation

## Development vs Production

### Development Mode (Current)
```javascript
// In src/config/development.js
export const DEV_FLAGS = {
  useMockData: true,      // Use mock API instead of real backend
  bypassAuth: true,       // Skip authentication
  showDebugInfo: true     // Show debug console logs
};
```

### Production Mode
When deploying to production:
1. Set `useMockData: false` in development.js
2. Set `bypassAuth: false` 
3. Ensure backend API is running on the configured URL
4. Update environment variables for production API endpoints

## Running the Application

```bash
# Start development server
npm run dev

# Check for code quality issues
npm run lint

# Build for production
npm run build
```

## Console Messages

When running in development mode, you'll see helpful console messages:
- 🚧 **Development mode: using mock data**
- 🚧 **Network error detected, falling back to mock data**
- 🚧 **Development mode: bypassing token validation**

## Next Steps

1. **Backend Integration**: Connect to real API when backend is ready
2. **Authentication**: Implement proper login/register flows
3. **Booking System**: Complete booking creation and management
4. **Admin Panel**: Add room management for administrators
5. **Payment Integration**: Implement payment processing

## Troubleshooting

**If you see network errors:**
- Ensure `DEV_FLAGS.useMockData` is set to `true`
- Check console for mock data fallback messages
- Verify development server is running on http://localhost:5173

**If rooms don't load:**
- Check browser console for JavaScript errors
- Verify mock data in `src/services/mockApi.js`
- Ensure all imports are correct in components
