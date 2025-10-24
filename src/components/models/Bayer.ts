import { IValidation, IBuyer, TPayment } from "src/types"

export class Buyer { 
  private payment?: TPayment
  private email: string = ''
  private phone: string = ''
  private address: string = ''

  validatePayment(): IValidation {
    if (this.payment) {
      return {
        isValid: true,
      }
    }

    return {
      isValid: false,
      error: 'Необходимо указать способ оплаты'
    }
  }

  setPayment(payment: TPayment) {
    this.payment = payment
  }

  validateEmail(): IValidation {
    if (this.email) {
      return {
        isValid: true,
      }
    }

    return {
      isValid: false,
      error: 'Необходимо указать email'
    }
  }

  setEmail(email: string){
    this.email = email
  }

  validatePhone(): IValidation {
    if (this.phone) {
      return {
        isValid: true,
      }
    }

    return {
      isValid: false,
      error: 'Необходимо указать телефон'
    }
  }

  setPhone(phone: string) {
    this.phone = phone
  }

  validateAddress(): IValidation {
    if (this.address) {
      return {
        isValid: true,
      }
    }

    return {
      isValid: false,
      error: 'Необходимо указать адрес'
    }
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

  validateContactsForm(): IValidation {
    const { isValid: isEmailValid, error: emailError } = this.validateEmail()
    const { isValid: isPhoneValid, error: phoneError } = this.validatePhone()

    if (isEmailValid && !isPhoneValid) {
      return {
        isValid: false,
        error: phoneError
      }
    }

    if (!isEmailValid && isPhoneValid) {
      return {
        isValid: false,
        error: emailError
      }
    }

    return {
      isValid: isEmailValid && isPhoneValid
    }
  }

  validateAddressForm(): IValidation {
    const { isValid: isPaymentValid, error: paymentError } = this.validatePayment()
    const { isValid: isAddressValid, error: addressError } = this.validateAddress()

    if (isPaymentValid && !isAddressValid) {
      return {
        isValid: false,
        error: addressError
      }
    }

    if (!isPaymentValid && isAddressValid) {
      return {
        isValid: false,
        error: paymentError
      }
    }

    return {
      isValid: isPaymentValid && isAddressValid
    }
  }
}