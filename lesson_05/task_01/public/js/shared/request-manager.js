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
