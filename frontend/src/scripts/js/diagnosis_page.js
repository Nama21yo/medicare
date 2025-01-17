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
document.addEventListener('DOMContentLoaded', function () {
    // Function to get query parameters from the URL
    function getQueryParams() {
        var params = {};
        window.location.search.substring(1).split('&').forEach(function (param) {
            var _a = param.split('='), key = _a[0], value = _a[1];
            params[key] = decodeURIComponent(value);
        });
        return params;
    }
    // Get the patient_id from the query parameters
    var queryParams = getQueryParams();
    var patientId = queryParams['patient_id'];
    var fetchPaitient = function () { return __awaiter(_this, void 0, void 0, function () {
        var response, data, currentPatient, error_1;
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
                    currentDiagnosis = diagnosis.filter(function (current_diagnosis) { return current_diagnosis.patient.patient_id === currentPatient.patient_id; });
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
    // Fetch and populate patient data based on the patient_id
    // if (patientId) {
    //   const patient = users.find(user => user.patient.patient_id.toString() === patientId);
    //   if (patient) {
    //     // Populate patient data on the page (adjust as needed)
    //     document.getElementById('patientName').textContent = patient.name;
    //     document.getElementById('patientAge').textContent = patient.age.toString();
    //     // Add other fields as necessary
    //   }
    // }
    // Initial rendering of diagnoses
    fetchPaitient();
});
// Sample data
var diagnoses = [
    { diagnosisName: "Flu", doctorName: "Dr. John Doe", date: "2025-01-01", prescription: "advil", comment: "Rest and drink plenty of fluids", visible: true, },
    { diagnosisName: "Diabetes", doctorName: "Dr. Jane Smith", date: "2025-02-15", prescription: "insuline", comment: "Manage diet and exercise regularly", visible: false },
    // Add more sample diagnoses as needed
];
var totalDiagnoses = diagnoses.filter(function (d) { return d.visible; }).length;
// Renders the diagnosis table
function renderDiagnoses(diagnoses) {
    var diagnosisTableBody = document.getElementById('diagnosisTableBody');
    diagnosisTableBody.innerHTML = '';
    diagnoses.forEach(function (diagnosis, index) {
        if (diagnosis.visible) {
            var row = "<tr>\n                <td>".concat(diagnosis.diagnosisName, "</td>\n                <td>").concat(diagnosis.doctorName, "</td>\n                <td>").concat(diagnosis.date, "</td>\n                <td>\n                    <button class=\"btn btn-primary btn-sm\" onclick=\"viewDiagnosis(").concat(index, ")\">View Details</button>\n                </td>\n            </tr>");
            diagnosisTableBody.innerHTML += row;
        }
    });
    updateCounters();
}
// View a diagnosis (opens modal with details)
function viewDiagnosis(index) {
    var diagnosis = diagnoses[index];
    document.getElementById('viewDiagnosisName').value = diagnosis.diagnosisName;
    document.getElementById('viewDoctorName').value = diagnosis.doctorName;
    document.getElementById('viewDate').value = diagnosis.date;
    document.getElementById('viewPrescription').value = diagnosis.prescription;
    document.getElementById('viewComment').value = diagnosis.comment;
    document.getElementById('viewDiagnosisModal').style.display = 'block';
}
// Closes the view diagnosis modal
function closeViewDiagnosisModal() {
    document.getElementById('viewDiagnosisModal').style.display = 'none';
}
// Implements search functionality
function filterDiagnoses() {
    var searchValue = document.getElementById('searchInput').value.toLowerCase();
    var filteredDiagnoses = diagnoses.filter(function (diagnosis) {
        return diagnosis.diagnosisName.toLowerCase().includes(searchValue) ||
            diagnosis.doctorName.toLowerCase().includes(searchValue) ||
            diagnosis.date.toLowerCase().includes(searchValue);
    });
    renderDiagnoses(filteredDiagnoses);
}
// Updates the counters for total diagnoses
function updateCounters() {
    document.getElementById('totalBranches').innerText = totalDiagnoses.toString();
}
// Modal Functionalities for Adding Diagnosis
function openAddDiagnosisModal() {
    document.getElementById('addDiagnosisModal').style.display = 'block';
}
function closeAddDiagnosisModal() {
    document.getElementById('addDiagnosisModal').style.display = 'none';
}
function addDiagnosis(event) {
    event.preventDefault();
    var diagnosisName = document.getElementById('diagnosisName').value;
    var doctorName = "Dr. Placeholder"; // This should be fetched from the current logged-in doctor
    var date = new Date().toISOString().split('T')[0]; // Current date
    var prescription = document.getElementById('diagnosisPrescription').value;
    var comment = document.getElementById('diagnosisComment').value;
    var visible = true;
    var newDiagnosis = {
        diagnosisName: diagnosisName,
        doctorName: doctorName,
        date: date,
        prescription: prescription,
        visible: visible,
        comment: comment
    };
    diagnoses.push(newDiagnosis);
    totalDiagnoses++;
    renderDiagnoses(diagnoses);
    closeAddDiagnosisModal();
}
// Initial rendering of diagnoses
document.addEventListener('DOMContentLoaded', function () {
    renderDiagnoses(diagnoses);
});
