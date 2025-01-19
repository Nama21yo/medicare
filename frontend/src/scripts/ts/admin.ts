// Check for JWT token on load
const checkJwtToken = (): void => {
  const jwtToken =
    localStorage.getItem("jwtToken") || sessionStorage.getItem("jwtToken");
  if (!jwtToken) {
    window.location.href = "http://127.0.0.1:5500/frontend/src/index.html";
  }
};

// Call the checkJwtToken function on load
checkJwtToken();
// Define User interface
interface User {
  username: string;
  user_id: number;
  name: string;
  email: string;
  accountStatus: string;
  role: { name: string };
}

// Sample data (initially empty)
let employees: User[] = [];
let totalDoctors: number = 0;
let totalReceptionists: number = 0;

// Fetch data from the API
const fetchEmployeesData = async (): Promise<void> => {
  try {
    const response = await fetch("http://localhost:4000/api/v1/users");
    const users: User[] = await response.json();

    // Filter users to show only Receptionists and Doctors
    employees = users.filter(
      (user) => user.role.name === "Receptionist" || user.role.name === "Doctor"
    );

    // Update the counters based on the fetched users
    totalDoctors = employees.filter(
      (user) => user.role.name === "Doctor"
    ).length;
    totalReceptionists = employees.filter(
      (user) => user.role.name === "Receptionist"
    ).length;

    // Render the filtered employees
    renderEmployees(employees);
  } catch (error) {
    console.error("Error fetching data:", error);
  }
};

// Render employees
const renderEmployees = (employees: User[]): void => {
  const userTableBody = document.getElementById(
    "userTableBody"
  ) as HTMLTableSectionElement;
  userTableBody.innerHTML = "";

  employees.forEach((user, index) => {
    const row = `
      <tr>
        <td>${user.username}</td>
        <td>${user.email}</td>
        <td>${user.user_id}</td>
        <td>${user.role.name}</td>
        <td>
          <button class="btn btn-danger btn-sm" onclick="deleteEmployee(${index})">Delete</button>
        </td>
      </tr>`;
    userTableBody.innerHTML += row;
  });

  updateEmployeeCounters();
};

// Print table
// Function to print the employee table
const printTable = (): void => {
  const printContent = document.getElementById("userTable")?.outerHTML;
  const originalContent = document.body.innerHTML;

  if (printContent) {
    document.body.innerHTML = `
      <html>
        <head>
          <title>Print Table</title>
          <link href="https://maxcdn.bootstrapcdn.com/bootstrap/4.5.2/css/bootstrap.min.css" rel="stylesheet">
        </head>
        <body>${printContent}</body>
      </html>
    `;
    window.print();
    document.body.innerHTML = originalContent;
  }
};

// Delete User
const deleteEmployee = async (index: number): Promise<void> => {
  const userToBeDeleted = employees[index];

  if (!userToBeDeleted) {
    return;
  }

  try {
    const response = await fetch(
      `http://localhost:4000/api/v1/users/${userToBeDeleted.user_id}`,
      {
        method: "DELETE",
      }
    );

    if (!response.ok) {
      throw new Error(`Failed to delete user: ${response.statusText}`);
    }

    if (userToBeDeleted.role.name === "Doctor") {
      totalDoctors--;
    } else if (userToBeDeleted.role.name === "Receptionist") {
      totalReceptionists--;
    }

    employees.splice(index, 1);
    renderEmployees(employees);
  } catch (error) {
    console.log(error);
  }
};

// Filter employees
function filterEmployees(): void {
  const searchValue = (
    document.getElementById("searchInput") as HTMLInputElement
  ).value.toLowerCase();

  const filteredUsers = employees.filter(
    (user) =>
      user.username.toLowerCase().startsWith(searchValue) ||
      user.email.toLowerCase().startsWith(searchValue) ||
      user.role.name.toLowerCase().startsWith(searchValue)
  );

  renderEmployees(filteredUsers);
}

// Update counters
function updateEmployeeCounters(): void {
  (document.getElementById("totalDoctors") as HTMLElement).innerText =
    totalDoctors.toString();
  (document.getElementById("totalReceptionists") as HTMLElement).innerText =
    totalReceptionists.toString();
}

// Modal Functionalities
function openAddEmployeeModal(): void {
  (document.getElementById("addEmployeeModal") as HTMLElement).style.display =
    "block";
}

function closeAddEmployeeModal(): void {
  (document.getElementById("addEmployeeModal") as HTMLElement).style.display =
    "none";
}

const addEmployee = async (event: Event): Promise<void> => {
  event.preventDefault();

  const token = localStorage.getItem("jwtToken");
  if (!token) {
    console.error("No token found in local storage");
    return;
  }

  const base64Payload = token.split(".")[1];
  const payload = JSON.parse(atob(base64Payload));
  const branchId = payload.branch_id;

  const employeeName = (document.getElementById("employeeName") as HTMLInputElement)
    .value;
  const employeeRole = (document.getElementById("employeeRole") as HTMLInputElement)
    .value;
  const employeeEmail = (document.getElementById("employeeEmail") as HTMLInputElement)
    .value;

  const employeeData = {
    name: employeeName,
    role: employeeRole,
    email: employeeEmail,
    branch_id: branchId,
  };

  if (employeeRole === "4") {
    try {
      const employeeResponse = await fetch("http://localhost:4000/api/v1/doctors", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(employeeData),
      });
  
      if (employeeResponse.status !== 201) {
        throw new Error("Failed to register employee");
      }
  
      const employee = await employeeResponse.json();
  
      const confirmation = document.querySelector(".confirmation") as HTMLElement;
      confirmation.innerText = "Employee added successfully";
      confirmation.classList.add("alert", "alert-success");
      confirmation.style.backgroundColor = "lightgreen";
      confirmation.style.color = "green";
  
      // Show the confirmation for a few seconds
      setTimeout(() => {
        confirmation.innerText = "";
        confirmation.classList.remove("alert", "alert-success");
        closeAddEmployeeModal();
      }, 3000); // 3000ms = 3 seconds
    } catch (error) {
      console.error("Error adding employee:", error);
    }

  }
  else {
    try {
      const employeeResponse = await fetch("http://localhost:4000/api/v1/receptionists", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(employeeData),
      });
  
      if (employeeResponse.status !== 201) {
        throw new Error("Failed to register employee");
      }
  
      const employee = await employeeResponse.json();
  
      const confirmation = document.querySelector(".confirmation") as HTMLElement;
      confirmation.innerText = "Employee added successfully";
      confirmation.classList.add("alert", "alert-success");
      confirmation.style.backgroundColor = "lightgreen";
      confirmation.style.color = "green";
  
      // Show the confirmation for a few seconds
      setTimeout(() => {
        confirmation.innerText = "";
        confirmation.classList.remove("alert", "alert-success");
        closeAddEmployeeModal();
      }, 3000); // 3000ms = 3 seconds
    } catch (error) {
      console.error("Error adding employee:", error);
    }
  }

  
};


// Logs out the user by clearing the JWT and redirecting to the login page
function logoutUser(): void {
  localStorage.removeItem("jwtToken");
  sessionStorage.removeItem("jwtToken");

  window.location.href = "http://127.0.0.1:5500/frontend/src/index.html";
}
// Attach the logout function to the logout button
document.getElementById("logout")?.addEventListener("click", logoutUser);

// Call the function to fetch and render employees on page load
fetchEmployeesData();
