interface Branch {
  name: string;
  contact_email: string;
  contact_phone: string;
  location: string;
  specialization: string | null;
  branch_id: string;
  doctor: Doctor;
  is_signed_up: boolean;
  created_at: string;
  updated_at: string;
  recepetionist: Recepetionist;
}

let branches: Branch[] = [];
let totalBranches: number;
let pendingBranches: number;

// With Api
const fetchBranchData = async (): Promise<void> => {
  try {
    const response = await fetch("http://localhost:4000/api/v1/branches"); // Some API
    const branches: Branch[] = await response.json();
    // Update the counters based on the fetched branches
    let completeBranches = branches.filter(
      (branch) =>
        branch.name &&
        branch.location &&
        branch.is_signed_up
    );

    totalBranches = completeBranches.length;
    pendingBranches = branches.length - completeBranches.length;
    // You can add a function to render or use these variables as needed
    renderBranches(completeBranches);
    updateCounters();
  } catch (error) {
    console.error("Error fetching data:", error);
  }
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


// Sample data
// const branches: Branch[] = [
//     { name: "Kabgar Orthopedic Center", contact_email: "orthopedic@kabgar.com", location: "Mekanissa Mikchael", specialization: null, branch_id: "001" },
//     { name: "Kabgar Orthopedic Center", contact_email: "orthopedic@kabgar.com", location: "Mekanissa Mikchael", specialization: "Orthopedic", branch_id: "001" },
//     { name: "Kabagar Pediatrics Center", contact_email: "pediatrics@kabgar.com", location: "6kilo", specialization: "Pediatrics", branch_id: "002" },
//     // Add more sample users as needed
// ];

// With Api
// const fetchBranchData = async (): Promise<void> => {
//     try {
//       const response = await fetch("http://localhost:4000/api/v1/branches"); // Some API
//       const branches: Branch[] = await response.json();
//       // Update the counters based on the fetched branches
//       let completeBranches = branches.filter(branch => branch.name && branch.contact_email && branch.location && branch.specialization );
//       totalBranches = completeBranches.length;
//       pendingBranches = branches.length - completeBranches;
//       // You can add a function to render or use these variables as needed
//       renderBranches(completeBranches);
//       updateCounters();
//     } catch (error) {
//       console.error("Error fetching data:", error);
//     }
// };

// Renders the user table
function renderBranches(branches: Branch[]): void {
  const branchTableBody = document.getElementById(
    "branchTableBody"
  ) as HTMLElement;
  branchTableBody.innerHTML = "";
  branches.forEach((branch, index) => {
    const row = `<tr>
            <td>${branch.name}</td>
            <td>${branch.contact_email}</td>
            <td>${branch.location}</td>
            <td>${branch.specialization}</td>
            <td>
                <button class="btn btn-danger btn-sm" onclick="deleteBranch(${[
                  branch.branch_id,
                  index,
                ]})">Delete</button>
            </td>
        </tr>`;
    branchTableBody.innerHTML += row;
  });
  updateCounters();
}

// Deletes a branch
// function deleteBranch(index:number): void {
//     branches.splice(index, 1)[0];
//     totalBranches--;
//     renderBranches(branches);
// }

// With api

const deleteBranch = async (info: [number, number]): Promise<void> => {
  try {
    await fetch(`http://localhost:4000/api/v1/branches/${info[0]}`, {
      // Check userId or user_id
      method: "DELETE",
    });
    // branches.splice(info[1], 1)[0];
    // totalBranches--;
    // renderBranches(branches);

    fetchBranchData();
  } catch (error) {
    console.error("Error deleting user:", error);
  }
};

// Implements search functionality
function filterBranches(): void {
  const searchValue = (
    document.getElementById("searchInput") as HTMLInputElement
  ).value.toLowerCase();
  const filteredBranches = branches.filter(
    (branch) =>
      branch.name.toLowerCase().startsWith(searchValue) ||
      branch.contact_email.toLowerCase().startsWith(searchValue) ||
      branch.specialization?.toLowerCase().startsWith(searchValue) ||
      branch.location.toLowerCase().startsWith(searchValue)
  );
  renderBranches(filteredBranches);
}

// Updates the counters for total doctors, receptionists, and restricted accounts
function updateCounters(): void {
  (document.getElementById("totalBranches") as HTMLElement).innerText =
    totalBranches.toString();
  (document.getElementById("pendingBranches") as HTMLElement).innerText =
    pendingBranches.toString();
  // (document.getElementById('totalReceptionists') as HTMLElement).innerText = totalReceptionists.toString();
  // (document.getElementById('restrictedAccounts') as HTMLElement).innerText = restrictedAccounts.toString();
}

// Modal Functionalities
function openAddBranchModal(): void {
  (document.getElementById("addBranchModal") as HTMLElement).style.display =
    "block";
}

function closeAddBranchModal(): void {
  (document.getElementById("addBranchModal") as HTMLElement).style.display =
    "none";
}

// function addBranch(event: Event): void {
//     event.preventDefault();
//     const branchName = (document.getElementById('branchName') as HTMLInputElement).value;
//     const branchcontact_email = (document.getElementById('branchcontact_email') as HTMLInputElement).value;
//     const branchId = "5";
//     const branchlocation = (document.getElementById('branchlocation') as HTMLInputElement).value;
//     const branchSpecialization = (document.getElementById('branchSpecialization') as HTMLInputElement).value;

//     const newBranch: Branch = {
//         name: branchName,
//         contact_email: branchcontact_email,
//         location: branchlocation,
//         specialization: branchSpecialization,
//         branch_id: branchId,
//     };

//     branches.push(newBranch);
//     totalBranches++;
//     renderBranches(branches);
//     closeAddBranchModal();
// }

const addBranch = async (event: Event): Promise<void> => {
  event.preventDefault();
  const branchName = (document.getElementById("branchName") as HTMLInputElement)
    .value;
  const branchEmail = (
    document.getElementById("branchEmail") as HTMLInputElement
  ).value;
  const branchLocation = (
    document.getElementById("branchLocation") as HTMLInputElement
  ).value;
  const branchSpecialization = (
    document.getElementById("branchSpecialization") as HTMLInputElement
  ).value;
  const headOfficeId: number = 1;

  // Register the branch
  const branchData = {
    name: branchName,
    contact_email: branchEmail,
    location: branchLocation,
    headoffice_id: headOfficeId,
    specialization: branchSpecialization,
  };

  try {
    const branchResponse = await fetch(
      "http://localhost:4000/api/v1/branches",
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(branchData),
      }
    );

    if (branchResponse.status !== 201) {
      throw new Error("Failed to register branch");
    }

    const confirmation = document.querySelector(".confirmation") as HTMLElement;

    // Add the confirmation message
    confirmation.innerText = "Branch added successfully";
    confirmation.classList.add("alert", "alert-success");
    confirmation.style.backgroundColor = "lightgreen";
    confirmation.style.color = "green";
    pendingBranches++;
    updateCounters();

    // Show the confirmation for a few seconds
    setTimeout(() => {
      confirmation.innerText = "";
      confirmation.classList.remove("alert", "alert-success");
      closeAddBranchModal();
    }, 3000); // 3000ms = 3 seconds
  } catch (error) {
    console.error("Error adding user:", error);
  }
};

// Initial rendering of users
document.addEventListener("DOMContentLoaded", () => {
  fetchBranchData();
});
