import { TCreateOrder, TGetProducts, TOrder } from "src/types";
import { Api } from "../base/Api";


export class ServerData {
  private api: Api

  constructor(api: Api) {
    this.api = api
  }

  getProducts(): Promise<TGetProducts> {
    return this.api.get<TGetProducts>('/product/')
  }

  createOrder(order: TOrder): Promise<TCreateOrder> {
    return this.api.post<TCreateOrder>('/order/', order)
  }
}