const getParams = () =>{
    const param = new URLSearchParams(window.location.search).get("doctorID"); //catch info with ID
    // doctor details
    fetch(`https://testing-8az5.onrender.com/doctor/list/${param}`)
    .then((res) => res.json())
    .then((data) => displayDocDetails(data));

    // doctor review
    fetch(`https://testing-8az5.onrender.com/doctor/review/?doctor_id=${param}`)
    .then((res) => res.json())
    .then((data) => displayDocReview(data));

    // doctor appointment time
    fetch(`https://testing-8az5.onrender.com/doctor/availabletime/?doctor_id=${param}`)
    .then((res) => res.json())
    .then((data) => displayTime(data));
};


const handleAppointment = () =>{
    const doctor_ID = new URLSearchParams(window.location.search).get("doctorID");
    const status = document.getElementsByName("status");
    const selectedStatus = Array.from(status).find((button) => button.checked);
    const symptom = document.getElementById("symptom").value;
    const time = document.getElementById("time-container");
    const selectedTime = time.options[time.selectedIndex]
    // console.log(selectedStatus.value, symptom, selectedTime.value);
    const patient_id = localStorage.getItem("patient_id");
    const info = {
        appointment_type : selectedStatus.value,
        appointment_status : "Pending",
        time : selectedTime.value,
        symptom : symptom,
        cancel : false,
        patient : patient_id,
        doctor : doctor_ID,
    };
    console.log(info);
    fetch("https://testing-8az5.onrender.com/appointment/", {
        method:"POST",
        headers:{"content-type":"application/json"},
        body:JSON.stringify(info),
    })
    .then((res) => res.json())
    .then((data) => {
        console.log(data);
        window.location.href="./patient_appointment.html";
    });
};


const displayTime = (times) =>{
    const parent = document.getElementById("time-container");
    times.forEach((time) => {
        const option = document.createElement("option");
        option.value = time.id;
        option.innerText = time.name;
        parent.appendChild(option);
    });
};


const displayDocReview = (reviews) => {
    reviews.forEach((review) => {
        const parent = document.getElementById("doc-review-container");
        const div = document.createElement("div");
        div.classList.add("review-card")
        div.innerHTML = `
            <img src="./hospitao_frontend/doctor.jpeg">
            <h4>${review.reviewer}</h4>
            <p>${review.body.slice(0, 200)}</p>
            <h6>${review.rating}</h6>
        `;
        parent.appendChild(div);
    });
};


const displayDocDetails = (doctor) =>{
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
            <button type="button" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#exampleModal">
                Take Appointment
            </button>
        </div>
    `;
    parent.appendChild(div);
};


// const loadPatientId = () => {
//     const user_id = localStorage.getItem("user_id");
//     fetch(`https://testing-8az5.onrender.com/patient/list/?user=${user_id}/`)
//     .then((res) => res.json())
//     .then((data) => {
//         console.log(data);
//         localStorage.setItem("patient_id", data[0].id);
//     });
// };


const loadPatientId = () => {
    const user_id = localStorage.getItem("user_id");
    fetch(`https://testing-8az5.onrender.com/patient/list/?user=${user_id}/`)
    .then((res) => res.json())
    .then((data) => {
        console.log(data);
        const patient = data.find(patient => patient.user == user_id);
        if (patient) {
            localStorage.setItem("patient_id", patient.id);
            console.log(patient);
        } else {
            console.error('No patient found for this user.');
        }
    })
    .catch((error) => {
        console.error('Error fetching patient ID:', error);
    });
};



loadPatientId();
getParams();