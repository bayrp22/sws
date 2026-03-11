// This file handles bot requests for /Public/home/js/check.js
// Redirecting to main website instead

console.log('This JavaScript file is not available on this React application.');
console.log('Redirecting to homepage...');

// Redirect to homepage if loaded in browser
if (typeof window !== 'undefined') {
    window.location.href = '/';
} 