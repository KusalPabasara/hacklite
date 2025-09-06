# User Profile System Documentation

## Overview
The MetaMind platform now includes a comprehensive user profile system that allows users to manage their personal information, upload profile pictures, and maintain a consistent avatar across the application.

## Features

### ✅ Profile Data Management
- **Full Name**: User's complete name
- **Email Address**: Contact email
- **Location**: City, Country information
- **Bio**: Personal description/about me
- **Profile Picture**: Avatar image upload

### ✅ Avatar System
- **Profile Picture Display**: Shows uploaded image if available
- **Fallback Initials**: Displays first letter(s) of name if no picture
- **Default Avatar**: Shows 'U' if no name provided
- **Navbar Integration**: Avatar appears in both desktop and mobile navigation

### ✅ Data Persistence
- **LocalStorage**: All profile data is saved locally
- **Real-time Updates**: Changes reflect immediately across the app
- **Event System**: Custom events notify components of profile changes

## Technical Implementation

### Profile Page (`/profile`)
- **Edit Mode**: Toggle between view and edit states
- **Image Upload**: File picker with preview
- **Form Validation**: Input handling and state management
- **Save/Cancel**: Persist changes or discard modifications

### Navbar Integration
- **Avatar Display**: Shows profile picture or initials
- **Profile Updates**: Listens for profile change events
- **Responsive Design**: Works on both desktop and mobile

### Data Flow
1. User edits profile on Profile page
2. Data saved to localStorage
3. Custom event dispatched to notify other components
4. Navbar updates avatar display
5. Changes persist across browser sessions

## Usage Instructions

### For Users
1. Navigate to `/profile`
2. Click "Edit Profile" button
3. Fill in your information
4. Upload a profile picture (optional)
5. Click "Save Changes" to persist
6. Your avatar will appear in the navbar

### For Developers
The profile system uses:
- **React Hooks**: useState, useEffect for state management
- **LocalStorage API**: Data persistence
- **Custom Events**: Component communication
- **FileReader API**: Image handling
- **CSS Modules**: Styling and animations

## File Structure
```
frontend/src/
├── pages/
│   └── Profile.jsx          # Main profile page
├── components/
│   └── Navbar.jsx           # Navigation with avatar
└── locales/
    ├── en.json              # English translations
    └── si.json              # Sinhala translations
```

## CSS Classes
- `.avatar-wrapper`: Container for profile picture
- `.avatar-img`: Styling for uploaded images
- `.avatar-initial`: Fallback initials display
- `.navbar-avatar-img`: Navbar avatar styling
- `.navbar-avatar-initial`: Navbar initials styling

## Future Enhancements
- [ ] Backend integration for data persistence
- [ ] Image cropping and editing
- [ ] Multiple avatar options
- [ ] Profile sharing capabilities
- [ ] Advanced privacy settings

## Browser Compatibility
- Modern browsers with ES6+ support
- LocalStorage API support required
- FileReader API for image uploads
- CSS Grid and Flexbox for layout

## Testing
To test the profile system:
1. Navigate to the profile page
2. Try editing different fields
3. Upload a profile picture
4. Verify avatar appears in navbar
5. Check data persistence after page refresh
6. Test on mobile devices

## Troubleshooting
- **Avatar not showing**: Check if image file is valid
- **Data not saving**: Verify localStorage is enabled
- **Styling issues**: Check CSS class names and Tailwind classes
- **Translation missing**: Ensure locale files are properly configured
