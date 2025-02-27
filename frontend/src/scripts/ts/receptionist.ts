// Interfaces for the Patient and Doctor Models
interface Patient {
  patient_id: number;
  first_name: string;
  last_name: string;
  email: string;
  phone_number: string;
  date_of_birth: string;
  gender: string;
  address: string;
  created_at: string;
  updated_at: string;
}

interface Doctor {
  user_id: number;
  username: string;
  email: string;
  password: string;
  created_at: string;
  updated_at: string;
}

interface Recepetionist {
  user_id: number;
  username: string;
  email: string;
  password: string;
  created_at: string;
  updated_at: string;
}

interface Queue {
  status: number; // 1 - Not Pending, 2 - Pending, 3 - Resolved Pending
  patient: Patient;
  doctor: Doctor;
  queue_id: number;
  created_at: string;
  updated_at: string;
}

// Global array for users
let users: Queue[] = [];
let activeEntries = 0;
let pendingEntries = 0;

// Fetch data from the API
const fetchData = async (): Promise<void> => {
  try {
    const response = await fetch("http://localhost:4000/api/v1/queues");
    const data: Queue[] = await response.json();
    users = data;
    activeEntries = users.length;
    pendingEntries = users.filter((user) => user.status === 2).length;
    renderUsers(users);
  } catch (error) {
    console.error("Error fetching data:", error);
  }
};

// Render the users in the table
const renderUsers = (users: Queue[]): void => {
  const userTableBody = document.getElementById(
    "userTableBody"
  ) as HTMLTableSectionElement;
  userTableBody.innerHTML = "";

  users.forEach((user, index) => {
    const rowClass =
      user.status === 2 ? "pending" : user.status === 3 ? "resolved" : "";
    const resolveButtonDisabled = user.status !== 2;
    const row = `
        <tr class="${rowClass}">
          <td>${user.patient.first_name} ${user.patient.last_name}</td>
          <td>${new Date(user.created_at).toLocaleString()}</td>
          <td>${
                user.status === 1
                  ? "Not Pending"
                  : user.status === 2
                  ? "Pending"
                  : "Resolved Pending"}
          </td>
          <td>
            <button class="btn btn-sm" style="color: white;" onclick="resolvePendingUser(${index})" ${
      resolveButtonDisabled ? "disabled" : ""
    }>Resolve Pending</button>
            <button class="btn btn-sm" style="background-color: red;" onclick="deleteUser(${index})">Delete</button>
          </td>
        </tr>`;
    userTableBody.innerHTML += row;
  });

  updateCounters();
};

// Update counters for active and pending entries
const updateCounters = (): void => {
  document.getElementById("activeEntries")!.innerText =
    activeEntries.toString();
  document.getElementById("pendingEntries")!.innerText =
    pendingEntries.toString();
};

// Resolve pending user
const resolvePendingUser = async (index: number): Promise<void> => {
  const user = users[index];
  if (user.status === 2) {
    user.status = 3;
    try {
      await fetch(`http://localhost:4000/api/v1/queues/${user.queue_id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status: 3 }),
      });
      pendingEntries--;
      renderUsers(users);
    } catch (error) {
      console.error("Error resolving user:", error);
    }
  }
};

// Delete user from the queue
const deleteUser = async (index: number): Promise<void> => {
  const user = users[index];
  if (user.status === 2) {
    pendingEntries--;
  }
  try {
    await fetch(`http://localhost:4000/api/v1/queues/${user.queue_id}`, {
      method: "DELETE",
    });
    users.splice(index, 1);
    activeEntries--;
    renderUsers(users);
  } catch (error) {
    console.error("Error deleting user:", error);
  }
};

// Add a new user to the queue
const addUser = async (event: Event): Promise<void> => {
  event.preventDefault();

  const token = localStorage.getItem("jwtToken");
  if (!token) {
    console.error("No token found in local storage");
    return;
  }

  const base64Payload = token.split(".")[1];
  const payload = JSON.parse(atob(base64Payload));
  const registeredById = payload.user_id;

  const firstName = (document.getElementById("firstName") as HTMLInputElement)
    .value;
  const lastName = (document.getElementById("lastName") as HTMLInputElement)
    .value;
  const email = (document.getElementById("email") as HTMLInputElement).value;
  const phoneNumber = (
    document.getElementById("phoneNumber") as HTMLInputElement
  ).value;
  const dob = (document.getElementById("dob") as HTMLInputElement).value;
  const gender = (document.getElementById("gender") as HTMLSelectElement).value;
  const address = (document.getElementById("address") as HTMLInputElement)
    .value;
  const doctorId = parseInt(
    (document.getElementById("doctorId") as HTMLSelectElement).value
  );

  const patientData = {
    first_name: firstName,
    last_name: lastName,
    email: email,
    phone_number: phoneNumber,
    date_of_birth: dob,
    gender: gender,
    address: address,
    registered_by_id: registeredById,
  };

  try {
    const patientResponse = await fetch(
      "http://localhost:4000/api/v1/patients",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(patientData),
      }
    );

    if (patientResponse.status !== 201) {
      throw new Error("Failed to register patient");
    }

    const patient = await patientResponse.json();

    const queueData = {
      patient_id: patient.patient_id,
      doctor_id: doctorId,
      status: 1,
    };

    const queueResponse = await fetch("http://localhost:4000/api/v1/queues", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(queueData),
    });

    if (queueResponse.status !== 201) {
      throw new Error("Failed to add patient to queue");
    }

    const queueEntry: Queue = await queueResponse.json();
    users.push(queueEntry);
    activeEntries++;
    renderUsers(users);
    closeAddUserModal();
  } catch (error) {
    console.error("Error adding user:", error);
  }
};

// Search and filter users
const filterUsers = (): void => {
  const searchValue = (
    document.getElementById("searchInput") as HTMLInputElement
  ).value.toLowerCase();

  const filteredUsers = users.filter((user) => {
    return (
      user.patient.first_name.toLowerCase().startsWith(searchValue) ||
      user.patient.last_name.toLowerCase().startsWith(searchValue) ||
      new Date(user.created_at)
        .toLocaleString()
        .toLowerCase()
        .startsWith(searchValue) ||
      (user.status === 1
        ? "Not Pending"
        : user.status === 2
        ? "Pending"
        : "Resolved Pending"
      )
        .toLowerCase()
        .startsWith(searchValue)
    );
  });
  renderUsers(filteredUsers);
};

// Search users in Database

const searchUsers = async (): Promise<void> => {
  const searchValue = (
    document.getElementById("searchDatabase") as HTMLInputElement
  ).value.toLowerCase();
  let patients: Patient[]; 

  try {
    const response = await fetch("http://localhost:4000/api/v1/patients");
    const data: Patient[] = await response.json();
    patients = data;

    // Filter users based on search value
    const filteredUsers = patients.filter(patient => 
      patient.first_name.toLowerCase().includes(searchValue) ||
      patient.email.toLowerCase().includes(searchValue) ||
      patient.phone_number.includes(searchValue)
    );

    renderResults(filteredUsers);

  } catch (error) {
    console.error("Error fetching data:", error);
  }
}

const renderResults = (filteredUsers: Patient[]) => {
  const resultsContainer = document.getElementById("results") as HTMLElement;
  resultsContainer.innerHTML = "";

  filteredUsers.forEach(user => {
    const listItem = document.createElement("li");
    listItem.className = "list-group-item d-flex justify-content-between align-items-center";
    listItem.innerHTML = `
      <div>
        <strong>Name:</strong> ${user.first_name + " " + user.last_name}<br>
        <strong>Email:</strong> ${user.email}<br>
        <strong>Phone:</strong> ${user.phone_number}
      </div>
      <button class="btn btn-primary" onClick=addToQueue(${user.patient_id})>Add to Queue</button>
    `;
    resultsContainer.appendChild(listItem);
  });
}

const addToQueue = async (patient_id: number): Promise<void> => {
  const token = localStorage.getItem("jwtToken");
  if (!token) {
    console.error("No token found in local storage");
    return;
  }

  const base64Payload = token.split(".")[1];
  const payload = JSON.parse(atob(base64Payload));
  const doctorId = payload.user_id;

  const queueData = {
    patient_id: patient_id,
    doctor_id: doctorId,
    status: 1,
  };

  try {
    const queueResponse = await fetch("http://localhost:4000/api/v1/queues", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(queueData),
    });

    if (queueResponse.status !== 201) {
      throw new Error("Failed to add patient to queue");
    }

    const queueEntry: Queue = await queueResponse.json();
    users.push(queueEntry);
    activeEntries++;
    renderUsers(users);

    (document.getElementById("searchDatabase") as HTMLInputElement).value = ""; 
    document.getElementById("results")!.innerHTML = "";

  } catch (error) {
    console.error("Error adding user to queue:", error);
  }
};


// Modal functions
const openAddUserModal = (): void => {
  document.getElementById("addUserModal")!.style.display = "block";
};

const closeAddUserModal = (): void => {
  document.getElementById("addUserModal")!.style.display = "none";
};

// Initialize the page by fetching users
document.addEventListener("DOMContentLoaded", () => {
  fetchData();
});
