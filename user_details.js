const getUserParams = () =>{
    const user_id = localStorage.getItem('user_id');
    fetch(`https://testing-8az5.onrender.com/users/${user_id}`)
    .then((res) => res.json())
    .then((data) => displayUserDetails(data));
};


const displayUserDetails = (user) =>{
    const parent = document.getElementById("user-details");
    const div = document.createElement("div");
    div.classList.add("user-details-container");
    div.innerHTML = `
        <div class="user-img">
          <img src="./hospitao_frontend/doctor.jpeg">
        </div>
        <div class="user-info">
          <h1>${user.username}</h1>
          <h3>${user.first_name + user.last_name}</h3>
          <h3>${user.email}</h3>
        </div>
    `;
    parent.appendChild(div);
};

getUserParams();