const profileButton = document.getElementById("profile-button") as HTMLButtonElement | null;
const editProfileButton = document.getElementById("edit-profile-button") as HTMLButtonElement | null;
const profileSection = document.getElementById("profile") as HTMLDivElement | null;
const editProfileForm = document.getElementById("edit-profile") as HTMLFormElement | null;
const backToHomeButton = document.querySelector(".btn-secondary") as HTMLAnchorElement | null;
const Menu = document.getElementById("menu-btn") as HTMLImageElement | null;
const userInfo = document.getElementById("user-info") as HTMLDivElement | null;

const profileUrl = "http://localhost:4000/api/v1/users/user";
const updateUrl = "http://localhost:4000/api/v1/users/update/";

document.addEventListener("DOMContentLoaded", () => {
  const profileSection = document.getElementById("myprofile");
  if (profileSection) {
    const storedProfile = localStorage.getItem("profileData");
    if (storedProfile) {
      try {
        const profileData = JSON.parse(storedProfile);
        renderProfile(profileData);
      } catch (error) {
        console.error("Error parsing stored profile data:", error);
        showMyProfile();
      }
    } else {
      showMyProfile(); 
    }
  }
});

// Helper: Fetch user data
async function fetchUserData(): Promise<any> {
  try {
    const response = await fetch(profileUrl, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("jwtToken")}`,
      },
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    return response.json();
  } catch (err) {
    console.error("Error fetching user data:", err);
    return null;
  }
}

// Helper: Render profile based on role
function renderProfile(data: any): void {
  if (!profileSection && !userInfo) {
    console.error("Profile section element not found.");
    return;
  }

  const { username, role, email, created_at } = data;

  const commonDetails = `
    <h3>${username}</h3>
    <p>Email: ${email}</p>
    <p>Created At: ${new Date(created_at).toLocaleString()}</p>
  `;

  if (role.name === "Branch") {
    if (userInfo) {
              userInfo.innerHTML = `
                  <img src="imgs/profile.png" alt="Profile Picture">
                  <h3>${data.username}</h3>
                `;
    } else {
      profileSection.innerHTML = `
        <img src="imgs/profile.png" alt="Profile Picture">
        ${commonDetails}
        <p>Role: Branch</p>
      `;
    }
  } else if (role.name === "Head Office") {
    if (userInfo) {
      userInfo.innerHTML = `
          <img src="imgs/profile.png" alt="Profile Picture">
          <h3>${data.username}</h3>
        `;
    } else {
      profileSection.innerHTML = `
        <img src="imgs/profile.png" alt="Profile Picture">
        ${commonDetails}
        <p>Role: Head Office</p>
      `;
    }
  } else if(role.name === "Doctor"){
    if (userInfo) {
      userInfo.innerHTML = `
          <img src="imgs/profile.png" alt="Profile Picture">
          <h3>${data.username}</h3>
        `;
    } else {
      profileSection.innerHTML = `
        <img src="imgs/profile.png" alt="Profile Picture">
        ${commonDetails}
        <p>Role: ${role.name}</p>
      `;
    }
  }
  else if(role.name === "Receptionist"){
    if (userInfo) {
      userInfo.innerHTML = `
          <img src="imgs/profile.png" alt="Profile Picture">
          <h3>${data.username}</h3>
        `;
    } else {
      profileSection.innerHTML = `
        <img src="imgs/profile.png" alt="Profile Picture">
        ${commonDetails}
        <p>Role: ${role.name}</p>
      `;
    }
  }
  else {
    if (userInfo) {
      userInfo.innerHTML = `
          <img src="imgs/profile.png" alt="Profile Picture">
          <h3>${data.username}</h3>
        `;
    } else {
      profileSection.innerHTML = `
        <img src="imgs/profile.png" alt="Profile Picture">
        ${commonDetails}
        <p>Role: ${role.name}</p>
      `;
    }
  }
}

// Show Profile
function showMyProfile(): void {
  fetchUserData().then((data) => {
    if (data) {
      renderProfile(data);
    } else {
      if(profileSection){
        profileSection!.innerHTML = "<h3>Error loading profile</h3>";
      }
      if(userInfo){
        userInfo!.innerHTML = "<h3>Error loading profile</h3>";
      }
    }
  });
}

// Edit Profile
function editProfile(): void {
  if (!editProfileForm || !profileSection) {
    console.error("Edit profile form or profile section element not found.");
    return;
  }

  editProfileForm.addEventListener("submit", async (e: Event) => {
    e.preventDefault();

    const formData = new FormData(editProfileForm);
    const userId = getUserIdFromToken();

    if (!userId) {
      console.error("User ID not found from token");
      return;
    }

    const updatedData = {
      username: formData.get("username") as string,
      password: formData.get("newPassword") as string,
    };

    try {
      const response = await fetch(`${updateUrl}${userId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("jwtToken")}`,
        },
        body: JSON.stringify(updatedData),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();

      profileSection.innerHTML = `
        <h3>Profile Updated!</h3>
        <p>Updated Username: ${data.updatedUser.username}</p>
        <p>Updated Email: ${data.updatedUser.email}</p>
        <p>Updated At: ${new Date().toLocaleString()}</p>
      `;

      alert("Profile Updated Successfully");
    } catch (err) {
      console.error("Error updating profile:", err);
      profileSection.innerHTML = "<h3>Error updating profile. Please try again later.</h3>";
    }
  });
}

// Get User ID from Token
function getUserIdFromToken(): string | null {
  const token = localStorage.getItem("jwtToken");
  if (!token) {
    console.error("No token found in local storage");
    return null;
  }

  try {
    const base64Payload = token.split(".")[1];
    const payload = JSON.parse(atob(base64Payload));
    return payload.id;
  } catch (error) {
    console.error("Error decoding JWT token:", error);
    return null;
  }
}

// Redirect to Home Based on Role
function redirectToHome(): void {
  fetchUserData().then((data) => {
    if (data) {
      if (data.role.name === "branch") {
        window.location.href = "./admin.html";
      } else if (data.role.name === "headoffice") {
        window.location.href = "./head_office.html";
      }else if(data.role.name === "receptionist"){
        window.location.href = "./receptionist_queue.html";
      }else if(data.role.name === "doctor"){
        window.location.href = "./doctor_queue.html";
      }
      else {
        window.location.href = "./patient.html";
      }
    } else {
      console.error("Error fetching user data for redirection.");
    }
  });
}

// Event Listeners
if (profileButton) {
  profileButton.addEventListener("click", showMyProfile);
}else {
    console.error("Profile button element not found.");
  }
if (Menu) {
  Menu.addEventListener("click", showMyProfile);
}else {
  console.error("Menu button element not found.");
}

if (editProfileButton) {
  editProfileButton.addEventListener("click", editProfile);
}else {
  console.error("Edit profile button element not found.");
}

if (backToHomeButton) {
  backToHomeButton.addEventListener("click", redirectToHome);
}else {
  console.error("Back to home button element not found.");
}










// const profileButton = document.getElementById(
//   "profile-button"
// ) as HTMLButtonElement | null;
// const editProfileButton = document.getElementById(
//   "edit-profile-button"
// ) as HTMLButtonElement | null;
// const profileSection = document.getElementById(
//   "profile"
// ) as HTMLDivElement | null;
// const editProfileForm = document.getElementById(
//   "edit-profile"
// ) as HTMLFormElement | null;
// const userInfo = document.getElementById("user-info") as HTMLDivElement | null;
// const Menu = document.getElementById("menu-btn") as HTMLDivElement | null;
// const profileUrl = "http://localhost:4000/api/v1/users/user"; // API route for fetching user profile
// const updateUrl = "http://localhost:4000/api/v1/users/update/"; // API route for updating the user

// // Function to show the active profile
// function showMyProfile(): void {
//   if (!profileSection && !userInfo) {
//     console.error("Profile section element not found.");
//     return;
//   }

//   fetch(profileUrl, {
//     method: "GET",
//     headers: {
//       Authorization: `Bearer ${localStorage.getItem("jwtToken")}`, // Send JWT token
//     },
//   })
//     .then((res) => {
//       if (!res.ok) {
//         throw new Error(`HTTP error! status: ${res.status}`);
//       }
//       return res.json();
//     })
//     .then((data) => {
//       //   if (data.accountStatus === "active") {
//       if (userInfo) {
//         userInfo.innerHTML = `
//             <img src="imgs/profile.png" alt="Profile Picture">
//             <h3>${data.username}</h3>
//           `;
//       } else {
//         profileSection.innerHTML = `
//             <h3>${data.username}</h3>
//             <p>Role: ${data.role.name}</p>
//             <p>Email: ${data.email}</p>
//             <p>Created At: ${new Date(data.created_at).toLocaleString()}</p>
//           `;
//       }
//       //   } else {
//       //     if (userInfo) {
//       //       userInfo.innerHTML = `<h3>Profile Not Found or Inactive</h3>`;
//       //     } else {
//       //       profileSection.innerHTML = `<h3>Profile Not Found or Inactive</h3>`;
//       //     }
//       //   }
//     })
//     .catch((err) => {
//       console.error("Error fetching profile:", err);
//       if (userInfo) {
//         userInfo.innerHTML = `<h3>Error loading profile</h3>`;
//       } else {
//         profileSection.innerHTML = `<h3>Error loading profile</h3>`;
//       }
//     });
// }
// function getUserIdFromToken(): string | null {
//   const token = localStorage.getItem("jwtToken");
//   if (!token) {
//     console.error("No token found in local storage");
//     return null;
//   }

//   try {
//     const base64Payload = token.split(".")[1];
//     const payload = JSON.parse(atob(base64Payload));
//     return payload.id; // Extract the user_id from the payload
//   } catch (error) {
//     console.error("Error decoding JWT token:", error);
//     return null;
//   }
// }
// // Function to edit the profile
// function editProfile(): void {
//   if (!editProfileForm || !profileSection) {
//     console.error("Edit profile form or profile section element not found.");
//     return;
//   }

//   editProfileForm.addEventListener("submit", (e: Event) => {
//     e.preventDefault(); // Prevent form from reloading the page

//     const formData = new FormData(editProfileForm);
//     const userId = getUserIdFromToken();
//     if (!userId) {
//       console.error("User ID not found from token");
//       return;
//     }
//     const updatedData = {
//       username: formData.get("username") as string,
//       password: formData.get("newPassword") as string,
//     };

//     fetch(`${updateUrl}${userId}`, {
//       method: "PUT",
//       headers: {
//         "Content-Type": "application/json",
//         Authorization: `Bearer ${localStorage.getItem("jwtToken")}`, // Send JWT token
//       },
//       body: JSON.stringify(updatedData),
//     })
//       .then((res) => {
//         if (!res.ok) {
//           throw new Error(`HTTP error! status: ${res.status}`);
//         }
//         return res.json();
//       })
//       .then((data) => {
//         console.log("Profile updated successfully:", data);

//         profileSection.innerHTML = `
//           <h3>Profile Updated!</h3>
//           <p>Updated Username: ${data.updatedUser.username}</p>
//           <p>Updated Email: ${data.updatedUser.email}</p>
//           <p>Updated At: ${new Date().toLocaleString()}</p>
//         `;

//         alert("Profile Updated Successfully");
//       })
//       .catch((err) => {
//         console.error("Error updating profile:", err);
//         profileSection.innerHTML = `
//           <h3>Error updating profile. Please try again later.</h3>
//         `;
//       });
//   });
// }

// // Event Listeners
// if (profileButton) {
//   profileButton.addEventListener("click", showMyProfile);
// } else {
//   console.error("Profile button element not found.");
// }

// if (Menu) {
//   Menu.addEventListener("click", showMyProfile);
// } else {
//   console.error("Menu button element not found.");
// }

// if (editProfileButton) {
//   editProfileButton.addEventListener("click", editProfile);
// } else {
//   console.error("Edit profile button element not found.");
// }