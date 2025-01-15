interface Branch {
    name: string;
    email: string;
    address: string;
    specialization: string | null;
    branch_id: string;
    // doctor: Doctor;
    // recepetionist: Recepetionist;
}

// Sample data
const branches: Branch[] = [
    { name: "Kabgar Orthopedic Center", email: "orthopedic@kabgar.com", address: "Mekanissa Mikchael", specialization: null, branch_id: "001" },
    { name: "Kabgar Orthopedic Center", email: "orthopedic@kabgar.com", address: "Mekanissa Mikchael", specialization: "Orthopedic", branch_id: "001" },
    { name: "Kabagar Pediatrics Center", email: "pediatrics@kabgar.com", address: "6kilo", specialization: "Pediatrics", branch_id: "002" },
    // Add more sample users as needed
];

let totalBranches: number = branches.filter((branch) => branch.name && branch.address && branch.specialization && branch.email).length;
let pendingBranches: number = branches.filter((branch) => !(branch.name && branch.address && branch.specialization && branch.email)).length;

// With Api
// const fetchBranchData = async (): Promise<void> => {
//     try {
//       const response = await fetch("http://localhost:4000/api/v1/branches"); // Some API
//       const branches: Branch[] = await response.json();
//       // Update the counters based on the fetched branches
//       let completeBranches = branches.filter(branch => branch.name && branch.email && branch.address && branch.specialization );
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
    const branchTableBody = document.getElementById('branchTableBody') as HTMLElement;
    branchTableBody.innerHTML = '';
    branches.forEach((branch, index) => {
        if(branch.name && branch.address && branch.specialization && branch.email) {
            const row = `<tr>
                <td>${branch.name}</td>
                <td>${branch.email}</td>
                <td>${branch.address}</td>
                <td>${branch.specialization}</td>
                <td>

                    <button class="btn btn-danger btn-sm" onclick="deleteBranch(${index})">Delete</button>
                </td>
            </tr>`;
            branchTableBody.innerHTML += row;
        }
    });
//     });            const row = `<tr>
//     <td>${branch.name}</td>
//     <td>${branch.email}</td>
//     <td>${branch.address}</td>
//     <td>${branch.specialization}</td>
//     <td>
    

//         <button class="btn btn-danger btn-sm" onclick="deleteBranch(${index})">Delete</button>
//     </td>
// </tr>`;
// branchTableBody.innerHTML += row;
    updateCounters();
}

// Deletes a branch
function deleteBranch(index:number): void {
    branches.splice(index, 1)[0];
    totalBranches--;
    renderBranches(branches);
}

// With api

// const deleteBranch = async (info:[number, string]): Promise<void> => {  
//     try {
//       await fetch(`http://localhost:4000/api/v1/branches/${info[1]}`, {  // Check userId or user_id
//         method: "DELETE",
//       });
//       fetchBranchData();
  
//     } catch (error) {
//       console.error("Error deleting user:", error);
//     }
// };

// Implements search functionality
function filterBranches(): void {
    const searchValue = (document.getElementById('searchInput') as HTMLInputElement).value.toLowerCase();
    const filteredBranches = branches.filter(branch => 
        branch.name.toLowerCase().startsWith(searchValue) || 
        branch.email.toLowerCase().startsWith(searchValue) ||
        branch.specialization.toLowerCase().startsWith(searchValue) ||
        branch.address.toLowerCase().startsWith(searchValue)
    );
    renderBranches(filteredBranches);
}

// Updates the counters for total doctors, receptionists, and restricted accounts
function updateCounters(): void {
    (document.getElementById('totalBranches') as HTMLElement).innerText = totalBranches.toString();
    (document.getElementById('pendingBranches') as HTMLElement).innerText = pendingBranches.toString();
    // (document.getElementById('totalReceptionists') as HTMLElement).innerText = totalReceptionists.toString();
    // (document.getElementById('restrictedAccounts') as HTMLElement).innerText = restrictedAccounts.toString();
}

// Modal Functionalities
function openAddBranchModal(): void {
    (document.getElementById('addBranchModal') as HTMLElement).style.display = 'block';
}

function closeAddBranchModal(): void {
    (document.getElementById('addBranchModal') as HTMLElement).style.display = 'none';
}

function addBranch(event: Event): void {
    event.preventDefault();
    const branchName = (document.getElementById('branchName') as HTMLInputElement).value;
    const branchEmail = (document.getElementById('branchEmail') as HTMLInputElement).value;
    const branchId = "5";
    const branchAddress = (document.getElementById('branchAddress') as HTMLInputElement).value;
    const branchSpecialization = (document.getElementById('branchSpecialization') as HTMLInputElement).value;
    
    const newBranch: Branch = {
        name: branchName,
        email: branchEmail,
        address: branchAddress,
        specialization: branchSpecialization,
        branch_id: branchId,
    };
    
    branches.push(newBranch);
    totalBranches++;
    renderBranches(branches);
    closeAddBranchModal();
}

// const addBranch = async (event: Event): Promise<void> => {
//     event.preventDefault();
//     const branchName = (document.getElementById('branchName') as HTMLInputElement).value;
//     const branchEmail = (document.getElementById('branchEmail') as HTMLInputElement).value;
//     const branchAddress = (document.getElementById('branchAddress') as HTMLInputElement).value;
//     // const branchId = 2; // given by the system
//     // const branchSpecialization = (document.getElementById('branchSpecialization') as HTMLInputElement).value;
  
    
  
//     // Step 1: Register the branch
//     const branchData = {
//       branch_name: branchName,
//       branch_email: branchEmail,
//       branch_address: branchAddress,
//     };
  
//     try {
//       const branchResponse = await fetch(
//         "http://localhost:4000/api/v1/branches",
//         {
//           method: "POST",
//           headers: { "Content-Type": "application/json" },
//           body: JSON.stringify(branchData),
//         }
//       );
  
//       if (branchResponse.status !== 201) {
//         throw new Error("Failed to register branch");
//       }

//     const confirmation = document.querySelector(".confirmation") as HTMLElement;
    
//     // Add the confirmation message
//     confirmation.innerText = "Branch added successfully";
//     confirmation.classList.add("alert", "alert-success");
//     confirmation.style.backgroundColor = "lightgreen";
//     confirmation.style.color = "green";

//     // Show the confirmation for a few seconds
//     setTimeout(() => {
//         confirmation.innerText = "";
//         confirmation.classList.remove("alert", "alert-success");
//         closeAddBranchModal();
//     }, 3000); // 3000ms = 3 seconds
  
//     } catch (error) {
//       console.error("Error adding user:", error);
//     }
//   };

// Initial rendering of users
document.addEventListener('DOMContentLoaded', () => {
    renderBranches(branches);
});
