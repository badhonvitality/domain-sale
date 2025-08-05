import { NextRequest, NextResponse } from 'next/server'

const viewers = new Set<string>()

export async function GET(req: NextRequest) {
  const ip =
    req.headers.get('x-forwarded-for')?.split(',')[0] ||
    req.ip ||
    'unknown'

  const ua = req.headers.get('user-agent') || 'unknown'
  const id = `${ip}-${ua}`

  viewers.add(id)

  return NextResponse.json({ count: viewers.size })
}
