# Contact Form Deployment Instructions

## Deploying Cloudflare Worker

1. Log in to your Cloudflare dashboard at https://dash.cloudflare.com/
2. Navigate to "Workers & Pages" on the left sidebar
3. Click "Create application"
4. Choose "Create Worker"
5. Name your worker (e.g., "mail")
6. Copy and paste the content of `cloudflare-worker-contact-form.js` into the worker editor
7. Click "Deploy"

## Setting Up Custom Domain for Cloudflare Worker

1. After deploying the worker, navigate to the worker details page
2. Click on "Triggers" tab
3. Under "Custom Domains", click "Add Custom Domain"
4. Enter the domain: `mail.tschopp.org`
5. Follow the verification steps to add the domain to your worker

## Testing the Contact Form

1. Open your website in a browser
2. Navigate to the contact section
3. Fill out the form with test information
4. Submit the form
5. Check for any error messages in the browser console (F12 > Console tab)
6. If issues persist, check the worker logs in the Cloudflare dashboard

## Troubleshooting

If the form submission fails:

1. Open browser developer tools (F12)
2. Check the Console for errors
3. Check Network tab to see the request to mail.tschopp.org and its response
4. Verify CORS headers are correctly set in the worker
5. Check Cloudflare worker logs for any backend errors

Remember that you must have MailChannels properly set up in your Cloudflare account for the email sending functionality to work.
