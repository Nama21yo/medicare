// document.addEventListener('DOMContentLoaded', () => {
//     // Function to get query parameters from the URL
//     function getQueryParams(): { [key: string]: string } {
//       const params: { [key: string]: string } = {};
//       window.location.search.substring(1).split('&').forEach(param => {
//         const [key, value] = param.split('=');
//         params[key] = decodeURIComponent(value);
//       });
//       return params;
//     }
//     // Get the patient_id from the query parameters
//     const queryParams = getQueryParams();
//     const patientId = queryParams['patient_id'];
//     // Fetch and populate patient data based on the patient_id
//     if (patientId) {
//       const patient = users.find(user => user.patient_id === patientId);
//       if (patient) {
//         // Populate patient data on the page (adjust as needed)
//         document.getElementById('patientName').textContent = patient.name;
//         document.getElementById('patientAge').textContent = patient.age.toString();
//         // Add other fields as necessary
//       }
//     }
//     // Initial rendering of diagnoses
//     renderDiagnoses(diagnoses);
//   });
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
