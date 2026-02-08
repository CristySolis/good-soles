'use client'

import { useState } from 'react'
import type { CreateDonationInput } from '@/lib/types'

export default function DonatePage() {
  const [form, setForm] = useState<CreateDonationInput>({
    shoe_size: 0,
    delivery_method: 'pickup',
  })
  const [message, setMessage] = useState<string>('')

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setForm(prev => ({ ...prev, [name]: name === 'shoe_size' ? Number(value) : value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setMessage('Submitting...')

    try {
      const res = await fetch('/api/donations', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      })

      const data = await res.json()
      if (!res.ok) {
        setMessage(`Error: ${data.error}`)
      } else {
        setMessage(`Donation submitted! ID: ${data.id}`)
        setForm({ shoe_size: 0, delivery_method: 'pickup' })
      }
    } catch (err) {
      console.error(err)
      setMessage('Unexpected error')
    }
  }

  return (
    <div style={{ maxWidth: 400, margin: '2rem auto' }}>
      <h1>Donate Shoes</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Shoe Size:</label>
          <input
            type="number"
            name="shoe_size"
            value={form.shoe_size}
            onChange={handleChange}
            required
          />
        </div>

        <div>
          <label>Delivery Method:</label>
          <select name="delivery_method" value={form.delivery_method} onChange={handleChange}>
            <option value="pickup">Pickup</option>
            <option value="dropoff">Dropoff</option>
          </select>
        </div>

        <div>
          <label>Contact Name:</label>
          <input type="text" name="contact_name" value={form.contact_name || ''} onChange={handleChange} />
        </div>

        <div>
          <label>Contact Email:</label>
          <input type="email" name="contact_email" value={form.contact_email || ''} onChange={handleChange} />
        </div>

        <div>
          <label>Pickup Address:</label>
          <input type="text" name="pickup_address" value={form.pickup_address || ''} onChange={handleChange} />
        </div>

        <button type="submit" style={{ marginTop: '1rem' }}>Submit Donation</button>
      </form>
      {message && <p>{message}</p>}
    </div>
  )
}
