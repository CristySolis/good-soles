import { NextResponse } from 'next/server'
import { createDonation } from '@/lib/donations'
import { supabase } from '@/lib/client'
import type { CreateDonationInput, Donation } from '@/lib/types'

export async function POST(req: Request) {
  try {
    const body = (await req.json()) as CreateDonationInput

    if (!body.shoe_size || !body.delivery_method) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      )
    }

    const donation: Donation = await createDonation(body)

    return NextResponse.json(donation, { status: 201 })
  } catch (err) {
    console.error(err)
    return NextResponse.json(
      { error: 'Failed to create donation' },
      { status: 500 }
    )
  }
}

// -------------------------
// GET endpoint for all donations
export async function GET() {
  try {
    const { data, error } = await supabase
    .from('donations')        // table name
    .select('*')              // generic goes here
    .order('created_at', { ascending: false })

    if (error) {
      console.error('Supabase fetch error:', error)
      return NextResponse.json(
        { error: 'Failed to fetch donations' },
        { status: 500 }
      )
    }

    return NextResponse.json(data, { status: 200 })
  } catch (err) {
    console.error('Unexpected error:', err)
    return NextResponse.json(
      { error: 'Unexpected error fetching donations' },
      { status: 500 }
    )
  }
}
