import { addError } from "src/redux/features/errors/errorsSlice";
import { store } from "src/redux/store";
import { API_URL, API_URLS } from "src/components/common/constants";

class ApiClient {
  async secureFetch(url: string, init: RequestInit): Promise<Response> {
    const token = store.getState().users.userToken;
    const response = await fetch(this.buildUrl(url), {
      ...init,
      headers: {
        ...init.headers,
        Authorization: `Bearer ${token}`,
      },
    });
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

  buildUrl(url: string) {
    return `${API_URL.substring(-1) === "/" ? API_URL.substring(0, -1) : API_URL}${url}`;
  }

  async register(firstName: string, lastName: string, email: string, password: string) {
    const userInfo = {
      first_name: firstName,
      last_name: lastName,
      email: email,
      password: password,
    };

    return this.secureFetch(API_URLS.register, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(userInfo),
    });
  }

  async login(username: string, password: string) {
    const loginInfo = {
      username: username,
      password: password,
    };

    let formBody: Array<string> = [];
    for (const property in loginInfo) {
      const encodedKey = encodeURIComponent(property) as string;
      const encodedValue = encodeURIComponent(loginInfo[property]) as string;
      formBody.push(encodedKey + "=" + encodedValue);
    }
    let formBodyString: string = formBody.join("&");
    return this.secureFetch(API_URLS.getToken, {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: formBodyString,
    });
  }

  async getUserInfo() {
    return this.secureFetch(API_URLS.userInfo, {});
  }
}

export const api = new ApiClient();
