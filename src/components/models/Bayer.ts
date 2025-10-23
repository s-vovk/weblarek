import { IValidation, IBuyer, TPayment } from "src/types"

export class Buyer { 
  private payment?: TPayment
  private email: string = ''
  private phone: string = ''
  private address: string = ''

  validatePayment(payment: TPayment | undefined): IValidation {
    if (payment) {
      return {
        isValid: true,
      }
    }

    return {
      isValid: false,
      error: 'Не указан способ оплаты'
    }
  }

  isPaymentValid() {
    return this.validatePayment(this.payment).isValid
  }

  setPayment(payment: TPayment) {
    this.payment = payment
  }


  validateEmail(email: string): IValidation {
    if (email) {
      return {
        isValid: true,
      }
    }

    return {
      isValid: false,
      error: 'Не указан email'
    }
  }

  isEmailValid() {
    return this.validateEmail(this.email).isValid
  }

  setEmail(email: string){
    this.email = email
  }

  validatePhone(phone: string): IValidation{
    if (phone) {
      return {
        isValid: true,
      }
    }

    return {
      isValid: false,
      error: 'Не указан телефон'
    }
  }

  isPhoneValid() {
    return this.validatePhone(this.phone).isValid
  }

  setPhone(phone: string) {
    this.phone = phone
  }

  validateAdress(adress: string): IValidation {
    if (adress) {
      return {
        isValid: true,
      }
    }

    return {
      isValid: false,
      error: 'Не указан адрес'
    }
  }

  isAddressValid() {
    return this.validateAdress(this.address).isValid
  }

  setAddress (adress: string) {
    this.address = adress
  }

  getData(): IBuyer {
    return {
      payment: this.payment,
      email: this.email,
      phone: this.phone,
      address: this.address
    }
  }

  removeData() {
    this.payment = undefined
    this.email = ''
    this.phone = ''
    this.address = ''
  }
}