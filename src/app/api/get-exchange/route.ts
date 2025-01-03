import { NextRequest, NextResponse } from 'next/server'

export const GET = async (request: NextRequest): Promise<NextResponse> => {
  const fromCurrency = request.nextUrl.searchParams.get('from-currency') ?? ''
  const toCurrency = request.nextUrl.searchParams.get('to-currency') ?? ''

  try {
    const fromCurrencyResponse = await fetch(`https://api.vatcomply.com/rates?base=${fromCurrency}`)
      .then(data => data.json())
      .then(response => response)

    const toCurrencyResponse = await fetch(`https://api.vatcomply.com/rates?base=${toCurrency}`)
      .then(data => data.json())
      .then(response => response)

    return NextResponse.json({ fromCurrencyResponse, toCurrencyResponse })
  } catch (error) {
    console.log(error)
    return NextResponse.json({
      apiMessage: { errorMsg: 'Internal Server Error, Please try again later' }
    })
  }
}
