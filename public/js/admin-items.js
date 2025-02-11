document.addEventListener('DOMContentLoaded', () => {
  // Elements for Add Item Modal
  const addItemBtn = document.getElementById('add-item-btn')
  const addItemForm = document.getElementById('add-item-form')
  const addItemModal = document.getElementById('add-item-modal')
  const closeAddItemBtn = document.querySelector('.close-add-item-btn')

  // Elements for Edit Item Modal
  const editItemForm = document.getElementById('edit-item-form')
  const editItemModal = document.getElementById('edit-item-modal')
  const closeEditItemBtn = document.querySelector('.close-edit-item-btn')

  let editingItemId = null

  // Show Add Item Modal
  addItemBtn.addEventListener('click', () => {
    addItemForm.reset()
    addItemModal.style.display = 'block'
  })

  // Close Add Item Modal
  closeAddItemBtn.addEventListener('click', () => {
    addItemModal.style.display = 'none'
  })

  // Close Edit Item Modal
  closeEditItemBtn.addEventListener('click', () => {
    editItemModal.style.display = 'none'
  })

  // Handle table clicks (Edit and Delete)
  document.querySelector('tbody').addEventListener('click', async event => {
    const itemId = event.target.getAttribute('data-item-id')

    // Edit Item
    if (event.target.classList.contains('edit-item-btn')) {
      editingItemId = itemId
      try {
        const response = await fetch(`/admin/item/${editingItemId}`)
        if (!response.ok) throw new Error('Failed to fetch item')

        const item = await response.json()
        document.getElementById('edit-item-id').value = item.id
        document.getElementById('edit-name-en').value = item.nameEnglish
        document.getElementById('edit-name-kz').value = item.nameKaz
        document.getElementById('edit-price').value = item.price
        document.getElementById('edit-description-en').value =
          item.descriptionEnglish
        document.getElementById('edit-description-kz').value =
          item.descriptionKaz
        document.getElementById('edit-images').value = item.images2
          ? item.images2.join('\n')
          : ''

        editItemModal.style.display = 'block'
      } catch (error) {
        console.error(error)
        alert('Error fetching item details')
      }
    }

    // Delete Item
    if (event.target.classList.contains('delete-item-btn')) {
      if (!confirm('Are you sure you want to delete this item?')) return

      try {
        const response = await fetch(`/admin/items/${itemId}`, {
          method: 'DELETE'
        })
        if (!response.ok) throw new Error('Failed to delete item')

        alert('Item deleted successfully')
        location.reload()
      } catch (error) {
        console.error(error)
        alert('Error deleting item')
      }
    }
  })

  // Handle Edit Item Form Submission
  editItemForm.addEventListener('submit', async event => {
    event.preventDefault()
    const nameEnglish = document.getElementById('edit-name-en').value.trim()
    const nameKaz = document.getElementById('edit-name-kz').value.trim()
    const price = document.getElementById('edit-price').value
    const descriptionEnglish = document
      .getElementById('edit-description-en')
      .value.trim()
    const descriptionKaz = document
      .getElementById('edit-description-kz')
      .value.trim()
    const images2 = document
      .getElementById('edit-images')
      .value.split('\n')
      .map(url => url.trim())
      .filter(url => url !== '')

    if (
      !nameEnglish ||
      !nameKaz ||
      !price ||
      !descriptionEnglish ||
      !descriptionKaz
    )
      return alert('All fields are required')

    const itemData = {
      nameEnglish,
      nameKaz,
      price,
      descriptionEnglish,
      descriptionKaz,
      images2
    }

    try {
      const response = await fetch(`/admin/items/${editingItemId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(itemData)
      })

      if (!response.ok) throw new Error('Failed to update item')

      alert('Item updated successfully!')
      location.reload()
    } catch (error) {
      console.error(error)
      alert('Error updating item')
    }
  })

  // Handle Add Item Form Submission
  addItemForm.addEventListener('submit', async event => {
    event.preventDefault()
    const nameEnglish = document.getElementById('add-name-en').value.trim()
    const nameKaz = document.getElementById('add-name-kz').value.trim()
    const price = parseInt(document.getElementById('add-price').value)
    const descriptionEnglish = document
      .getElementById('add-description-en')
      .value.trim()
    const descriptionKaz = document
      .getElementById('add-description-kz')
      .value.trim()
    const images2 = document
      .getElementById('add-images')
      .value.split('\n')
      .map(url => url.trim())
      .filter(url => url !== '')

    if (
      !nameEnglish ||
      !nameKaz ||
      !price ||
      !descriptionEnglish ||
      !descriptionKaz
    )
      return alert('All fields are required')

    const itemData = {
      nameEnglish,
      nameKaz,
      price,
      descriptionEnglish,
      descriptionKaz,
      images2
    }

    try {
      const response = await fetch('/admin/items', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(itemData)
      })

      if (!response.ok) throw new Error('Failed to add item')

      alert('Item added successfully!')
      location.reload()
    } catch (error) {
      console.error(error)
      alert('Error adding item')
    }
  })

  // Language picker functionality
  const languagePicker = document.getElementById('language-picker')
  languagePicker.addEventListener('change', async () => {
    const selectedLang = languagePicker.value
    try {
      const response = await fetch(`/admin/items?lang=${selectedLang}`)
      if (!response.ok) throw new Error('Failed to fetch items')

      const items = await response.json()
      updateItemsTable(items, selectedLang)
    } catch (error) {
      console.error(error)
      alert('Error fetching items')
    }
  })

  function updateItemsTable (items, lang = 'en') {
    const tbody = document.getElementById('items-table-body')
    tbody.innerHTML = items
      .map(
        item => `
      <tr data-item-id="${item.id}">
        <td>${lang === 'en' ? item.nameEnglish : item.nameKaz}</td>
        <td>$${item.price}</td>
        <td>${
          lang === 'en' ? item.descriptionEnglish : item.descriptionKaz
        }</td>
        <td>
          <button class="edit-item-btn" data-item-id="${item.id}">Edit</button>
          <button class="delete-item-btn" data-item-id="${
            item.id
          }">Delete</button>
        </td>
      </tr>
    `
      )
      .join('')
  }

  // Initial load with default language
  updateItemsTable(window.initialItems, languagePicker.value)
})
