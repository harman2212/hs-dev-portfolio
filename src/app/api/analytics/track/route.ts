import { db } from '@/lib/db'
import { NextRequest, NextResponse } from 'next/server'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const {
      fingerprint,
      ip,
      country,
      city,
      region,
      userAgent,
      browser,
      os,
      device,
      referrer,
      language,
      screenRes,
      sessionId,
      page,
    } = body

    if (!fingerprint) {
      return NextResponse.json({ error: 'Fingerprint required' }, { status: 400 })
    }

    // Save visitor
    await db.analyticsVisitor.create({
      data: {
        fingerprint,
        ip: ip || null,
        country: country || null,
        city: city || null,
        region: region || null,
        userAgent: userAgent || null,
        browser: browser || null,
        os: os || null,
        device: device || null,
        referrer: referrer || null,
        language: language || null,
        screenRes: screenRes || null,
        sessionId: sessionId || null,
        page: page || null,
      },
    })

    // Save page view
    await db.analyticsPageView.create({
      data: {
        fingerprint,
        page: page || '/',
        title: null,
        duration: 0,
      },
    })

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Analytics tracking error:', error)
    return NextResponse.json({ error: 'Failed to track' }, { status: 500 })
  }
}
