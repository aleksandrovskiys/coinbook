import { API_URL, API_URLS } from "src/common/constants";
import { ApiError } from "src/common/exceptions";
import { Account, AccountCreate, Currency } from "src/redux/features/accounts/accountsSlice";
import { Category, CategoryCreate } from "src/redux/features/categories/categoriesSlice";
import { Operation, OperationCreate } from "src/redux/features/operations/operationsSlice";
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
      throw new ApiError(`Error during API call to ${url}: ${response.status}: ${response.statusText}`);
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

  async getAccountsInfo(): Promise<Account[]> {
    return (await this.secureFetch(API_URLS.accounts, {})).json();
  }

  async getOperations(): Promise<Operation[]> {
    return (await this.secureFetch(API_URLS.operations, {})).json();
  }

  async getCurrencies(): Promise<Currency[]> {
    return (await this.secureFetch(API_URLS.currencies, {})).json();
  }

  async getCategories(): Promise<Category[]> {
    return (await this.secureFetch(API_URLS.categories, {})).json();
  }

  async createAccount(account: AccountCreate): Promise<Account> {
    return (
      await this.secureFetch(API_URLS.accounts, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(account),
      })
    ).json();
  }

  async updateAccount(account: Account): Promise<Account> {
    return (
      await this.secureFetch(`${API_URLS.accounts}/${account.id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(account),
      })
    ).json();
  }

  async deleteAccount(account: Account): Promise<Account> {
    return (
      await this.secureFetch(`${API_URLS.accounts}/${account.id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      })
    ).json();
  }

  async createCategory(category: CategoryCreate): Promise<Category> {
    return (
      await this.secureFetch(API_URLS.categories, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(category),
      })
    ).json();
  }

  async updateCategory(category: Category): Promise<Category> {
    return (
      await this.secureFetch(`${API_URLS.categories}/${category.id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(category),
      })
    ).json();
  }

  async deleteCategory(category: Category): Promise<Category> {
    return (
      await this.secureFetch(`${API_URLS.categories}/${category.id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      })
    ).json();
  }

  async createOperation(operation: OperationCreate): Promise<Operation> {
    return (
      await this.secureFetch(API_URLS.operations, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(operation),
      })
    ).json();
  }
}

export const api = new ApiClient();
