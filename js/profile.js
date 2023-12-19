firebase.auth().onAuthStateChanged((user) => {
  if (!user) {
    location.replace("login.html");
  }
  // console.log(user);
  var UserEmail = user.email;
  var UserName = user.displayName;
  var UserRoll = user.photoURL;

  document.getElementById("last-login").innerHTML = `
    <center> Session Infomation</center>
    Login As: Admin XenonStack<br>
    Login through: ${UserEmail}<br>
    Last Login: ${user.metadata.lastSignInTime}
    `;
  // Values
  document.getElementById("admin-mail").value = UserEmail;
  document.getElementById("new-name").value = UserName;
  document.getElementById("new-phone").value = UserRoll;
});

function hideall() {
  document.getElementById("dashboard-section").classList.add("d-none");
  document.getElementById("query-section").classList.add("d-none");
}
function showdashboard_section() {
  hideall();
  document.getElementById("dashboard-section").classList.remove("d-none");
}

function showquery_section() {
  hideall();
  document.getElementById("query-section").classList.remove("d-none");
}

// Count Queries
firebase
  .database()
  .ref("Query")
  .on("value", function (snapshot) {
    document.getElementById("total_query").innerHTML = snapshot.numChildren();
  });

// Count Resolved Query
firebase
  .database()
  .ref("Query")
  .on("value", function (snapshot) {
    var count = 0;
    snapshot.forEach(function (childSnapshot) {
      var childData = childSnapshot.val();
      if (childData.status == "Resolved") {
        count++;
      }
    });
    document.getElementById("total_query_resolved").innerHTML = count;
  });

// Logout Function with Prompt
function logoutwithprompt() {
  Swal.fire({
    icon: "question",
    title: "Are you sure you want to logout?",
    showDenyButton: true,
    confirmButtonText: "Yes",
    denyButtonText: `No`,
  }).then((result) => {
    if (result.isConfirmed) {
      firebase.auth().signOut();
    }
  });
}

getQueryDetails();

function getQueryDetails() {
  firebase
    .database()
    .ref("Query")
    .on("value", function (snapshot) {
      document.getElementById("contact-table").innerHTML = "";
      var e = 1;
      snapshot.forEach(function (childSnapshot) {
        data = childSnapshot.val();
        key = childSnapshot.key;
        row = `<tr>
                    <td>${e++}</td>
                    <td>${data.ID}</td>
                    <td>${data.Date}</td>
                    <td>${data.Name}</td>
                    <td>${data.TOS}</td>
                    <td>${data.Query}</td>
                    <td>${data.Status}</td>
                    <td>
                        <a href="https://web.whatsapp.com/send?phone=+91${
                          data.Cno
                        }" class="table_button" target="_blank"><i class="fa fa-brands fa-whatsapp"></i></a>
                        <a href="mailto:${
                          data.Email
                        }" class="table_button" target="_blank"><i class="fa fa-envelope"></i></a>
                    </td>
                    <td>
                        <a href="#" class="table_button" onclick="editQuery('${
                          data.ID
                        }')"><i class="fa fa-edit"></i></a>
                    </td>
                </tr>`;
        document.getElementById("contact-table").innerHTML += row;
      });
    });
}

function editQuery(ID) {
  var Status = prompt("Enter Status");
  if (Status != null) {
    firebase
      .database()
      .ref("Query/" + ID)
      .update({
        Status: Status,
      });
  }
  getQueryDetails();
}
