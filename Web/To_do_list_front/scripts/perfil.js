async function getPerfil(e) {
  const token = localStorage.getItem("token");

  const response = await fetch("http://localhost:3000/users/me", {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      authorization: `Bearer ${token}`,
    },
  });
  const body = await response.json();
  $("#nome").text(body.data.name);
  $("#username").text(body.data.username);
  $("#tel").text(body.data.phone);
  $("#email").text(body.data.email);
}

window.onload = getPerfil; //executa a funcao toda vez q a pag carregar
