document.addEventListener('DOMContentLoaded', async () => {
  const cartContainer = document.querySelector('.cart-header')
  let cartItems = JSON.parse(localStorage.getItem('cartItems')) || []

  // Удаляем дубликаты товаров по `id`
  const uniqueItems = []
  const seen = new Set()

  cartItems.forEach(item => {
    if (!seen.has(item.id)) {
      seen.add(item.id)
      uniqueItems.push(item)
    }
  })

  localStorage.setItem('cartItems', JSON.stringify(uniqueItems))
  cartItems = uniqueItems

  // Если корзина пуста
  if (cartContainer && cartItems.length === 0) {
    cartContainer.innerHTML += '<p>Your cart is empty.</p>'
    return
  }

  cartContainer.innerHTML = '' // Очищаем контейнер перед добавлением товаров

  for (const item of cartItems) {
    try {
      // Запрос на сервер для получения отзывов по `productId`
      const response = await fetch(`/user/get-reviews?productId=${item.id}`)
      const reviewData = await response.json()

      // Создаем карточку товара с отзывами в старом (твоем) стиле
      const productElement = document.createElement('div')
      productElement.classList.add('cart-item')
      productElement.innerHTML = `
        <div class="cart-item-content">
          <img src="${item.image}" alt="${item.name}" class="cart-item-img">
          <div class="cart-item-info">
            <h3>${item.name}</h3>
            <p>${item.description}</p>
            <p>Price: $${item.price.toFixed(2)}</p>
            <p>⭐ Rating: ${reviewData.rating} (${
        reviewData.reviewCount
      } reviews)</p>
            <button class="remove-btn" data-id="${item.id}">🗑️</button>
          </div>
        </div>
      `

      cartContainer.appendChild(productElement)
    } catch (error) {
      console.error(`Error fetching review for product ${item.id}:`, error)
    }
  }

  // Обработчик кнопки удаления
  document.querySelectorAll('.remove-btn').forEach(button => {
    button.addEventListener('click', event => {
      const productId = event.target.getAttribute('data-id')
      removeFromCart(productId)
    })
  })

  // Добавляем секцию с итоговой суммой и кнопкой Checkout
  const totalPrice = cartItems.reduce((sum, item) => sum + item.price, 0)

  const checkoutSection = document.createElement('div')
  checkoutSection.classList.add('checkout-section')
  checkoutSection.innerHTML = `
  <p>Total: <strong>$${totalPrice.toFixed(2)}</strong></p>
  <button class="checkout-btn">Proceed to Checkout</button>
`

  cartContainer.appendChild(checkoutSection)

  document
    .querySelector('.checkout-btn')
    .addEventListener('click', async () => {
      const cartItems = JSON.parse(localStorage.getItem('cartItems')) || []

      if (cartItems.length === 0) {
        alert('Your cart is empty!')
        return
      }

      try {
        const response = await fetch('/paypal/pay', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({ cartItems })
        })

        const data = await response.json()
        if (data.approval_url) {
          window.location.href = data.approval_url // Переход на PayPal
        } else {
          alert('Error during payment')
        }
      } catch (error) {
        console.error('Error during checkout:', error)
      }
    })
})

// Функция удаления товаров из корзины
function removeFromCart (productId) {
  let cartItems = JSON.parse(localStorage.getItem('cartItems')) || []
  cartItems = cartItems.filter(item => item.id !== productId)
  localStorage.setItem('cartItems', JSON.stringify(cartItems))
  alert('Item removed from the cart.')
  location.reload()
}

// Обработчик нажатия на кнопку Checkout
// document.querySelector('.checkout-btn').addEventListener('click', () => {
//   localStorage.removeItem('cartItems')
//   alert('Thank you for your purchase!')
//   window.location.reload()
// })
