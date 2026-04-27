'use client'

import { useState, useEffect, useCallback } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import {
  Users,
  Eye,
  Globe,
  Monitor,
  Smartphone,
  Search,
  TrendingUp,
  Clock,
  MapPin,
  RefreshCw,
  ExternalLink,
  LayoutDashboard,
} from 'lucide-react'
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  AreaChart,
  Area,
} from 'recharts'

interface StatsData {
  totalVisitors: number
  totalPageViews: number
  todayVisitors: number
  todayPageViews: number
  uniqueVisitors: number
  countries: { name: string; count: number }[]
  browsers: { name: string; count: number }[]
  os: { name: string; count: number }[]
  devices: { name: string; count: number }[]
  referrers: { name: string; count: number }[]
  pages: { name: string; count: number }[]
  dailyVisitors: { date: string; count: number }[]
  dailyPageViews: { date: string; count: number }[]
  recentVisitors: Visitor[]
}

interface Visitor {
  id: string
  fingerprint: string
  ip: string | null
  country: string | null
  city: string | null
  region: string | null
  browser: string | null
  os: string | null
  device: string | null
  referrer: string | null
  language: string | null
  screenRes: string | null
  page: string | null
  createdAt: string
}

const COLORS = ['#6366f1', '#8b5cf6', '#a78bfa', '#c4b5fd', '#818cf8', '#4f46e5', '#7c3aed', '#5b21b6', '#4c1d95', '#3730a3']

function formatDate(dateStr: string) {
  const d = new Date(dateStr)
  return d.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })
}

function formatDateTime(dateStr: string) {
  const d = new Date(dateStr)
  return d.toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  })
}

export default function AnalyticsPage() {
  const [stats, setStats] = useState<StatsData | null>(null)
  const [loading, setLoading] = useState(true)
  const [visitorsPage, setVisitorsPage] = useState(1)
  const [visitors, setVisitors] = useState<Visitor[]>([])
  const [totalVisitorsPages, setTotalVisitorsPages] = useState(1)
  const [search, setSearch] = useState('')
  const [activeTab, setActiveTab] = useState<'overview' | 'visitors' | 'charts'>('overview')

  const fetchStats = useCallback(async () => {
    try {
      const res = await fetch('/api/analytics/stats')
      if (res.ok) {
        const data = await res.json()
        setStats(data)
      }
    } catch (e) {
      console.error('Failed to fetch stats')
    }
  }, [])

  const fetchVisitors = useCallback(async (page: number, searchStr: string) => {
    try {
      const params = new URLSearchParams({ page: String(page), limit: '15' })
      if (searchStr) params.set('search', searchStr)
      const res = await fetch(`/api/analytics/visitors?${params}`)
      if (res.ok) {
        const data = await res.json()
        setVisitors(data.visitors)
        setTotalVisitorsPages(data.totalPages)
      }
    } catch (e) {
      console.error('Failed to fetch visitors')
    }
  }, [])

  useEffect(() => {
    fetchStats().finally(() => setLoading(false))
  }, [fetchStats])

  useEffect(() => {
    fetchVisitors(visitorsPage, search)
  }, [visitorsPage, search, fetchVisitors])

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <div className="flex flex-col items-center gap-4">
          <RefreshCw className="h-8 w-8 animate-spin text-primary" />
          <p className="text-muted-foreground">Loading analytics...</p>
        </div>
      </div>
    )
  }

  if (!stats) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <p className="text-muted-foreground">Failed to load analytics data.</p>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-background">
      <header className="sticky top-0 z-50 border-b bg-background/80 backdrop-blur-sm">
        <div className="container mx-auto px-4 py-3 flex items-center justify-between">
          <div>
            <h1 className="text-lg font-bold flex items-center gap-2">
              <LayoutDashboard className="h-5 w-5 text-primary" />
              Analytics Dashboard
            </h1>
            <p className="text-xs text-muted-foreground">Real-time visitor tracking</p>
          </div>
          <Button variant="outline" size="sm" onClick={() => { setLoading(true); fetchStats().finally(() => setLoading(false)) }}>
            <RefreshCw className="h-4 w-4 mr-2" />
            Refresh
          </Button>
        </div>
      </header>

      <div className="container mx-auto px-4 py-6">
        <div className="flex gap-2 mb-6">
          {(['overview', 'visitors', 'charts'] as const).map((tab) => (
            <Button key={tab} variant={activeTab === tab ? 'default' : 'outline'} size="sm" onClick={() => setActiveTab(tab)}>
              {tab === 'overview' && <TrendingUp className="h-4 w-4 mr-1" />}
              {tab === 'visitors' && <Users className="h-4 w-4 mr-1" />}
              {tab === 'charts' && <Eye className="h-4 w-4 mr-1" />}
              {tab.charAt(0).toUpperCase() + tab.slice(1)}
            </Button>
          ))}
        </div>

        {activeTab === 'overview' && (
          <>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
              <Card><CardContent className="p-4"><div className="flex items-center justify-between"><div><p className="text-sm text-muted-foreground">Total Visitors</p><p className="text-2xl font-bold">{stats.totalVisitors.toLocaleString()}</p><p className="text-xs text-muted-foreground flex items-center gap-1"><Clock className="h-3 w-3" /> {stats.todayVisitors} today</p></div><div className="h-10 w-10 rounded-lg bg-primary/10 flex items-center justify-center"><Users className="h-5 w-5 text-primary" /></div></div></CardContent></Card>
              <Card><CardContent className="p-4"><div className="flex items-center justify-between"><div><p className="text-sm text-muted-foreground">Page Views</p><p className="text-2xl font-bold">{stats.totalPageViews.toLocaleString()}</p><p className="text-xs text-muted-foreground flex items-center gap-1"><Clock className="h-3 w-3" /> {stats.todayPageViews} today</p></div><div className="h-10 w-10 rounded-lg bg-emerald-500/10 flex items-center justify-center"><Eye className="h-5 w-5 text-emerald-500" /></div></div></CardContent></Card>
              <Card><CardContent className="p-4"><div className="flex items-center justify-between"><div><p className="text-sm text-muted-foreground">Unique Visitors</p><p className="text-2xl font-bold">{stats.uniqueVisitors.toLocaleString()}</p><p className="text-xs text-muted-foreground">By fingerprint</p></div><div className="h-10 w-10 rounded-lg bg-violet-500/10 flex items-center justify-center"><Globe className="h-5 w-5 text-violet-500" /></div></div></CardContent></Card>
              <Card><CardContent className="p-4"><div className="flex items-center justify-between"><div><p className="text-sm text-muted-foreground">Countries</p><p className="text-2xl font-bold">{stats.countries.length}</p><p className="text-xs text-muted-foreground">Regions detected</p></div><div className="h-10 w-10 rounded-lg bg-amber-500/10 flex items-center justify-center"><MapPin className="h-5 w-5 text-amber-500" /></div></div></CardContent></Card>
            </div>

            <Card className="mb-6">
              <CardHeader className="pb-2"><CardTitle className="text-base">Traffic Overview (Last 7 Days)</CardTitle><CardDescription>Daily visitors and page views</CardDescription></CardHeader>
              <CardContent>
                <div className="h-64">
                  <ResponsiveContainer width="100%" height="100%">
                    <AreaChart data={stats.dailyVisitors.map((d, i) => ({ date: formatDate(d.date), visitors: d.count, pageViews: stats.dailyPageViews[i]?.count || 0 }))}>
                      <defs>
                        <linearGradient id="colorVisitors" x1="0" y1="0" x2="0" y2="1"><stop offset="5%" stopColor="#6366f1" stopOpacity={0.3} /><stop offset="95%" stopColor="#6366f1" stopOpacity={0} /></linearGradient>
                        <linearGradient id="colorPageViews" x1="0" y1="0" x2="0" y2="1"><stop offset="5%" stopColor="#10b981" stopOpacity={0.3} /><stop offset="95%" stopColor="#10b981" stopOpacity={0} /></linearGradient>
                      </defs>
                      <CartesianGrid strokeDasharray="3 3" stroke="#333" />
                      <XAxis dataKey="date" tick={{ fontSize: 12 }} stroke="#666" />
                      <YAxis tick={{ fontSize: 12 }} stroke="#666" />
                      <Tooltip contentStyle={{ backgroundColor: '#1e293b', border: '1px solid #334155', borderRadius: '8px', color: '#fff', fontSize: '12px' }} />
                      <Area type="monotone" dataKey="visitors" stroke="#6366f1" fillOpacity={1} fill="url(#colorVisitors)" strokeWidth={2} />
                      <Area type="monotone" dataKey="pageViews" stroke="#10b981" fillOpacity={1} fill="url(#colorPageViews)" strokeWidth={2} />
                    </AreaChart>
                  </ResponsiveContainer>
                </div>
                <div className="flex gap-4 mt-2">
                  <div className="flex items-center gap-2 text-xs text-muted-foreground"><div className="h-3 w-3 rounded-full bg-indigo-500" /> Visitors</div>
                  <div className="flex items-center gap-2 text-xs text-muted-foreground"><div className="h-3 w-3 rounded-full bg-emerald-500" /> Page Views</div>
                </div>
              </CardContent>
            </Card>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
              <Card>
                <CardHeader className="pb-2"><CardTitle className="text-base flex items-center gap-2"><Globe className="h-4 w-4" /> Top Countries</CardTitle></CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    {stats.countries.slice(0, 5).map((c, i) => (<div key={i} className="flex items-center justify-between"><div className="flex items-center gap-2"><span className="text-xs text-muted-foreground w-4">{i + 1}</span><span className="text-sm">{c.name || 'Unknown'}</span></div><Badge variant="secondary">{c.count}</Badge></div>))}
                    {stats.countries.length === 0 && <p className="text-sm text-muted-foreground">No country data yet</p>}
                  </div>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="pb-2"><CardTitle className="text-base flex items-center gap-2"><ExternalLink className="h-4 w-4" /> Top Pages</CardTitle></CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    {stats.pages.slice(0, 5).map((p, i) => (<div key={i} className="flex items-center justify-between"><div className="flex items-center gap-2 min-w-0"><span className="text-xs text-muted-foreground w-4">{i + 1}</span><span className="text-sm truncate">{p.name}</span></div><Badge variant="secondary" className="shrink-0">{p.count}</Badge></div>))}
                    {stats.pages.length === 0 && <p className="text-sm text-muted-foreground">No page data yet</p>}
                  </div>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="pb-2"><CardTitle className="text-base flex items-center gap-2"><Monitor className="h-4 w-4" /> Top Browsers</CardTitle></CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    {stats.browsers.slice(0, 5).map((b, i) => (<div key={i} className="flex items-center justify-between"><div className="flex items-center gap-2"><span className="text-xs text-muted-foreground w-4">{i + 1}</span><span className="text-sm">{b.name || 'Unknown'}</span></div><Badge variant="secondary">{b.count}</Badge></div>))}
                    {stats.browsers.length === 0 && <p className="text-sm text-muted-foreground">No browser data yet</p>}
                  </div>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="pb-2"><CardTitle className="text-base flex items-center gap-2"><Search className="h-4 w-4" /> Top Referrers</CardTitle></CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    {stats.referrers.slice(0, 5).map((r, i) => (<div key={i} className="flex items-center justify-between"><div className="flex items-center gap-2 min-w-0"><span className="text-xs text-muted-foreground w-4">{i + 1}</span><span className="text-sm truncate">{r.name || 'Direct'}</span></div><Badge variant="secondary" className="shrink-0">{r.count}</Badge></div>))}
                    {stats.referrers.length === 0 && <p className="text-sm text-muted-foreground">No referrer data yet</p>}
                  </div>
                </CardContent>
              </Card>
            </div>

            <Card>
              <CardHeader className="pb-2"><CardTitle className="text-base">Recent Visitors</CardTitle><CardDescription>Latest tracked visitor sessions</CardDescription></CardHeader>
              <CardContent>
                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead><tr className="border-b text-muted-foreground"><th className="text-left py-2 px-2 font-medium">Time</th><th className="text-left py-2 px-2 font-medium">Country</th><th className="text-left py-2 px-2 font-medium hidden sm:table-cell">Device</th><th className="text-left py-2 px-2 font-medium hidden md:table-cell">Browser</th><th className="text-left py-2 px-2 font-medium hidden lg:table-cell">OS</th><th className="text-left py-2 px-2 font-medium hidden lg:table-cell">Page</th></tr></thead>
                    <tbody>
                      {stats.recentVisitors.slice(0, 10).map((v) => (
                        <tr key={v.id} className="border-b last:border-0 hover:bg-muted/50">
                          <td className="py-2 px-2 text-xs">{formatDateTime(v.createdAt)}</td>
                          <td className="py-2 px-2">{v.country || '-'}</td>
                          <td className="py-2 px-2 hidden sm:table-cell"><div className="flex items-center gap-1">{v.device === 'Mobile' ? <Smartphone className="h-3 w-3" /> : <Monitor className="h-3 w-3" />}{v.device || '-'}</div></td>
                          <td className="py-2 px-2 hidden md:table-cell">{v.browser || '-'}</td>
                          <td className="py-2 px-2 hidden lg:table-cell">{v.os || '-'}</td>
                          <td className="py-2 px-2 hidden lg:table-cell text-xs text-muted-foreground max-w-[150px] truncate">{v.page || '-'}</td>
                        </tr>
                      ))}
                      {stats.recentVisitors.length === 0 && <tr><td colSpan={6} className="py-6 text-center text-muted-foreground">No visitors tracked yet.</td></tr>}
                    </tbody>
                  </table>
                </div>
              </CardContent>
            </Card>
          </>
        )}

        {activeTab === 'visitors' && (
          <>
            <div className="mb-4 flex gap-2">
              <div className="relative flex-1 max-w-md">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input placeholder="Search by IP, country, browser, OS, device..." className="pl-9" value={search} onChange={(e) => { setSearch(e.target.value); setVisitorsPage(1) }} />
              </div>
            </div>
            <Card>
              <CardContent className="p-0">
                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead><tr className="border-b bg-muted/50"><th className="text-left py-3 px-4 font-medium">#</th><th className="text-left py-3 px-4 font-medium">Time</th><th className="text-left py-3 px-4 font-medium">Fingerprint</th><th className="text-left py-3 px-4 font-medium">IP</th><th className="text-left py-3 px-4 font-medium hidden md:table-cell">Location</th><th className="text-left py-3 px-4 font-medium hidden sm:table-cell">Device</th><th className="text-left py-3 px-4 font-medium hidden lg:table-cell">Browser / OS</th><th className="text-left py-3 px-4 font-medium hidden xl:table-cell">Referrer</th><th className="text-left py-3 px-4 font-medium hidden xl:table-cell">Screen</th></tr></thead>
                    <tbody>
                      {visitors.map((v, i) => (
                        <tr key={v.id} className="border-b last:border-0 hover:bg-muted/30">
                          <td className="py-3 px-4 text-xs text-muted-foreground">{(visitorsPage - 1) * 15 + i + 1}</td>
                          <td className="py-3 px-4 text-xs whitespace-nowrap">{formatDateTime(v.createdAt)}</td>
                          <td className="py-3 px-4"><code className="text-xs bg-muted px-2 py-1 rounded">{v.fingerprint.slice(0, 12)}...</code></td>
                          <td className="py-3 px-4 font-mono text-xs">{v.ip || '-'}</td>
                          <td className="py-3 px-4 hidden md:table-cell text-xs">{[v.city, v.country].filter(Boolean).join(', ') || '-'}</td>
                          <td className="py-3 px-4 hidden sm:table-cell"><div className="flex items-center gap-1">{v.device === 'Mobile' ? <Smartphone className="h-3 w-3" /> : <Monitor className="h-3 w-3" />}{v.device || '-'}</div></td>
                          <td className="py-3 px-4 hidden lg:table-cell text-xs">{[v.browser, v.os].filter(Boolean).join(' / ') || '-'}</td>
                          <td className="py-3 px-4 hidden xl:table-cell text-xs text-muted-foreground max-w-[150px] truncate">{v.referrer || '-'}</td>
                          <td className="py-3 px-4 hidden xl:table-cell text-xs">{v.screenRes || '-'}</td>
                        </tr>
                      ))}
                      {visitors.length === 0 && <tr><td colSpan={9} className="py-12 text-center text-muted-foreground">No visitors found</td></tr>}
                    </tbody>
                  </table>
                </div>
                {totalVisitorsPages > 1 && (
                  <div className="flex items-center justify-between px-4 py-3 border-t">
                    <p className="text-sm text-muted-foreground">Page {visitorsPage} of {totalVisitorsPages}</p>
                    <div className="flex gap-2">
                      <Button variant="outline" size="sm" disabled={visitorsPage <= 1} onClick={() => setVisitorsPage((p) => p - 1)}>Previous</Button>
                      <Button variant="outline" size="sm" disabled={visitorsPage >= totalVisitorsPages} onClick={() => setVisitorsPage((p) => p + 1)}>Next</Button>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          </>
        )}

        {activeTab === 'charts' && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Card><CardHeader className="pb-2"><CardTitle className="text-base">Browsers</CardTitle></CardHeader><CardContent>{stats.browsers.length > 0 ? (<div className="h-64"><ResponsiveContainer width="100%" height="100%"><PieChart><Pie data={stats.browsers} dataKey="count" nameKey="name" cx="50%" cy="50%" outerRadius={80} label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`} labelLine={false}>{stats.browsers.map((_, i) => <Cell key={i} fill={COLORS[i % COLORS.length]} />)}</Pie><Tooltip /></PieChart></ResponsiveContainer></div>) : <p className="text-sm text-muted-foreground text-center py-12">No data yet</p>}</CardContent></Card>
            <Card><CardHeader className="pb-2"><CardTitle className="text-base">Operating Systems</CardTitle></CardHeader><CardContent>{stats.os.length > 0 ? (<div className="h-64"><ResponsiveContainer width="100%" height="100%"><PieChart><Pie data={stats.os} dataKey="count" nameKey="name" cx="50%" cy="50%" outerRadius={80} label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`} labelLine={false}>{stats.os.map((_, i) => <Cell key={i} fill={COLORS[i % COLORS.length]} />)}</Pie><Tooltip /></PieChart></ResponsiveContainer></div>) : <p className="text-sm text-muted-foreground text-center py-12">No data yet</p>}</CardContent></Card>
            <Card><CardHeader className="pb-2"><CardTitle className="text-base">Devices</CardTitle></CardHeader><CardContent>{stats.devices.length > 0 ? (<div className="h-64"><ResponsiveContainer width="100%" height="100%"><BarChart data={stats.devices}><CartesianGrid strokeDasharray="3 3" stroke="#333" /><XAxis dataKey="name" tick={{ fontSize: 12 }} stroke="#666" /><YAxis tick={{ fontSize: 12 }} stroke="#666" /><Tooltip contentStyle={{ backgroundColor: '#1e293b', border: '1px solid #334155', borderRadius: '8px', color: '#fff' }} /><Bar dataKey="count" fill="#6366f1" radius={[4, 4, 0, 0]} /></BarChart></ResponsiveContainer></div>) : <p className="text-sm text-muted-foreground text-center py-12">No data yet</p>}</CardContent></Card>
            <Card><CardHeader className="pb-2"><CardTitle className="text-base">Page Views</CardTitle></CardHeader><CardContent>{stats.pages.length > 0 ? (<div className="h-64"><ResponsiveContainer width="100%" height="100%"><BarChart data={stats.pages}><CartesianGrid strokeDasharray="3 3" stroke="#333" /><XAxis dataKey="name" tick={{ fontSize: 10 }} stroke="#666" /><YAxis tick={{ fontSize: 12 }} stroke="#666" /><Tooltip contentStyle={{ backgroundColor: '#1e293b', border: '1px solid #334155', borderRadius: '8px', color: '#fff' }} /><Bar dataKey="count" fill="#10b981" radius={[4, 4, 0, 0]} /></BarChart></ResponsiveContainer></div>) : <p className="text-sm text-muted-foreground text-center py-12">No data yet</p>}</CardContent></Card>
            <Card className="md:col-span-2"><CardHeader className="pb-2"><CardTitle className="text-base">Visitors by Country</CardTitle></CardHeader><CardContent>{stats.countries.length > 0 ? (<div className="h-64"><ResponsiveContainer width="100%" height="100%"><BarChart data={stats.countries} layout="vertical"><CartesianGrid strokeDasharray="3 3" stroke="#333" /><XAxis type="number" tick={{ fontSize: 12 }} stroke="#666" /><YAxis type="category" dataKey="name" tick={{ fontSize: 12 }} stroke="#666" width={100} /><Tooltip contentStyle={{ backgroundColor: '#1e293b', border: '1px solid #334155', borderRadius: '8px', color: '#fff' }} /><Bar dataKey="count" fill="#f59e0b" radius={[0, 4, 4, 0]} /></BarChart></ResponsiveContainer></div>) : <p className="text-sm text-muted-foreground text-center py-12">No data yet</p>}</CardContent></Card>
          </div>
        )}
      </div>
    </div>
  )
}
