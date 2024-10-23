const getDetails = () =>{
    const param = new URLSearchParams(window.location.search).get("doctorID");
    fetch(`https://testing-8az5.onrender.com/doctor/list/${param}`)
    .then((res) => res.json())
    .then((data) => displayDetails(data));
};


const displayDetails = (doctor) =>{
    const parent = document.getElementById("doc-details");
    const div = document.createElement("div");
    div.classList.add("doc-details-container");
    div.innerHTML = `
        <div class="doctor-img">
            <img src="${doctor.image}">
        </div>
        <div class="doc-info">
            <h1>${doctor.full_name}</h1>
            ${doctor.specialization.map((item) => {
                return `<button class="doc-details-btn">${item}</button>`;
            })}
            ${doctor.designation.map((item) => {
                return `<h4>${item}</h4>`;
            })}
            <p class="w-50">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</p>
            <h4>Fees: ${doctor.fee} BDT</h4>
            <button>Take Appointment</button>
        </div>
    `;
    parent.appendChild(div);
};


getDetails();