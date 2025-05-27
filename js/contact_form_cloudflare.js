$(function() {    // Handle the contact form submission
    console.log('Contact form script initialized');
    $("#contactForm").on("submit", function(event) {
        event.preventDefault();
        console.log('Form submission initiated');
        
        // Clear any previous messages
        $("#success").empty();
        
        // Show loading state
        $("#contactForm button[type='submit']").prop('disabled', true);
        $("#contactForm button[type='submit']").text('Sending...');
        
        // Get form data
        const name = $("#name").val();
        const email = $("#email").val();
        const phone = $("#phone").val();
        const message = $("#message").val();
        
        console.log('Form data prepared:', { name, email, phone, messageLength: message?.length });
        
        // First name for personalized messages
        let firstName = name;
        if (firstName.indexOf(' ') >= 0) {
            firstName = name.split(' ').slice(0, -1).join(' ');
        }
        
        // Create form data object
        const formData = new FormData();
        formData.append("name", name);
        formData.append("email", email);
        formData.append("phone", phone);
        formData.append("message", message);
        
        // Check for honeypot
        if ($("#_gotcha").val()) {
            console.log("Honeypot triggered");
            showSuccess();
            return;
        }        // Log submission attempt
        console.log("Attempting to submit form to Cloudflare Worker");
        
        // Send to Cloudflare Worker
        fetch("https://mail.tschopp.org", {
          method: "POST",
          body: formData,
          headers: {
            Accept: "application/json"
          },
          mode: "cors",
          credentials: "omit"
        }).then((response) => {
            console.log("Received response:", response.status, response.statusText);
            if (!response.ok && response.status !== 200) {
              return response.text().then(text => {
                console.error("Error response body:", text);
                throw new Error(`Server responded with status: ${response.status} - ${text}`);
              });
            }
            return response.json();
          })
          .then((data) => {
            console.log("Success response data:", data);
            showSuccess();
          })
          .catch((error) => {
            console.error("Form submission error:", error);
            showError(firstName, error.message);
          })
          .finally(() => {
            // Reset button state
            $("#contactForm button[type='submit']").prop('disabled', false);
            $("#contactForm button[type='submit']").text('Send Message');
          });
          
        // Helper functions for success/error UI updates
        function showSuccess() {
          // Success message
          $("#success").html("<div class='alert alert-success'>");
          $("#success > .alert-success")
            .html(
              "<button type='button' class='close' data-dismiss='alert' aria-hidden='true'>&times;"
            )
            .append("</button>");
          $("#success > .alert-success").append(
            "<strong>Your message has been sent. Thank you for reaching out!</strong>"
          );
          $("#success > .alert-success").append("</div>");

          // Clear all fields
          $("#contactForm").trigger("reset");
          
          // Reset button
          $("#contactForm button[type='submit']").prop('disabled', false);
          $("#contactForm button[type='submit']").text('Send Message');
        }
          function showError(firstName, errorDetail = "") {
          // Fail message
          $("#success").html("<div class='alert alert-danger'>");
          $("#success > .alert-danger")
            .html(
              "<button type='button' class='close' data-dismiss='alert' aria-hidden='true'>&times;"
            )
            .append("</button>");
          
          let errorMessage = `<strong>Sorry ${firstName},</strong> it seems that there was a problem sending your message. Please try again later!`;
          
          // Add technical details for debugging if available
          if (errorDetail && errorDetail !== "") {
            console.log("Showing error detail:", errorDetail);
            errorMessage += `<div class="small mt-2">Technical details: ${errorDetail}</div>`;
          }
          
          $("#success > .alert-danger").append(errorMessage);
          $("#success > .alert-danger").append("</div>");
          
          // Reset button
          $("#contactForm button[type='submit']").prop('disabled', false);
          $("#contactForm button[type='submit']").text('Send Message');
        }
    });
    
    // When the window is clicked, hide the success/error message
    $("a[data-dismiss='alert']").click(function() {
        $("#success").empty();
    });
    
    // Clear the form when reset button is clicked
    $("#contactForm input,#contactForm textarea").focus(function() {
        $("#success").empty();
    });
});
