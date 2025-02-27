// Grab the elements from the DOM and ensure they're properly typed
const loginForm = document.getElementById("login") as HTMLFormElement | null;
const signupForm = document.getElementById("signup") as HTMLFormElement | null;
const toggleButton = document.getElementById("btn") as HTMLDivElement | null;
const loginButton = document.querySelector(
  '.toggle-btn[onclick="login()"]'
) as HTMLButtonElement | null;
const signupButton = document.querySelector(
  '.toggle-btn[onclick="signup()"]'
) as HTMLButtonElement | null;

// Check if the elements exist before proceeding
if (
  !loginForm ||
  !signupForm ||
  !toggleButton ||
  !loginButton ||
  !signupButton
) {
  console.error(
    "One or more DOM elements are missing. Please check your HTML structure."
  );
} else {
  // Function to handle the signup form display
  const signup = (): void => {
    loginForm.style.left = "-400px";
    signupForm.style.left = "50px";
    toggleButton.style.left = "110px";

    loginButton.classList.remove("active");
    signupButton.classList.add("active");
  };

  // Function to handle the login form display
  const login = (): void => {
    loginForm.style.left = "50px";
    signupForm.style.left = "450px";
    toggleButton.style.left = "0px";

    signupButton.classList.remove("active");
    loginButton.classList.add("active");
  };

  // Attach functions to the global scope for button actions
  (window as any).signup = signup;
  (window as any).login = login;

  // Login Functionality
  const handleLogin = async (event: Event): Promise<void> => {
    event.preventDefault();

    const form = event.target as HTMLFormElement;
    const role = (form.role as HTMLInputElement).value;
    const email = (form.email as HTMLInputElement).value;
    const password = (form.password as HTMLInputElement).value;

    const loginData = { email, password, role };

    try {
      const response = await fetch("http://localhost:4000/api/v1/users/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(loginData),
      });

      if (!response.ok) throw new Error("Login failed");

      //if (!response.ok) throw new Error("Login failed");

      const { token, user } = await response.json();
      // Store the JWT token
      localStorage.setItem("jwtToken", token);
      localStorage.setItem("profileData", JSON.stringify(user));

      const roleId = parseInt(role); // Update roleId based on login response
      // Navigate based on roleId
      switch (roleId) {
        case 1:
          window.location.href = "/headoffice";
          break;
        case 2:
          window.location.href =
            "http://127.0.0.1:5500/frontend/src/admin.html";
          break;
        case 3:
          window.location.href = "/patient";
          break;
        case 4:
          // Updated navigation for doctor role
          window.location.href =
            "http://127.0.0.1:5500/frontend/src/doctor_queue.html";
          break;
        case 5:
          // Updated navigation for receptionist role
          window.location.href =
            "http://127.0.0.1:5500/frontend/src/receptionist_queue.html";
          break;
        default:
          window.location.href =
            "http://127.0.0.1:5500/frontend/src/doctor_queue.html";
      }
    } catch (error: unknown) {
      if (error instanceof Error) {
        alert(error.message);
      }
    }
  };

  // Signup Functionality
  // const handleSignup = async (event: Event): Promise<void> => {
  //   event.preventDefault();

  //   const form = event.target as HTMLFormElement;
  //   const username = (form.name as HTMLInputElement).value;
  //   const roleId = parseInt((form.role as HTMLInputElement).value, 10); // Role ID as a number
  //   const email = (form.email as HTMLInputElement).value;
  //   const password = (form.password as HTMLInputElement).value;
  //   const confirmPassword = (form.confirmPassword as HTMLInputElement).value;

  //   if (password !== confirmPassword) {
  //     alert("Passwords do not match");
  //     return;
  //   }

  //   const userData = { email, username, password, roleId };

  //   try {
  //     const response = await fetch(
  //       "http://localhost:4000/api/v1/users/register",
  //       {
  //         method: "POST",
  //         headers: { "Content-Type": "application/json" },
  //         body: JSON.stringify(userData),
  //       }
  //     );

  //     if (!response.ok) throw new Error("Signup failed");

  //     const { token } = await response.json();
  //     // Store the JWT token
  //     localStorage.setItem("jwtToken", token);

  //     // Navigate based on roleId
  //     switch (roleId) {
  //       case 1:
  //         window.location.href = "/headoffice";
  //         break;
  //       case 2:
  //         window.location.href =
  //           "http://127.0.0.1:5500/frontend/src/admin.html";
  //         break;
  //       case 3:
  //         window.location.href = "/patient";
  //         break;
  //       case 4:
  //         // Updated navigation for doctor role
  //         window.location.href =
  //           "http://127.0.0.1:5500/frontend/src/doctor_queue.html";
  //         break;
  //       case 5:
  //         // Updated navigation for receptionist role
  //         window.location.href =
  //           "http://127.0.0.1:5500/frontend/src/receptionist_queue.html";
  //         break;
  //       default:
  //         window.location.href =
  //           "http://127.0.0.1:5500/frontend/src/doctor_queue.html";
  //     }

  //     login(); // Switch to signup form view
  //   } catch (error: unknown) {
  //     if (error instanceof Error) {
  //       alert(error.message);
  //     }
  //   }
  // };
  // Signup Functionality
  const handleSignup = async (event: Event): Promise<void> => {
    event.preventDefault();

    const form = event.target as HTMLFormElement;
    const name = (form.username as HTMLInputElement).value;
    const email = (form.email as HTMLInputElement).value;
    const password = (form.password as HTMLInputElement).value;
    const confirmPassword = (form.confirmPassword as HTMLInputElement).value;
    const roleId = parseInt((form.role as HTMLInputElement).value, 10);

    if (password !== confirmPassword) {
      alert("Passwords do not match");
      return;
    }

    // Collect role-specific fields
    let additionalData: any = {};
    if (roleId === 2) {
      // Branch role
      additionalData.location = (form.location as HTMLInputElement).value;
    }
    if (roleId === 2 || roleId === 4) {
      // Doctor role
      additionalData.specialization = (
        form.specialization as HTMLInputElement
      ).value;
    }

    // Construct user data
    let userData = { name, password, ...additionalData };
    const doctorData = {
      name,
      password,
      speciality: additionalData.specialization,
    };
    const branchData = { name, password, location: additionalData.location };
    const patientData = { name, password, email };
    console.log("additional data", additionalData);

    console.log("registered data", userData);

    try {
      // Define the appropriate route for signup based on the role
      let endpoint = "http://localhost:4000/api/v1/users/register"; // Default route
      if (roleId === 2) {
        endpoint = `http://localhost:4000/api/v1/users/branches/signup/${email}`;
        userData = branchData;
      } else if (roleId == 3) {
        endpoint = `http://localhost:4000/api/v1/users/patients/signup/${email}`;
        userData = patientData;
      } else if (roleId === 4) {
        endpoint = `http://localhost:4000/api/v1/users/doctors/signup/${email}`;
        userData = doctorData;
      } else if (roleId === 5) {
        endpoint = `http://localhost:4000/api/v1/users/receptionists/signup/${email}`;
      }

      const response = await fetch(endpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(userData),
      });

      alert("Registered Successfully");

      // if (!response) throw new Error("Signup failed");

      const { token, user } = await response.json();

      // Store the JWT token
      localStorage.setItem("jwtToken", token);
      const userId = user.id;
      // localStorage.setItem(`profileData_${userId}`, JSON.stringify(user));

      // Navigate based on roleId
      switch (roleId) {
        case 1:
          window.location.href = "/headoffice";
          break;
        case 2:
          window.location.href =
            "http://127.0.0.1:5500/frontend/src/admin.html";
          break;
        case 3:
          window.location.href =
            "http://127.0.0.1:5500/frontend/src/patient.html";
          break;
        case 4:
          window.location.href =
            "http://127.0.0.1:5500/frontend/src/doctor_queue.html";
          break;
        case 5:
          window.location.href =
            "http://127.0.0.1:5500/frontend/src/receptionist_queue.html";
          break;
        default:
          window.location.href = "/";
      }
    } catch (error: unknown) {
      if (error instanceof Error) {
        alert(error.message);
      }
    }
  };

  // Attach event listeners for form submissions
  loginForm.addEventListener("submit", handleLogin);
  signupForm.addEventListener("submit", handleSignup);
}
