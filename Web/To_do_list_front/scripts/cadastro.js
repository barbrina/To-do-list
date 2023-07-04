async function handleSubmit(e) {
  e.preventDefault();

  const data = {
    name: $("#name").val(),
    username: $("#user").val(),
    email: $("#email").val(),
    phone: $("#telefone").val(),
    password: $("#senha").val(),
  };

  const response = await fetch("http://localhost:3000/users", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });

  window.location.href = "./entrar.html";
}
