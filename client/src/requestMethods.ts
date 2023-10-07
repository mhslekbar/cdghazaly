import axios from "axios";

// const BASE_URL = "http://154.56.57.194:8890/api/"
const BASE_URL = "http://localhost:8890/api/"

export const publicRequest = axios.create({
  baseURL: BASE_URL
})

export const companyName = "ibtissama"

export const UserData = () => {
  let persist = localStorage.getItem(`persist:${companyName}`)
  let userData
  if(persist) {
    const login = JSON.parse(persist).login
    if(login) {
      userData = JSON.parse(login).userData
    }
  }
 return userData
}

export enum TypeMethod {
  GET    = "GET",
  POST   = "POST",
  PUT    = "PUT",
  DELETE = "DELETE",
}

export const privateRequest = async (method: TypeMethod, url: string, data?: object) => {
  try {
    let response;
    let token = UserData()?.accessToken;
    let headers = {
      token,
      "Cache-Control": "no-cache"
    }
    if(token) {
      headers.token = `Bearer ${token}`;
      // headers['Cache-Control'] = 'no-cache'; // set cache-control header to zero
      response = await axios({ method, url: `${BASE_URL}${url}`, data, headers });
    } else {
      response = {data: []}
    }
    return response;
  } catch (error) {
    throw error;
  }
};


export const get = async (url: string) => privateRequest(TypeMethod.GET, url);

export const post = async (url: string, data: object) => privateRequest(TypeMethod.POST, url, data);

export const put = async (url: string, data: object) => privateRequest(TypeMethod.PUT, url, data);

export const remove = async (url: string) => privateRequest(TypeMethod.DELETE, url);

