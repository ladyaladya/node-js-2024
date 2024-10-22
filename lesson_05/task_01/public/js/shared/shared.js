document.addEventListener("DOMContentLoaded", (event) => {
  const currentUrl = new URL(window.location.href);
  const urlParams = new URLSearchParams(currentUrl.search);
  const message = urlParams.get('message');

  if (message) {
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
  }

});

async function handleOnDeleteClick(productId) {
  const confirmed = await Swal.fire({
    title: 'Ви впевнені?',
    text: 'Цю дію не можна скасувати!',
    icon: 'warning',
    showCancelButton: true,
    confirmButtonColor: '#3085d6',
    cancelButtonColor: '#d33',
    confirmButtonText: 'Так, видалити!',
  });

  if (!confirmed.isConfirmed) {
    return;
  }

  try {
    const response = await fetch(`/products/`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ id: productId })
    });

    if (!response.ok) {
      throw new Error('Запит не був успішним');
    }

    const data = await response.text();
    Swal.fire('Видалено!', 'Продукт був успішно видалений.', 'success');
    window.location.href = '/products/';

    return { success: true, data };
  } catch (error) {
    console.error('Помилка при видаленні продукту:', error);
    Swal.fire('Помилка!', error.message, 'error');
    return { success: false, error: error.message };
  }
}
