// Sample user data (for demonstration purposes)
const users = [
    { username: "student", password: "student123", role: "student" },
];

// Function to handle login
function handleLogin(event) {
    event.preventDefault(); // Prevent form submission

    // Get input values
    const username = document.getElementById("username").value;
    const password = document.getElementById("password").value;

    // Find the user in the array
    const user = users.find(
        (u) => u.username === username && u.password === password
    );

    if (user) {
        switch (user.role) {
            case "student":
                window.location.href = "dashboard.html";
                break;
            default:
                alert("Invalid role!");
        }
    } else {
        alert("Invalid username or password!");
    }
}

// Attach event listener to the form
document.getElementById("loginForm").addEventListener("submit", handleLogin);