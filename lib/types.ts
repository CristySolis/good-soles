export type CreateDonationInput = {
    donor_name?: string
    shoe_size: number
    quantity?: number
    shoe_condition?: string
    shoe_brand?: string
  
    delivery_method: 'pickup' | 'dropoff'
    contact_name?: string
    contact_email?: string
    contact_phone?: string
    pickup_address?: string
    dropoff_location_id?: number
  }
  
  
export type Donation = {
id: number
created_at: string // timestamp in ISO format
donor_name?: string
shoe_size: number
quantity: number
gender: string
condition?: string
brand?: string
delivery_method: 'pickup' | 'dropoff'
contact_name?: string
contact_email?: string
country?: string
city?: string
contact_phone?: string
pickup_address?: string
dropoff_location_id?: number
status: 'received' | 'collected' | 'distributed'
}
  