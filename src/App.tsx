import { useEffect, useMemo, useState } from 'react';
import {
  Activity,
  AlertTriangle,
  ArrowRight,
  BarChart3,
  Bell,
  Building2,
  Calendar,
  ChevronDown,
  Clock,
  DollarSign,
  Languages,
  LayoutDashboard,
  Mail,
  Moon,
  MoreVertical,
  Orbit,
  PanelLeftClose,
  Phone,
  Plus,
  Search,
  Settings,
  ShieldCheck,
  SlidersHorizontal,
  Sparkles,
  Sun,
  TrendingDown,
  TrendingUp,
  Users,
} from 'lucide-react';
import {
  AppSurface,
  Badge,
  HealthDot,
  IconButton,
  MetricTile,
  Panel,
  SearchInput,
  SectionHeader,
  SegmentButton,
  TextButton,
  WorkspaceFrame,
} from './components/ui';

type Locale = 'ja' | 'en';
type ThemePreference = 'light' | 'dark' | 'system';
type View = 'dashboard' | 'accounts' | 'analytics' | 'settings';
type Filter = 'all' | 'risk' | 'enterprise' | 'healthy';
type Health = 'green' | 'amber' | 'red' | 'blue' | 'slate';

interface Account {
  id: string;
  name: string;
  industry: string;
  tier: string;
  arr: number;
  health: number;
  nrr: number;
  lastActivity: string;
  risk: 'low' | 'medium' | 'high';
  owner: string;
}

interface ActivityItem {
  account: string;
  title: string;
  time: string;
  tone: Health;
}

const themeKey = 'melius-official-app-customer-success-theme';
const localeKey = 'melius-official-app-customer-success-locale';

const accounts: Account[] = [
  {
    id: 'solstice',
    name: 'Solstice Cloud',
    industry: 'SaaS',
    tier: 'Enterprise',
    arr: 520000,
    health: 92,
    nrr: 119,
    lastActivity: '2h',
    risk: 'low',
    owner: 'Mina',
  },
  {
    id: 'northbank',
    name: 'Northbank Finance',
    industry: 'Finance',
    tier: 'Enterprise',
    arr: 430000,
    health: 76,
    nrr: 106,
    lastActivity: '1d',
    risk: 'medium',
    owner: 'Jun',
  },
  {
    id: 'cloudline',
    name: 'Cloudline Systems',
    industry: 'Data Platform',
    tier: 'Enterprise',
    arr: 610000,
    health: 42,
    nrr: 91,
    lastActivity: '5d',
    risk: 'high',
    owner: 'Mina',
  },
  {
    id: 'luma',
    name: 'Luma Retail',
    industry: 'Retail',
    tier: 'Mid-market',
    arr: 185000,
    health: 34,
    nrr: 84,
    lastActivity: '14d',
    risk: 'high',
    owner: 'Ren',
  },
  {
    id: 'atlas',
    name: 'Atlas Health',
    industry: 'Healthcare',
    tier: 'Mid-market',
    arr: 238000,
    health: 88,
    nrr: 122,
    lastActivity: '6h',
    risk: 'low',
    owner: 'Kae',
  },
  {
    id: 'vector',
    name: 'Vector Works',
    industry: 'Manufacturing',
    tier: 'Startup',
    arr: 92000,
    health: 63,
    nrr: 101,
    lastActivity: '3d',
    risk: 'medium',
    owner: 'Jun',
  },
];

const churnSeries = [
  { month: 'Jan', predicted: 2.1, actual: 1.8 },
  { month: 'Feb', predicted: 2.3, actual: 2.0 },
  { month: 'Mar', predicted: 2.0, actual: 1.6 },
  { month: 'Apr', predicted: 2.5, actual: 2.2 },
  { month: 'May', predicted: 2.8, actual: 2.5 },
  { month: 'Jun', predicted: 2.4, actual: 2.1 },
  { month: 'Jul', predicted: 2.2, actual: 0 },
  { month: 'Aug', predicted: 1.9, actual: 0 },
  { month: 'Sep', predicted: 2.6, actual: 0 },
  { month: 'Oct', predicted: 3.0, actual: 0 },
  { month: 'Nov', predicted: 2.7, actual: 0 },
  { month: 'Dec', predicted: 2.2, actual: 0 },
];

const activities: ActivityItem[] = [
  { account: 'Atlas Health', title: 'Security review completed', time: '6h', tone: 'green' },
  { account: 'Solstice Cloud', title: 'Executive QBR scheduled', time: '2h', tone: 'blue' },
  { account: 'Northbank Finance', title: 'Procurement asked for usage detail', time: '1d', tone: 'amber' },
  { account: 'Cloudline Systems', title: 'Champion changed role', time: '5d', tone: 'red' },
  { account: 'Vector Works', title: 'Admin training invite sent', time: '3d', tone: 'slate' },
];

const copy = {
  ja: {
    product: 'Orbit CS',
    nav: {
      dashboard: 'ダッシュボード',
      accounts: 'アカウント',
      analytics: '分析',
      settings: '設定',
    },
    accounts: {
      title: 'Accounts',
      new: 'New',
      search: 'Search accounts...',
      sort: 'Sort by',
      filters: {
        all: 'All',
        risk: 'At Risk',
        enterprise: 'Enterprise',
        healthy: 'Healthy',
      },
      count: 'accounts',
    },
    topbar: {
      dashboard: 'Portfolio Overview',
      accounts: 'Account Command',
      analytics: 'Analytics',
      settings: 'Settings',
      command: 'Search or command...',
    },
    dashboard: {
      title: 'Portfolio Pulse',
      subtitle: '顧客ポートフォリオの状態、リスク、拡張機会を一画面で確認します。',
      updated: 'Updated just now',
      totalArr: 'Total Book of Business',
      nrr: 'Net Retention Rate',
      health: 'Avg Health Score',
      active: 'Active Accounts',
      chartTitle: 'Churn Prediction Radar',
      chartSubtitle: '12-month forecast vs actual',
      predicted: 'Predicted',
      actual: 'Actual',
      riskTitle: 'Accounts at Risk',
      riskSubtitle: '早めの対応が必要な顧客',
      activityTitle: 'Recent Activity',
      activitySubtitle: 'Latest touchpoints across your portfolio',
      viewAll: 'View all',
    },
    detail: {
      title: 'Account Detail',
      industry: 'Industry',
      owner: 'Owner',
      timeline: 'Timeline',
      contacts: 'Contacts',
      expansion: 'Expansion',
      log: 'Log Activity',
      primary: 'Primary',
      champion: 'Champion',
      back: 'Back',
    },
    analytics: {
      title: 'Analytics',
      subtitle: 'リテンション、リスク、収益拡張の傾向を確認します。',
      cohort: 'Renewal Cohorts',
      segments: 'Segment Health',
      forecast: 'Forecast Quality',
    },
    settings: {
      title: 'Settings',
      subtitle: 'チーム運用に使う表示、ヘルス基準、通知のサンプル設定です。',
      thresholds: 'Health thresholds',
      notifications: 'Notifications',
      language: 'Language',
      theme: 'Theme',
    },
  },
  en: {
    product: 'Orbit CS',
    nav: {
      dashboard: 'Dashboard',
      accounts: 'Accounts',
      analytics: 'Analytics',
      settings: 'Settings',
    },
    accounts: {
      title: 'Accounts',
      new: 'New',
      search: 'Search accounts...',
      sort: 'Sort by',
      filters: {
        all: 'All',
        risk: 'At Risk',
        enterprise: 'Enterprise',
        healthy: 'Healthy',
      },
      count: 'accounts',
    },
    topbar: {
      dashboard: 'Portfolio Overview',
      accounts: 'Account Command',
      analytics: 'Analytics',
      settings: 'Settings',
      command: 'Search or command...',
    },
    dashboard: {
      title: 'Portfolio Pulse',
      subtitle: 'Track customer health, risk, and expansion signals across your book of business.',
      updated: 'Updated just now',
      totalArr: 'Total Book of Business',
      nrr: 'Net Retention Rate',
      health: 'Avg Health Score',
      active: 'Active Accounts',
      chartTitle: 'Churn Prediction Radar',
      chartSubtitle: '12-month forecast vs actual',
      predicted: 'Predicted',
      actual: 'Actual',
      riskTitle: 'Accounts at Risk',
      riskSubtitle: 'Customers needing attention',
      activityTitle: 'Recent Activity',
      activitySubtitle: 'Latest touchpoints across your portfolio',
      viewAll: 'View all',
    },
    detail: {
      title: 'Account Detail',
      industry: 'Industry',
      owner: 'Owner',
      timeline: 'Timeline',
      contacts: 'Contacts',
      expansion: 'Expansion',
      log: 'Log Activity',
      primary: 'Primary',
      champion: 'Champion',
      back: 'Back',
    },
    analytics: {
      title: 'Analytics',
      subtitle: 'Review retention movement, risk clusters, and revenue expansion quality.',
      cohort: 'Renewal Cohorts',
      segments: 'Segment Health',
      forecast: 'Forecast Quality',
    },
    settings: {
      title: 'Settings',
      subtitle: 'Sample display, health scoring, and notification settings for the team workflow.',
      thresholds: 'Health thresholds',
      notifications: 'Notifications',
      language: 'Language',
      theme: 'Theme',
    },
  },
};

function getInitialLocale(): Locale {
  const rootLocale = document.documentElement.lang;
  if (rootLocale === 'ja' || rootLocale === 'en') return rootLocale;
  return 'ja';
}

function getInitialTheme(): ThemePreference {
  const preference = document.documentElement.dataset.themePreference;
  if (preference === 'light' || preference === 'dark' || preference === 'system') return preference;
  return 'system';
}

function resolveTheme(preference: ThemePreference) {
  if (preference === 'system') {
    return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
  }

  return preference;
}

function applyTheme(preference: ThemePreference) {
  const resolved = resolveTheme(preference);
  document.documentElement.dataset.theme = resolved;
  document.documentElement.dataset.themePreference = preference;
  document.documentElement.classList.toggle('dark', resolved === 'dark');
  document.documentElement.style.colorScheme = resolved === 'dark' ? 'dark' : 'light';
}

function formatCurrency(value: number) {
  if (value >= 1000000) return `$${(value / 1000000).toFixed(2)}M`;
  return `$${Math.round(value / 1000)}K`;
}

function healthTone(score: number): Health {
  if (score >= 80) return 'green';
  if (score >= 50) return 'slate';
  if (score >= 35) return 'amber';
  return 'red';
}

function sortedAccounts(filter: Filter) {
  return accounts
    .filter((account) => {
      if (filter === 'risk') return account.risk === 'high' || account.health < 50;
      if (filter === 'enterprise') return account.tier === 'Enterprise';
      if (filter === 'healthy') return account.health >= 75;
      return true;
    })
    .sort((a, b) => b.arr - a.arr);
}

function CommandDock({
  activeView,
  setActiveView,
  labels,
}: {
  activeView: View;
  setActiveView: (view: View) => void;
  labels: (typeof copy)[Locale]['nav'];
}) {
  const items = [
    { id: 'dashboard', label: labels.dashboard, icon: LayoutDashboard },
    { id: 'accounts', label: labels.accounts, icon: Users },
    { id: 'analytics', label: labels.analytics, icon: BarChart3 },
    { id: 'settings', label: labels.settings, icon: Settings },
  ] as const;

  return (
    <aside data-melius-ui-id="command-dock" data-melius-ui-role="navigation" className="command-dock">
      <div data-melius-ui-id="brand-mark" data-melius-ui-role="brand" className="brand-mark">
        <Orbit size={18} strokeWidth={1.6} />
      </div>
      <nav className="dock-nav">
        {items.map((item) => {
          const Icon = item.icon;
          return (
            <IconButton
              key={item.id}
              dataId={`dock-${item.id}-button`}
              roleName="nav-button"
              label={item.label}
              selected={activeView === item.id}
              onClick={() => setActiveView(item.id)}
            >
              <Icon size={18} strokeWidth={1.55} />
              <span>{item.label}</span>
            </IconButton>
          );
        })}
      </nav>
      <div data-melius-ui-id="dock-user-avatar" data-melius-ui-role="avatar" className="dock-avatar">
        CS
      </div>
    </aside>
  );
}

function AccountList({
  locale,
  selectedId,
  setSelectedId,
  filter,
  setFilter,
  openAccounts,
}: {
  locale: Locale;
  selectedId: string;
  setSelectedId: (id: string) => void;
  filter: Filter;
  setFilter: (filter: Filter) => void;
  openAccounts: () => void;
}) {
  const t = copy[locale].accounts;
  const filtered = sortedAccounts(filter);
  const total = filtered.reduce((sum, account) => sum + account.arr, 0);
  const filters = [
    { id: 'all', label: t.filters.all, icon: Sparkles },
    { id: 'risk', label: t.filters.risk, icon: AlertTriangle },
    { id: 'enterprise', label: t.filters.enterprise, icon: Building2 },
    { id: 'healthy', label: t.filters.healthy, icon: ShieldCheck },
  ] as const;

  return (
    <aside data-melius-ui-id="account-list-panel" data-melius-ui-role="account-list" className="account-list">
      <div className="account-list__header">
        <div className="account-list__title-row">
          <h2 data-melius-ui-id="account-list-title">{t.title}</h2>
          <div>
            <TextButton dataId="new-account-button" roleName="button">
              <Plus size={14} />
              {t.new}
            </TextButton>
            <IconButton dataId="collapse-account-list-button" label="Collapse" roleName="button">
              <PanelLeftClose size={16} />
            </IconButton>
          </div>
        </div>
        <SearchInput
          dataId="account-search-input"
          roleName="search"
          label={t.search}
          placeholder={t.search}
          icon={<Search size={14} />}
        />
        <div data-melius-ui-id="account-filter-chips" data-melius-ui-role="filter-group" className="filter-chips">
          {filters.map((item) => {
            const Icon = item.icon;
            return (
              <SegmentButton
                key={item.id}
                dataId={`account-filter-${item.id}`}
                roleName="filter"
                selected={filter === item.id}
                onClick={() => setFilter(item.id)}
              >
                <Icon size={12} />
                {item.label}
              </SegmentButton>
            );
          })}
        </div>
        <div data-melius-ui-id="account-sort-row" data-melius-ui-role="toolbar" className="sort-row">
          <button type="button">
            {t.sort}: <strong>ARR</strong> <ChevronDown size={13} />
          </button>
          <span>{filtered.length}</span>
        </div>
      </div>

      <div className="account-rows">
        {filtered.map((account) => {
          const selected = selectedId === account.id;
          const tone = healthTone(account.health);
          return (
            <button
              key={account.id}
              type="button"
              data-melius-ui-id={`account-row-${account.id}`}
              data-melius-ui-role="account-row"
              data-selected={selected ? 'true' : 'false'}
              onClick={() => {
                setSelectedId(account.id);
                openAccounts();
              }}
              className="account-row"
            >
              <span className="account-row__indicator" />
              <span className="account-row__dot">
                <HealthDot tone={tone} />
              </span>
              <span className="account-row__content">
                <span className="account-row__main">
                  <strong>{account.name}</strong>
                  {account.risk === 'high' ? <Badge tone="red">At Risk</Badge> : null}
                </span>
                <span className="account-row__meta">
                  <span>{account.industry}</span>
                  <span>{account.lastActivity}</span>
                </span>
                <span className="health-bar" data-tone={tone}>
                  <span style={{ width: `${account.health}%` }} />
                </span>
              </span>
              <span className="account-row__arr">{formatCurrency(account.arr)}</span>
            </button>
          );
        })}
      </div>

      <div data-melius-ui-id="account-list-footer" data-melius-ui-role="summary" className="account-list__footer">
        <span>
          {filtered.length} {t.count}
        </span>
        <strong>{formatCurrency(total)}</strong>
      </div>
    </aside>
  );
}

function Dashboard({ locale, selectAccount }: { locale: Locale; selectAccount: (id: string) => void }) {
  const t = copy[locale].dashboard;
  const total = accounts.reduce((sum, account) => sum + account.arr, 0);
  const avgNrr = Math.round(accounts.reduce((sum, account) => sum + account.nrr, 0) / accounts.length);
  const avgHealth = Math.round(accounts.reduce((sum, account) => sum + account.health, 0) / accounts.length);
  const riskAccounts = accounts.filter((account) => account.risk === 'high' || account.health < 50);

  return (
    <section data-melius-ui-id="dashboard-view" data-melius-ui-role="view" className="view-stack">
      <SectionHeader data-melius-ui-id="dashboard-header">
        <div>
          <h1>{t.title}</h1>
          <p>{t.subtitle}</p>
        </div>
        <span className="sync-label">
          <Clock size={13} />
          {t.updated}
        </span>
      </SectionHeader>

      <div data-melius-ui-id="sentinel-metrics-grid" data-melius-ui-role="metrics" className="metric-grid">
        <MetricTile
          dataId="metric-total-arr"
          label={t.totalArr}
          value={formatCurrency(total)}
          note="+8.2% vs last month"
          icon={<DollarSign size={16} />}
        />
        <MetricTile
          dataId="metric-nrr"
          label={t.nrr}
          value={`${avgNrr}%`}
          note="+3.5% vs last month"
          icon={<TrendingUp size={16} />}
          tone="green"
        />
        <MetricTile
          dataId="metric-health"
          label={t.health}
          value={`${avgHealth}/100`}
          note="+2.1 vs last month"
          icon={<Activity size={16} />}
          tone="green"
        />
        <MetricTile
          dataId="metric-active-accounts"
          label={t.active}
          value={`${accounts.length}`}
          note="0 vs last month"
          icon={<Users size={16} />}
        />
      </div>

      <div className="dashboard-grid">
        <Panel dataId="churn-chart-panel" roleName="chart">
          <div className="panel-heading">
            <div>
              <h3>{t.chartTitle}</h3>
              <p>{t.chartSubtitle}</p>
            </div>
            <div data-melius-ui-id="churn-chart-legend" className="legend">
              <span>
                <i className="legend-blue" />
                {t.predicted}
              </span>
              <span>
                <i className="legend-green" />
                {t.actual}
              </span>
            </div>
          </div>
          <ChurnChart />
        </Panel>

        <Panel dataId="risk-accounts-panel" roleName="risk-list">
          <div className="panel-heading compact">
            <span className="panel-icon danger">
              <AlertTriangle size={15} />
            </span>
            <div>
              <h3>{t.riskTitle}</h3>
              <p>
                {riskAccounts.length} {t.riskSubtitle}
              </p>
            </div>
          </div>
          <div className="risk-list">
            {riskAccounts.map((account) => (
              <button
                key={account.id}
                type="button"
                data-melius-ui-id={`risk-account-${account.id}`}
                data-melius-ui-role="risk-row"
                onClick={() => selectAccount(account.id)}
              >
                <span>
                  <strong>{account.name}</strong>
                  <small>Last activity: {account.lastActivity}</small>
                </span>
                <Badge tone={account.health < 35 ? 'red' : 'amber'}>{account.health}</Badge>
              </button>
            ))}
          </div>
        </Panel>
      </div>

      <Panel dataId="recent-activity-panel" roleName="activity-list">
        <div className="panel-heading">
          <div className="compact-title">
            <span className="panel-icon">
              <TrendingUp size={15} />
            </span>
            <div>
              <h3>{t.activityTitle}</h3>
              <p>{t.activitySubtitle}</p>
            </div>
          </div>
          <TextButton dataId="recent-activity-view-all" roleName="button">
            {t.viewAll}
            <ArrowRight size={13} />
          </TextButton>
        </div>
        <div className="activity-grid">
          {activities.map((item) => (
            <button
              key={`${item.account}-${item.time}`}
              type="button"
              data-melius-ui-id={`recent-activity-${item.account.toLowerCase().replace(/\s+/g, '-')}`}
              data-melius-ui-role="activity-card"
            >
              <span>
                <HealthDot tone={item.tone} />
                <strong>{item.account}</strong>
              </span>
              <p>{item.title}</p>
              <small>{item.time}</small>
            </button>
          ))}
        </div>
      </Panel>
    </section>
  );
}

function ChurnChart() {
  const max = 3.2;
  const predictedPoints = churnSeries
    .map((point, index) => {
      const x = (index / (churnSeries.length - 1)) * 100;
      const y = 100 - (point.predicted / max) * 82 - 8;
      return `${x},${y}`;
    })
    .join(' ');
  const actualPoints = churnSeries
    .filter((point) => point.actual > 0)
    .map((point, index, list) => {
      const sourceIndex = churnSeries.indexOf(point);
      const x = (sourceIndex / (churnSeries.length - 1)) * 100;
      const y = 100 - (point.actual / max) * 82 - 8;
      return `${x},${y}`;
    })
    .join(' ');

  return (
    <div data-melius-ui-id="churn-chart-graphic" className="chart-wrap">
      <svg viewBox="0 0 100 100" preserveAspectRatio="none" aria-hidden="true">
        <defs>
          <linearGradient id="predicted-fill" x1="0" x2="0" y1="0" y2="1">
            <stop offset="0%" stopColor="#0066ff" stopOpacity="0.18" />
            <stop offset="100%" stopColor="#0066ff" stopOpacity="0" />
          </linearGradient>
        </defs>
        {[22, 42, 62, 82].map((line) => (
          <line key={line} x1="0" x2="100" y1={line} y2={line} className="grid-line" />
        ))}
        <polygon points={`0,100 ${predictedPoints} 100,100`} fill="url(#predicted-fill)" />
        <polyline points={predictedPoints} className="chart-line predicted" />
        <polyline points={actualPoints} className="chart-line actual" />
      </svg>
      <div className="chart-axis">
        {churnSeries.map((point) => (
          <span key={point.month}>{point.month}</span>
        ))}
      </div>
    </div>
  );
}

function AccountDetail({ locale, account }: { locale: Locale; account: Account }) {
  const t = copy[locale].detail;
  const tone = healthTone(account.health);

  return (
    <section data-melius-ui-id="account-detail-view" data-melius-ui-role="view" className="view-stack">
      <SectionHeader data-melius-ui-id="account-detail-header">
        <div>
          <h1>{account.name}</h1>
          <p>
            {t.industry}: {account.industry} · {t.owner}: {account.owner} · Last active {account.lastActivity}
          </p>
        </div>
        <div className="header-actions">
          <Badge tone={account.tier === 'Enterprise' ? 'blue' : 'slate'}>{account.tier}</Badge>
          {account.risk === 'high' ? <Badge tone="red">Churn Risk</Badge> : null}
          <IconButton dataId="account-more-menu-button" label="More" roleName="button">
            <MoreVertical size={17} />
          </IconButton>
        </div>
      </SectionHeader>

      <div data-melius-ui-id="account-metrics-grid" className="metric-grid detail">
        <MetricTile
          dataId="detail-arr-metric"
          label="ARR"
          value={formatCurrency(account.arr)}
          note="+$42K open expansion"
          icon={<DollarSign size={16} />}
        />
        <MetricTile
          dataId="detail-nrr-metric"
          label="NRR"
          value={`${account.nrr}%`}
          note={account.nrr >= 100 ? 'Expansion positive' : 'Renewal pressure'}
          icon={account.nrr >= 100 ? <TrendingUp size={16} /> : <TrendingDown size={16} />}
          tone={account.nrr >= 100 ? 'green' : 'amber'}
        />
        <MetricTile
          dataId="detail-health-metric"
          label="Health"
          value={`${account.health}/100`}
          note={account.risk === 'high' ? 'Manual review needed' : 'Within target band'}
          icon={<Activity size={16} />}
          tone={tone === 'red' ? 'red' : tone === 'amber' ? 'amber' : 'green'}
        />
        <MetricTile
          dataId="detail-contact-metric"
          label={t.contacts}
          value="4"
          note="2 champions active"
          icon={<Users size={16} />}
        />
      </div>

      <div className="detail-grid">
        <Panel dataId="sentiment-orb-panel" roleName="health-visual">
          <div className="sentiment-orb" data-tone={tone}>
            <span>{account.health}</span>
          </div>
          <h3>Sentiment Signal</h3>
          <p>Relationship strength, activity recency, support load, and expansion movement combined.</p>
          <div className="orb-scale">
            <span />
            <span />
            <span />
            <span />
          </div>
        </Panel>

        <Panel dataId="timeline-panel" roleName="timeline">
          <div className="panel-heading">
            <div>
              <h3>{t.timeline}</h3>
              <p>Recent decisions and relationship movement</p>
            </div>
            <TextButton dataId="log-activity-button" roleName="button">
              <Plus size={13} />
              {t.log}
            </TextButton>
          </div>
          <div className="timeline-list">
            {[
              ['Renewal risk raised by CSM', 'Procurement asked for seat-level usage export', '1d'],
              ['Champion meeting completed', 'Success criteria moved to executive dashboard rollout', '4d'],
              ['Support backlog cleared', 'Two priority tickets closed by product specialist', '9d'],
              ['Expansion signal captured', 'Analytics add-on requested by operations team', '13d'],
            ].map(([title, body, time], index) => (
              <div key={title} data-melius-ui-id={`timeline-event-${index + 1}`} data-melius-ui-role="timeline-event">
                <span />
                <strong>{title}</strong>
                <p>{body}</p>
                <small>{time}</small>
              </div>
            ))}
          </div>
        </Panel>
      </div>

      <div className="lower-grid">
        <Panel dataId="expansion-table-panel" roleName="table">
          <div className="panel-heading">
            <div>
              <h3>{t.expansion}</h3>
              <p>Open opportunities and forecast confidence</p>
            </div>
          </div>
          <table className="data-table">
            <thead>
              <tr>
                <th>Product</th>
                <th>ARR</th>
                <th>Stage</th>
                <th>Prob.</th>
              </tr>
            </thead>
            <tbody>
              {[
                ['Analytics Plus', '$42K', 'Proposal', '68%'],
                ['Admin Seats', '$18K', 'Qualify', '41%'],
                ['Priority Support', '$25K', 'Legal', '76%'],
              ].map((row) => (
                <tr key={row[0]}>
                  {row.map((cell) => (
                    <td key={cell}>{cell}</td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </Panel>

        <Panel dataId="contacts-panel" roleName="contact-list">
          <div className="panel-heading">
            <div>
              <h3>{t.contacts}</h3>
              <p>Stakeholders and ownership map</p>
            </div>
          </div>
          <div className="contact-list">
            {[
              { name: 'Maya Chen', role: 'VP Operations', label: t.champion, Icon: Mail },
              { name: 'Eli Park', role: 'Procurement', label: t.primary, Icon: Phone },
              { name: 'Noa Green', role: 'Admin Lead', label: 'Admin', Icon: Mail },
            ].map(({ name, role, label, Icon }) => (
              <div key={name} data-melius-ui-id={`contact-${String(name).toLowerCase().replace(/\s+/g, '-')}`}>
                <span>{String(name).slice(0, 2).toUpperCase()}</span>
                <div>
                  <strong>{name}</strong>
                  <small>{role}</small>
                </div>
                <Badge tone={label === t.champion ? 'green' : 'slate'}>{label}</Badge>
                <Icon size={15} />
              </div>
            ))}
          </div>
        </Panel>
      </div>
    </section>
  );
}

function Analytics({ locale }: { locale: Locale }) {
  const t = copy[locale].analytics;
  const rows = [
    ['Enterprise', '$1.56M', '82', '+11%'],
    ['Mid-market', '$423K', '67', '+4%'],
    ['Startup', '$92K', '63', '-2%'],
  ];

  return (
    <section data-melius-ui-id="analytics-view" data-melius-ui-role="view" className="view-stack">
      <SectionHeader data-melius-ui-id="analytics-header">
        <div>
          <h1>{t.title}</h1>
          <p>{t.subtitle}</p>
        </div>
      </SectionHeader>
      <div className="analytics-grid">
        <Panel dataId="renewal-cohorts-panel" roleName="chart">
          <h3>{t.cohort}</h3>
          <div className="bar-stack">
            {[82, 64, 48, 72, 58, 88].map((height, index) => (
              <span key={height + index} style={{ height: `${height}%` }} />
            ))}
          </div>
        </Panel>
        <Panel dataId="segment-health-panel" roleName="table">
          <h3>{t.segments}</h3>
          <table className="data-table">
            <thead>
              <tr>
                <th>Segment</th>
                <th>ARR</th>
                <th>Health</th>
                <th>NRR</th>
              </tr>
            </thead>
            <tbody>
              {rows.map((row) => (
                <tr key={row[0]}>
                  {row.map((cell) => (
                    <td key={cell}>{cell}</td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </Panel>
        <Panel dataId="forecast-quality-panel" roleName="forecast">
          <h3>{t.forecast}</h3>
          <div className="forecast-list">
            {[
              ['Renewal confidence', '91%', 'green'],
              ['High-risk ARR', '$227K', 'red'],
              ['Expansion coverage', '1.8x', 'blue'],
            ].map(([label, value, tone]) => (
              <div key={label}>
                <span>{label}</span>
                <strong data-tone={tone}>{value}</strong>
              </div>
            ))}
          </div>
        </Panel>
      </div>
    </section>
  );
}

function SettingsView({
  locale,
  setLocale,
  theme,
  setTheme,
}: {
  locale: Locale;
  setLocale: (locale: Locale) => void;
  theme: ThemePreference;
  setTheme: (theme: ThemePreference) => void;
}) {
  const t = copy[locale].settings;

  return (
    <section data-melius-ui-id="settings-view" data-melius-ui-role="view" className="view-stack">
      <SectionHeader data-melius-ui-id="settings-header">
        <div>
          <h1>{t.title}</h1>
          <p>{t.subtitle}</p>
        </div>
      </SectionHeader>
      <div className="settings-grid">
        <Panel dataId="settings-language-panel" roleName="settings-panel">
          <h3>{t.language}</h3>
          <div className="segmented-control" data-melius-ui-id="language-switcher" data-melius-ui-role="language-switcher">
            <SegmentButton dataId="language-ja-button" selected={locale === 'ja'} onClick={() => setLocale('ja')}>
              日本語
            </SegmentButton>
            <SegmentButton dataId="language-en-button" selected={locale === 'en'} onClick={() => setLocale('en')}>
              English
            </SegmentButton>
          </div>
        </Panel>
        <Panel dataId="settings-theme-panel" roleName="settings-panel">
          <h3>{t.theme}</h3>
          <div className="segmented-control" data-melius-ui-id="theme-switcher" data-melius-ui-role="theme-switcher">
            <SegmentButton dataId="theme-light-button" selected={theme === 'light'} onClick={() => setTheme('light')}>
              Light
            </SegmentButton>
            <SegmentButton dataId="theme-dark-button" selected={theme === 'dark'} onClick={() => setTheme('dark')}>
              Dark
            </SegmentButton>
            <SegmentButton dataId="theme-system-button" selected={theme === 'system'} onClick={() => setTheme('system')}>
              System
            </SegmentButton>
          </div>
        </Panel>
        <Panel dataId="settings-threshold-panel" roleName="settings-panel">
          <h3>{t.thresholds}</h3>
          <div className="setting-bars">
            <label>
              Healthy
              <span>
                <i style={{ width: '78%' }} />
              </span>
              <strong>75+</strong>
            </label>
            <label>
              At risk
              <span>
                <i style={{ width: '48%' }} />
              </span>
              <strong>50-</strong>
            </label>
          </div>
        </Panel>
        <Panel dataId="settings-notifications-panel" roleName="settings-panel">
          <h3>{t.notifications}</h3>
          <div className="toggle-list">
            {['Health alerts', 'Weekly digest', 'Renewal reminders'].map((label, index) => (
              <label key={label}>
                <span>{label}</span>
                <input type="checkbox" defaultChecked={index !== 1} />
              </label>
            ))}
          </div>
        </Panel>
      </div>
    </section>
  );
}

export default function App() {
  const [locale, setLocaleState] = useState<Locale>(getInitialLocale);
  const [theme, setThemeState] = useState<ThemePreference>(getInitialTheme);
  const [activeView, setActiveView] = useState<View>('dashboard');
  const [filter, setFilter] = useState<Filter>('all');
  const [selectedId, setSelectedId] = useState('cloudline');
  const selectedAccount = useMemo(
    () => accounts.find((account) => account.id === selectedId) ?? accounts[0],
    [selectedId],
  );
  const t = copy[locale];

  useEffect(() => {
    document.documentElement.lang = locale;
    try {
      localStorage.setItem(localeKey, locale);
    } catch {
      // Ignore unavailable storage in embeds.
    }
  }, [locale]);

  useEffect(() => {
    applyTheme(theme);
    try {
      localStorage.setItem(themeKey, theme);
    } catch {
      // Ignore unavailable storage in embeds.
    }
  }, [theme]);

  const openAccount = (id: string) => {
    setSelectedId(id);
    setActiveView('accounts');
  };

  const setLocale = (nextLocale: Locale) => setLocaleState(nextLocale);
  const setTheme = (nextTheme: ThemePreference) => setThemeState(nextTheme);

  return (
    <AppSurface>
      <WorkspaceFrame>
        <CommandDock activeView={activeView} setActiveView={setActiveView} labels={t.nav} />
        <AccountList
          locale={locale}
          selectedId={selectedId}
          setSelectedId={setSelectedId}
          filter={filter}
          setFilter={setFilter}
          openAccounts={() => setActiveView('accounts')}
        />
        <main data-melius-ui-id="command-stage" data-melius-ui-role="main-workspace" className="command-stage">
          <header data-melius-ui-id="top-command-bar" data-melius-ui-role="toolbar" className="topbar">
            <div>
              <h2>{t.topbar[activeView]}</h2>
              {activeView === 'accounts' ? <Badge tone="blue">{selectedAccount.tier}</Badge> : null}
            </div>
            <div className="topbar__actions">
              <SearchInput
                dataId="command-search-input"
                roleName="command-search"
                label={t.topbar.command}
                placeholder={t.topbar.command}
                icon={<Search size={14} />}
              />
              <IconButton
                dataId="quick-language-toggle"
                label={locale === 'ja' ? 'English' : '日本語'}
                roleName="language-toggle"
                onClick={() => setLocale(locale === 'ja' ? 'en' : 'ja')}
              >
                <Languages size={16} />
              </IconButton>
              <IconButton
                dataId="quick-theme-toggle"
                label="Toggle theme"
                roleName="theme-toggle"
                onClick={() => setTheme(resolveTheme(theme) === 'dark' ? 'light' : 'dark')}
              >
                {resolveTheme(theme) === 'dark' ? <Sun size={16} /> : <Moon size={16} />}
              </IconButton>
              <IconButton dataId="notifications-button" label="Notifications" roleName="button">
                <Bell size={16} />
              </IconButton>
            </div>
          </header>
          <div className="stage-scroll">
            {activeView === 'dashboard' ? <Dashboard locale={locale} selectAccount={openAccount} /> : null}
            {activeView === 'accounts' ? <AccountDetail locale={locale} account={selectedAccount} /> : null}
            {activeView === 'analytics' ? <Analytics locale={locale} /> : null}
            {activeView === 'settings' ? (
              <SettingsView locale={locale} setLocale={setLocale} theme={theme} setTheme={setTheme} />
            ) : null}
          </div>
        </main>
      </WorkspaceFrame>
    </AppSurface>
  );
}
