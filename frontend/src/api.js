import { addError } from "src/redux/features/errors/errorsSlice";
import { store } from "src/redux/store";
import { API_URL, APPLICATION_URLS } from "./components/common/constants";

class ApiClient {
  async secureFetch(url, init) {
    const response = await fetch(this.buildUrl(url), init);
    if (!response.ok) {
      if (response.headers.get("content-type") === "application/json") {
        const result = await response.json();
        if (result.detail) {
          if (typeof result.detail === "string") {
            store.dispatch(addError(result.detail));
            throw new Error(result.detail);
          } else {
            let errorMessage = result.detail
              .map((el) => `${el.loc.join(":")} - ${el.msg}`)
              .forEach((element) => {
                store.dispatch(addError(element));
              });
            throw new Error(errorMessage);
          }
        }
      }
      throw new Error(`${response.status}: ${response.statusText}`);
    }

    return response;
  }

  buildUrl(url) {
    return `${API_URL.substr(-1) === "/" ? API_URL.substr(0, -1) : API_URL}${url}`;
  }

  async register(firstName, lastName, email, password) {
    const userInfo = {
      first_name: firstName,
      last_name: lastName,
      email: email,
      password: password,
    };

    return this.secureFetch(APPLICATION_URLS.register, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(userInfo),
    });
  }

  async login(username, password) {
    const loginInfo = {
      username: username,
      password: password,
    };

    let formBody = [];
    for (const property in loginInfo) {
      const encodedKey = encodeURIComponent(property);
      const encodedValue = encodeURIComponent(loginInfo[property]);
      formBody.push(encodedKey + "=" + encodedValue);
    }
    formBody = formBody.join("&");
    return this.secureFetch(APPLICATION_URLS.getToken, {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: formBody,
    });
  }
}

export const api = new ApiClient();
