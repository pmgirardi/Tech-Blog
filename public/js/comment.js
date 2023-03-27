const commentFormHandler = async (event) => {
  event.preventDefault();

  const content = document.querySelector("#comment").value.trim();
  const article_id = window.location.toString().split("/")[
    window.location.toString().split("/").length - 1
  ];

  if (content) {
    const response = await fetch("/api/comments", {
      method: "POST",
      body: JSON.stringify({ content, article_id }),
      headers: { "Content-Type": "application/json" },
    });

    if (response.ok) {
      document.location.reload();
    } else {
      alert(response.statusText);
    }
  }
};

document
  .querySelector(".comment_form")
  .addEventListener("submit", commentFormHandler);
