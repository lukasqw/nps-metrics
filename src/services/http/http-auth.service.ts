import Axios from "./axios/axios.service";
import { EndpointEnum } from "./interfaces/endpoint.enum";
import { IAuthRequest } from "./interfaces/requests/auth-request";
import { IAuthResponse } from "./interfaces/responses/auth-response.interface";

export class HttpAuthService {
  static async login(user: IAuthRequest): Promise<IAuthResponse> {
    try {
      const response = await Axios.post(EndpointEnum.LOGIN, user);
      return response.data;
    } catch (error) {
      return Promise.reject(error);
    }
  }
}
