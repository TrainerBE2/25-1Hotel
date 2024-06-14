document.getElementById("addFileInput").addEventListener("click", function () {
  const fileInputContainer = document.createElement("div");
  fileInputContainer.classList.add("file-input-container");
  fileInputContainer.innerHTML = '<input type="file" name="roomImages">';
  document
    .getElementById("fileInputsContainer")
    .appendChild(fileInputContainer);
});

document.getElementById("uploadForm").addEventListener("submit", function (e) {
  e.preventDefault();

  const formData = new FormData(this);

  fetch("http://192.168.1.31:8000/api/v1/upload/room", {
    method: "POST",
    body: formData,
  })
    .then((response) => response.json())
    .then((data) => {
      console.log("Success:", data);
      alert("Images uploaded successfully");
    })
    .catch((error) => {
      console.error("Error:", error);
      alert("Error uploading images");
    });
});
