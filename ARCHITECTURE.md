# Navodaya Pathshala App - Architecture & Project Structure

## Project Overview
**NavodayaPathshalaApp** is a React Native mobile application built with modern architecture patterns for managing educational institutions (schools, students, classes).

**Tech Stack:**
- **Framework:** React Native 0.83.1
- **Navigation:** React Navigation (Native Stack)
- **State Management:** Context API
- **HTTP Client:** Axios
- **Storage:** AsyncStorage
- **Icons:** React Native Vector Icons (MaterialCommunityIcons)
- **Styling:** Custom theme system with centralized color, font, and spacing configs
- **Architecture Pattern:** MVVM (Model-View-ViewModel)

---

## Project Structure

```
src/
├── api/                          # API Integration
│   ├── apiClient.js             # Axios instance with interceptors
│   ├── apiConstants.js          # API endpoints & base URL
│   ├── apiLogger.js             # API request/response logging
│   └── apiProgress.js           # Global loader/progress tracking
│
├── assets/                       # Static assets
│   ├── fonts/
│   ├── icons/
│   └── images/
│
├── components/                   # Reusable UI Components
│   └── common/
│       ├── AppText.js           # Custom Text component with variants
│       ├── AppButton.js         # Custom Button component
│       ├── ImageView.js         # Custom Image component
│       └── Loader.js            # Global loader overlay
│
├── config/                       # Configuration & Theme
│   ├── colors.js                # Color palette (primary, secondary, semantic)
│   ├── fonts.js                 # Font families, sizes, weights
│   ├── spacing.js               # Spacing/padding/margin constants
│   └── theme.js                 # Centralized theme combining colors, fonts, spacing
│
├── constants/                    # App-wide constants
│   ├── routes.js                # Screen/route names
│   ├── strings.js               # Localization strings
│   ├── loginColors.js           # Login-specific colors
│   ├── loginSpacing.js          # Login-specific spacing
│   ├── loginTypography.js       # Login-specific typography
│   └── loginVariables.js        # Login-specific variables
│
├── hooks/                        # Custom React Hooks
│   ├── useLoader.js             # Hook for managing global loader state
│   └── useNetwork.js            # Hook for network status
│
├── models/                       # Data Models
│   └── UserResponse.js          # User data model/schema
│
├── navigation/                   # Navigation Structure
│   ├── RootNavigator.js         # Root stack - Auth vs App navigation
│   ├── AuthNavigator.js         # Auth stack screens (Login, Register, etc.)
│   └── AppNavigator.js          # App stack screens (Home, Profile, etc.)
│
├── screens/                      # Screen Components
│   ├── home/
│   │   ├── HomeScreen.js        # Home screen view component
│   │   ├── HomeViewModel.js     # Home screen business logic (MVVM)
│   │   └── homeStyles.js        # Home screen styles
│   ├── login/                   # Login screens
│   └── signup/                  # Signup screens
│
├── services/                     # Business Logic Services
│   ├── authService.js           # Authentication API calls & logic
│   ├── metadataService.js       # Metadata/common data API calls
│   └── storageService.js        # Local storage operations (AsyncStorage)
│
├── store/                        # Global State Management
│   └── AppContext.js            # Context API for auth & global state
│
└── utils/                        # Utility Functions
    ├── helpers.js               # Common helpers (debounce, throttle, formatDate, etc.)
    ├── logger.js                # Logging utilities
    └── validators.js            # Input validation functions

App.js                           # Main App component (entry point)
App.tsx                          # Template entry point (currently unused)
```

---

## Architecture Patterns

### 1. **MVVM Pattern (Model-View-ViewModel)**
Each screen has three parts:
- **View:** UI-only component (e.g., `HomeScreen.js`)
- **ViewModel:** Business logic & state management (e.g., `HomeViewModel.js`)
- **Styles:** Centralized styles (e.g., `homeStyles.js`)

Example:
```javascript
// HomeScreen.js (View) - Only UI logic
const HomeScreen = () => {
  const viewModel = HomeViewModel(); // Get business logic
  const { handleLogout } = viewModel;
  
  return (
    <SafeAreaView>
      {/* UI only */}
    </SafeAreaView>
  );
};

// HomeViewModel.js - Business logic
const HomeViewModel = () => {
  const { signOut } = useAppContext();
  
  const handleLogout = useCallback(() => {
    // Business logic here
  }, []);
  
  return { handleLogout };
};
```

### 2. **Context API for State Management**
- Centralized auth state in `AppContext.js`
- Provides: `isSignedIn`, `userToken`, `user`, `isLoading`
- Actions: `signIn()`, `signOut()`, `updateUser()`

### 3. **Layered Service Architecture**
- **API Layer:** `apiClient.js` (HTTP client with interceptors)
- **Service Layer:** `authService.js`, `metadataService.js` (business logic, API calls)
- **Storage Layer:** `storageService.js` (AsyncStorage operations)
- **UI Layer:** Components & Screens

### 4. **Centralized Configuration**
All styling, spacing, colors managed in `config/` folder:
```javascript
import THEME from './config/theme';
const { COLORS, FONTS, SPACING } = THEME;
```

---

## Navigation Structure

```
RootNavigator (checks isSignedIn)
├── AuthStack (if not signed in)
│   ├── Login
│   ├── Register
│   └── ForgotPassword
│
└── AppStack (if signed in)
    └── Home (currently only screen)
        ├── School Management (TODO)
        ├── Student Management (TODO)
        └── Profile (TODO)
```

---

## Key Features

### Authentication Flow
1. User logs in via `LoginScreen`
2. `authService.login()` makes API call
3. Token & user data stored in AsyncStorage
4. `AppContext.signIn()` updates global state
5. `RootNavigator` switches to AppStack

### Global Loader
- Managed by `apiProgress.js`
- Shows during API calls
- Accessed via `useLoader()` hook or `<Loader />` component

### Network Status
- Hook available: `useNetwork()` to check connection status
- Integrated in API client for offline handling

---

## Theming System

### Color System
```javascript
// Primary colors
Colors.primary        // #2563EB (Blue)
Colors.secondary      // #16A34A (Green)

// Semantic colors
Colors.error          // #DC2626 (Red)
Colors.accent         // #F59E0B (Amber)

// Text colors
Colors.textPrimary    // #111827 (Dark Gray)
Colors.textSecondary  // #6B7280 (Medium Gray)

// Background colors
Colors.background     // #F9FAFB (Light Gray)
Colors.card           // #FFFFFF (White)
```

### Spacing System
- **Base unit:** 8px
- **Predefined:** XS(4), SMALL(8), MEDIUM(16), LARGE(24), XL(32), etc.
- **Specific:** SCREEN_HORIZONTAL, BUTTON, INPUT, CARD spacing

### Font System
- **Families:** Inter (Regular, Medium, SemiBold, Bold)
- **Sizes:** EXTRA_SMALL(10), SMALL(12), BODY(14), HEADING(20), LARGE(24), etc.
- **Weights:** LIGHT(300), REGULAR(400), BOLD(700), EXTRA_BOLD(800)

---

## API Integration

### API Client Features
- **Axios instance** with custom configuration
- **Request interceptor:** Adds auth token, shows loader
- **Response interceptor:** Handles errors, logs responses
- **Progress tracking:** Global loader management
- **Error handling:** Unified error logging

### Services Pattern
```javascript
// authService.js
const login = async (email, password) => {
  const response = await apiClient.post(API_ENDPOINTS.AUTH.LOGIN, {
    email,
    password,
  });
  // Parse and return user data
};

// Usage in component
const { signIn } = useAppContext();
const response = await authService.login(email, password);
signIn(response.token, response.user);
```

---

## State Management Flow

```
Component
   ↓
ViewModel (business logic)
   ↓
useAppContext() (global state)
   ↓
AppContext (centralized store)
   ↓
Services (authService, storageService)
   ↓
API / Storage (apiClient, AsyncStorage)
```

---

## Common Components

### AppText
Wrapper for consistent text styling with variants: `caption`, `small`, `body`, `subtitle`, `title`, `heading`

```javascript
<AppText variant="heading" font="bold">
  Hello World
</AppText>
```

### AppButton
Reusable button with variants: `primary`, `secondary`, `outline`, `error`, etc.

```javascript
<AppButton
  title="Login"
  onPress={handleLogin}
  isLoading={loading}
  variant="primary"
/>
```

### Loader
Global loader overlay shown during API calls

```javascript
<Loader message="Logging in..." />
```

---

## Development Guidelines

### Adding a New Screen
1. Create folder: `src/screens/[screenName]/`
2. Create three files:
   - `[ScreenName].js` (View component)
   - `[ScreenName]ViewModel.js` (Business logic)
   - `[screenName]Styles.js` (Styles)
3. Add route to `AppNavigator.js` or `AuthNavigator.js`
4. Import route constant from `constants/routes.js`

### Adding a New API Service
1. Create file: `src/services/[serviceName]Service.js`
2. Import `apiClient` and `API_ENDPOINTS`
3. Define API functions
4. Export functions for use in ViewModels

### Using the Theme
```javascript
import THEME from '../config/theme';
const { COLORS, FONTS, SPACING } = THEME;

const styles = StyleSheet.create({
  container: {
    backgroundColor: COLORS.BG_PRIMARY,
    padding: SPACING.MEDIUM,
  },
  text: {
    fontSize: FONTS.SIZE.HEADING,
    fontFamily: FONTS.FAMILY.BOLD,
  },
});
```

---

## Current Status

### Completed
✅ Project setup with React Native 0.83.1
✅ Navigation structure (Auth & App stacks)
✅ Context API setup for state management
✅ Theme system (colors, fonts, spacing)
✅ API client with interceptors
✅ Authentication service
✅ Storage service
✅ Common components (AppText, AppButton, Loader)
✅ Home screen (basic structure)

### In Progress / TODO
❌ Home screen development (detailed UI)
❌ School management screen
❌ Student management screen
❌ Profile & Settings screens
❌ Error handling improvements
❌ Offline support
❌ Data persistence
❌ Analytics/Logging
❌ Push notifications

---

## Best Practices

1. **Always use MVVM pattern** for new screens
2. **Centralize styling** - avoid inline styles
3. **Use constants** for colors, spacing, routes
4. **Handle errors** gracefully with user feedback
5. **Log API calls** for debugging
6. **Validate inputs** before API calls
7. **Use hooks** for state management in ViewModels
8. **Keep components small** - aim for single responsibility
9. **Use TypeScript** for type safety (optional but recommended)
10. **Follow naming conventions** - PascalCase for components, camelCase for functions

