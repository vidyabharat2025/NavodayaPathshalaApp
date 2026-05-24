# 📱 Navodaya Pathshala App

A production-ready React Native school management application built with clean MVVM architecture.

## 🏗️ Architecture Overview

This project follows the **MVVM (Model-View-ViewModel)** pattern with clean separation of concerns:

```
View (UI only) ↔ ViewModel (Business Logic) ↔ Service (API calls)
```

### Folder Structure

```
src/
├── api/                    # HTTP client with interceptors
├── assets/                 # Images and fonts
├── components/common/      # Reusable UI components
├── config/                 # Theme, colors, fonts, spacing
├── constants/              # Strings and route names
├── hooks/                  # Custom React hooks
├── navigation/             # Navigation stacks
├── screens/                # Screen components (View + ViewModel)
├── services/               # Stateless API service layer
├── store/                  # Global state (Context API)
├── utils/                  # Utilities, validators, helpers
└── App.js                  # Main app component
```

## 🚀 Quick Start

### Prerequisites
- Node.js 20+
- React Native CLI
- Android SDK or iOS Xcode

### Installation

```bash
# Install dependencies
npm install

# Start development server
npm start

# Run on Android
npm run android

# Run on iOS
npm run ios
```

### Configuration

Update API base URL in `src/api/apiConstants.js`:

```javascript
const API_BASE_URL = 'https://your-api.example.com';
```

## 📋 Key Features

### API Integration
- ✅ Axios client with request/response interceptors
- ✅ Global API progress tracking (automatic loader)
- ✅ Centralized error handling
- ✅ Token management (Bearer auth)
- ✅ Session expiration handling

### UI Components
- ✅ `AppText` - Themed text wrapper
- ✅ `AppButton` - Themed button with variants
- ✅ `Loader` - Global loading modal
- ✅ `ImageView` - Smart image with fallbacks

### State Management
- ✅ Context API for global state (auth, user, theme)
- ✅ Custom hooks for easy access
- ✅ Automatic token restoration on app start

### Data Persistence
- ✅ AsyncStorage for token/user data
- ✅ Network connectivity detection
- ✅ Offline support ready

## 🎨 Theme System

All styling is centralized in `src/config/`:

```javascript
import THEME from '../../config/theme';

// Colors
<View style={{ backgroundColor: THEME.COLORS.PRIMARY }} />

// Spacing
<View style={{ padding: THEME.SPACING.MEDIUM }} />

// Fonts
<AppText variant="heading" semiBold>Title</AppText>
```

## 📝 String Constants

Use `STRINGS` for all text:

```javascript
import STRINGS from '../../constants/strings';

<AppText>{STRINGS.LOGIN}</AppText>
```

## 🗺️ Navigation

Routes are centralized in `src/constants/routes.js`:

```javascript
import ROUTES from '../../constants/routes';

navigation.navigate(ROUTES.APP.HOME);
```

## 🔐 Authentication

Complete login flow example:

**ViewModel** (`screens/login/LoginViewModel.js`):
```javascript
const LoginViewModel = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState({});

  const handleLogin = async () => {
    if (!validateForm()) return null;
    return await authService.login(email, password);
  };

  return { email, setEmail, password, setPassword, errors, handleLogin };
};
```

**View** (`screens/login/LoginScreen.js`):
```javascript
const LoginScreen = () => {
  const viewModel = LoginViewModel();
  const { signIn } = useAppContext();

  const onPress = async () => {
    const result = await viewModel.handleLogin();
    if (result) signIn(result.token, result.user);
  };

  return (
    <View>
      <TextInput value={viewModel.email} onChangeText={viewModel.setEmail} />
      <AppButton title="Login" onPress={onPress} />
    </View>
  );
};
```

## 🛠️ Creating a New Screen

### Step 1: Create ViewModel
`src/screens/myscreen/MyScreenViewModel.js`
```javascript
const MyScreenViewModel = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    (async () => {
      setLoading(true);
      try {
        const result = await myService.getData();
        setData(result);
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  return { data, loading };
};

export default MyScreenViewModel;
```

### Step 2: Create Styles
`src/screens/myscreen/myScreenStyles.js`
```javascript
const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: THEME.SPACING.MEDIUM,
    backgroundColor: THEME.COLORS.BG_PRIMARY,
  },
});

export default styles;
```

### Step 3: Create Screen
`src/screens/myscreen/MyScreen.js`
```javascript
const MyScreen = () => {
  const viewModel = MyScreenViewModel();

  return (
    <View style={styles.container}>
      {viewModel.loading ? (
        <AppText>{STRINGS.LOADING}</AppText>
      ) : (
        <AppText>{viewModel.data}</AppText>
      )}
    </View>
  );
};

export default MyScreen;
```

### Step 4: Add to Navigation
`src/navigation/AppNavigator.js`
```javascript
<Stack.Screen name={ROUTES.APP.MY_SCREEN} component={MyScreen} />
```

## 📡 Creating an API Service

`src/services/myService.js`
```javascript
import apiClient from '../api/apiClient';
import { API_ENDPOINTS } from '../api/apiConstants';

const myService = {
  getItems: async () => {
    const response = await apiClient.get('/items');
    return response.data;
  },

  createItem: async (data) => {
    const response = await apiClient.post('/items', data);
    return response.data;
  },
};

export default myService;
```

## 🧪 Common Patterns

### Form with Validation
```javascript
const [formData, setFormData] = useState({});
const [errors, setErrors] = useState({});

const validateForm = () => {
  const newErrors = {};
  if (!validateEmail(formData.email)) {
    newErrors.email = 'Invalid email';
  }
  setErrors(newErrors);
  return Object.keys(newErrors).length === 0;
};

const handleSubmit = async () => {
  if (!validateForm()) return;
  return await myService.submit(formData);
};
```

### List with Pagination
```javascript
const [items, setItems] = useState([]);
const [page, setPage] = useState(1);
const [hasMore, setHasMore] = useState(true);

const loadMore = async () => {
  const newItems = await myService.getItems(page);
  setItems(prev => [...prev, ...newItems]);
  setPage(prev => prev + 1);
  setHasMore(newItems.length > 0);
};
```

### Data Fetching with Retry
```javascript
import { retry } from '../../utils/helpers';

const fetchData = async () => {
  return await retry(
    () => myService.getData(),
    3,    // max attempts
    1000  // delay in ms
  );
};
```

## 🎯 Best Practices

### DO ✅
- Keep Views dumb (UI only)
- Put all logic in ViewModels
- Use THEME for colors/fonts/spacing
- Use STRINGS for all text
- Handle errors with try/catch
- Show loading states
- Use AsyncStorage for persistence
- Follow file naming conventions

### DON'T ❌
- Don't put API calls in components
- Don't hardcode colors
- Don't use inline styles
- Don't manage state in services
- Don't skip error handling
- Don't use var (use const/let)
- Don't mutate state directly

## 🔍 File Naming Conventions

```
Components:      MyComponent.js (PascalCase)
Services:        myService.js (camelCase)
ViewModels:      MyScreenViewModel.js (PascalCase)
Styles:          myScreenStyles.js (camelCase)
Utils:           validators.js (camelCase)
Config:          colors.js (lowercase)
Constants:       strings.js (lowercase)
Hooks:           useMyHook.js (camelCase with 'use' prefix)
```

## 🚨 Common Issues & Solutions

| Issue | Solution |
|-------|----------|
| API calls failing | Check API_BASE_URL, verify backend is running |
| Loader not showing | Ensure apiProgress.startRequest() is called |
| Navigation broken | Check RootNavigator, AppContext.isSignedIn state |
| Styles not applying | Use THEME constants, check StyleSheet.create() |
| State not updating | Check useState usage, verify state setter is called |
| Token not being sent | Check storage, verify Request interceptor in apiClient |

## 🧰 Utilities Available

### Validators
```javascript
import {
  validateEmail,
  validatePassword,
  validatePhone,
  validateRequired,
} from '../../utils/validators';
```

### Helpers
```javascript
import {
  debounce,
  throttle,
  formatDate,
  deepClone,
  formatCurrency,
  retry,
  sleep,
} from '../../utils/helpers';
```

### Logging
```javascript
import {
  debug,
  error,
  showErrorMessage,
  showSuccessMessage,
} from '../../utils/logger';
```

## 📱 Hooks

### useAppContext
```javascript
const { user, isSignedIn, signIn, signOut, updateUser } = useAppContext();
```

### useLoader
```javascript
const { isLoading } = useLoader();
```

### useNetwork
```javascript
const { isConnected } = useNetwork();
```

## 📦 Dependencies

- `react-native` - Mobile framework
- `@react-navigation/native` - Navigation
- `axios` - HTTP client
- `@react-native-async-storage/async-storage` - Local storage
- `@react-native-community/netinfo` - Network detection

## 🔒 Security

- ✅ Bearer token authentication
- ✅ Token stored in AsyncStorage
- ✅ Automatic token refresh
- ✅ Session expiration handling
- ✅ Error validation

**Recommended additions:**
- [ ] SSL pinning
- [ ] Biometric authentication
- [ ] Encrypted storage
- [ ] Token encryption

## 📊 Project Stats

- **35+** source files
- **2500+** lines of code
- **50+** string constants
- **25+** color definitions
- **4** reusable components
- **2** stateless services
- **MVVM** architecture throughout

## 🤝 Contributing

1. Follow the MVVM pattern
2. Keep Views dumb
3. Use THEME for styling
4. Use STRINGS for text
5. Handle all errors
6. Add comments for complex logic
7. Test before committing

## 📞 Support

For common patterns and solutions, check:
- `src/screens/login/` - Complete example
- `src/config/` - Theme system
- `src/utils/` - Utility functions
- `src/services/` - API integration

## 📝 License

Proprietary - Navodaya Pathshala

---

**Ready for production use!** 🚀

For questions, refer to the example screens and follow the established patterns.
