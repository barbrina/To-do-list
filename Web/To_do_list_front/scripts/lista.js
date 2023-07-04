//-------------PEGA NOME ------------------------
async function getName(e) {
  const token = localStorage.getItem("token");
  const list = localStorage.getItem("list");

  const response = await fetch(`http://localhost:3000/list/name/${list}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      authorization: `Bearer ${token}`,
    },
  });

  const body = await response.json();
  $("#titulo").text(body.data.name);
}

//-------------------------------COLAB-----------------------------------------
async function showColab(e) {
  const token = localStorage.getItem("token");
  const list = localStorage.getItem("list");

  const response = await fetch("http://localhost:3000/list/task", {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      authorization: `Bearer ${token}`,
    },
  });

  const taks = await response.json();

  if (response.status === 200) {
    for (var i = 0; i < taks.length; i++) {
      const element = taks[i];

      const tr = document.createElement("tr");

      tr.innerHTML = `
        <td class="py-2 px-4 text-center"><a href="lista.html"
        class=" hover:bg-gray-200 hover:underline">${
          element.description
        }</a></td>
     <td class="py-2 px-4 text-center">${new Date(
       element.created_at
     ).toLocaleDateString("pt-BR")}</td>
     <td class="py-2 px-4 text-center">${new Date(
       element.updated_at
     ).toLocaleDateString("pt-BR")}</td>'
     <td>
        <a onclick="deleteColabPopUp('${element.id}')">
           <div class="flex justify-center items-center"><img src="images/trash.png"
              class=" w-6 h-6 rounded-full overflow-hidden hover:bg-green-200">
              <div class="flex justify-center items-center"><a onclick=""><img src="images/pencil.png"
              class=" w-6 h-6 rounded-full overflow-hidden hover:bg-green-200"></a></div>
            <label class="flex items-center">
              <input type="checkbox" class="form-checkbox">
              <span class="ml-2">Checkbox Label</span>
            </label>
        </a>
        </div>
        `;
      const table = document.getElementById("tabela");

      table.appendChild(tr);
    }
  }
}

async function popUpColab() {
  const list = localStorage.getItem("list");

  const nome = await Swal.fire({
    title: "Escreva o user da colaborador que deseja adicionar:",
    input: "text",
    showCancelButton: true,
  });
  const token = localStorage.getItem("token");

  if (nome.value) {
    await fetch("http://localhost:3000/share", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ invited_username: nome.value, id_list: list }),
    });

    return window.location.reload();
  }
}

const deleteColabPopUp = async (id) => {
  const token = localStorage.getItem("token");

  const questionDelete = await Swal.fire({
    icon: "warning",
    title: "Realmente deseja deletar este colaborador?",
    showCancelButton: true,
  });

  if (questionDelete.isConfirmed) {
    await fetch("http://localhost:3000/list/task", {
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

//--------------------------------------------TASK----------------------------------------------------------

async function popUpTask() {
  const { value: formValues } = await Swal.fire({
    title: "Cadastrar uma task",
    html:
      '<input id="inp1" class="swal2-input">' +
      '<input id="inp2" class="swal2-input" type="date">',
    focusConfirm: false,
    preConfirm: () => {
      return [
        document.getElementById("inp1").value,
        document.getElementById("inp2").value,
      ];
    },
  });

  const token = localStorage.getItem("token");
  const list = localStorage.getItem("list");

  if (formValues) {
    await fetch("http://localhost:3000/list/task", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        description: formValues[0],
        deadline: formValues[1],
        conclusion: false,
        pai: list,
      }),
    });

    //return window.location.reload();
  }

  //acho q ta cadastrando tarefas
}

const deleteTaskPopUp = async (id) => {
  const token = localStorage.getItem("token");

  const questionDelete = await Swal.fire({
    icon: "warning",
    title: "Realmente deseja deletar este task?",
    showCancelButton: true,
  });

  if (questionDelete.isConfirmed) {
    await fetch("http://localhost:3000/list/task", {
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

async function showTasks(e) {
  const token = localStorage.getItem("token");
  const list = localStorage.getItem("list");

  const response = await fetch(`http://localhost:3000/list/task/${list}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      authorization: `Bearer ${token}`,
    },
  });

  const taks = await response.json();

  if (response.status === 200) {
    for (var i = 0; i < taks.length; i++) {
      const element = taks[i];

      const tr = document.createElement("tr");

      tr.innerHTML = `
          <td class="py-2 px-4 text-center">${element.descricao}</td>
       <td class="py-2 px-4 text-center">${new Date(
         element.deadline
       ).toLocaleDateString("pt-BR")}</td>
       <td class="py-2 px-4 text-center">${
         element.conclusion ? "Concluído" : "Não concluído"
       }</td>
       <td>
            <a onclick="deleteTaskPopUp('${element.id}')">
             <div class="flex justify-center items-center"><img src="images/trash.png"
                class=" w-6 h-6 rounded-full overflow-hidden hover:bg-green-200">
              <label class="flex items-center">
            </a>
            <a onclick="edit('${element.id}')">
             <div class="flex justify-center items-center"><img src="images/pencil.jpg"
                class=" w-6 h-6 rounded-full overflow-hidden hover:bg-green-200">
              <label class="flex items-center">
            </a>
                <input type="checkbox" onclick="setConclusion('${
                  element.id
                }')" />
                
              </label>
          </div>
          `;
      const table = document.getElementById("tabela");

      table.appendChild(tr);
    }
  }
}

const setConclusion = async (id) => {
  const token = localStorage.getItem("token");

  const questionComplete = await Swal.fire({
    icon: "warning",
    title: "Realmente deseja concluír ?",
  });

  if (questionComplete.isConfirmed) {
    await fetch("http://localhost:3000/list/task/completed", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ id: id }),
    });

    return window.location.reload();
  }
};

const searchCollaborators = async () => {
  const list = localStorage.getItem("list");

  const response = await fetch(
    `http://localhost:3000/list/collaborators/${list}`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    }
  );

  const body = await response.json();
  console.log(response.status);
  if (response.status === 200) {
    for (let i = 0; i < body.length; i++) {
      const element = body[i];

      const tr = document.createElement("tr");

      tr.innerHTML = `
      <tr>
          <td colspan="4" class="py-2 px-4 text-center">
            <div class="flex justify-center items-center">
              <span>${element}</span>
              <div class="flex justify-center items-center"><img src="images/trash.png"
              class=" w-6 h-6 rounded-full overflow-hidden hover:bg-green-200">
  
            </div>
          </td>
      </tr>
      `;

      const table = document.getElementById("tabela2");
      table.appendChild(tr);
    }
  }
};

const edit = async (id) => {
  const data = await Swal.fire({
    icon: "info",
    title: "Digite o novo nome",
    input: "text",
    showCancelButton: true,
  });

  if (data.value) {
    await fetch("http://localhost:3000/list/task/name", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        id: id,
        name: data.value,
      }),
    });

    return window.location.reload();
  }
};

window.onload = async (e) => {
  await searchCollaborators();
  await showTasks(e);
  await getName(e);
};
