'use client'

import { useEffect, useState } from 'react'
import type { Donation } from '@/lib/types'

export default function DonationsList() {
  const [donations, setDonations] = useState<Donation[]>([])
  const [loading, setLoading] = useState<boolean>(true)
  const [error, setError] = useState<string>('')

  useEffect(() => {
    const fetchDonations = async () => {
      try {
        const res = await fetch('/api/donations')
        const data: Donation[] = await res.json()
        if (!res.ok) throw new Error((data as any)?.error || 'Failed to fetch donations')
        setDonations(data)
      } catch (err: any) {
        console.error(err)
        setError(err.message || 'Unexpected error')
      } finally {
        setLoading(false)
      }
    }

    fetchDonations()
  }, [])

  if (loading) return <p>Loading donations...</p>
  if (error) return <p style={{ color: 'red' }}>Error: {error}</p>

  if (donations.length === 0) return <p>No donations yet.</p>

  return (
    <div style={{ marginTop: '2rem' }}>
      <h2>Submitted Donations</h2>
      <ul>
        {donations.map(d => (
          <li key={d.id} style={{ marginBottom: '1rem' }}>
            <strong>ID:</strong> {d.id} | <strong>Size:</strong> {d.shoe_size} |{' '}
            <strong>Brand:</strong> {d.brand || 'N/A'} | <strong>Method:</strong> {d.delivery_method} |{' '}
            <strong>Contact:</strong> {d.contact_name} ({d.contact_email}) |{' '}
            {d.delivery_method === 'pickup' && <span><strong>Address:</strong> {d.pickup_address}</span>}
          </li>
        ))}
      </ul>
    </div>
  )
}
