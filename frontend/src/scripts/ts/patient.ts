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
const diagnoses: Diagnosis[] = [
  {
    diagnosisName: "Flu",
    doctorName: "Dr. John Doe",
    date: "2025-01-01",
    prescription: "advil",
    comment: "Rest and drink plenty of fluids",
    visible: true,
  },
  {
    diagnosisName: "Diabetes",
    doctorName: "Dr. Jane Smith",
    date: "2025-02-15",
    prescription: "insuline",
    comment: "Manage diet and exercise regularly",
    visible: false,
  },
  // Add more sample diagnoses as needed
];

let totalDiagnoses: number = diagnoses.length;

// Renders the diagnosis table
function renderDiagnoses(diagnoses: Diagnosis[]): void {
  const diagnosisTableBody = document.getElementById(
    "diagnosisTableBody"
  ) as HTMLElement;
  diagnosisTableBody.innerHTML = "";
  diagnoses.forEach((diagnosis, index) => {
    const row = `<tr>
                <td>${diagnosis.diagnosisName}</td>
                <td>${diagnosis.doctorName}</td>
                <td>${diagnosis.date}</td>
                <td>
                    ${diagnosis.visible === true ? "Visible" : "Not Visible"}
                </td>
                <td>
                    <button class="btn btn-primary btn-sm" onclick="isVisible(${index})">
                    
                    ${
                      diagnosis.visible === false ? "Visible" : "Not Visible"
                    }</button>
                    <button class="btn btn-primary btn-sm" onclick="viewDiagnosis(${index})">View Details</button>
                    </td>
            </tr>`;
    diagnosisTableBody.innerHTML += row;
  });
  updateCounters();
}

const printTable = (): void => {
  const printContent = document.getElementById("diagnosisTable")?.outerHTML;
  const originalContent = document.body.innerHTML;

  // Hide the last column before printing
  document.querySelectorAll("#userTable th:nth-last-child(1), #userTable td:nth-last-child(1)").forEach(el => {
    el.classList.add("d-none");
  });

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

  // Show the last column after printing
  document.querySelectorAll("#userTable th:nth-last-child(1), #userTable td:nth-last-child(1)").forEach(el => {
    el.classList.remove("d-none");
  });
};

function isVisible(index: number): void {
  const diagnosis = diagnoses[index];
  if (diagnosis.visible === true) {
    diagnosis.visible = false;
  } else {
    diagnosis.visible = true;
  }
  renderDiagnoses(diagnoses);
}

// View a diagnosis (opens modal with details)
function viewDiagnosis(index: number): void {
  const diagnosis = diagnoses[index];
  (document.getElementById("viewDiagnosisName") as HTMLInputElement).value =
    diagnosis.diagnosisName;
  (document.getElementById("viewDoctorName") as HTMLInputElement).value =
    diagnosis.doctorName;
  (document.getElementById("viewDate") as HTMLInputElement).value =
    diagnosis.date;
  (document.getElementById("viewPrescription") as HTMLTextAreaElement).value =
    diagnosis.prescription;
  (document.getElementById("viewComment") as HTMLTextAreaElement).value =
    diagnosis.comment;
  (document.getElementById("viewDiagnosisModal") as HTMLElement).style.display =
    "block";
}

// Closes the view diagnosis modal
function closeViewDiagnosisModal(): void {
  (document.getElementById("viewDiagnosisModal") as HTMLElement).style.display =
    "none";
}

// Implements search functionality
function filterDiagnoses(): void {
  const searchValue = (
    document.getElementById("searchInput") as HTMLInputElement
  ).value.toLowerCase();
  const filteredDiagnoses = diagnoses.filter(
    (diagnosis) =>
      diagnosis.diagnosisName.toLowerCase().includes(searchValue) ||
      diagnosis.doctorName.toLowerCase().includes(searchValue) ||
      diagnosis.date.toLowerCase().includes(searchValue)
  );
  renderDiagnoses(filteredDiagnoses);
}

// Updates the counters for total diagnoses
function updateCounters(): void {
  (document.getElementById("totalBranches") as HTMLElement).innerText =
    totalDiagnoses.toString();
}

// Modal Functionalities for Adding Diagnosis
function openAddDiagnosisModal(): void {
  (document.getElementById("addDiagnosisModal") as HTMLElement).style.display =
    "block";
}

function closeAddDiagnosisModal(): void {
  (document.getElementById("addDiagnosisModal") as HTMLElement).style.display =
    "none";
}

// function addDiagnosis(event: Event): void {
//     event.preventDefault();
//     const diagnosisName = (document.getElementById('diagnosisName') as HTMLInputElement).value;
//     const doctorName = "Dr. Placeholder"; // This should be fetched from the current logged-in doctor
//     const date = new Date().toISOString().split('T')[0]; // Current date
//     const prescription = (document.getElementById('diagnosisPrescription') as HTMLTextAreaElement).value;
//     const comment = (document.getElementById('diagnosisComment') as HTMLTextAreaElement).value;

//     const newDiagnosis: Diagnosis = {
//         diagnosisName,
//         doctorName,
//         date,
//         prescription,
//         comment
//     };

//     diagnoses.push(newDiagnosis);
//     totalDiagnoses++;
//     renderDiagnoses(diagnoses);
//     closeAddDiagnosisModal();
// }

// Initial rendering of diagnoses
document.addEventListener("DOMContentLoaded", () => {
  renderDiagnoses(diagnoses);
});
