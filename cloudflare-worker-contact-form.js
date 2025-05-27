// Cloudflare Worker script for contact form
// Save this to a file and deploy it to your Cloudflare Workers

addEventListener('fetch', event => {
  event.respondWith(handleRequest(event.request).catch(
    err => new Response(JSON.stringify({
      success: false,
      error: 'Unhandled exception: ' + err.message,
      stack: err.stack
    }), {
      status: 500,
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*'
      }
    })
  ))
})

async function handleRequest(request) {
  // Handle CORS preflight requests
  if (request.method === 'OPTIONS') {
    return new Response(null, {
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'POST, OPTIONS',
        'Access-Control-Allow-Headers': 'Content-Type',
        'Access-Control-Max-Age': '86400'
      }
    });
  }

  // Make sure this is a POST request
  if (request.method !== 'POST') {
    return new Response('Method not allowed', { 
      status: 405,
      headers: {
        'Access-Control-Allow-Origin': '*'
      }
    })
  }
  try {
    // Log the request for debugging
    console.log('Received form submission request')
    
    // Get form data from the request
    let formData
    try {
      formData = await request.formData()
    } catch (error) {
      console.error('Error parsing form data:', error)
      return new Response(JSON.stringify({ 
        success: false, 
        error: 'Invalid form data: ' + error.message 
      }), {
        headers: { 
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*' 
        },
        status: 400
      })
    }
    
    const name = formData.get('name')
    const email = formData.get('email')
    const phone = formData.get('phone')
    const message = formData.get('message')
    
    // Log the data we received
    console.log('Received data:', { name, email, phone, message: message?.substring(0, 20) + '...' })
      // Check honeypot field to prevent spam
    if (formData.get('_gotcha')) {
      // This is likely a spam submission
      return new Response(JSON.stringify({ success: true }), {
        headers: { 
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*'
        }
      })
    }
    
    // Basic validation
    if (!name || !email || !message) {
      return new Response(JSON.stringify({ 
        success: false, 
        error: 'Missing required fields' 
      }), {
        headers: { 
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*'
        },
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
    console.log('Attempting to send email via MailChannels')
    try {
      const emailResponse = await fetch('https://api.mailchannels.net/tx/v1/send', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(emailContent)
      })
      
      // Log the response for debugging
      const responseText = await emailResponse.text()
      console.log('MailChannels response status:', emailResponse.status)
      console.log('MailChannels response text:', responseText)
      
      if (emailResponse.status >= 200 && emailResponse.status < 300) {
        console.log('Email sent successfully')
        return new Response(JSON.stringify({ 
          success: true,
          message: 'Email sent successfully' 
        }), {
          headers: { 
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*' 
          }
        })    } else {
        console.error('Failed to send email via MailChannels:', responseText)
        return new Response(JSON.stringify({ 
          success: false, 
          error: `Failed to send email: ${emailResponse.status} - ${responseText}` 
        }), {
          headers: { 
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*' 
          },
          status: 500
        })
      }
    } catch (emailError) {
      console.error('Exception while sending email:', emailError)
      return new Response(JSON.stringify({ 
        success: false, 
        error: `Email sending error: ${emailError.message}` 
      }), {
        headers: { 
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*' 
        },
        status: 500
      })
    }
  } catch (err) {
    console.error('Error processing form submission:', err);
    return new Response(JSON.stringify({ 
      success: false, 
      error: 'Server error: ' + err.message
    }), {
      headers: { 
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*' 
      },
      status: 500
    })
  }
}
