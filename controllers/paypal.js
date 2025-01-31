const axios = require('axios')

async function generateAccessToken () {
  try {
    const response = await axios({
      url: process.env.PAYPAL_BASE_URL + '/v1/oauth2/token',
      method: 'post',
      data: 'grant_type=client_credentials',
      auth: {
        username: process.env.PAYPAL_CLIENT_ID,
        password: process.env.PAYPAL_SECRET
      }
    })

    console.log(response.data.access_token)

    return response.data.access_token
  } catch (error) {
    console.error('PayPal Token Generation Error:', error.message)
    throw new Error('Failed to generate PayPal access token')
  }
}

// Create PayPal Order
exports.createOrder = async (req, res) => {
  try {
    const { cartItems } = req.body
    if (!cartItems || cartItems.length === 0) {
      return res.status(400).json({ error: 'Cart is empty' })
    }

    const accessToken = await generateAccessToken()
    const items = cartItems.map(item => ({
      name: item.name,
      description: item.description,
      quantity: item.quantity || 1,
      unit_amount: {
        currency_code: 'USD',
        value: item.price.toFixed(2)
      }
    }))

    const totalPrice = cartItems
      .reduce((total, item) => total + item.price * (item.quantity || 1), 0)
      .toFixed(2)

    const response = await axios({
      url: process.env.PAYPAL_BASE_URL + '/v2/checkout/orders',
      method: 'post',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${accessToken}`
      },
      data: JSON.stringify({
        intent: 'CAPTURE',
        purchase_units: [
          {
            items,
            amount: {
              currency_code: 'USD',
              value: totalPrice,
              breakdown: {
                item_total: {
                  currency_code: 'USD',
                  value: totalPrice
                }
              }
            }
          }
        ],
        application_context: {
          return_url: `${process.env.BASE_URL}/paypal/complete-order`,
          cancel_url: `${process.env.BASE_URL}/paypal/cancel-order`,
          shipping_preference: 'NO_SHIPPING',
          user_action: 'PAY_NOW',
          brand_name: 'Electronics Shop'
        }
      })
    })

    const approval_url = response.data.links.find(
      link => link.rel === 'approve'
    ).href
    res.json({ approval_url })
  } catch (error) {
    console.error('Error creating PayPal order:', error.message)
    res.status(500).json({ error: 'Payment initialization failed' })
  }
}

// Capture PayPal Payment
exports.capturePayment = async (req, res) => {
  try {
    const orderId = req.query.token
    if (!orderId) {
      return res.status(400).json({ error: 'Order ID is required' })
    }
    console.log('======111')

    const accessToken = await generateAccessToken()

    console.log(accessToken)
    console.log('======')

    const response = await axios({
      url: `${process.env.PAYPAL_BASE_URL}/v2/checkout/orders/${orderId}/capture`,
      method: 'post',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${accessToken}`
      }
    })

    res.json({ message: 'Payment captured successfully', data: response.data })
  } catch (error) {
    console.error('Error capturing payment:', error.message)
    res.status(500).json({ error: 'Error processing payment' })
  }
}

// Complete Order
exports.completeOrder = async (req, res) => {
  try {
    console.log('COMPLETE FINISHED')

    await exports.capturePayment(req, res)
  } catch (error) {
    console.error('Error capturing payment:', error)
    res.status(500).json({ error: 'Error processing payment' })
  }
}
