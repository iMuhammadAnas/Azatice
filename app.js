const themeToggle = document.getElementById("themeToggle");
const body = document.body;
const navbar = document.querySelector(".navbar");
const heroSvg = document.querySelector(".hero-right");
const logo = document.querySelector(".main-logo"); // Get the logo image
const navLinks = document.querySelectorAll(".navbar ul li a"); // Get all nav links
const reachLinks = document.querySelectorAll(".reach-icon-box a"); // Get all nav links

themeToggle.addEventListener("click", () => {
  body.classList.toggle("dark-theme");
  updateNavbarTheme(); // Call the function to update navbar theme

  // Rest of code...
});

function updateNavbarTheme() {
  if (body.classList.contains("dark-theme")) {
    logo.style.filter = "invert(100%)"; // Invert logo color for dark theme
    heroSvg.classList.toggle("dark-Svg")
    navbar.classList.remove("light-theme");
    navbar.classList.add("dark-theme");
    navLinks.forEach(link => {
      link.style.color = "white"; // Set anchor tag color to white
    });
    reachLinks.forEach(link => {
      link.style.color = "white"; // Set anchor tag color to white
    });
  } else {
    logo.style.filter = "none"; // Reset logo color for light theme
    navbar.classList.remove("dark-theme");
    heroSvg.classList.remove("dark-Svg")
    navbar.classList.add("light-theme");
    navLinks.forEach(link => {
      link.style.color = "black"; // Set anchor tag color to black
    });
    reachLinks.forEach(link => {
      link.style.color = "black"; // Set anchor tag color to black
    });
  }
}

// Call the updateNavbarTheme function on page load
updateNavbarTheme();

document.addEventListener("DOMContentLoaded", function () {
  const contactForm = document.getElementById("contact-form");

  contactForm.addEventListener("submit", function (event) {
    event.preventDefault();

    const nameInput = document.getElementById("name");
    const emailInput = document.getElementById("email");
    const messageInput = document.getElementById("message");

    const name = nameInput.value.trim();
    const email = emailInput.value.trim();
    const message = messageInput.value.trim();

    if (name === "" || email === "" || message === "") {
      alert("Please fill in all fields.");
      return;
    }

    if (!validateEmail(email)) {
      alert("Please enter a valid email address.");
      return;
    }

    const data = {
      subject: "Contact Form Submission",
      name,
      email,
      message,
      x_to: "anasnaseem420@gmail.com",
    };

    // Send POST request to the API
    fetch("https://api.upto.site/ovi/general-email", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })
      .then((data) => {
        if (data.status == 200) {
          alert("Message sent successfully!");
          contactForm.reset();
        } else {
          alert("Message sending failed. Please try again.");
        }
      })
      .catch((error) => {
        console.error("Error sending message:", error);
        alert("An error occurred while sending the message.");
        contactForm.reset();
      });

  });

  function validateEmail(email) {
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailPattern.test(email);
  }
});

