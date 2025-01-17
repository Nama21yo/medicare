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
var patients = [];
var totalDiagnoses = 0;
var diagnosis = [];
var currentPatient;
document.addEventListener("DOMContentLoaded", function () {
    // Function to get query parameters from the URL
    function getQueryParams() {
        var params = {};
        window.location.search
            .substring(1)
            .split("&")
            .forEach(function (param) {
            var _a = param.split("="), key = _a[0], value = _a[1];
            params[key] = decodeURIComponent(value);
        });
        return params;
    }
    // Get the patient_id from the query parameters
    var queryParams = getQueryParams();
    var patientId = queryParams["patient_id"];
    console.log("Patient ID from URL:", patientId); // Debugging line
    var fetchPaitient = function () { return __awaiter(_this, void 0, void 0, function () {
        var response, data, error_1;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 3, , 4]);
                    return [4 /*yield*/, fetch("http://localhost:4000/api/v1/patients")];
                case 1:
                    response = _a.sent();
                    return [4 /*yield*/, response.json()];
                case 2:
                    data = _a.sent();
                    patients = data;
                    currentPatient = patients.filter(function (patient) { return patient.patient_id.toString() === patientId; })[0];
                    fetchDiagnosis(currentPatient);
                    return [3 /*break*/, 4];
                case 3:
                    error_1 = _a.sent();
                    console.error("Error fetching data:", error_1);
                    return [3 /*break*/, 4];
                case 4: return [2 /*return*/];
            }
        });
    }); };
    var fetchDiagnosis = function (currentPatient) { return __awaiter(_this, void 0, void 0, function () {
        var response, data, currentDiagnosis, error_2;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 3, , 4]);
                    return [4 /*yield*/, fetch("http://localhost:4000/api/v1/diagnoses")];
                case 1:
                    response = _a.sent();
                    return [4 /*yield*/, response.json()];
                case 2:
                    data = _a.sent();
                    diagnosis = data;
                    currentDiagnosis = diagnosis.filter(function (current_diagnosis) {
                        return current_diagnosis.patient.patient_id === currentPatient.patient_id;
                    });
                    totalDiagnoses = currentDiagnosis.filter(function (d) { return d.visible; }).length;
                    renderDiagnoses(currentDiagnosis);
                    return [3 /*break*/, 4];
                case 3:
                    error_2 = _a.sent();
                    console.error("Error fetching data:", error_2);
                    return [3 /*break*/, 4];
                case 4: return [2 /*return*/];
            }
        });
    }); };
    // Initial rendering of diagnoses
    fetchPaitient();
});
// Assuming `currentPatient` is defined and accessible in this scope
// const currentPatient: Patient = {
//   // Add your sample patient data here or make sure it's assigned correctly elsewhere
//   patient_id: 1,
//   first_name: 'John',
//   last_name: 'Doe',
//   email: 'john.doe@example.com',
//   phone_number: '123-456-7890',
//   date_of_birth: '1990-01-01',
//   gender: 'male',
//   registered_by: 'admin',
//   address: '123 Main St',
//   created_at: '2025-01-01T00:00:00.000Z',
//   updated_at: '2025-01-01T00:00:00.000Z'
// };
// Function to add a diagnosis
var addDiagnosis = function (event) { return __awaiter(_this, void 0, void 0, function () {
    var token, base64Payload, payload, doctorId, diagnosisName, diagnosisDetails, prescription, diagnosisData, diagnosisResponse, newDiagnosis, error_3;
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
                doctorId = payload.user_id;
                diagnosisName = document.getElementById("diagnosisName").value;
                diagnosisDetails = document.getElementById("diagnosisComment").value;
                prescription = document.getElementById("diagnosisPrescription").value;
                diagnosisData = {
                    diagnosis_name: diagnosisName,
                    diagnosis_details: diagnosisDetails || undefined, // Optional field
                    prescription: prescription || undefined, // Optional field
                    patient_id: currentPatient.patient_id,
                    doctor_id: doctorId,
                    visible: true,
                };
                _a.label = 1;
            case 1:
                _a.trys.push([1, 4, , 5]);
                return [4 /*yield*/, fetch("http://localhost:4000/api/v1/diagnoses", {
                        method: "POST",
                        headers: {
                            "Content-Type": "application/json",
                            Authorization: "Bearer ".concat(token),
                        },
                        body: JSON.stringify(diagnosisData),
                    })];
            case 2:
                diagnosisResponse = _a.sent();
                if (diagnosisResponse.status !== 201) {
                    throw new Error("Failed to add diagnosis");
                }
                return [4 /*yield*/, diagnosisResponse.json()];
            case 3:
                newDiagnosis = _a.sent();
                console.log("Diagnosis added successfully:", newDiagnosis);
                // Update the counter (if applicable) and UI
                totalDiagnoses++;
                updateCounters();
                // Assuming `diagnosis` is an array that holds all diagnoses
                diagnosis.push(newDiagnosis);
                renderDiagnoses(diagnosis); // Update UI with new diagnosis
                closeAddDiagnosisModal(); // Close the modal after successful submission
                return [3 /*break*/, 5];
            case 4:
                error_3 = _a.sent();
                console.error("Error adding diagnosis:", error_3);
                return [3 /*break*/, 5];
            case 5: return [2 /*return*/];
        }
    });
}); };
// // Assuming an existing form submission event listener
// const form = document.getElementById('addDiagnosisForm') as HTMLFormElement;
// form.addEventListener('submit', addDiagnosis);
// Renders the diagnosis table
function renderDiagnoses(diagnoses) {
    var diagnosisTableBody = document.getElementById("diagnosisTableBody");
    diagnosisTableBody.innerHTML = "";
    diagnoses.forEach(function (diagnosis, index) {
        if (diagnosis.visible) {
            var row = "<tr>\n                <td>".concat(diagnosis.diagnosisName, "</td>\n                <td>").concat(diagnosis.doctor.name, "</td>\n                <td>").concat(diagnosis.created_at, "</td>\n                <td>\n                    <button class=\"btn btn-primary btn-sm\" onclick=\"viewDiagnosis(").concat(index, ")\">View Details</button>\n                </td>\n            </tr>");
            diagnosisTableBody.innerHTML += row;
        }
    });
    updateCounters();
}
// View a diagnosis (opens modal with details)
function viewDiagnosis(index) {
    var diagnosis = diagnosis[index];
    document.getElementById("viewDiagnosisName").value =
        diagnosis.diagnosisName;
    document.getElementById("viewDoctorName").value =
        diagnosis.doctor.name;
    document.getElementById("viewDate").value =
        diagnosis.created_at;
    document.getElementById("viewPrescription").value =
        diagnosis.prescription;
    document.getElementById("viewComment").value =
        diagnosis.comment;
    document.getElementById("viewDiagnosisModal").style.display =
        "block";
}
// Closes the view diagnosis modal
function closeViewDiagnosisModal() {
    document.getElementById("viewDiagnosisModal").style.display =
        "none";
}
// Implements search functionality
function filterDiagnoses() {
    var searchValue = document.getElementById("searchInput").value.toLowerCase();
    var filteredDiagnoses = diagnosis.filter(function (diagnosis) {
        return diagnosis.diagnosisName.toLowerCase().includes(searchValue) ||
            diagnosis.doctor.name.toLowerCase().includes(searchValue) ||
            diagnosis.created_at.toLowerCase().includes(searchValue);
    });
    renderDiagnoses(filteredDiagnoses);
}
// Updates the counters for total diagnoses
function updateCounters() {
    document.getElementById("totalBranches").innerText =
        totalDiagnoses.toString();
}
// Modal Functionalities for Adding Diagnosis
function openAddDiagnosisModal() {
    document.getElementById("addDiagnosisModal").style.display =
        "block";
}
function closeAddDiagnosisModal() {
    document.getElementById("addDiagnosisModal").style.display =
        "none";
}
