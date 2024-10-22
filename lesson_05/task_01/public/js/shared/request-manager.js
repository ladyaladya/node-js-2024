class RequestManager {
  static async postRequest(route, body) {
    const response = await fetch(route, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(body),
    });
    const data = await response.json();
    return data;
  }

  static async handleOnDeleteClick(productId) {
    const confirmed = await Swal.fire({
      title: 'Ви впевнені?',
      text: 'Цю дію не можна скасувати!',
      icon: 'warning',
      showCancelButton: true,
      cancelButtonText: 'Відмінити',
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Видалити',
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
        Swal.fire('Помилка!', error.message, 'error');
        throw new Error('Запит не був успішним');
      }
  
      const data = await response.text();
      window.location.href = `/products/?message=Успішно видалено.`;
  
      return { success: true, data };
    } catch (error) {
      console.error('Помилка при видаленні продукту:', error);
      Swal.fire('Помилка!', error.message, 'error');
      return { success: false, error: error.message };
    }
  }

  static handleFileSelect(event, imgSelector) {
    const file = event.target.files[0];
    if (file && file.type.startsWith('image/')) {
      const reader = new FileReader();
      reader.onload = function (e) {
        const imgElement = document.querySelector(imgSelector);
        imgElement.src = e.target.result;
        imgElement.classList.remove('hidden');
      }
      reader.readAsDataURL(file);
    }
  }
}
