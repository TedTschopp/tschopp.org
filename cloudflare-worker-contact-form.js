// Cloudflare Worker script for contact form
// Save this to a file and deploy it to your Cloudflare Workers

addEventListener('fetch', event => {
  event.respondWith(handleRequest(event.request))
})

async function handleRequest(request) {
  // Make sure this is a POST request
  if (request.method !== 'POST') {
    return new Response('Method not allowed', { status: 405 })
  }

  try {
    // Get form data from the request
    const formData = await request.formData()
    const name = formData.get('name')
    const email = formData.get('email')
    const phone = formData.get('phone')
    const message = formData.get('message')
    
    // Check honeypot field to prevent spam
    if (formData.get('_gotcha')) {
      // This is likely a spam submission
      return new Response(JSON.stringify({ success: true }), {
        headers: { 'Content-Type': 'application/json' }
      })
    }
    
    // Basic validation
    if (!name || !email || !message) {
      return new Response(JSON.stringify({ 
        success: false, 
        error: 'Missing required fields' 
      }), {
        headers: { 'Content-Type': 'application/json' },
        status: 400
      })
    }
    
    // Prepare email content
    const emailContent = {
      personalizations: [{
        to: [{ email: 'ted@tschopp.org' }]
      }],
      from: { email: 'contact@tschopp.org', name: 'Tschopp.org Contact Form' },
      reply_to: { email: email, name: name },
      subject: `Website Contact Form: ${name}`,
      content: [{
        type: 'text/plain',
        value: `You have received a new message from your website contact form.

Name: ${name}
Email: ${email}
Phone: ${phone || 'Not provided'}

Message:
${message}`
      }]
    }
    
    // Send email using Mailchannels (free with Cloudflare Workers)
    const emailResponse = await fetch('https://api.mailchannels.net/tx/v1/send', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(emailContent)
    })
    
    if (emailResponse.status >= 200 && emailResponse.status < 300) {
      return new Response(JSON.stringify({ success: true }), {
        headers: { 'Content-Type': 'application/json' }
      })
    } else {
      return new Response(JSON.stringify({ 
        success: false, 
        error: 'Failed to send email' 
      }), {
        headers: { 'Content-Type': 'application/json' },
        status: 500
      })
    }
  } catch (err) {
    return new Response(JSON.stringify({ 
      success: false, 
      error: 'Server error' 
    }), {
      headers: { 'Content-Type': 'application/json' },
      status: 500
    })
  }
}
