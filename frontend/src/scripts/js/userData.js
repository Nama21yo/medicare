var profileButton = document.getElementById("profile-button");
var editProfileButton = document.getElementById("edit-profile-button");
var profileSection = document.getElementById("profile");
var editProfileForm = document.getElementById("edit-profile");
var userInfo = document.getElementById("user-info");
var Menu = document.getElementById("menu-btn");
var profileUrl = "http://localhost:4000/api/v1/users/user"; // API route for fetching user profile
var updateUrl = "http://localhost:4000/api/v1/users/update/"; // API route for updating the user
// Function to show the active profile
function showMyProfile() {
    if (!profileSection && !userInfo) {
        console.error("Profile section element not found.");
        return;
    }
    fetch(profileUrl, {
        method: "GET",
        headers: {
            Authorization: "Bearer ".concat(localStorage.getItem("jwtToken")), // Send JWT token
        },
    })
        .then(function (res) {
        if (!res.ok) {
            throw new Error("HTTP error! status: ".concat(res.status));
        }
        return res.json();
    })
        .then(function (data) {
        //   if (data.accountStatus === "active") {
        if (userInfo) {
            userInfo.innerHTML = "\n            <img src=\"imgs/profile.png\" alt=\"Profile Picture\">\n            <h3>".concat(data.username, "</h3>\n          ");
        }
        else {
            profileSection.innerHTML = "\n            <h3>".concat(data.username, "</h3>\n            <p>Role: ").concat(data.role.name, "</p>\n            <p>Email: ").concat(data.email, "</p>\n            <p>Created At: ").concat(new Date(data.created_at).toLocaleString(), "</p>\n          ");
        }
        //   } else {
        //     if (userInfo) {
        //       userInfo.innerHTML = `<h3>Profile Not Found or Inactive</h3>`;
        //     } else {
        //       profileSection.innerHTML = `<h3>Profile Not Found or Inactive</h3>`;
        //     }
        //   }
    })
        .catch(function (err) {
        console.error("Error fetching profile:", err);
        if (userInfo) {
            userInfo.innerHTML = "<h3>Error loading profile</h3>";
        }
        else {
            profileSection.innerHTML = "<h3>Error loading profile</h3>";
        }
    });
}
function getUserIdFromToken() {
    var token = localStorage.getItem("jwtToken");
    if (!token) {
        console.error("No token found in local storage");
        return null;
    }
    try {
        var base64Payload = token.split(".")[1];
        var payload = JSON.parse(atob(base64Payload));
        return payload.id; // Extract the user_id from the payload
    }
    catch (error) {
        console.error("Error decoding JWT token:", error);
        return null;
    }
}
// Function to edit the profile
function editProfile() {
    if (!editProfileForm || !profileSection) {
        console.error("Edit profile form or profile section element not found.");
        return;
    }
    editProfileForm.addEventListener("submit", function (e) {
        e.preventDefault(); // Prevent form from reloading the page
        var formData = new FormData(editProfileForm);
        var userId = getUserIdFromToken();
        if (!userId) {
            console.error("User ID not found from token");
            return;
        }
        var updatedData = {
            username: formData.get("username"),
            password: formData.get("newPassword"),
        };
        fetch("".concat(updateUrl).concat(userId), {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
                Authorization: "Bearer ".concat(localStorage.getItem("jwtToken")), // Send JWT token
            },
            body: JSON.stringify(updatedData),
        })
            .then(function (res) {
            if (!res.ok) {
                throw new Error("HTTP error! status: ".concat(res.status));
            }
            return res.json();
        })
            .then(function (data) {
            console.log("Profile updated successfully:", data);
            profileSection.innerHTML = "\n          <h3>Profile Updated!</h3>\n          <p>Updated Username: ".concat(data.updatedUser.username, "</p>\n          <p>Updated Email: ").concat(data.updatedUser.email, "</p>\n          <p>Updated At: ").concat(new Date().toLocaleString(), "</p>\n        ");
            alert("Profile Updated Successfully");
        })
            .catch(function (err) {
            console.error("Error updating profile:", err);
            profileSection.innerHTML = "\n          <h3>Error updating profile. Please try again later.</h3>\n        ";
        });
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
// Function to store action and navigate
function storeActionAndNavigates() {
    localStorage.setItem("action", "clickButton");
    window.location.href = "profile.html";
}
var action = localStorage.getItem("action");
if (action === "clickButton") {
    var targetButton = document.querySelector("#profile-button");
    if (targetButton) {
        targetButton.click();
    }
    localStorage.removeItem("action");
}
function storeActionAndNavigat() {
    localStorage.setItem("action", "clickButton");
    window.location.href = "receptionist_profile.html";
}
var actio = localStorage.getItem("action");
if (actio === "clickButton") {
    var targetButton = document.querySelector("#profile-button");
    if (targetButton) {
        targetButton.click();
    }
    localStorage.removeItem("action");
}
