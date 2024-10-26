document.addEventListener("DOMContentLoaded", (event) => {
  const currentUrl = new URL(window.location.href);
  const urlParams = new URLSearchParams(currentUrl.search);
  const message = urlParams.get('message');

  if (!message) {
    return;
  }

  Swal.fire({
      position: "top-end",
      icon: "success",
      title: message,
      showConfirmButton: false,
      timer: 1500
  }).then(() => {
      urlParams.delete('message');
      currentUrl.search = urlParams.toString();
      window.history.replaceState({}, '', currentUrl);
  });
});
