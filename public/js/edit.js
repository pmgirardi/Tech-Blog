const editButtonHandler = async (event) => {
  event.preventDefault();

  const title = document.querySelector("#edit_title").value.trim();
  const content = document.querySelector("#edit_content").value.trim();
  const id = event.target.getAttribute("data-id");

  if (title && content && id) {
    const response = await fetch(`/api/edit/${id}`, {
      method: "PUT",
      body: JSON.stringify({ title, content, id }),
      headers: { "Content-Type": "application/json" },
    });

    if (response.ok) {
      document.location.replace("/dashboard");
    } else {
      alert(response.statusText);
    }
  }
};

const deleteButtonHandler = async (event) => {
  if (event.target.hasAttribute("data-id")) {
    const id = event.target.getAttribute("data-id");

    const response = await fetch(`/api/edit/${id}`, {
      method: "DELETE",
    });

    if (response.ok) {
      document.location.replace("/dashboard");
    } else {
      alert("Failed to delete project.");
    }
  }
};

document
  .querySelector("#edit_button")
  .addEventListener("click", editButtonHandler);
document
  .querySelector("#delete_button")
  .addEventListener("click", deleteButtonHandler);
