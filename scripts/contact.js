const contactForm = document.getElementById("contactForm");

if(contactForm){

  // Message box create
  const messageBox = document.createElement("div");
  messageBox.style.marginTop = "15px";
  contactForm.appendChild(messageBox);

  contactForm.addEventListener("submit", async function(e){
    e.preventDefault();

    messageBox.innerHTML = "";
    messageBox.style.color = "red";

    const name = document.getElementById("name");
    const email = document.getElementById("email");
    const phone = document.getElementById("phone");
    const message = document.getElementById("message");

    let isValid = true;

    // Reset borders
    [name, email, phone, message].forEach(input => input.style.border = "1px solid #ccc");

    // Required validation
    if(!name.value.trim()){ name.style.border = "2px solid red"; isValid=false; }
    if(!email.value.trim()){ email.style.border = "2px solid red"; isValid=false; }
    if(!message.value.trim()){ message.style.border = "2px solid red"; isValid=false; }

    // Email format
    if(email.value && !/^\S+@\S+\.\S+$/.test(email.value)){
      email.style.border = "2px solid red";
      messageBox.innerHTML = "Enter valid email address";
      return;
    }

    // Phone validation (optional but must be 10 digits)
    if(phone.value && !/^[0-9]{10}$/.test(phone.value)){
      phone.style.border = "2px solid red";
      messageBox.innerHTML = "Phone number must be 10 digits";
      return;
    }

    if(!isValid){
      messageBox.innerHTML = "Please fill all required fields correctly!";
      return;
    }

    // BUTTON LOADING
    const button = contactForm.querySelector("button");
    button.innerText = "Sending...";
    button.disabled = true;

    // Form data keys lowercase to match Apps Script
    const formData = {
      name: name.value.trim(),
      email: email.value.trim(),
      phone: phone.value.trim(),
      message: message.value.trim()
    };

    // Replace with your deployed Web App URL
    const url = "https://script.google.com/macros/s/AKfycbwo8CItviX4Kct9P4V3pCKQZi6PRYlx2fxX8k7Xv3uyorMAke3UOsXeQtvHKcdXRbZW/exec";

    try {
      const response = await fetch(url, {
        method: "POST",
        mode: "cors", // important for CORS
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(formData)
      });

      if(!response.ok){
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const result = await response.json();

      if(result.result === "success"){
        messageBox.style.color = "green";
        messageBox.innerHTML = "Message sent successfully!";
        contactForm.reset();
      } else {
        messageBox.style.color = "red";
        messageBox.innerHTML = "Failed to send message!";
        console.error(result.error);
      }

    } catch (error) {
      messageBox.style.color = "red";
      messageBox.innerHTML = "Error sending message!";
      console.error(error);
    }

    // RESET BUTTON
    button.innerText = "Send Message";
    button.disabled = false;

  });
}