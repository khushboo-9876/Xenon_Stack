$("#queryForm").submit(function (e) {
  e.preventDefault();
  var Alert = document.getElementById("queryFormAlert");
  Alert.innerHTML = "";
  var button = document.getElementById("queryFormButton");
  var ID = "X" + Date.now();
  var Name = $("#name").val();
  var Cno = $("#cno").val();
  var email = $("#email").val();
  var tos = $("#tos").val();
  var query = $("#message").val();
  if (Name != "" && email != "" && tos != "" && query != "" && Cno != "") {
    button.innerHTML = `Loading.. <i class="fas fa-spinner fa-spin"></i>`;
    const Data = {
      ID: ID,
      Name: Name,
      Cno: Cno,
      Email: email,
      TOS: tos,
      Query: query,
      Status: "Submitted",
      Date: new Date().toLocaleDateString(),
    };
    firebase
      .database()
      .ref("Query/" + ID)
      .set(Data);
    AlertText = `
  <div class="alert alert-warning alert-dismissible fade show text-center" role="alert">
    <strong>Submitted Successfully!</strong>
    <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
  </div>`;
    Alert.innerHTML = AlertText;
    button.innerHTML = `Submitted`;
    $("#queryForm")[0].reset();
  } else {
    AlertText = `
    <div class="alert alert-warning alert-dismissible fade show text-center" role="alert">
      <strong>Missing !</strong> Some fields are missing.
      <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
    </div>`;
    Alert.innerHTML = AlertText;
  }
});
