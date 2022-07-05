import { API_URL, APPLICATION_URLS } from "./components/common/constants";

class ApiClient {
  async secureFetch(url, params, method) {
    console.log(this.buildUrl(url), params, method);
    return fetch(this.buildUrl(url), params, method).then((response) => {
      return response.json();
    });
  }

  buildUrl(url) {
    return `${API_URL}/${url}`;
  }

  register(firstName, lastName, email, password) {
    this.secureFetch(APPLICATION_URLS.register, {
      name: firstName,
      lastname: lastName,
      email: email,
      password: password,
    });
  }
}

export const api = new ApiClient();
