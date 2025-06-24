const sortable = new Draggable.Sortable(document.querySelectorAll("ul"), {
  draggable: "li",
  handle: ".image",
});
sortable.on("sortable:start");

const apiUrl = "http://localhost:3000/todo";

// Hàm lấy danh sách todo
async function fetchTodos() {
  try {
    const response = await fetch(apiUrl);
    if (!response.ok) {
      throw new Error("Failed to fetch todos");
    }
    const todos = await response.json();
    const todoList = document.getElementById("todoList");
    todoList.innerHTML = ""; // Clear the todo list before adding new items

    todos.forEach((todo) => {
      const li = document.createElement("li");

      // Tạo hamburger cạnh li để kéo thả
      const hamburger = document.createElement("img");
      hamburger.src = "svg/hamburger.svg";
      hamburger.className = "image";

      // Tạo checkbox để thay đổi trạng thái hoàn thành
      const checkbox = document.createElement("input");
      checkbox.type = "checkbox";
      checkbox.checked = todo.isCompleted; // Kiểm tra xem todo đã hoàn thành chưa

      // Khi checkbox thay đổi, cập nhật trạng thái isCompleted
      checkbox.onclick = () => toggleComplete(todo._id, checkbox.checked);

      // Hiển thị thông tin todo
      const todoText = document.createElement("span");
      todoText.textContent = `${todo.title} - ${
        todo.description
      } (Due: ${new Date(todo.dueDate).toLocaleDateString()})`;

      // Tạo nút xóa (Delete)
      const deleteBtn = document.createElement("button");
      deleteBtn.textContent = "Delete";
      deleteBtn.classList.add("btn-delete");
      deleteBtn.onclick = () => deleteTodo(todo._id); // Xóa todo khi nhấn nút

      // Thêm checkbox, text và nút delete vào li
      li.appendChild(hamburger);
      li.appendChild(checkbox);
      li.appendChild(todoText);
      li.appendChild(deleteBtn);

      // Thêm li vào danh sách todo
      todoList.appendChild(li);
    });
  } catch (error) {
    console.error("Error fetching todos:", error);
  }
}

async function toggleComplete(id, isCompleted) {
  const body = { isCompleted };

  try {
    const response = await fetch(`${apiUrl}/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    });

    if (!response.ok) {
      throw new Error("Failed to update todo");
    }

    fetchTodos();
  } catch (error) {
    console.error("Error updating todo completion:", error);
  }
}

async function deleteTodo(id) {
  try {
    const response = await fetch(`${apiUrl}/${id}`, {
      method: "DELETE",
    });

    if (!response.ok) {
      throw new Error("Failed to delete todo");
    }

    fetchTodos();
  } catch (error) {
    console.error("Error deleting todo:", error);
  }
}

async function addTodo() {
  const title = document.getElementById("title").value;
  const description = document.getElementById("description").value;
  const dueDate = document.getElementById("dueDate").value;

  if (!title || !description || !dueDate) {
    alert("All fields are required!");
    return;
  }

  const todo = {
    title,
    description,
    dueDate,
    isCompleted: false,
    createdAt: new Date(),
  };

  try {
    const response = await fetch(apiUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(todo),
    });

    if (!response.ok) {
      throw new Error("Failed to add todo");
    }

    fetchTodos();
  } catch (error) {
    console.error("Error adding todo:", error);
  }
}

fetchTodos();
