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
  displayName: Record<Locale, string>;
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
  account: Record<Locale, string>;
  title: Record<Locale, string>;
  time: string;
  tone: Health;
}

const themeKey = 'melius-official-app-customer-success-theme';
const localeKey = 'melius-official-app-customer-success-locale';

const accounts: Account[] = [
  {
    id: 'solstice',
    name: 'Solstice Cloud',
    displayName: { ja: 'ソルスティス・クラウド', en: 'Solstice Cloud' },
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
    displayName: { ja: 'ノースバンク金融', en: 'Northbank Finance' },
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
    displayName: { ja: 'クラウドライン・システムズ', en: 'Cloudline Systems' },
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
    displayName: { ja: 'ルマ・リテール', en: 'Luma Retail' },
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
    displayName: { ja: 'アトラスヘルス', en: 'Atlas Health' },
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
    displayName: { ja: 'ベクターワークス', en: 'Vector Works' },
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
  {
    account: { ja: 'アトラスヘルス', en: 'Atlas Health' },
    title: { ja: 'セキュリティレビュー完了', en: 'Security review completed' },
    time: '6h',
    tone: 'green',
  },
  {
    account: { ja: 'ソルスティス・クラウド', en: 'Solstice Cloud' },
    title: { ja: '役員QBRを設定', en: 'Executive QBR scheduled' },
    time: '2h',
    tone: 'blue',
  },
  {
    account: { ja: 'ノースバンク金融', en: 'Northbank Finance' },
    title: { ja: '調達部門が利用詳細を依頼', en: 'Procurement asked for usage detail' },
    time: '1d',
    tone: 'amber',
  },
  {
    account: { ja: 'クラウドライン・システムズ', en: 'Cloudline Systems' },
    title: { ja: 'チャンピオンの役割変更を検知', en: 'Champion changed role' },
    time: '5d',
    tone: 'red',
  },
  {
    account: { ja: 'ベクターワークス', en: 'Vector Works' },
    title: { ja: '管理者トレーニング招待を送信', en: 'Admin training invite sent' },
    time: '3d',
    tone: 'slate',
  },
];

const copy = {
  ja: {
    documentTitle: 'カスタマーサクセス管理テンプレート',
    product: 'Orbit CS',
    nav: {
      dashboard: 'ダッシュボード',
      accounts: 'アカウント',
      analytics: '分析',
      settings: '設定',
    },
    controls: {
      collapse: 'リストを閉じる',
      more: 'その他',
      toggleTheme: 'テーマを切り替え',
      notifications: '通知',
      languageToEn: 'English',
      languageToJa: '日本語',
    },
    accountMeta: {
      riskBadge: '要注意',
      churnRisk: '解約リスク',
      lastActivity: '最終活動',
      lastActive: '最終活動',
      industries: {
        SaaS: 'SaaS',
        Finance: '金融',
        'Data Platform': 'データ基盤',
        Retail: '小売',
        Healthcare: 'ヘルスケア',
        Manufacturing: '製造',
      },
      tiers: {
        Enterprise: 'エンタープライズ',
        'Mid-market': 'ミッドマーケット',
        Startup: 'スタートアップ',
      },
      relativeTimes: {
        '2h': '2時間前',
        '6h': '6時間前',
        '1d': '1日前',
        '3d': '3日前',
        '4d': '4日前',
        '5d': '5日前',
        '9d': '9日前',
        '13d': '13日前',
        '14d': '14日前',
      },
    },
    accounts: {
      title: 'アカウント',
      new: '新規',
      search: 'アカウントを検索...',
      sort: '並び替え',
      filters: {
        all: 'すべて',
        risk: '要注意',
        enterprise: '大企業',
        healthy: '健全',
      },
      count: '件',
    },
    topbar: {
      dashboard: 'ポートフォリオ概要',
      accounts: 'アカウント管理',
      analytics: '分析',
      settings: '設定',
      command: '検索またはコマンド...',
    },
    dashboard: {
      title: 'ポートフォリオパルス',
      subtitle: '顧客ポートフォリオの状態、リスク、拡張機会を一画面で確認します。',
      updated: 'たった今更新',
      totalArr: '担当ARR合計',
      nrr: '純売上継続率',
      health: '平均ヘルススコア',
      active: '稼働アカウント',
      notes: {
        totalArr: '+8.2% 前月比',
        nrr: '+3.5% 前月比',
        health: '+2.1 前月比',
        active: '前月比 0',
      },
      chartTitle: '解約予測レーダー',
      chartSubtitle: '12か月の予測と実績',
      predicted: '予測',
      actual: '実績',
      months: ['1月', '2月', '3月', '4月', '5月', '6月', '7月', '8月', '9月', '10月', '11月', '12月'],
      riskTitle: '要注意アカウント',
      riskSubtitle: '件の早期対応が必要',
      activityTitle: '最近のアクティビティ',
      activitySubtitle: 'ポートフォリオ全体の最新タッチポイント',
      viewAll: 'すべて見る',
    },
    detail: {
      title: 'アカウント詳細',
      industry: '業種',
      owner: '担当',
      timeline: 'タイムライン',
      contacts: '連絡先',
      expansion: '拡張機会',
      log: '活動を記録',
      primary: '主担当',
      champion: '推進者',
      admin: '管理者',
      health: 'ヘルス',
      sentimentTitle: 'センチメントシグナル',
      sentimentBody: '関係性の強さ、活動の新しさ、サポート負荷、拡張の動きを統合した指標です。',
      timelineSubtitle: '最近の判断と関係性の変化',
      expansionSubtitle: '進行中の商談と予測確度',
      contactsSubtitle: '関係者とオーナーシップの整理',
      table: {
        product: 'プロダクト',
        arr: 'ARR',
        stage: '段階',
        probability: '確度',
      },
      notes: {
        openExpansion: '+$42K の拡張候補',
        expansionPositive: '拡張が進行中',
        renewalPressure: '更新に注意',
        manualReview: '手動レビューが必要',
        withinTarget: '目標範囲内',
        championsActive: '推進者2名がアクティブ',
      },
      timelineEvents: [
        ['更新リスクをCSMが記録', '調達部門が席数別の利用状況エクスポートを依頼', '1d'],
        ['チャンピオン面談を完了', '成功条件を役員向けダッシュボード展開へ更新', '4d'],
        ['サポート滞留を解消', '製品スペシャリストが優先チケットを2件クローズ', '9d'],
        ['拡張シグナルを取得', '運用チームが分析アドオンを依頼', '13d'],
      ],
      expansionRows: [
        ['分析プラス', '$42K', '提案中', '68%'],
        ['管理者席', '$18K', '確認中', '41%'],
        ['優先サポート', '$25K', '法務確認', '76%'],
      ],
      contactsList: [
        { name: 'Maya Chen', role: '業務責任者', label: 'champion', icon: 'mail' },
        { name: 'Eli Park', role: '調達担当', label: 'primary', icon: 'phone' },
        { name: 'Noa Green', role: '管理者リード', label: 'admin', icon: 'mail' },
      ],
    },
    analytics: {
      title: '分析',
      subtitle: 'リテンション、リスク、収益拡張の傾向を確認します。',
      cohort: '更新コホート',
      segments: 'セグメント別ヘルス',
      forecast: '予測品質',
      table: {
        segment: 'セグメント',
        arr: 'ARR',
        health: 'ヘルス',
        nrr: 'NRR',
      },
      segmentRows: [
        ['エンタープライズ', '$1.56M', '82', '+11%'],
        ['ミッドマーケット', '$423K', '67', '+4%'],
        ['スタートアップ', '$92K', '63', '-2%'],
      ],
      forecastRows: [
        ['更新信頼度', '91%', 'green'],
        ['高リスクARR', '$227K', 'red'],
        ['拡張カバレッジ', '1.8x', 'blue'],
      ],
    },
    settings: {
      title: '設定',
      subtitle: 'チーム運用に使う表示、ヘルス基準、通知のサンプル設定です。',
      thresholds: 'ヘルス基準',
      notifications: '通知',
      language: '言語',
      theme: 'テーマ',
      light: 'ライト',
      dark: 'ダーク',
      system: 'システム',
      healthy: '健全',
      atRisk: '要注意',
      notificationRows: ['ヘルスアラート', '週次ダイジェスト', '更新リマインダー'],
    },
  },
  en: {
    documentTitle: 'Customer Success Command Template',
    product: 'Orbit CS',
    nav: {
      dashboard: 'Dashboard',
      accounts: 'Accounts',
      analytics: 'Analytics',
      settings: 'Settings',
    },
    controls: {
      collapse: 'Collapse list',
      more: 'More',
      toggleTheme: 'Toggle theme',
      notifications: 'Notifications',
      languageToEn: 'English',
      languageToJa: '日本語',
    },
    accountMeta: {
      riskBadge: 'At Risk',
      churnRisk: 'Churn Risk',
      lastActivity: 'Last activity',
      lastActive: 'Last active',
      industries: {
        SaaS: 'SaaS',
        Finance: 'Finance',
        'Data Platform': 'Data Platform',
        Retail: 'Retail',
        Healthcare: 'Healthcare',
        Manufacturing: 'Manufacturing',
      },
      tiers: {
        Enterprise: 'Enterprise',
        'Mid-market': 'Mid-market',
        Startup: 'Startup',
      },
      relativeTimes: {
        '2h': '2h',
        '6h': '6h',
        '1d': '1d',
        '3d': '3d',
        '4d': '4d',
        '5d': '5d',
        '9d': '9d',
        '13d': '13d',
        '14d': '14d',
      },
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
      notes: {
        totalArr: '+8.2% vs last month',
        nrr: '+3.5% vs last month',
        health: '+2.1 vs last month',
        active: '0 vs last month',
      },
      chartTitle: 'Churn Prediction Radar',
      chartSubtitle: '12-month forecast vs actual',
      predicted: 'Predicted',
      actual: 'Actual',
      months: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
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
      admin: 'Admin',
      health: 'Health',
      sentimentTitle: 'Sentiment Signal',
      sentimentBody: 'Relationship strength, activity recency, support load, and expansion movement combined.',
      timelineSubtitle: 'Recent decisions and relationship movement',
      expansionSubtitle: 'Open opportunities and forecast confidence',
      contactsSubtitle: 'Stakeholders and ownership map',
      table: {
        product: 'Product',
        arr: 'ARR',
        stage: 'Stage',
        probability: 'Prob.',
      },
      notes: {
        openExpansion: '+$42K open expansion',
        expansionPositive: 'Expansion positive',
        renewalPressure: 'Renewal pressure',
        manualReview: 'Manual review needed',
        withinTarget: 'Within target band',
        championsActive: '2 champions active',
      },
      timelineEvents: [
        ['Renewal risk raised by CSM', 'Procurement asked for seat-level usage export', '1d'],
        ['Champion meeting completed', 'Success criteria moved to executive dashboard rollout', '4d'],
        ['Support backlog cleared', 'Two priority tickets closed by product specialist', '9d'],
        ['Expansion signal captured', 'Analytics add-on requested by operations team', '13d'],
      ],
      expansionRows: [
        ['Analytics Plus', '$42K', 'Proposal', '68%'],
        ['Admin Seats', '$18K', 'Qualify', '41%'],
        ['Priority Support', '$25K', 'Legal', '76%'],
      ],
      contactsList: [
        { name: 'Maya Chen', role: 'VP Operations', label: 'champion', icon: 'mail' },
        { name: 'Eli Park', role: 'Procurement', label: 'primary', icon: 'phone' },
        { name: 'Noa Green', role: 'Admin Lead', label: 'admin', icon: 'mail' },
      ],
    },
    analytics: {
      title: 'Analytics',
      subtitle: 'Review retention movement, risk clusters, and revenue expansion quality.',
      cohort: 'Renewal Cohorts',
      segments: 'Segment Health',
      forecast: 'Forecast Quality',
      table: {
        segment: 'Segment',
        arr: 'ARR',
        health: 'Health',
        nrr: 'NRR',
      },
      segmentRows: [
        ['Enterprise', '$1.56M', '82', '+11%'],
        ['Mid-market', '$423K', '67', '+4%'],
        ['Startup', '$92K', '63', '-2%'],
      ],
      forecastRows: [
        ['Renewal confidence', '91%', 'green'],
        ['High-risk ARR', '$227K', 'red'],
        ['Expansion coverage', '1.8x', 'blue'],
      ],
    },
    settings: {
      title: 'Settings',
      subtitle: 'Sample display, health scoring, and notification settings for the team workflow.',
      thresholds: 'Health thresholds',
      notifications: 'Notifications',
      language: 'Language',
      theme: 'Theme',
      light: 'Light',
      dark: 'Dark',
      system: 'System',
      healthy: 'Healthy',
      atRisk: 'At risk',
      notificationRows: ['Health alerts', 'Weekly digest', 'Renewal reminders'],
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

function localizedIndustry(account: Account, locale: Locale) {
  const labels = copy[locale].accountMeta.industries as Record<string, string>;
  return labels[account.industry] ?? account.industry;
}

function localizedAccountName(account: Account, locale: Locale) {
  return account.displayName[locale] ?? account.name;
}

function localizedTier(account: Account, locale: Locale) {
  const labels = copy[locale].accountMeta.tiers as Record<string, string>;
  return labels[account.tier] ?? account.tier;
}

function localizedTime(time: string, locale: Locale) {
  const labels = copy[locale].accountMeta.relativeTimes as Record<string, string>;
  return labels[time] ?? time;
}

function contactLabel(label: string, locale: Locale) {
  const detail = copy[locale].detail;
  if (label === 'champion') return detail.champion;
  if (label === 'primary') return detail.primary;
  if (label === 'admin') return detail.admin;
  return label;
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
  const meta = copy[locale].accountMeta;
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
            <IconButton dataId="collapse-account-list-button" label={copy[locale].controls.collapse} roleName="button">
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
                  <strong>{localizedAccountName(account, locale)}</strong>
                  {account.risk === 'high' ? <Badge tone="red">{meta.riskBadge}</Badge> : null}
                </span>
                <span className="account-row__meta">
                  <span>{localizedIndustry(account, locale)}</span>
                  <span>{localizedTime(account.lastActivity, locale)}</span>
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
  const meta = copy[locale].accountMeta;
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
          note={t.notes.totalArr}
          icon={<DollarSign size={16} />}
        />
        <MetricTile
          dataId="metric-nrr"
          label={t.nrr}
          value={`${avgNrr}%`}
          note={t.notes.nrr}
          icon={<TrendingUp size={16} />}
          tone="green"
        />
        <MetricTile
          dataId="metric-health"
          label={t.health}
          value={`${avgHealth}/100`}
          note={t.notes.health}
          icon={<Activity size={16} />}
          tone="green"
        />
        <MetricTile
          dataId="metric-active-accounts"
          label={t.active}
          value={`${accounts.length}`}
          note={t.notes.active}
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
          <ChurnChart locale={locale} />
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
                  <strong>{localizedAccountName(account, locale)}</strong>
                  <small>
                    {meta.lastActivity}: {localizedTime(account.lastActivity, locale)}
                  </small>
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
              key={`${item.account.en}-${item.time}`}
              type="button"
              data-melius-ui-id={`recent-activity-${item.account.en.toLowerCase().replace(/\s+/g, '-')}`}
              data-melius-ui-role="activity-card"
            >
              <span>
                <HealthDot tone={item.tone} />
                <strong>{item.account[locale]}</strong>
              </span>
              <p>{item.title[locale]}</p>
              <small>{localizedTime(item.time, locale)}</small>
            </button>
          ))}
        </div>
      </Panel>
    </section>
  );
}

function ChurnChart({ locale }: { locale: Locale }) {
  const months = copy[locale].dashboard.months;
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
          <span key={point.month}>{months[churnSeries.indexOf(point)]}</span>
        ))}
      </div>
    </div>
  );
}

function AccountDetail({ locale, account }: { locale: Locale; account: Account }) {
  const t = copy[locale].detail;
  const meta = copy[locale].accountMeta;
  const tone = healthTone(account.health);

  return (
    <section data-melius-ui-id="account-detail-view" data-melius-ui-role="view" className="view-stack">
      <SectionHeader data-melius-ui-id="account-detail-header">
        <div>
          <h1>{localizedAccountName(account, locale)}</h1>
          <p>
            {t.industry}: {localizedIndustry(account, locale)} · {t.owner}: {account.owner} · {meta.lastActive}{' '}
            {localizedTime(account.lastActivity, locale)}
          </p>
        </div>
        <div className="header-actions">
          <Badge tone={account.tier === 'Enterprise' ? 'blue' : 'slate'}>{localizedTier(account, locale)}</Badge>
          {account.risk === 'high' ? <Badge tone="red">{meta.churnRisk}</Badge> : null}
          <IconButton dataId="account-more-menu-button" label={copy[locale].controls.more} roleName="button">
            <MoreVertical size={17} />
          </IconButton>
        </div>
      </SectionHeader>

      <div data-melius-ui-id="account-metrics-grid" className="metric-grid detail">
        <MetricTile
          dataId="detail-arr-metric"
          label="ARR"
          value={formatCurrency(account.arr)}
          note={t.notes.openExpansion}
          icon={<DollarSign size={16} />}
        />
        <MetricTile
          dataId="detail-nrr-metric"
          label="NRR"
          value={`${account.nrr}%`}
          note={account.nrr >= 100 ? t.notes.expansionPositive : t.notes.renewalPressure}
          icon={account.nrr >= 100 ? <TrendingUp size={16} /> : <TrendingDown size={16} />}
          tone={account.nrr >= 100 ? 'green' : 'amber'}
        />
        <MetricTile
          dataId="detail-health-metric"
          label={t.health}
          value={`${account.health}/100`}
          note={account.risk === 'high' ? t.notes.manualReview : t.notes.withinTarget}
          icon={<Activity size={16} />}
          tone={tone === 'red' ? 'red' : tone === 'amber' ? 'amber' : 'green'}
        />
        <MetricTile
          dataId="detail-contact-metric"
          label={t.contacts}
          value="4"
          note={t.notes.championsActive}
          icon={<Users size={16} />}
        />
      </div>

      <div className="detail-grid">
        <Panel dataId="sentiment-orb-panel" roleName="health-visual">
          <div className="sentiment-orb" data-tone={tone}>
            <span>{account.health}</span>
          </div>
          <h3>{t.sentimentTitle}</h3>
          <p>{t.sentimentBody}</p>
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
              <p>{t.timelineSubtitle}</p>
            </div>
            <TextButton dataId="log-activity-button" roleName="button">
              <Plus size={13} />
              {t.log}
            </TextButton>
          </div>
          <div className="timeline-list">
            {t.timelineEvents.map(([title, body, time], index) => (
              <div key={title} data-melius-ui-id={`timeline-event-${index + 1}`} data-melius-ui-role="timeline-event">
                <span />
                <strong>{title}</strong>
                <p>{body}</p>
                <small>{localizedTime(time, locale)}</small>
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
              <p>{t.expansionSubtitle}</p>
            </div>
          </div>
          <table className="data-table">
            <thead>
              <tr>
                <th>{t.table.product}</th>
                <th>{t.table.arr}</th>
                <th>{t.table.stage}</th>
                <th>{t.table.probability}</th>
              </tr>
            </thead>
            <tbody>
              {t.expansionRows.map((row) => (
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
              <p>{t.contactsSubtitle}</p>
            </div>
          </div>
          <div className="contact-list">
            {t.contactsList.map(({ name, role, label, icon }) => {
              const Icon = icon === 'phone' ? Phone : Mail;
              const visibleLabel = contactLabel(label, locale);

              return (
              <div key={name} data-melius-ui-id={`contact-${String(name).toLowerCase().replace(/\s+/g, '-')}`}>
                <span>{String(name).slice(0, 2).toUpperCase()}</span>
                <div>
                  <strong>{name}</strong>
                  <small>{role}</small>
                </div>
                <Badge tone={label === 'champion' ? 'green' : 'slate'}>{visibleLabel}</Badge>
                <Icon size={15} />
              </div>
              );
            })}
          </div>
        </Panel>
      </div>
    </section>
  );
}

function Analytics({ locale }: { locale: Locale }) {
  const t = copy[locale].analytics;

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
                <th>{t.table.segment}</th>
                <th>{t.table.arr}</th>
                <th>{t.table.health}</th>
                <th>{t.table.nrr}</th>
              </tr>
            </thead>
            <tbody>
              {t.segmentRows.map((row) => (
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
            {t.forecastRows.map(([label, value, tone]) => (
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
              {t.light}
            </SegmentButton>
            <SegmentButton dataId="theme-dark-button" selected={theme === 'dark'} onClick={() => setTheme('dark')}>
              {t.dark}
            </SegmentButton>
            <SegmentButton dataId="theme-system-button" selected={theme === 'system'} onClick={() => setTheme('system')}>
              {t.system}
            </SegmentButton>
          </div>
        </Panel>
        <Panel dataId="settings-threshold-panel" roleName="settings-panel">
          <h3>{t.thresholds}</h3>
          <div className="setting-bars">
            <label>
              {t.healthy}
              <span>
                <i style={{ width: '78%' }} />
              </span>
              <strong>75+</strong>
            </label>
            <label>
              {t.atRisk}
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
            {t.notificationRows.map((label, index) => (
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
    document.title = copy[locale].documentTitle;
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
              {activeView === 'accounts' ? <Badge tone="blue">{localizedTier(selectedAccount, locale)}</Badge> : null}
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
                label={locale === 'ja' ? t.controls.languageToEn : t.controls.languageToJa}
                roleName="language-toggle"
                onClick={() => setLocale(locale === 'ja' ? 'en' : 'ja')}
              >
                <Languages size={16} />
              </IconButton>
              <IconButton
                dataId="quick-theme-toggle"
                label={t.controls.toggleTheme}
                roleName="theme-toggle"
                onClick={() => setTheme(resolveTheme(theme) === 'dark' ? 'light' : 'dark')}
              >
                {resolveTheme(theme) === 'dark' ? <Sun size={16} /> : <Moon size={16} />}
              </IconButton>
              <IconButton dataId="notifications-button" label={t.controls.notifications} roleName="button">
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
