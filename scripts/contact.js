const contactForm = document.getElementById("contactForm");

if (contactForm) {

  const messageBox = document.createElement("div");
  messageBox.style.marginTop = "15px";
  contactForm.appendChild(messageBox);

  contactForm.addEventListener("submit", async function (e) {
    e.preventDefault();

    messageBox.innerHTML = "";
    messageBox.style.color = "red";

    const name = document.getElementById("name");
    const email = document.getElementById("email");
    const phone = document.getElementById("phone");
    const message = document.getElementById("message");

    let isValid = true;

    // Reset borders
    [name, email, phone, message].forEach(input => {
      input.style.border = "1px solid #ccc";
    });

    // Required validation
    if (!name.value.trim()) { name.style.border = "2px solid red"; isValid = false; }
    if (!email.value.trim()) { email.style.border = "2px solid red"; isValid = false; }
    if (!message.value.trim()) { message.style.border = "2px solid red"; isValid = false; }

    // Email validation
    if (email.value && !/^\S+@\S+\.\S+$/.test(email.value)) {
      email.style.border = "2px solid red";
      messageBox.innerHTML = "Enter valid email";
      return;
    }

    // Phone validation
    if (phone.value && !/^[0-9]{10}$/.test(phone.value)) {
      phone.style.border = "2px solid red";
      messageBox.innerHTML = "Phone must be 10 digits";
      return;
    }

    if (!isValid) {
      messageBox.innerHTML = "Please fill required fields correctly!";
      return;
    }

    const button = contactForm.querySelector("button");
    button.innerText = "Sending...";
    button.disabled = true;

    // Prepare payload
    const payload = new URLSearchParams({
      name: name.value.trim(),
      email: email.value.trim(),
      phone: phone.value.trim(),
      message: message.value.trim()
    });

    const url = "https://script.google.com/macros/s/AKfycbygfKtiP1-t-Pbl-5kKzufJsvOSIsYIBE8olO1COgm-M3RAXMYH2vwb_DjqQeHx_NNu/exec";

    try {
      const response = await fetch(url, {
        method: "POST",
        body: payload
      });

      const result = await response.json();

      if (result.result === "success") {
        messageBox.style.color = "green";
        messageBox.innerHTML = "Message sent successfully!";
        contactForm.reset();
      } else {
        messageBox.innerHTML = "Failed to send message!";
        console.error(result.error);
      }

    } catch (error) {
      messageBox.innerHTML = "Error sending message!";
      console.error(error);
    }

    button.innerText = "Send Message";
    button.disabled = false;
  });
}