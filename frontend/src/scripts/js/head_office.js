var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g = Object.create((typeof Iterator === "function" ? Iterator : Object).prototype);
    return g.next = verb(0), g["throw"] = verb(1), g["return"] = verb(2), typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var _this = this;
var branches = [];
var totalBranches;
var pendingBranches;
// With Api
var fetchBranchData = function () { return __awaiter(_this, void 0, void 0, function () {
    var response, branches_1, completeBranches, error_1;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 3, , 4]);
                return [4 /*yield*/, fetch("http://localhost:4000/api/v1/branches")];
            case 1:
                response = _a.sent();
                return [4 /*yield*/, response.json()];
            case 2:
                branches_1 = _a.sent();
                completeBranches = branches_1.filter(function (branch) {
                    return branch.name &&
                        branch.location &&
                        branch.is_signed_up;
                });
                totalBranches = completeBranches.length;
                pendingBranches = branches_1.length - completeBranches.length;
                // You can add a function to render or use these variables as needed
                renderBranches(completeBranches);
                updateCounters();
                return [3 /*break*/, 4];
            case 3:
                error_1 = _a.sent();
                console.error("Error fetching data:", error_1);
                return [3 /*break*/, 4];
            case 4: return [2 /*return*/];
        }
    });
}); };
// Print table
// Function to print the employee table
var printTable = function () {
    var _a;
    var printContent = (_a = document.getElementById("branchTable")) === null || _a === void 0 ? void 0 : _a.outerHTML;
    var originalContent = document.body.innerHTML;
    // Hide the last column before printing
    document.querySelectorAll("#userTable th:nth-last-child(1), #userTable td:nth-last-child(1)").forEach(function (el) {
        el.classList.add("d-none");
    });
    if (printContent) {
        document.body.innerHTML = "\n      <html>\n        <head>\n          <title>Print Table</title>\n          <link href=\"https://maxcdn.bootstrapcdn.com/bootstrap/4.5.2/css/bootstrap.min.css\" rel=\"stylesheet\">\n        </head>\n        <body>".concat(printContent, "</body>\n      </html>\n    ");
        window.print();
        document.body.innerHTML = originalContent;
    }
    // Show the last column after printing
    document.querySelectorAll("#userTable th:nth-last-child(1), #userTable td:nth-last-child(1)").forEach(function (el) {
        el.classList.remove("d-none");
    });
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
function renderBranches(branches) {
    var branchTableBody = document.getElementById("branchTableBody");
    branchTableBody.innerHTML = "";
    branches.forEach(function (branch, index) {
        var row = "<tr>\n            <td>".concat(branch.name, "</td>\n            <td>").concat(branch.contact_email, "</td>\n            <td>").concat(branch.location, "</td>\n            <td>").concat(branch.specialization, "</td>\n            <td>\n                <button class=\"btn btn-danger btn-sm\" onclick=\"deleteBranch(").concat([
            branch.branch_id,
            index,
        ], ")\">Delete</button>\n            </td>\n        </tr>");
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
var deleteBranch = function (info) { return __awaiter(_this, void 0, void 0, function () {
    var error_2;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                return [4 /*yield*/, fetch("http://localhost:4000/api/v1/branches/".concat(info[0]), {
                        // Check userId or user_id
                        method: "DELETE",
                    })];
            case 1:
                _a.sent();
                // branches.splice(info[1], 1)[0];
                // totalBranches--;
                // renderBranches(branches);
                fetchBranchData();
                return [3 /*break*/, 3];
            case 2:
                error_2 = _a.sent();
                console.error("Error deleting user:", error_2);
                return [3 /*break*/, 3];
            case 3: return [2 /*return*/];
        }
    });
}); };
// Implements search functionality
function filterBranches() {
    var searchValue = document.getElementById("searchInput").value.toLowerCase();
    var filteredBranches = branches.filter(function (branch) {
        var _a;
        return branch.name.toLowerCase().startsWith(searchValue) ||
            branch.contact_email.toLowerCase().startsWith(searchValue) ||
            ((_a = branch.specialization) === null || _a === void 0 ? void 0 : _a.toLowerCase().startsWith(searchValue)) ||
            branch.location.toLowerCase().startsWith(searchValue);
    });
    renderBranches(filteredBranches);
}
// Updates the counters for total doctors, receptionists, and restricted accounts
function updateCounters() {
    document.getElementById("totalBranches").innerText =
        totalBranches.toString();
    document.getElementById("pendingBranches").innerText =
        pendingBranches.toString();
    // (document.getElementById('totalReceptionists') as HTMLElement).innerText = totalReceptionists.toString();
    // (document.getElementById('restrictedAccounts') as HTMLElement).innerText = restrictedAccounts.toString();
}
// Modal Functionalities
function openAddBranchModal() {
    document.getElementById("addBranchModal").style.display =
        "block";
}
function closeAddBranchModal() {
    document.getElementById("addBranchModal").style.display =
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
var addBranch = function (event) { return __awaiter(_this, void 0, void 0, function () {
    var branchName, branchEmail, branchLocation, branchSpecialization, headOfficeId, branchData, branchResponse, confirmation_1, error_3;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                event.preventDefault();
                branchName = document.getElementById("branchName")
                    .value;
                branchEmail = document.getElementById("branchEmail").value;
                branchLocation = document.getElementById("branchLocation").value;
                branchSpecialization = document.getElementById("branchSpecialization").value;
                headOfficeId = 1;
                branchData = {
                    name: branchName,
                    contact_email: branchEmail,
                    location: branchLocation,
                    headoffice_id: headOfficeId,
                    specialization: branchSpecialization,
                };
                _a.label = 1;
            case 1:
                _a.trys.push([1, 3, , 4]);
                return [4 /*yield*/, fetch("http://localhost:4000/api/v1/branches", {
                        method: "POST",
                        headers: { "Content-Type": "application/json" },
                        body: JSON.stringify(branchData),
                    })];
            case 2:
                branchResponse = _a.sent();
                if (branchResponse.status !== 201) {
                    throw new Error("Failed to register branch");
                }
                confirmation_1 = document.querySelector(".confirmation");
                // Add the confirmation message
                confirmation_1.innerText = "Branch added successfully";
                confirmation_1.classList.add("alert", "alert-success");
                confirmation_1.style.backgroundColor = "lightgreen";
                confirmation_1.style.color = "green";
                pendingBranches++;
                updateCounters();
                // Show the confirmation for a few seconds
                setTimeout(function () {
                    confirmation_1.innerText = "";
                    confirmation_1.classList.remove("alert", "alert-success");
                    closeAddBranchModal();
                }, 3000); // 3000ms = 3 seconds
                return [3 /*break*/, 4];
            case 3:
                error_3 = _a.sent();
                console.error("Error adding user:", error_3);
                return [3 /*break*/, 4];
            case 4: return [2 /*return*/];
        }
    });
}); };
// Initial rendering of users
document.addEventListener("DOMContentLoaded", function () {
    fetchBranchData();
});
