import { API_URL, API_URLS } from "src/common/constants";
import { ApiError } from "src/common/exceptions";
import { getTokenFromStorage } from "src/utils/localStorage";

class ApiClient {
  async secureFetch(url: string, init: RequestInit): Promise<Response> {
    const token = getTokenFromStorage();
    const response = await fetch(this.buildUrl(url), {
      ...init,
      headers: {
        ...init.headers,
        Authorization: `Bearer ${token}`,
      },
    });

    if (!response.ok) {
      let errorsArray: string[] = [];
      if (response.headers.get("content-type") === "application/json") {
        const result = await response.json();
        if (result.detail) {
          if (typeof result.detail === "string") {
            errorsArray.push(result.detail);
          } else {
            result.detail
              .map((el: { loc: any[]; msg: any }) => `${el.loc.join(":")} - ${el.msg}`)
              .forEach((element) => {
                errorsArray.push(element);
              });
          }
        }
        const error = new ApiError(`Error during API call to ${url}`, errorsArray);
        throw error;
      }
      throw new ApiError(
        `Error during API call to ${url}: ${response.status}: ${response.statusText}`
      );
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

    let formBody: string[] = [];
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
