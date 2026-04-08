const admissionForm = document.getElementById("admissionForm");

if (admissionForm) {
  // Create a message box below the form
  const messageBox = document.createElement("div");
  messageBox.style.marginTop = "15px";
  admissionForm.appendChild(messageBox);

  admissionForm.addEventListener("submit", async function(e) {
    e.preventDefault();
    messageBox.innerHTML = "";
    messageBox.style.color = "red";

    const formData = {};
    let isValid = true;

    // Collect all input/select elements inside the form
    const inputs = admissionForm.querySelectorAll("input, select, textarea");

    inputs.forEach(input => {
      input.style.border = "1px solid #ccc"; 

      // Required field check
      if (input.hasAttribute("required") && !input.value.trim()) {
        input.style.border = "2px solid red";
        isValid = false;
      }

      // Email validation
      if (input.type === "email" && input.value && !/^\S+@\S+\.\S+$/.test(input.value)) {
        input.style.border = "2px solid red";
        messageBox.innerHTML = "Enter valid email";
        isValid = false;
      }

      // Mobile number validation (10 digits)
      if ((input.name === "MobileNumber" || input.name === "AlternateContactNumber") &&
          input.value && !/^[0-9]{10}$/.test(input.value)) {
        input.style.border = "2px solid red";
        messageBox.innerHTML = "Phone number must be 10 digits";
        isValid = false;
      }

      // Add to formData using name (do NOT use id)
      if (input.name) formData[input.name] = input.value.trim();
    });

    if (!isValid) {
      if (!messageBox.innerHTML) messageBox.innerHTML = "Please fill required fields correctly!";
      return;
    }

    // Submit button
    const button = admissionForm.querySelector("button[type='submit']");
    button.innerText = "Submitting...";
    button.disabled = true;

    // Prepare payload
    const payload = new URLSearchParams(formData);
    const url = "https://script.google.com/macros/s/AKfycbw3llwZSzm1ZuhQvBxjdlrzzVON0g_z3QATkhLn4toLUJVeebd1pfMjqP6LI48PD6dM/exec"; 

    try {
      const response = await fetch(url, {
        method: "POST",
        body: payload
      });

      const result = await response.json();

      if (result.result === "success") {
        messageBox.style.color = "green";
        messageBox.innerHTML = "Admission form submitted successfully!";
        admissionForm.reset();
      } else {
        messageBox.innerHTML = "Failed to submit form!";
        console.error(result.error);
      }
    } catch (error) {
      messageBox.innerHTML = "Error submitting form!";
      console.error(error);
    }

    button.innerText = "Submit Admission Form";
    button.disabled = false;
  });
}