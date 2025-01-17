interface Diagnosis {
  diagnosis_id: number;
  diagnosisName: string;
  prescription: string;
  comment: string;
  patient: Patient;
  doctor: User;
  visible: boolean;
  created_at: string;
  updated_at: string;
}

interface Patient {
  patient_id: number;
  first_name: string;
  last_name: string;
  email: string;
  phone_number: string;
  date_of_birth: string;
  gender: string;
  registered_by: string;
  address: string;
  created_at: string;
  updated_at: string;
}

let patients: Patient[] = [];
let totalDiagnoses: number = 0;
let diagnosis: Diagnosis[] = [];
let currentPatient: Patient;

document.addEventListener("DOMContentLoaded", () => {
  // Function to get query parameters from the URL
  function getQueryParams(): { [key: string]: string } {
    const params: { [key: string]: string } = {};
    window.location.search
      .substring(1)
      .split("&")
      .forEach((param) => {
        const [key, value] = param.split("=");
        params[key] = decodeURIComponent(value);
      });
    return params;
  }

  // Get the patient_id from the query parameters
  const queryParams = getQueryParams();
  const patientId = queryParams["patient_id"];

  console.log("Patient ID from URL:", patientId); // Debugging line

  const fetchPaitient = async (): Promise<void> => {
    try {
      const response = await fetch("http://localhost:4000/api/v1/patients");
      const data: Patient[] = await response.json();
      patients = data;

      currentPatient = patients.filter(
        (patient) => patient.patient_id.toString() === patientId
      )[0];
      fetchDiagnosis(currentPatient);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const fetchDiagnosis = async (currentPatient: Patient): Promise<void> => {
    try {
      const response = await fetch("http://localhost:4000/api/v1/diagnoses");
      const data: Diagnosis[] = await response.json();
      diagnosis = data;

      const currentDiagnosis = diagnosis.filter(
        (current_diagnosis) =>
          current_diagnosis.patient.patient_id === currentPatient.patient_id
      );
      totalDiagnoses = currentDiagnosis.filter((d) => d.visible).length;
      renderDiagnosis(currentDiagnosis);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  // Initial rendering of diagnoses
  fetchPaitient();
});

// Function to add a diagnosis
const addDiagnosis = async (event: Event): Promise<void> => {
  event.preventDefault();

  const token = localStorage.getItem("jwtToken");
  if (!token) {
    console.error("No token found in local storage");
    return;
  }

  const base64Payload = token.split(".")[1];
  const payload = JSON.parse(atob(base64Payload));
  const doctorId = payload.user_id;

  // Fetch input values from the form
  const diagnosisName = (
    document.getElementById("diagnosisName") as HTMLInputElement
  ).value;
  const diagnosisDetails = (
    document.getElementById("diagnosisComment") as HTMLInputElement
  ).value;
  const prescription = (
    document.getElementById("diagnosisPrescription") as HTMLInputElement
  ).value;

  // Create the diagnosis data object
  const diagnosisData = {
    diagnosis_name: diagnosisName,
    diagnosis_details: diagnosisDetails || undefined, // Optional field
    prescription: prescription || undefined, // Optional field
    patient_id: currentPatient.patient_id,
    doctor_id: doctorId,
    visible: true,
  };

  try {
    // Send POST request to add diagnosis
    const diagnosisResponse = await fetch(
      "http://localhost:4000/api/v1/diagnoses",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(diagnosisData),
      }
    );

    if (diagnosisResponse.status !== 201) {
      throw new Error("Failed to add diagnosis");
    }

    const newDiagnosis = await diagnosisResponse.json();
    console.log("Diagnosis added successfully:", newDiagnosis);

    // Update the counter (if applicable) and UI
    totalDiagnoses++;
    updateCounters();

    // Assuming `diagnosis` is an array that holds all diagnoses
    diagnosis.push(newDiagnosis);
    renderDiagnosis(diagnosis); // Update UI with new diagnosis
    closeAddDiagnosisModal(); // Close the modal after successful submission
  } catch (error) {
    console.error("Error adding diagnosis:", error);
  }
};

// Renders the diagnosis table
function renderDiagnosis(diagnoses: Diagnosis[]): void {
  const diagnosisTableBody = document.getElementById(
    "diagnosisTableBody"
  );
  if (!diagnosisTableBody) {
    console.error("Diagnosis table body element not found");
    return;
  }
  diagnosisTableBody.innerHTML = "";
  console.log("Diagnoses to render:", diagnoses); // Debugging line
  diagnoses.forEach((diag, index) => {
    if (diag.visible === true) {
      const row = `<tr>
                <td>${diag.diagnosisName}</td>
                <td>${diag.doctor.name}</td>
                <td>${diag.created_at}</td>
                <td>
                    <button class="btn btn-primary btn-sm" onclick="viewDiagnosis(${index})">View Details</button>
                </td>
            </tr>`;
      diagnosisTableBody.innerHTML += row;
    }
  });
  updateCounters();
}

// View a diagnosis (opens modal with details)
function viewDiagnosis(index: number): void {
  const diagnosis = diagnosis[index];
  (document.getElementById("viewDiagnosisName") as HTMLInputElement).value =
    diagnosis.diagnosisName;
  (document.getElementById("viewDoctorName") as HTMLInputElement).value =
    diagnosis.doctor.name;
  (document.getElementById("viewDate") as HTMLInputElement).value =
    diagnosis.created_at;
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
  const filteredDiagnoses = diagnosis.filter(
    (diagnosis) =>
      diagnosis.diagnosisName.toLowerCase().includes(searchValue) ||
      diagnosis.doctor.name.toLowerCase().includes(searchValue) ||
      diagnosis.created_at.toLowerCase().includes(searchValue)
  );
  renderDiagnosis(filteredDiagnoses);
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
