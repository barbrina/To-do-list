async function showLists(e) {
  const token = localStorage.getItem("token");

  const response = await fetch("http://localhost:3000/list/all", {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      authorization: `Bearer ${token}`,
    },
  });

  const lists = await response.json();
  console.log(response.status);
  if (response.status === 200) {
    for (var i = 0; i < lists.length; i++) {
      const element = lists[i];

      const tr = document.createElement("tr");

      tr.innerHTML = `
      <td class="py-2 px-4 text-center"><a onclick="toList('${
        element.id
      }')" href="#"
      class=" hover:bg-gray-200 hover:underline">${element.name}</a></td>
   <td class="py-2 px-4 text-center">${new Date(
     element.created_at
   ).toLocaleDateString("pt-BR")}</td>
   <td class="py-2 px-4 text-center">${new Date(
     element.updated_at
   ).toLocaleDateString("pt-BR")}</td>
   <td>
      <a onclick="showDeletePopUp('${element.id}')">
         <div class="flex justify-center items-center"><img src="images/trash.png"
            class=" w-6 h-6 rounded-full overflow-hidden hover:bg-green-200">
      </a>
      <div class="flex justify-center items-center"><a onclick=""><img src="images/pencil.jpg"
      class=" w-6 h-6 rounded-full overflow-hidden hover:bg-green-200"></a></div>
      </div>
      `;
      const table = document.getElementById("tabela");

      table.appendChild(tr);
    }
  }
}

async function popUpTask() {
  const nome = await Swal.fire({
    title: "Escreva o nome da lista que deseja adicionar:",
    input: "text",
    showCancelButton: true,
  });

  const token = localStorage.getItem("token");

  if (nome.value) {
    await fetch("http://localhost:3000/list", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ name: nome.value }),
    });

    return window.location.reload();
  }
}

const invites = async () => {
  const token = localStorage.getItem("token");

  const response = await fetch(`http://localhost:3000/invites`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      authorization: `Bearer ${token}`,
    },
  });
  const body = await response.json();
  console.log(body);

  for (let i = 0; i < body.length; i++) {
    const element = body[i];
    const tr = document.createElement("tr");

    tr.innerHTML = `
      <tr>
        <td colspan="4" class="py-2 px-4 text-center">
          <div class="flex justify-center items-center">
            <span>${element.taskLists.name}   </span>
            <div style="margin-left: 10px"/>
            <div class="flex justify-center items-center">
            <a onclick="accept('${element.id}')">
              <img src="images/accept.png"class=" w-6 h-6 rounded-full overflow-hidden hover:bg-green-200">
            </a>
            <a onclick="deleted('${element.id}')">
            <img src="images/reject.png"
            class=" w-6 h-6 rounded-full overflow-hidden hover:bg-green-200">
            </a>
          </div>
        </td>
      </tr>
    `;

    const table = document.getElementById("tabela2");
    table.appendChild(tr);
  }
};

const accept = async (id) => {
  const response = await fetch("http://localhost:3000/invites", {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ id }),
  });

  // return window.location.reload();
};

const deleted = async (id) => {
  const response = await fetch(`http://localhost:3000/invites/${id}`, {
    method: "DELETE",
  });

  // return window.location.reload();
};

window.onload = async (e) => {
  await invites();
  await showLists(e);
};

const showDeletePopUp = async (id) => {
  const token = localStorage.getItem("token");

  const questionDelete = await Swal.fire({
    icon: "warning",
    title: "Realmente deseja deletar esta task list?",
    showCancelButton: true,
  });

  if (questionDelete.isConfirmed) {
    await fetch("http://localhost:3000/list", {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ id }),
    });
    return window.location.reload();
  }
};

async function toList(id) {
  localStorage.setItem("list", id);
  window.location.href = "lista.html";
}
