const { calculateTotal } = require('../lib/cart')

describe('Unit test from assignment', () => {
  test('default no discount', () => {
    expect(
      calculateTotal(
        [
          {
            id: 1,
            name: 'Boot',
            price: 750,
            image: '',
            quantity: 1,
            category: 'clothing',
          },
          {
            id: 2,
            name: 'Coat',
            price: 250,
            image: '',
            quantity: 2,
            category: 'clothing',
          },
        ],
        {
          coupon: {
            type: 'amount',
          },
          onTop: {
            type: 'category',
            category: 'clothing',
          },
        }
      ).total
    ).toBe(1250)
  })

  test('Fixed amount', () => {
    expect(
      calculateTotal(
        [
          {
            id: 1,
            name: 'T-Shirt',
            price: 350,
            image: '',
            quantity: 1,
            category: 'clothing',
          },
          {
            id: 2,
            name: 'Hat',
            price: 250,
            image: '',
            quantity: 1,
            category: 'clothing',
          },
        ],
        {
          coupon: {
            type: 'amount',
            value: '50',
          },
          onTop: {
            type: 'category',
            category: 'clothing',
          },
        }
      ).total
    ).toBe(550)
  })

  test('Percentage discount', () => {
    expect(
      calculateTotal(
        [
          {
            id: 1,
            name: 'T-Shirt',
            price: 350,
            image: '',
            quantity: 1,
            category: 'clothing',
          },
          {
            id: 2,
            name: 'Hat',
            price: 250,
            image: '',
            quantity: 1,
            category: 'clothing',
          },
        ],
        {
          coupon: {
            type: 'percentage',
            value: '10',
          },
          onTop: {
            type: 'category',
            category: 'clothing',
          },
        }
      ).total
    ).toBe(540)
  })

  test('Percentage discount by item category', () => {
    expect(
      calculateTotal(
        [
          {
            id: 1,
            name: 'T-Shirt',
            price: 350,
            image: '',
            quantity: 1,
            category: 'clothing',
          },
          {
            id: 2,
            name: 'Hoodie',
            price: 700,
            image: '',
            quantity: 1,
            category: 'clothing',
          },
          {
            id: 3,
            name: 'Watch',
            price: 850,
            image: '',
            quantity: 1,
            category: 'accessories',
          },
          {
            id: 4,
            name: 'Bag',
            price: 640,
            image: '',
            quantity: 1,
            category: 'accessories',
          },
        ],
        {
          coupon: {
            type: 'percentage',
          },
          onTop: {
            type: 'category',
            category: 'clothing',
            amount: '15',
          },
        }
      ).total
    ).toBe(2382.5)
  })

  test('Discount by points', () => {
    expect(
      calculateTotal(
        [
          {
            id: 1,
            name: 'T-Shirt',
            price: 350,
            image: '',
            quantity: 1,
            category: 'clothing',
          },
          {
            id: 2,
            name: 'Hat',
            price: 250,
            image: '',
            quantity: 1,
            category: 'clothing',
          },
          {
            id: 3,
            name: 'Belt',
            price: 230,
            image: '',
            quantity: 1,
            category: 'clothing',
          },
        ],
        {
          coupon: {
            type: 'percentage',
          },
          onTop: {
            type: 'point',
            category: 'clothing',
            points: '68',
          },
        }
      ).total
    ).toBe(762)
  })

  test('Special campaigns', () => {
    expect(
      calculateTotal(
        [
          {
            id: 1,
            name: 'T-Shirt',
            price: 350,
            image: '',
            quantity: 1,
            category: 'clothing',
          },
          {
            id: 2,
            name: 'Hat',
            price: 250,
            image: '',
            quantity: 1,
            category: 'clothing',
          },
          {
            id: 3,
            name: 'Belt',
            price: 230,
            image: '',
            quantity: 1,
            category: 'clothing',
          },
        ],
        {
          coupon: {
            type: 'percentage',
          },
          onTop: {
            type: 'point',
            category: 'clothing',
          },
          seasonal: {
            discount: '40',
            every: '300',
          },
        }
      ).total
    ).toBe(750)
  })
})

describe('Test for Order Applying Campaigns', () => {
  test('Coupon > On Top', () => {
    expect(
      calculateTotal(
        [
          {
            id: 1,
            name: 'T-Shirt',
            price: 350,
            image: '',
            quantity: 1,
            category: 'clothing',
          },
          {
            id: 2,
            name: 'Hat',
            price: 250,
            image: '',
            quantity: 1,
            category: 'clothing',
          },
          {
            id: 3,
            name: 'Belt',
            price: 230,
            image: '',
            quantity: 1,
            category: 'clothing',
          },
        ],
        {
          coupon: {
            type: 'percentage',
            value: '10',
          },
          onTop: {
            type: 'category',
            category: 'clothing',
            amount: '20',
          },
        }
      ).total
    ).toBe(597.6)
  })

  test('Coupon (Amount) > On Top (different category)', () => {
    expect(
      calculateTotal(
        [
          {
            id: 1,
            name: 'T-Shirt',
            price: 350,
            image: '',
            quantity: 1,
            category: 'clothing',
          },
          {
            id: 2,
            name: 'Hat',
            price: 250,
            image: '',
            quantity: 1,
            category: 'clothing',
          },
          {
            id: 3,
            name: 'Belt',
            price: 230,
            image: '',
            quantity: 1,
            category: 'clothing',
          },
          {
            id: 4,
            name: 'headphone',
            price: 200,
            image: '',
            quantity: 2,
            category: 'accessories',
          },
        ],
        {
          coupon: {
            type: 'amount',
            value: '100',
          },
          onTop: {
            type: 'category',
            category: 'clothing',
            amount: '10',
          },
        }
      ).total
    ).toBeCloseTo(1053.75)
  })

  test('Coupon (Percentage) > On Top (different category)', () => {
    expect(
      calculateTotal(
        [
          {
            id: 1,
            name: 'T-Shirt',
            price: 350,
            image: '',
            quantity: 1,
            category: 'clothing',
          },
          {
            id: 2,
            name: 'Hat',
            price: 250,
            image: '',
            quantity: 1,
            category: 'clothing',
          },
          {
            id: 3,
            name: 'Belt',
            price: 230,
            image: '',
            quantity: 1,
            category: 'clothing',
          },
          {
            id: 4,
            name: 'headphone',
            price: 200,
            image: '',
            quantity: 2,
            category: 'accessories',
          },
        ],
        {
          coupon: {
            type: 'percentage',
            value: '10',
          },
          onTop: {
            type: 'category',
            category: 'accessories',
            amount: '10',
          },
        }
      ).total
    ).toBe(1071)
  })

  test('Coupon > On Top (point)', () => {
    expect(
      calculateTotal(
        [
          {
            id: 1,
            name: 'T-Shirt',
            price: 350,
            image: '',
            quantity: 1,
            category: 'clothing',
          },
          {
            id: 2,
            name: 'Hat',
            price: 250,
            image: '',
            quantity: 1,
            category: 'clothing',
          },
          {
            id: 3,
            name: 'Belt',
            price: 230,
            image: '',
            quantity: 1,
            category: 'clothing',
          },
        ],
        {
          coupon: {
            type: 'percentage',
            value: '50',
          },
          onTop: {
            type: 'point',
            category: 'clothing',
            points: '68',
          },
        }
      ).total
    ).toBe(347)
  })

  test('Coupon > On Top (max point)', () => {
    expect(
      calculateTotal(
        [
          {
            id: 1,
            name: 'T-Shirt',
            price: 350,
            image: '',
            quantity: 1,
            category: 'clothing',
          },
          {
            id: 2,
            name: 'Hat',
            price: 250,
            image: '',
            quantity: 1,
            category: 'clothing',
          },
          {
            id: 3,
            name: 'Belt',
            price: 230,
            image: '',
            quantity: 1,
            category: 'clothing',
          },
        ],
        {
          coupon: {
            type: 'amount',
            value: '100',
          },
          onTop: {
            type: 'point',
            points: '10000',
          },
        }
      ).total
    ).toBe(584)
  })

  test('Coupon > Seasonal', () => {
    expect(
      calculateTotal(
        [
          {
            id: 1,
            name: 'T-Shirt',
            price: 350,
            image: '',
            quantity: 1,
            category: 'clothing',
          },
          {
            id: 2,
            name: 'Hat',
            price: 250,
            image: '',
            quantity: 1,
            category: 'clothing',
          },
          {
            id: 3,
            name: 'Belt',
            price: 230,
            image: '',
            quantity: 1,
            category: 'clothing',
          },
        ],
        {
          coupon: {
            type: 'percentage',
            value: '10',
          },
          onTop: {
            type: 'category',
            category: 'clothing',
          },
          seasonal: {
            discount: '20',
            every: '100',
          },
        }
      ).total
    ).toBe(607)
  })

  test('On Top (Category) > Seasonal', () => {
    expect(
      calculateTotal(
        [
          {
            id: 1,
            name: 'T-Shirt',
            price: 350,
            image: '',
            quantity: 1,
            category: 'clothing',
          },
          {
            id: 2,
            name: 'Hat',
            price: 250,
            image: '',
            quantity: 1,
            category: 'clothing',
          },
          {
            id: 3,
            name: 'Belt',
            price: 230,
            image: '',
            quantity: 1,
            category: 'clothing',
          },
        ],
        {
          coupon: {
            type: 'percentage',
          },
          onTop: {
            type: 'category',
            category: 'clothing',
            amount: '20',
          },
          seasonal: {
            discount: '10',
            every: '100',
          },
        }
      ).total
    ).toBe(604)
  })

  test('On Top (Points) > Seasonal', () => {
    expect(
      calculateTotal(
        [
          {
            id: 1,
            name: 'T-Shirt',
            price: 350,
            image: '',
            quantity: 1,
            category: 'clothing',
          },
          {
            id: 2,
            name: 'Hat',
            price: 250,
            image: '',
            quantity: 1,
            category: 'clothing',
          },
          {
            id: 3,
            name: 'Belt',
            price: 230,
            image: '',
            quantity: 1,
            category: 'clothing',
          },
        ],
        {
          coupon: {
            type: 'percentage',
          },
          onTop: {
            type: 'point',
            points: '200',
          },
          seasonal: {
            discount: '10',
            every: '100',
          },
        }
      ).total
    ).toBe(604)
  })

  test('Coupon > On Top > Seasonal', () => {
    expect(
      calculateTotal(
        [
          {
            id: 1,
            name: 'T-Shirt',
            price: 350,
            image: '',
            quantity: 1,
            category: 'clothing',
          },
          {
            id: 2,
            name: 'Hat',
            price: 250,
            image: '',
            quantity: 1,
            category: 'clothing',
          },
          {
            id: 3,
            name: 'Belt',
            price: 230,
            image: '',
            quantity: 1,
            category: 'clothing',
          },
        ],
        {
          coupon: {
            type: 'percentage',
            value: '10',
          },
          onTop: {
            type: 'point',
            points: '200',
          },
          seasonal: {
            discount: '10',
            every: '100',
          },
        }
      ).total
    ).toBe(547.6)

    expect(
      calculateTotal(
        [
          {
            id: 1,
            name: 'T-Shirt',
            price: 350,
            image: '',
            quantity: 1,
            category: 'clothing',
          },
          {
            id: 2,
            name: 'Hat',
            price: 250,
            image: '',
            quantity: 1,
            category: 'clothing',
          },
          {
            id: 3,
            name: 'Belt',
            price: 230,
            image: '',
            quantity: 10,
            category: 'clothing',
          },
        ],
        {
          coupon: {
            type: 'percentage',
            value: '10',
          },
          onTop: {
            type: 'category',
            category: 'clothing',
            amount: '10',
          },
          seasonal: {
            discount: '10',
            every: '100',
          },
        }
      ).total
    ).toBe(2119)
  })
})
