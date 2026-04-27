import { db } from '@/lib/db'
import { NextRequest, NextResponse } from 'next/server'

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams
    const page = parseInt(searchParams.get('page') || '1')
    const limit = parseInt(searchParams.get('limit') || '20')
    const search = searchParams.get('search') || ''

    const where: Record<string, unknown> = {}
    if (search) {
      where.OR = [
        { ip: { contains: search } },
        { country: { contains: search } },
        { city: { contains: search } },
        { browser: { contains: search } },
        { os: { contains: search } },
        { device: { contains: search } },
        { fingerprint: { contains: search } },
      ]
    }

    const [visitors, total] = await Promise.all([
      db.analyticsVisitor.findMany({
        where,
        orderBy: { createdAt: 'desc' },
        skip: (page - 1) * limit,
        take: limit,
      }),
      db.analyticsVisitor.count({ where }),
    ])

    return NextResponse.json({
      visitors,
      total,
      page,
      totalPages: Math.ceil(total / limit),
    })
  } catch (error) {
    console.error('Analytics visitors error:', error)
    return NextResponse.json({ error: 'Failed to get visitors' }, { status: 500 })
  }
}
