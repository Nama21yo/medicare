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
var _a;
var _this = this;
// Check for JWT token on load
var checkJwtToken = function () {
    var jwtToken = localStorage.getItem("jwtToken") || sessionStorage.getItem("jwtToken");
    if (!jwtToken) {
        window.location.href = "http://127.0.0.1:5500/frontend/src/index.html";
    }
};
// Call the checkJwtToken function on load
checkJwtToken();
// Sample data (initially empty)
var employees = [];
var totalDoctors = 0;
var totalReceptionists = 0;
// Fetch data from the API
var fetchEmployeesData = function () { return __awaiter(_this, void 0, void 0, function () {
    var response, users, error_1;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 3, , 4]);
                return [4 /*yield*/, fetch("http://localhost:4000/api/v1/users")];
            case 1:
                response = _a.sent();
                return [4 /*yield*/, response.json()];
            case 2:
                users = _a.sent();
                // Filter users to show only Receptionists and Doctors
                employees = users.filter(function (user) { return user.role.name === "Receptionist" || user.role.name === "Doctor"; });
                // Update the counters based on the fetched users
                totalDoctors = employees.filter(function (user) { return user.role.name === "Doctor"; }).length;
                totalReceptionists = employees.filter(function (user) { return user.role.name === "Receptionist"; }).length;
                // Render the filtered employees
                renderEmployees(employees);
                return [3 /*break*/, 4];
            case 3:
                error_1 = _a.sent();
                console.error("Error fetching data:", error_1);
                return [3 /*break*/, 4];
            case 4: return [2 /*return*/];
        }
    });
}); };
// Render employees
var renderEmployees = function (employees) {
    var userTableBody = document.getElementById("userTableBody");
    userTableBody.innerHTML = "";
    employees.forEach(function (user, index) {
        var row = "\n      <tr>\n        <td>".concat(user.username, "</td>\n        <td>").concat(user.email, "</td>\n        <td>").concat(user.user_id, "</td>\n        <td>").concat(user.role.name, "</td>\n        <td>\n          <button class=\"btn btn-danger btn-sm\" onclick=\"deleteEmployee(").concat(index, ")\">Delete</button>\n        </td>\n      </tr>");
        userTableBody.innerHTML += row;
    });
    updateEmployeeCounters();
};
// Delete User
var deleteEmployee = function (index) { return __awaiter(_this, void 0, void 0, function () {
    var userToBeDeleted, response, error_2;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                userToBeDeleted = employees[index];
                if (!userToBeDeleted) {
                    return [2 /*return*/];
                }
                _a.label = 1;
            case 1:
                _a.trys.push([1, 3, , 4]);
                return [4 /*yield*/, fetch("http://localhost:4000/api/v1/users/".concat(userToBeDeleted.user_id), {
                        method: "DELETE",
                    })];
            case 2:
                response = _a.sent();
                if (!response.ok) {
                    throw new Error("Failed to delete user: ".concat(response.statusText));
                }
                if (userToBeDeleted.role.name === "Doctor") {
                    totalDoctors--;
                }
                else if (userToBeDeleted.role.name === "Receptionist") {
                    totalReceptionists--;
                }
                employees.splice(index, 1);
                renderEmployees(employees);
                return [3 /*break*/, 4];
            case 3:
                error_2 = _a.sent();
                console.log(error_2);
                return [3 /*break*/, 4];
            case 4: return [2 /*return*/];
        }
    });
}); };
// Filter employees
function filterEmployees() {
    var searchValue = document.getElementById("searchInput").value.toLowerCase();
    var filteredUsers = employees.filter(function (user) {
        return user.username.toLowerCase().startsWith(searchValue) ||
            user.email.toLowerCase().startsWith(searchValue) ||
            user.role.name.toLowerCase().startsWith(searchValue);
    });
    renderEmployees(filteredUsers);
}
// Update counters
function updateEmployeeCounters() {
    document.getElementById("totalDoctors").innerText =
        totalDoctors.toString();
    document.getElementById("totalReceptionists").innerText =
        totalReceptionists.toString();
}
// Modal Functionalities
function openAddEmployeeModal() {
    document.getElementById("addBranchModal").style.display =
        "block";
}
function closeAddEmployeeModal() {
    document.getElementById("addBranchModal").style.display =
        "none";
}
var addEmployee = function (event) { return __awaiter(_this, void 0, void 0, function () {
    var token, base64Payload, payload, branchId, employeeName, employeeRole, employeeEmail, employeeData, employeeResponse, employee, confirmation_1, error_3, employeeResponse, employee, confirmation_2, error_4;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                event.preventDefault();
                token = localStorage.getItem("jwtToken");
                if (!token) {
                    console.error("No token found in local storage");
                    return [2 /*return*/];
                }
                base64Payload = token.split(".")[1];
                payload = JSON.parse(atob(base64Payload));
                branchId = payload.branch_id;
                employeeName = document.getElementById("employeeName")
                    .value;
                employeeRole = document.getElementById("employeeRole")
                    .value;
                employeeEmail = document.getElementById("employeeEmail")
                    .value;
                employeeData = {
                    name: employeeName,
                    role: employeeRole,
                    email: employeeEmail,
                    branch_id: branchId,
                };
                if (!(employeeRole === "4")) return [3 /*break*/, 6];
                _a.label = 1;
            case 1:
                _a.trys.push([1, 4, , 5]);
                return [4 /*yield*/, fetch("http://localhost:4000/api/v1/doctors", {
                        method: "POST",
                        headers: {
                            "Content-Type": "application/json",
                            Authorization: "Bearer ".concat(token),
                        },
                        body: JSON.stringify(employeeData),
                    })];
            case 2:
                employeeResponse = _a.sent();
                if (employeeResponse.status !== 201) {
                    throw new Error("Failed to register employee");
                }
                return [4 /*yield*/, employeeResponse.json()];
            case 3:
                employee = _a.sent();
                confirmation_1 = document.querySelector(".confirmation");
                confirmation_1.innerText = "Employee added successfully";
                confirmation_1.classList.add("alert", "alert-success");
                confirmation_1.style.backgroundColor = "lightgreen";
                confirmation_1.style.color = "green";
                // Show the confirmation for a few seconds
                setTimeout(function () {
                    confirmation_1.innerText = "";
                    confirmation_1.classList.remove("alert", "alert-success");
                    closeAddEmployeeModal();
                }, 3000); // 3000ms = 3 seconds
                return [3 /*break*/, 5];
            case 4:
                error_3 = _a.sent();
                console.error("Error adding employee:", error_3);
                return [3 /*break*/, 5];
            case 5: return [3 /*break*/, 10];
            case 6:
                _a.trys.push([6, 9, , 10]);
                return [4 /*yield*/, fetch("http://localhost:4000/api/v1/receptionists", {
                        method: "POST",
                        headers: {
                            "Content-Type": "application/json",
                            Authorization: "Bearer ".concat(token),
                        },
                        body: JSON.stringify(employeeData),
                    })];
            case 7:
                employeeResponse = _a.sent();
                if (employeeResponse.status !== 201) {
                    throw new Error("Failed to register employee");
                }
                return [4 /*yield*/, employeeResponse.json()];
            case 8:
                employee = _a.sent();
                confirmation_2 = document.querySelector(".confirmation");
                confirmation_2.innerText = "Employee added successfully";
                confirmation_2.classList.add("alert", "alert-success");
                confirmation_2.style.backgroundColor = "lightgreen";
                confirmation_2.style.color = "green";
                // Show the confirmation for a few seconds
                setTimeout(function () {
                    confirmation_2.innerText = "";
                    confirmation_2.classList.remove("alert", "alert-success");
                    closeAddEmployeeModal();
                }, 3000); // 3000ms = 3 seconds
                return [3 /*break*/, 10];
            case 9:
                error_4 = _a.sent();
                console.error("Error adding employee:", error_4);
                return [3 /*break*/, 10];
            case 10: return [2 /*return*/];
        }
    });
}); };
// Logs out the user by clearing the JWT and redirecting to the login page
function logoutUser() {
    localStorage.removeItem("jwtToken");
    sessionStorage.removeItem("jwtToken");
    window.location.href = "http://127.0.0.1:5500/frontend/src/index.html";
}
// Attach the logout function to the logout button
(_a = document.getElementById("logout")) === null || _a === void 0 ? void 0 : _a.addEventListener("click", logoutUser);
// Call the function to fetch and render employees on page load
fetchEmployeesData();
