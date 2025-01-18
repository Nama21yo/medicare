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
var profileButton = document.getElementById("profile-button");
var editProfileButton = document.getElementById("edit-profile-button");
var profileSection = document.getElementById("profile");
var editProfileForm = document.getElementById("edit-profile");
var backToHomeButton = document.querySelector(".btn-secondary");
var Menu = document.getElementById("menu-btn");
var userInfo = document.getElementById("user-info");
var profileUrl = "http://localhost:4000/api/v1/users/user";
var updateUrl = "http://localhost:4000/api/v1/users/update/";
document.addEventListener("DOMContentLoaded", function () {
    const profileSection = document.getElementById("myprofile");
    if (profileSection) {
        var storedProfile = localStorage.getItem("profileData");
        if (storedProfile) {
            try {
                var profileData = JSON.parse(storedProfile);
                renderProfile(profileData);
            }
            catch (error) {
                console.error("Error parsing stored profile data:", error);
                showMyProfile();
            }
        }
        else {
            showMyProfile();
        }
    }
});
// Helper: Fetch user data
function fetchUserData() {
    return __awaiter(this, void 0, void 0, function () {
        var response, err_1;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 2, , 3]);
                    return [4 /*yield*/, fetch(profileUrl, {
                            method: "GET",
                            headers: {
                                Authorization: "Bearer ".concat(localStorage.getItem("jwtToken")),
                            },
                        })];
                case 1:
                    response = _a.sent();
                    if (!response.ok) {
                        throw new Error("HTTP error! status: ".concat(response.status));
                    }
                    return [2 /*return*/, response.json()];
                case 2:
                    err_1 = _a.sent();
                    console.error("Error fetching user data:", err_1);
                    return [2 /*return*/, null];
                case 3: return [2 /*return*/];
            }
        });
    });
}
// Helper: Render profile based on role
function renderProfile(data) {
    if (!profileSection && !userInfo) {
        console.error("Profile section element not found.");
        return;
    }
    var username = data.username, role = data.role, email = data.email, created_at = data.created_at;
    var commonDetails = "\n    <h3>".concat(username, "</h3>\n    <p>Email: ").concat(email, "</p>\n    <p>Created At: ").concat(new Date(created_at).toLocaleString(), "</p>\n  ");
    if (role.name === "Branch") {
        if (userInfo) {
            userInfo.innerHTML = "\n                  <img src=\"imgs/profile.png\" alt=\"Profile Picture\">\n                  <h3>".concat(data.username, "</h3>\n                ");
        }
        else {
            profileSection.innerHTML = "\n        ".concat(commonDetails, "\n        <p>Role: Branch</p>\n      ");
        }
    }
    else if (role.name === "Head Office") {
        if (userInfo) {
            userInfo.innerHTML = "\n          <img src=\"imgs/profile.png\" alt=\"Profile Picture\">\n          <h3>".concat(data.username, "</h3>\n        ");
        }
        else {
            profileSection.innerHTML = "\n        ".concat(commonDetails, "\n        <p>Role: Head Office</p>\n      ");
        }
    }
    else if (role.name === "Doctor") {
        if (userInfo) {
            userInfo.innerHTML = "\n          <img src=\"imgs/profile.png\" alt=\"Profile Picture\">\n          <h3>".concat(data.username, "</h3>\n        ");
        }
        else {
            profileSection.innerHTML = "\n        ".concat(commonDetails, "\n        <p>Role: ").concat(role.name, "</p>\n      ");
        }
    }
    else if (role.name === "Receptionist") {
        if (userInfo) {
            userInfo.innerHTML = "\n          <img src=\"imgs/profile.png\" alt=\"Profile Picture\">\n          <h3>".concat(data.username, "</h3>\n        ");
        }
        else {
            profileSection.innerHTML = "\n        ".concat(commonDetails, "\n        <p>Role: ").concat(role.name, "</p>\n      ");
        }
    }
    else {
        if (userInfo) {
            userInfo.innerHTML = "\n          <img src=\"imgs/profile.png\" alt=\"Profile Picture\">\n          <h3>".concat(data.username, "</h3>\n        ");
        }
        else {
            profileSection.innerHTML = "\n        ".concat(commonDetails, "\n        <p>Role: ").concat(role.name, "</p>\n      ");
        }
    }
}
// Show Profile
function showMyProfile() {
    fetchUserData().then(function (data) {
        if (data) {
            renderProfile(data);
        }
        else {
            if (profileSection) {
                profileSection.innerHTML = "<h3>Error loading profile</h3>";
            }
            if (userInfo) {
                userInfo.innerHTML = "<h3>Error loading profile</h3>";
            }
        }
    });
}
// Edit Profile
function editProfile() {
    var _this = this;
    if (!editProfileForm || !profileSection) {
        console.error("Edit profile form or profile section element not found.");
        return;
    }
    editProfileForm.addEventListener("submit", function (e) { return __awaiter(_this, void 0, void 0, function () {
        var formData, userId, updatedData, response, data, err_2;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    e.preventDefault();
                    formData = new FormData(editProfileForm);
                    userId = getUserIdFromToken();
                    if (!userId) {
                        console.error("User ID not found from token");
                        return [2 /*return*/];
                    }
                    updatedData = {
                        username: formData.get("username"),
                        password: formData.get("newPassword"),
                    };
                    _a.label = 1;
                case 1:
                    _a.trys.push([1, 4, , 5]);
                    return [4 /*yield*/, fetch("".concat(updateUrl).concat(userId), {
                            method: "PUT",
                            headers: {
                                "Content-Type": "application/json",
                                Authorization: "Bearer ".concat(localStorage.getItem("jwtToken")),
                            },
                            body: JSON.stringify(updatedData),
                        })];
                case 2:
                    response = _a.sent();
                    if (!response.ok) {
                        throw new Error("HTTP error! status: ".concat(response.status));
                    }
                    return [4 /*yield*/, response.json()];
                case 3:
                    data = _a.sent();
                    profileSection.innerHTML = "\n        <h3>Profile Updated!</h3>\n        <p>Updated Username: ".concat(data.updatedUser.username, "</p>\n        <p>Updated Email: ").concat(data.updatedUser.email, "</p>\n        <p>Updated At: ").concat(new Date().toLocaleString(), "</p>\n      ");
                    alert("Profile Updated Successfully");
                    return [3 /*break*/, 5];
                case 4:
                    err_2 = _a.sent();
                    console.error("Error updating profile:", err_2);
                    profileSection.innerHTML = "<h3>Error updating profile. Please try again later.</h3>";
                    return [3 /*break*/, 5];
                case 5: return [2 /*return*/];
            }
        });
    }); });
}
// Get User ID from Token
function getUserIdFromToken() {
    var token = localStorage.getItem("jwtToken");
    if (!token) {
        console.error("No token found in local storage");
        return null;
    }
    try {
        var base64Payload = token.split(".")[1];
        var payload = JSON.parse(atob(base64Payload));
        return payload.id;
    }
    catch (error) {
        console.error("Error decoding JWT token:", error);
        return null;
    }
}
// Redirect to Home Based on Role
function redirectToHome() {
    fetchUserData().then(function (data) {
        if (data) {
            if (data.role.name === "Branch") {
                window.location.href = "./admin.html";
            }
            else if (data.role.name === "Head Office") {
                window.location.href = "./head_office.html";
            }
            else if (data.role.name === "Receptionist") {
                window.location.href = "./receptionist_queue.html";
            }
            else if (data.role.name === "Doctor") {
                window.location.href = "./doctor_queue.html";
            }
            else {
                window.location.href = "./patient.html";
            }
        }
        else {
            console.error("Error fetching user data for redirection.");
        }
    });
}
// Event Listeners
if (profileButton) {
    profileButton.addEventListener("click", showMyProfile);
}
else {
    console.error("Profile button element not found.");
}
if (Menu) {
    Menu.addEventListener("click", showMyProfile);
}
else {
    console.error("Menu button element not found.");
}
if (editProfileButton) {
    editProfileButton.addEventListener("click", editProfile);
}
else {
    console.error("Edit profile button element not found.");
}
if (backToHomeButton) {
    backToHomeButton.addEventListener("click", redirectToHome);
}
else {
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
