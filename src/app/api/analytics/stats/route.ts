import { db } from '@/lib/db'
import { NextResponse } from 'next/server'

export async function GET() {
  try {
    const totalVisitors = await db.analyticsVisitor.count()
    const totalPageViews = await db.analyticsPageView.count()

    // Get today's counts
    const today = new Date()
    today.setHours(0, 0, 0, 0)

    const todayVisitors = await db.analyticsVisitor.count({
      where: { createdAt: { gte: today } },
    })
    const todayPageViews = await db.analyticsPageView.count({
      where: { createdAt: { gte: today } },
    })

    // Unique visitors (by fingerprint)
    const uniqueFingerprints = await db.analyticsVisitor.findMany({
      select: { fingerprint: true },
      distinct: ['fingerprint'],
    })

    // Top countries
    const countryData = await db.analyticsVisitor.groupBy({
      by: ['country'],
      where: { country: { not: null } },
      _count: { country: true },
      orderBy: { _count: { country: 'desc' } },
      take: 10,
    })

    // Top browsers
    const browserData = await db.analyticsVisitor.groupBy({
      by: ['browser'],
      where: { browser: { not: null } },
      _count: { browser: true },
      orderBy: { _count: { browser: 'desc' } },
      take: 10,
    })

    // Top OS
    const osData = await db.analyticsVisitor.groupBy({
      by: ['os'],
      where: { os: { not: null } },
      _count: { os: true },
      orderBy: { _count: { os: 'desc' } },
      take: 10,
    })

    // Top devices
    const deviceData = await db.analyticsVisitor.groupBy({
      by: ['device'],
      where: { device: { not: null } },
      _count: { device: true },
      orderBy: { _count: { device: 'desc' } },
      take: 10,
    })

    // Top referrers
    const referrerData = await db.analyticsVisitor.groupBy({
      by: ['referrer'],
      where: { referrer: { not: null } },
      _count: { referrer: true },
      orderBy: { _count: { referrer: 'desc' } },
      take: 10,
    })

    // Top pages
    const pageData = await db.analyticsPageView.groupBy({
      by: ['page'],
      _count: { page: true },
      orderBy: { _count: { page: 'desc' } },
      take: 10,
    })

    // Last 7 days visitors (for chart)
    const sevenDaysAgo = new Date()
    sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7)
    sevenDaysAgo.setHours(0, 0, 0, 0)

    const last7DaysVisitors = await db.analyticsVisitor.findMany({
      where: { createdAt: { gte: sevenDaysAgo } },
      select: { createdAt: true, fingerprint: true },
    })

    // Group by day
    const dailyVisitors: Record<string, number> = {}
    for (let i = 6; i >= 0; i--) {
      const d = new Date()
      d.setDate(d.getDate() - i)
      const key = d.toISOString().split('T')[0]
      dailyVisitors[key] = 0
    }

    for (const v of last7DaysVisitors) {
      const key = v.createdAt.toISOString().split('T')[0]
      if (dailyVisitors[key] !== undefined) {
        dailyVisitors[key]++
      }
    }

    // Last 7 days page views (for chart)
    const last7DaysPageViews = await db.analyticsPageView.findMany({
      where: { createdAt: { gte: sevenDaysAgo } },
      select: { createdAt: true },
    })

    const dailyPageViews: Record<string, number> = {}
    for (let i = 6; i >= 0; i--) {
      const d = new Date()
      d.setDate(d.getDate() - i)
      const key = d.toISOString().split('T')[0]
      dailyPageViews[key] = 0
    }

    for (const pv of last7DaysPageViews) {
      const key = pv.createdAt.toISOString().split('T')[0]
      if (dailyPageViews[key] !== undefined) {
        dailyPageViews[key]++
      }
    }

    // Recent visitors (last 20)
    const recentVisitors = await db.analyticsVisitor.findMany({
      orderBy: { createdAt: 'desc' },
      take: 20,
    })

    return NextResponse.json({
      totalVisitors,
      totalPageViews,
      todayVisitors,
      todayPageViews,
      uniqueVisitors: uniqueFingerprints.length,
      countries: countryData.map((c) => ({ name: c.country, count: c._count.country })),
      browsers: browserData.map((b) => ({ name: b.browser, count: b._count.browser })),
      os: osData.map((o) => ({ name: o.os, count: o._count.os })),
      devices: deviceData.map((d) => ({ name: d.device, count: d._count.device })),
      referrers: referrerData.map((r) => ({ name: r.referrer, count: r._count.referrer })),
      pages: pageData.map((p) => ({ name: p.page, count: p._count.page })),
      dailyVisitors: Object.entries(dailyVisitors).map(([date, count]) => ({
        date,
        count,
      })),
      dailyPageViews: Object.entries(dailyPageViews).map(([date, count]) => ({
        date,
        count,
      })),
      recentVisitors,
    })
  } catch (error) {
    console.error('Analytics stats error:', error)
    return NextResponse.json({ error: 'Failed to get stats' }, { status: 500 })
  }
}
