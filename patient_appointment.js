const loadAppointments = () => {
    const patient_id = localStorage.getItem("patient_id");
    fetch(`https://testing-8az5.onrender.com/appointment/?patient_id=${patient_id}`)
    .then((res) => res.json())
    .then((data) => {
        console.log(data);
        data.forEach((item) => {
            const parent = document.getElementById("table-body");
            const tr = document.createElement("tr");
            tr.innerHTML = `
            <td>${item.id}</td>
            <td>${item.doctor}</td>
            <td>${item.appointment_type}</td>
            <td>${item.appointment_status}</td>
            <td>${item.symptom}</td>
            ${
                item.appointment_status == "Pending" ? `<td class="text-danger">X</td>` : `<td>X</td>`
            }
            `;
            parent.appendChild(tr);
        });
    });
};


loadAppointments();