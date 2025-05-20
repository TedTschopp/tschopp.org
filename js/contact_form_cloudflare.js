$(function() {
    // Handle the contact form submission
    $("#contactForm").on("submit", function(event) {
        event.preventDefault();
        
        // Clear any previous messages
        $("#success").empty();
        
        // Get form data
        const name = $("#name").val();
        const email = $("#email").val();
        const phone = $("#phone").val();
        const message = $("#message").val();
        
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
        
        // Send to Cloudflare Worker
        fetch("https://mail.tschopp.org", {
          method: "POST",
          body: formData,
        })
          .then((response) => response.json())
          .then((data) => {
            if (data.success) {
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
            } else {
              throw new Error(data.error || "Unknown error");
            }
          })
          .catch((error) => {
            // Fail message
            $("#success").html("<div class='alert alert-danger'>");
            $("#success > .alert-danger")
              .html(
                "<button type='button' class='close' data-dismiss='alert' aria-hidden='true'>&times;"
              )
              .append("</button>");
            $("#success > .alert-danger").append(
              `<strong>Sorry ${firstName},</strong> it seems that there was a problem sending your message. Please try again later!`
            );
            $("#success > .alert-danger").append("</div>");
          });
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
