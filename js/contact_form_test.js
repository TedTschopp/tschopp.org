// Contact form test script
// This script can be copied to your browser console to test the form functionality

function testContactForm() {
  console.log('Starting contact form test');
  
  // Fill form fields with test data
  $('#name').val('Test User');
  $('#email').val('test@example.com');
  $('#phone').val('555-123-4567');
  $('#message').val('This is a test message from the automated test script. Please ignore.');
  
  console.log('Form populated with test data');
  
  // Submit the form
  $('#contactForm button[type="submit"]').click();
  
  console.log('Form submission triggered');
  
  // Return check function to be called later
  return function checkResult() {
    if ($('#success .alert-success').length > 0) {
      console.log('✅ FORM TEST PASSED: Submission successful');
      return true;
    } else if ($('#success .alert-danger').length > 0) {
      console.error('❌ FORM TEST FAILED: Error displayed', $('#success .alert-danger').text());
      return false;
    } else {
      console.log('⏳ FORM TEST PENDING: No result yet');
      return null;
    }
  };
}

// Usage:
// 1. Paste this entire script in browser console
// 2. Run: const checkResult = testContactForm();
// 3. After a few seconds, run: checkResult();
// 4. Check for success/error log messages
