import { supabase } from '@/lib/client'
import type { CreateDonationInput, Donation } from '@/lib/types'

export async function createDonation(
  input: CreateDonationInput
): Promise<Donation> {
  const { data, error } = await supabase
    .from('donations')
    .insert({
      donor_name: input.donor_name,
      shoe_size: input.shoe_size,
      quantity: input.quantity ?? 1,
      shoe_condition: input.shoe_condition,
      shoe_brand: input.shoe_brand,
      delivery_method: input.delivery_method,
      contact_name: input.contact_name,
      contact_email: input.contact_email,
      contact_phone: input.contact_phone,
      pickup_address: input.pickup_address,
      dropoff_location_id: input.dropoff_location_id,
      status: 'received',
    })
    .select()
    .single()

  if (error) {
    throw error
  }

  return data as Donation
}
