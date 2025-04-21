const from = document.querySelector("#todo-from");
const newtask = document.querySelector("#task");
const addTask = document.querySelector("#btn-add");
const ul = document.querySelector("#ul-tasks");

let tarefas = [];

function renderhtml(tasktext, done = false) {
  const lista = document.createElement("li");
  const input = document.createElement("input");
  input.setAttribute("type", "checkbox");
  input.addEventListener("change", (event) => {
    const tarefaToggle = event.target.parentElement;
    const checkedtoogle = tarefaToggle.querySelector("span");
    const done = event.target.checked;

    if (done) {
      checkedtoogle.style.textDecoration = "line-through";
      checkedtoogle.style.color = "rgb(143, 136, 136)";
    } else {
      checkedtoogle.style.textDecoration = "none";
      checkedtoogle.style.color = "rgb(255, 255, 255)";
    }
    tarefas = tarefas.map((t) => {
      if (t.title === checkedtoogle.textContent) {
        return {
          title: t.title,
          done: !t.done,
        };
      }
      return t;
    });
    localStorage.setItem("tarefas", JSON.stringify(tarefas));
  });
  input.checked = done;
  const span = document.createElement("span");
  span.textContent = tasktext;
  if (done) {
    span.style.textDecoration = "line-through";
    span.style.color = "rgb(143, 136, 136)";
  }
  const btn = document.createElement("button");
  btn.textContent = "Remover";
  btn.addEventListener("click", (event) => {
    const removeli = event.target.parentElement;
    const removetask = removeli.querySelector("span").textContent;
    tarefas = tarefas.filter((t) => t.title !== removetask);
    ul.removeChild(removeli);
    localStorage.setItem("tarefas", JSON.stringify(tarefas));
  });

  lista.appendChild(input);
  lista.appendChild(span);
  lista.appendChild(btn);

  ul.appendChild(lista);
}
window.onload = () => {
  const tasksLocalStorage = localStorage.getItem("tarefas");

  if (!tasksLocalStorage) return;

  tarefas = JSON.parse(tasksLocalStorage);

  tarefas.forEach((t) => {
    renderhtml(t.title, t.done);
  });
};
from.addEventListener("submit", (event) => {
  event.preventDefault();

  const tasktext = newtask.value;
  console.log(tasktext);

  if (tasktext.length < 3 || tasktext.value == "") {
    alert("tarefa menor que 3 digitos pfv adicione uma tarefa maior");
    return;
  }

  tarefas.push({
    title: tasktext,
    done: false,
  });
  localStorage.setItem("tarefas", JSON.stringify(tarefas));

  renderhtml(tasktext);

  newtask.value = "";
});
