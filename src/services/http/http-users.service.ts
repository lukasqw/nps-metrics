import Axios from "./axios/axios.service";
import { EndpointEnum } from "./interfaces/endpoint.enum";
import { IAuthResponse } from "./interfaces/responses/auth-response.interface";

export class HttpUsersService {
  static async getUserById(id: string): Promise<IAuthResponse> {
    try {
      const response = await Axios.get(`${EndpointEnum.USER}/${id}`);
      return response.data;
    } catch (error) {
      return Promise.reject(error);
    }
  }
}
