'use client'

import { useState } from 'react'
import type { CreateDonationInput } from '@/lib/types'

export default function DonatePage() {
  const [form, setForm] = useState<CreateDonationInput>({
    shoe_size: 0,
    delivery_method: 'pickup',
  })
  const [message, setMessage] = useState<string>('')

  const [errors, setErrors] = useState<Record<string, string>>({})

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setForm(prev => ({ ...prev, [name]: name === 'shoe_size' ? Number(value) : value }))
    setErrors(prev => ({ ...prev, [name]: '' })) // Clear error on change
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setErrors({}) // Reset errors
    setMessage('')
    // Conditional validation
    const newErrors: Record<string, string> = {}
    if (form.shoe_size <= 0) {
      setMessage('Shoe size must be greater than 0')
      return
    }
  
    if (!form.delivery_method) {
      setMessage('Delivery method is required')
      return
    }
  
    if (!form.contact_name || !form.contact_email) {
      setMessage('Contact name and email are required')
      return
    }
    if (form.delivery_method === 'pickup' && !form.pickup_address) {
        newErrors.pickup_address = 'Pickup address is required for pickup donations'
      }
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors)
      return
    }
  
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
        {/* Shoe Size */}
        <div>
          <label>Shoe Size:</label>
          <input
            type="number"
            name="shoe_size"
            value={form.shoe_size}
            onChange={handleChange}
            required
          />
          {errors.shoe_size && <p style={{ color: 'red' }}>{errors.shoe_size}</p>}
        </div>

        {/* Delivery Method */}
        <div>
          <label>Delivery Method:</label>
          <select name="delivery_method" value={form.delivery_method} onChange={handleChange}>
            <option value="pickup">Pickup</option>
            <option value="dropoff">Dropoff</option>
          </select>
          {errors.delivery_method && <p style={{ color: 'red' }}>{errors.delivery_method}</p>}
        </div>

        {/* Contact Name */}
        <div>
          <label>Contact Name:</label>
          <input type="text" name="contact_name" value={form.contact_name || ''} onChange={handleChange} />
          {errors.contact_name && <p style={{ color: 'red' }}>{errors.contact_name}</p>}
        </div>

        {/* Contact Email */}
        <div>
          <label>Contact Email:</label>
          <input type="email" name="contact_email" value={form.contact_email || ''} onChange={handleChange} />
          {errors.contact_email && <p style={{ color: 'red' }}>{errors.contact_email}</p>}
        </div>

        {/* Pickup Address */}
        <div>
          <label>Pickup Address:</label>
          <input
            type="text"
            name="pickup_address"
            value={form.pickup_address || ''}
            onChange={handleChange}
            disabled={form.delivery_method === 'dropoff'}
            required={form.delivery_method === 'pickup'}
          />
          {errors.pickup_address && <p style={{ color: 'red' }}>{errors.pickup_address}</p>}
        </div>

        <button type="submit" style={{ marginTop: '1rem' }}>Submit Donation</button>
      </form>

      {message && <p>{message}</p>}
    </div>
  )
}
