const API = "https://insighthub-backend-1.onrender.com";

console.log("SCRIPT LOADED");

// GET USER
let user = JSON.parse(localStorage.getItem("user") || "{}");


// =======================
// LOGIN
// =======================
document.addEventListener("DOMContentLoaded", () => {

    const loginForm = document.getElementById("loginForm");

    if (loginForm) {
        loginForm.addEventListener("submit", async (e) => {
            e.preventDefault();

            const email = document.getElementById("email").value;
            const password = document.getElementById("password").value;

            const res = await fetch(API + "/auth/login", {
                method: "POST",
                headers: {"Content-Type": "application/json"},
                body: JSON.stringify({ email, password })
            });

            const data = await res.json();

            if (data.user) {
                localStorage.setItem("user", JSON.stringify(data.user));

                if (data.user.role === "admin") {
                    window.location.href = "admin.html";
                } else {
                    window.location.href = "dashboard.html";
                }
            } else {
                document.getElementById("loginError").innerText = data.error || "Login failed";
            }
        });
    }


    // =======================
    // SUBMIT PROJECT
    // =======================
    const projectForm = document.getElementById("projectForm");

    if (projectForm) {
        projectForm.addEventListener("submit", async (e) => {
            e.preventDefault();

            await fetch(API + "/projects/create", {
                method: "POST",
                headers: {"Content-Type": "application/json"},
                body: JSON.stringify({
                    title: document.getElementById("title").value,
                    abstract: document.getElementById("abstract").value,
                    department: document.getElementById("department").value,
                    supervisor: document.getElementById("supervisor").value,
                    year: document.getElementById("year").value,
                    file_url: document.getElementById("file_url").value,
                    video_link: document.getElementById("video_link").value,
                    user_id: user.id
                })
            });

            alert("Project submitted");
            projectForm.reset();
        });
    }
});


// =======================
// LOAD APPROVED PROJECTS
// =======================
window.loadProjects = async function () {
    const res = await fetch(API + "/projects");
    const data = await res.json();

    const container = document.getElementById("projects");
    container.innerHTML = "";

    if (data.length === 0) {
        container.innerHTML = "<p>No approved projects yet</p>";
        return;
    }

    data.forEach(p => {
        container.innerHTML += `
            <div class="card">
                <h3>${p.title}</h3>
                <p>${p.abstract}</p>
            </div>
        `;
    });
};


// =======================
// LOAD PENDING PROJECTS
// =======================
window.loadPending = async function () {
    const res = await fetch(API + "/projects/pending");
    const data = await res.json();

    const container = document.getElementById("pending");
    container.innerHTML = "";

    if (data.length === 0) {
        container.innerHTML = "<p>No pending projects</p>";
        return;
    }

    data.forEach(p => {
        container.innerHTML += `
            <div class="card">
                <h3 onclick="viewProject(${p.id})" style="cursor:pointer; color:#2c5aa0;">
                    ${p.title}
                </h3>
                <p>${p.abstract}</p>

                <button onclick="approveProject(${p.id})">Approve</button>
                <button onclick="rejectProject(${p.id})">Reject</button>
            </div>
        `;
    });
};


// =======================
// VIEW FULL PROJECT (POPUP)
// =======================
window.viewProject = async function (id) {
    const res = await fetch(API + "/projects/pending");
    const data = await res.json();

    const project = data.find(p => p.id === id);

    document.getElementById("popupTitle").innerText = project.title;
    document.getElementById("popupAbstract").innerText = project.abstract;
    document.getElementById("popupDept").innerText = project.department;
    document.getElementById("popupSup").innerText = project.supervisor;
    document.getElementById("popupYear").innerText = project.year;

    document.getElementById("popupFile").href = project.file_url || "#";
    document.getElementById("popupVideo").href = project.video_link || "#";

    document.getElementById("popup").style.display = "block";
};


// =======================
// CLOSE POPUP
// =======================
window.closePopup = function () {
    document.getElementById("popup").style.display = "none";
};


// =======================
// APPROVE
// =======================
window.approveProject = async function (id) {
    await fetch(API + "/projects/approve/" + id, {
        method: "PUT"
    });

    alert("Approved");
    loadPending();
};


// =======================
// REJECT
// =======================
window.rejectProject = async function (id) {
    await fetch(API + "/projects/reject/" + id, {
        method: "PUT"
    });

    alert("Rejected");
    loadPending();
};