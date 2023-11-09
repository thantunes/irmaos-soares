export default class OrderFormService {
  private url = {
    orderForm: '/api/checkout/pub/orderForm/',
  }

  public async getOrderForm(): Promise<OrderForm> {
    const req = await fetch(this.url.orderForm)
    const data = await req.json()
    return data as OrderForm
  }

  public async shippingCalc(
    orderFormId: string,
    postalCode: string,
    country = 'BRA'
  ): Promise<any> {
    const content = {
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      method: 'POST',
      body: JSON.stringify({
        address: { postalCode, country },
      }),
    }

    const req = await fetch(
      `${this.url.orderForm}/${orderFormId}/attachments/shippingData`,
      content
    )

    return req.json()
  }
}
