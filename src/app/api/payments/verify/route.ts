import { NextRequest, NextResponse } from 'next/server'
import { createSupabaseClient } from '@/lib/supabase'

// Toss Payments API URL
const TOSS_PAYMENTS_API_URL = 'https://api.tosspayments.com/v1/payments'

export async function POST(request: NextRequest) {
  try {
    const { paymentKey, orderId, amount } = await request.json()

    if (!paymentKey || !orderId || !amount) {
      return NextResponse.json(
        { success: false, message: 'Missing required parameters' },
        { status: 400 }
      )
    }

    // Toss Payments Secret Key (should be in environment variables)
    const secretKey = process.env.TOSS_SECRET_KEY
    if (!secretKey) {
      console.error('Toss Payments secret key is not configured')
      return NextResponse.json(
        { success: false, message: 'Payment configuration error' },
        { status: 500 }
      )
    }

    // Verify payment with Toss Payments
    const response = await fetch(`${TOSS_PAYMENTS_API_URL}/${paymentKey}`, {
      method: 'POST',
      headers: {
        'Authorization': `Basic ${Buffer.from(secretKey + ':').toString('base64')}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        orderId,
        amount,
      }),
    })

    if (!response.ok) {
      const errorData = await response.json()
      console.error('Toss Payments verification failed:', errorData)
      return NextResponse.json(
        { success: false, message: 'Payment verification failed' },
        { status: 400 }
      )
    }

    const paymentData = await response.json()

    // Update order and payment status in database
    const supabase = createSupabaseClient()

    // Update order status
    const { error: orderError } = await supabase
      .from('orders')
      .update({ status: 'processing' })
      .eq('id', orderId)

    if (orderError) {
      console.error('Order update error:', orderError)
      return NextResponse.json(
        { success: false, message: 'Failed to update order status' },
        { status: 500 }
      )
    }

    // Create or update payment record
    const { error: paymentError } = await supabase
      .from('payments')
      .upsert({
        order_id: orderId,
        payment_key: paymentKey,
        amount: paymentData.totalAmount,
        status: 'completed',
        method: paymentData.method,
        approved_at: new Date(paymentData.approvedAt).toISOString(),
      })

    if (paymentError) {
      console.error('Payment record error:', paymentError)
      return NextResponse.json(
        { success: false, message: 'Failed to save payment record' },
        { status: 500 }
      )
    }

    // Add to order status history
    await supabase
      .from('order_status_history')
      .insert({
        order_id: orderId,
        status: 'processing',
        comment: '결제 완료 - 제작 대기 중',
      })

    return NextResponse.json({
      success: true,
      paymentData: {
        paymentKey,
        orderId,
        amount: paymentData.totalAmount,
        method: paymentData.method,
        approvedAt: paymentData.approvedAt,
      },
    })

  } catch (error) {
    console.error('Payment verification error:', error)
    return NextResponse.json(
      { success: false, message: 'Internal server error' },
      { status: 500 }
    )
  }
}
