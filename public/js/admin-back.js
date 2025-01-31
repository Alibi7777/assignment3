document.addEventListener('DOMContentLoaded', () => {
  // Elements for Add User Modal
  const addUserBtn = document.getElementById('add-user-btn')
  const addUserForm = document.getElementById('add-user-form')
  const addUserModal = document.getElementById('add-user-modal')
  const closeAddUserBtn = document.querySelector('.close-add-user-btn')
  const addNameInput = document.getElementById('add-name')
  const addRoleInput = document.getElementById('add-role')
  const addEmailInput = document.getElementById('add-email')
  const addPasswordInput = document.getElementById('add-password')

  // Elements for Edit User Modal
  const editUserForm = document.getElementById('edit-user-form')
  const editUserModal = document.getElementById('edit-user-modal')
  const closeEditUserBtn = document.querySelector('.close-edit-user-btn')
  const editNameInput = document.getElementById('edit-name')
  const editRoleInput = document.getElementById('edit-role')
  const editEmailInput = document.getElementById('edit-email')
  const editUserIdInput = document.getElementById('edit-user-id')

  let editingUserId = null

  // Show Add User Modal
  addUserBtn.addEventListener('click', () => {
    addUserForm.reset() // Reset form fields
    addUserModal.style.display = 'block'
  })

  // Close Add User Modal
  closeAddUserBtn.addEventListener('click', () => {
    addUserModal.style.display = 'none'
  })

  // Close Edit User Modal
  closeEditUserBtn.addEventListener('click', () => {
    editUserModal.style.display = 'none'
  })

  // **Handle Add User Submission**
  addUserForm.addEventListener('submit', async event => {
    event.preventDefault()
    const firstname = addNameInput.value.trim()
    const role = addRoleInput.value
    const email = addEmailInput.value.trim()
    const password = addPasswordInput.value.trim()

    if (!firstname || !email || !password)
      return alert('All fields are required')

    const userData = { firstname, role, email, password }

    try {
      const response = await fetch('/admin/users', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(userData)
      })

      if (!response.ok) throw new Error('Failed to add user')

      alert('User added successfully!')
      location.reload()
    } catch (error) {
      console.error(error)
      alert('Error adding user')
    }
  })

  // **Attach Event Listeners for Edit and Delete Buttons**
  document.querySelector('tbody').addEventListener('click', async event => {
    const userId = event.target.getAttribute('data-user-id')

    // **Edit User**
    if (event.target.classList.contains('edit-user-btn')) {
      editingUserId = userId
      try {
        const response = await fetch(`/admin/users/${editingUserId}`)
        if (!response.ok) throw new Error('Failed to fetch user')

        const user = await response.json()
        editUserIdInput.value = user._id
        editNameInput.value = user.firstname
        editEmailInput.value = user.email
        editRoleInput.value = user.role

        editUserModal.style.display = 'block'
      } catch (error) {
        console.error(error)
        alert('Error fetching user details')
      }
    }

    // **Delete User**
    if (event.target.classList.contains('delete-user-btn')) {
      if (!confirm('Are you sure you want to delete this user?')) return

      try {
        const response = await fetch(`/admin/users/${userId}`, {
          method: 'DELETE'
        })
        if (!response.ok) throw new Error('Failed to delete user')

        alert('User deleted successfully')
        location.reload()
      } catch (error) {
        console.error(error)
        alert('Error deleting user')
      }
    }
  })

  // **Handle Edit User Submission**
  editUserForm.addEventListener('submit', async event => {
    event.preventDefault()
    const firstname = editNameInput.value.trim()
    const role = editRoleInput.value
    const email = editEmailInput.value.trim()

    if (!firstname || !email) return alert('All fields are required')

    const userData = { firstname, role, email }

    try {
      const response = await fetch(`/admin/users/${editingUserId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(userData)
      })

      if (!response.ok) throw new Error('Failed to update user')

      alert('User updated successfully!')
      location.reload()
    } catch (error) {
      console.error(error)
      alert('Error updating user')
    }
  })
})
