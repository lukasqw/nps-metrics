import Axios from "./axios/axios.service";
import { EndpointEnum } from "./interfaces/endpoint.enum";

export class HttpAnalyzeService {
  static async analyze(prompt: string): Promise<string> {
    try {
      const response = await Axios.post(`${EndpointEnum.REVIEWS_ANALYZER}`, {
        model: "gemma2",
        stream: false,
        prompt,
      });
      return response.data;
    } catch (error) {
      return Promise.reject(error);
    }

    //     return new Promise((resolve) => {
    //       setTimeout(() => {
    //         resolve(`
    // Prompt Analisado: ${prompt}
    //         `);
    //       }, 1000); // 2 segundos de atraso
    //     });
  }
}
