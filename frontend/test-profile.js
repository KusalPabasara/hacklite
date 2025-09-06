// Test script for Profile System
// Run this in the browser console to test localStorage functionality

console.log('🧪 Testing Profile System...');

// Test 1: Check if localStorage is available
if (typeof(Storage) !== "undefined") {
    console.log('✅ localStorage is available');
} else {
    console.error('❌ localStorage is not available');
}

// Test 2: Test profile data structure
const testProfile = {
    fullName: 'John Doe',
    email: 'john.doe@example.com',
    location: 'New York, USA',
    bio: 'Software Engineer passionate about AI and career development',
    avatar: 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTAwIiBoZWlnaHQ9IjEwMCIgdmlld0JveD0iMCAwIDEwMCAxMDAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxyZWN0IHdpZHRoPSIxMDAiIGhlaWdodD0iMTAwIiBmaWxsPSIjNjY3ZWVhIi8+CjxjaXJjbGUgY3g9IjUwIiBjeT0iMzUiIHI9IjE1IiBmaWxsPSJ3aGl0ZSIvPgo8cGF0aCBkPSJNMTUgNzBDMTUgNjAgMjUgNTAgMzUgNTBINjVDNzUgNTAgODUgNjAgODUgNzBWNzVIMTVWNzBaIiBmaWxsPSJ3aGl0ZSIvPgo8L3N2Zz4K'
};

// Test 3: Save test profile
try {
    localStorage.setItem('userProfile', JSON.stringify(testProfile));
    console.log('✅ Test profile saved to localStorage');
} catch (error) {
    console.error('❌ Failed to save test profile:', error);
}

// Test 4: Retrieve test profile
try {
    const retrievedProfile = localStorage.getItem('userProfile');
    if (retrievedProfile) {
        const parsed = JSON.parse(retrievedProfile);
        console.log('✅ Test profile retrieved:', parsed);
        
        // Test 5: Verify data integrity
        if (parsed.fullName === testProfile.fullName &&
            parsed.email === testProfile.email &&
            parsed.location === testProfile.location &&
            parsed.bio === testProfile.bio &&
            parsed.avatar === testProfile.avatar) {
            console.log('✅ Data integrity verified');
        } else {
            console.error('❌ Data integrity check failed');
        }
    } else {
        console.error('❌ Failed to retrieve test profile');
    }
} catch (error) {
    console.error('❌ Failed to retrieve test profile:', error);
}

// Test 6: Test custom event dispatch
try {
    const event = new CustomEvent('profileUpdated', { detail: testProfile });
    window.dispatchEvent(event);
    console.log('✅ Custom event dispatched successfully');
} catch (error) {
    console.error('❌ Failed to dispatch custom event:', error);
}

// Test 7: Test avatar fallback logic
const testNames = ['', 'John', 'John Doe', 'John Michael Doe'];
testNames.forEach(name => {
    const initial = getInitial(name);
    console.log(`Initial for "${name}": "${initial}"`);
});

function getInitial(name) {
    if (!name) return 'U';
    const names = name.trim().split(' ');
    if (names.length > 1) {
        return `${names[0].charAt(0)}${names[names.length - 1].charAt(0)}`.toUpperCase();
    }
    return name.charAt(0).toUpperCase();
}

// Test 8: Clean up test data
function cleanupTestData() {
    localStorage.removeItem('userProfile');
    console.log('🧹 Test data cleaned up');
}

console.log('🧪 Profile System Test Complete!');
console.log('💡 Run cleanupTestData() to clean up test data');
console.log('🌐 Navigate to /profile to see the profile system in action');
