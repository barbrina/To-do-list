async function handleSubmit(e) {
  e.preventDefault();

  const data = {
    username: $("#username").val(),
    password: $("#senha").val(),
  };

  const response = await fetch("http://localhost:3000/users/login", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });

  const body = await response.json();

  if (response.status === 200) {
    localStorage.setItem("token", body.token);
    return (window.location.href = "./homepage.html");
  }

  Swal.fire({ icon: "error", title: body.message });
}
