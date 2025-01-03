import { NextRequest, NextResponse } from 'next/server'

export const GET = async (request: NextRequest): Promise<NextResponse> => {
  const currency = request.nextUrl.searchParams.get('currency') ?? ''

  try {
    const response = await fetch(`https://api.vatcomply.com/rates?base=${currency}`)
      .then(data => data.json())
      .then(response => response)

    return NextResponse.json(response)
  } catch (error) {
    console.log(error)
    return NextResponse.json({
      apiMessage: { errorMsg: 'Internal Server Error, Please try again later' }
    })
  }
}
