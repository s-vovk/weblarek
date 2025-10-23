export type ApiPostMethods = 'POST' | 'PUT' | 'DELETE';

export interface IApi {
    get<T extends object>(uri: string): Promise<T>;
    post<T extends object>(uri: string, data: object, method?: ApiPostMethods): Promise<T>;
}

export interface IProduct {
  id: string;
  description: string;
  image: string;
  title: string;
  category: string;
  price: number | null;
} 

export type TPayment = 'online' | 'cash' | undefined

export interface IBuyer {
  payment: TPayment;
  email: string;
  phone: string;
  address: string;
} 

export interface IValidation {
  isValid: boolean
  error?: string
}

export type TOrder = IBuyer & {
  total: number
  items: string[]
}

export type TCreateOrder = {
  id: string
  total: number
}

export type TGetProducts = {
  total: number
  items: IProduct[]
}
