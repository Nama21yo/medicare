// Sample data
var branches = [
    { name: "Kabgar Orthopedic Center", email: "orthopedic@kabgar.com", address: "Mekanissa Mikchael", specialization: "Orthopedic" },
    { name: "Kabagar Pediatrics Center", email: "pediatrics@kabgar.com", address: "6kilo", specialization: "Pediatrics" },
    // Add more sample users as needed
];
var totalBranches = branches.length;
// Renders the user table
function renderUsers(branches) {
    var userTableBody = document.getElementById('userTableBody');
    userTableBody.innerHTML = '';
    branches.forEach(function (branch, index) {
        var row = "<tr>\n            <td>".concat(branch.name, "</td>\n            <td>").concat(branch.email, "</td>\n            <td>").concat(branch.address, "</td>\n            <td>").concat(branch.specialization, "</td>\n            <td>\n                <button class=\"btn btn-danger btn-sm\" onclick=\"deleteBranch(").concat(index, ")\">Delete</button>\n            </td>\n        </tr>");
        userTableBody.innerHTML += row;
    });
    updateCounters();
}
// Deletes a user
function deleteBranch(index) {
    branches.splice(index, 1)[0];
    totalBranches--;
    renderUsers(branches);
}
// Implements search functionality
function filterUsers() {
    var searchValue = document.getElementById('searchInput').value.toLowerCase();
    var filteredBranches = branches.filter(function (branch) {
        return branch.name.toLowerCase().startsWith(searchValue) ||
            branch.email.toLowerCase().startsWith(searchValue) ||
            branch.specialization.toLowerCase().startsWith(searchValue) ||
            branch.address.toLowerCase().startsWith(searchValue);
    });
    renderUsers(filteredBranches);
}
// Updates the counters for total doctors, receptionists, and restricted accounts
function updateCounters() {
    document.getElementById('totalBranches').innerText = totalBranches.toString();
    // (document.getElementById('totalReceptionists') as HTMLElement).innerText = totalReceptionists.toString();
    // (document.getElementById('restrictedAccounts') as HTMLElement).innerText = restrictedAccounts.toString();
}
// Modal Functionalities
function openAddBranchModal() {
    document.getElementById('addBranchModal').style.display = 'block';
}
function closeAddBranchModal() {
    document.getElementById('addBranchModal').style.display = 'none';
}
function addBranch(event) {
    event.preventDefault();
    var branchName = document.getElementById('branchName').value;
    var branchEmail = document.getElementById('branchEmail').value;
    var branchAddress = document.getElementById('branchAddress').value;
    var branchSpecialization = document.getElementById('branchSpecialization').value;
    var newBranch = {
        name: branchName,
        email: branchEmail,
        address: branchAddress,
        specialization: branchSpecialization,
    };
    branches.push(newBranch);
    totalBranches++;
    renderUsers(branches);
    closeAddBranchModal();
}
// Initial rendering of users
document.addEventListener('DOMContentLoaded', function () {
    renderUsers(branches);
});
