$(function() {
    // EmailJS configuration
    emailjs.init("YOUR_USER_ID"); // Replace with your EmailJS user ID

    // Bootstrap validation from jqBootstrapValidation
    $("input,textarea").jqBootstrapValidation({
        preventSubmit: true,
        submitError: function($form, event, errors) {
            // Additional error messages or events
        },
        submitSuccess: function($form, event) {
            event.preventDefault();
            
            // Get values from form
            var name = $("input#name").val();
            var email = $("input#email").val();
            var phone = $("input#phone").val();
            var message = $("textarea#message").val();
            
            // First name for personalized messages
            var firstName = name;
            if (firstName.indexOf(' ') >= 0) {
                firstName = name.split(' ').slice(0, -1).join(' ');
            }
            
            // Prepare template parameters
            var templateParams = {
                from_name: name,
                reply_to: email,
                phone_number: phone,
                message: message
            };
            
            // Send email using EmailJS
            emailjs.send('YOUR_SERVICE_ID', 'YOUR_TEMPLATE_ID', templateParams)
                .then(function(response) {
                    // Success message
                    $('#success').html("<div class='alert alert-success'>");
                    $('#success > .alert-success').html("<button type='button' class='close' data-dismiss='alert' aria-hidden='true'>&times;")
                        .append("</button>");
                    $('#success > .alert-success')
                        .append("<strong>Your message has been sent. </strong>");
                    $('#success > .alert-success')
                        .append('</div>');
                        
                    // Clear all fields
                    $('#contactForm').trigger("reset");
                }, function(error) {
                    // Fail message
                    $('#success').html("<div class='alert alert-danger'>");
                    $('#success > .alert-danger').html("<button type='button' class='close' data-dismiss='alert' aria-hidden='true'>&times;")
                        .append("</button>");
                    $('#success > .alert-danger').append("<strong>Sorry " + firstName + ", it seems that the mail server is not responding. Please try again later!");
                    $('#success > .alert-danger').append('</div>');
                    
                    // Clear all fields
                    $('#contactForm').trigger("reset");
                });
        },
        filter: function() {
            return $(this).is(":visible");
        }
    });
});
