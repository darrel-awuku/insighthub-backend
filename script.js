const API = "http://localhost:5000";

let user = JSON.parse(localStorage.getItem("user"));

// LOGIN
if (document.getElementById("loginForm")) {
    document.getElementById("loginForm").onsubmit = async (e) => {
        e.preventDefault();

        let res = await fetch(API + "/auth/login", {
            method: "POST",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify({
                email: email.value,
                password: password.value
            })
        });

        let data = await res.json();

        if (data.user) {
            localStorage.setItem("user", JSON.stringify(data.user));

            if (data.user.role === "admin") {
                window.location = "admin.html";
            } else {
                window.location = "dashboard.html";
            }
        }
    };
}

// SUBMIT PROJECT
if (document.getElementById("projectForm")) {
    document.getElementById("projectForm").onsubmit = async (e) => {
        e.preventDefault();

        await fetch(API + "/projects/create", {
            method: "POST",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify({
                title: title.value,
                abstract: abstract.value,
                department: department.value,
                supervisor: supervisor.value,
                year: year.value,
                file_url: file_url.value,
                video_link: video_link.value,
                user_id: user.id
            })
        });

        alert("Submitted");
    };
}

// LOAD APPROVED
async function loadProjects() {
    let res = await fetch(API + "/projects");
    let data = await res.json();

    projects.innerHTML = "";
    data.forEach(p => {
        projects.innerHTML += `<div class="card">${p.title}</div>`;
    });
}

// LOAD PENDING
async function loadPending() {
    let res = await fetch(API + "/projects/pending");
    let data = await res.json();

    pending.innerHTML = "";

    data.forEach(p => {
        pending.innerHTML += `
        <div class="card" onclick='openPopup(${JSON.stringify(p)})'>
            ${p.title}
        </div>`;
    });
}

// POPUP
function openPopup(p) {
    popup.style.display = "block";
    ptitle.innerText = p.title;
    pabstract.innerText = p.abstract;

    approveBtn.onclick = async () => {
        await fetch(API + "/projects/approve/" + p.id, {method:"PUT"});
        closePopup();
        loadPending();
    };
}

function closePopup() {
    popup.style.display = "none";
}
if (document.getElementById("loginForm")) {
    document.getElementById("loginForm").addEventListener("submit", async (e) => {
        e.preventDefault();

        const email = document.getElementById("email").value;
        const password = document.getElementById("password").value;

        let res = await fetch(API + "/auth/login", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ email, password })
        });

        let data = await res.json();

        if (data.user) {
            localStorage.setItem("user", JSON.stringify(data.user));

            if (data.user.role === "admin") {
                window.location.href = "admin.html";
            } else {
                window.location.href = "dashboard.html";
            }
        } else {
            alert("Login failed");
        }
    });
}