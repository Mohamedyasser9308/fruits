function loadComments() {
  return JSON.parse(localStorage.getItem("comments")) || [];
}

function saveComments(comments) {
  localStorage.setItem("comments", JSON.stringify(comments));
}

function displayComments() {
  const commentsContainer = document.getElementById("commentsContainer");
  commentsContainer.innerHTML = "";
  const comments = loadComments();
  comments.forEach((comment, index) => {
    const box = document.createElement("div");
    box.className = "comment-box";

    const img = document.createElement("img");
    img.src = comment.imageUrl
      ? comment.imageUrl
      : "https://via.placeholder.com/80";
    img.alt = comment.name;

    const content = document.createElement("div");
    content.className = "comment-content";
    const nameEl = document.createElement("h3");
    nameEl.textContent = comment.name;
    const textEl = document.createElement("p");
    textEl.textContent = comment.text;
    content.appendChild(nameEl);
    content.appendChild(textEl);

    const deleteBtn = document.createElement("button");
    deleteBtn.textContent = "حذف";
    deleteBtn.className = "delete-btn";
    deleteBtn.addEventListener("click", () => {
      deleteComment(index);
    });

    box.appendChild(img);
    box.appendChild(content);
    box.appendChild(deleteBtn);
    commentsContainer.appendChild(box);
  });
}

function deleteComment(index) {
  let comments = loadComments();
  comments.splice(index, 1);
  saveComments(comments);
  displayComments();
}

document.getElementById("commentForm").addEventListener("submit", function (e) {
  e.preventDefault();
  const name = document.getElementById("name").value.trim();
  const imageUrl = document.getElementById("imageUrl").value.trim();
  const commentText = document.getElementById("commentText").value.trim();

  if (name && commentText) {
    let comments = loadComments();
    comments.push({
      name: name,
      imageUrl: imageUrl,
      text: commentText,
    });
    saveComments(comments);
    displayComments();
    this.reset();
  }
});

window.addEventListener("load", displayComments);
