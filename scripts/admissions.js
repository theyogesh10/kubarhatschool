const admissionForm = document.getElementById("admissionForm");

if (admissionForm) {
  const messageBox = document.createElement("div");
  messageBox.style.marginTop = "15px";
  admissionForm.appendChild(messageBox);

  admissionForm.addEventListener("submit", async function (e) {
    e.preventDefault();
    messageBox.innerHTML = "";
    messageBox.style.color = "red";

    const formData = {};
    const inputs = admissionForm.querySelectorAll("input, select");
    let isValid = true;

    inputs.forEach(input => {
      formData[input.name] = input.value.trim();
      input.style.border = "1px solid #ccc";

      if (input.hasAttribute("required") && !input.value.trim()) {
        input.style.border = "2px solid red";
        isValid = false;
      }
    });

    // Mobile validation
    const mobile = formData["MobileNumber"];
    if (!/^[0-9]{10}$/.test(mobile)) {
      document.getElementById("MobileNumber").style.border = "2px solid red";
      messageBox.innerHTML = "Enter valid 10-digit Mobile Number";
      return;
    }

    const altMobile = formData["AlternateContactNumber"];
    if (altMobile && !/^[0-9]{10}$/.test(altMobile)) {
      document.getElementById("AlternateContactNumber").style.border = "2px solid red";
      messageBox.innerHTML = "Alternate number must be 10 digits";
      return;
    }

    // Email validation
    const email = formData["StudentEmailID"];
    if (email && !/^\S+@\S+\.\S+$/.test(email)) {
      document.getElementById("StudentEmailID").style.border = "2px solid red";
      messageBox.innerHTML = "Enter valid Email";
      return;
    }

    // Marks validation
    const marks = formData["PreviousClassMarks"];
    if (marks && (marks < 0 || marks > 100)) {
      document.getElementById("PreviousClassMarks").style.border = "2px solid red";
      messageBox.innerHTML = "Marks must be between 0 and 100";
      return;
    }

    if (!isValid) {
      messageBox.innerHTML = "Please fill all required fields correctly!";
      return;
    }

    const button = admissionForm.querySelector("button");
    button.innerText = "Submitting...";
    button.disabled = true;

    const url="https://script.google.com/macros/s/AKfycbxreHR9Jje6EwiCtWKreK3duT1Ie8WxzNHota-TuDkGU_dWhoxGoj606lToO1zwauLG/exec";
    try {
      const response = await fetch(url, {
        method: "POST",
        mode: "cors",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData)
      });

      const result = await response.json();

      if (result.result === "success") {
        messageBox.style.color = "green";
        messageBox.innerHTML = "Admission submitted successfully!";
        admissionForm.reset();
      } else {
        messageBox.style.color = "red";
        messageBox.innerHTML = "Submission failed! Try again.";
        console.error(result.error);
      }
    } catch (error) {
      messageBox.style.color = "red";
      messageBox.innerHTML = "Error submitting form!";
      console.error(error);
    }

    button.innerText = "Submit Admission Form";
    button.disabled = false;
  });
}