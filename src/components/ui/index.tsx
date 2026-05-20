import type {
  ButtonHTMLAttributes,
  HTMLAttributes,
  InputHTMLAttributes,
  ReactNode,
} from 'react';

interface ChildrenProps {
  children: ReactNode;
}

interface DataProps {
  dataId: string;
  roleName?: string;
}

interface ButtonProps
  extends Pick<ButtonHTMLAttributes<HTMLButtonElement>, 'aria-pressed' | 'disabled' | 'onClick' | 'type'>,
    DataProps {
  label?: string;
  selected?: boolean;
  children: ReactNode;
}

interface TextInputProps extends InputHTMLAttributes<HTMLInputElement>, DataProps {
  label: string;
  icon?: ReactNode;
}

interface PanelProps extends Omit<HTMLAttributes<HTMLDivElement>, 'children'>, ChildrenProps, DataProps {
  tone?: 'plain' | 'raised' | 'muted';
}

interface BadgeProps extends Omit<HTMLAttributes<HTMLSpanElement>, 'children'>, ChildrenProps {
  tone?: 'blue' | 'green' | 'amber' | 'red' | 'slate';
}

export function AppSurface({ children, ...props }: HTMLAttributes<HTMLDivElement> & ChildrenProps) {
  return (
    <div
      {...props}
      data-melius-ui-id="app-surface"
      data-melius-ui-role="workspace"
      className="app-surface"
    >
      {children}
    </div>
  );
}

export function WorkspaceFrame({ children, ...props }: HTMLAttributes<HTMLDivElement> & ChildrenProps) {
  return (
    <div {...props} data-melius-ui-id="workspace-frame" className="workspace-frame">
      {children}
    </div>
  );
}

export function Panel({ dataId, roleName, tone = 'plain', children, ...props }: PanelProps) {
  return (
    <div
      {...props}
      data-melius-ui-id={dataId}
      data-melius-ui-role={roleName}
      data-tone={tone}
      className="panel"
    >
      {children}
    </div>
  );
}

export function SectionHeader({ children, ...props }: HTMLAttributes<HTMLDivElement> & ChildrenProps) {
  return (
    <div {...props} className="section-header">
      {children}
    </div>
  );
}

export function IconButton({
  dataId,
  roleName,
  label,
  selected,
  children,
  onClick,
  disabled,
  type = 'button',
}: ButtonProps) {
  return (
    <button
      type={type}
      data-melius-ui-id={dataId}
      data-melius-ui-role={roleName}
      data-active={selected ? 'true' : 'false'}
      aria-label={label}
      title={label}
      onClick={onClick}
      disabled={disabled}
      className="icon-button"
    >
      {children}
    </button>
  );
}

export function TextButton({
  dataId,
  roleName,
  selected,
  children,
  onClick,
  disabled,
  type = 'button',
}: ButtonProps) {
  return (
    <button
      type={type}
      data-melius-ui-id={dataId}
      data-melius-ui-role={roleName}
      data-active={selected ? 'true' : 'false'}
      aria-pressed={selected}
      onClick={onClick}
      disabled={disabled}
      className="text-button"
    >
      {children}
    </button>
  );
}

export function SegmentButton({
  dataId,
  roleName,
  selected,
  children,
  onClick,
  disabled,
  type = 'button',
}: ButtonProps) {
  return (
    <button
      type={type}
      data-melius-ui-id={dataId}
      data-melius-ui-role={roleName}
      data-active={selected ? 'true' : 'false'}
      aria-pressed={selected}
      onClick={onClick}
      disabled={disabled}
      className="segment-button"
    >
      {children}
    </button>
  );
}

export function SearchInput({ dataId, roleName, label, icon, ...props }: TextInputProps) {
  return (
    <label data-melius-ui-id={dataId} data-melius-ui-role={roleName} className="search-input">
      <span className="sr-only">{label}</span>
      {icon ? <span className="search-input__icon">{icon}</span> : null}
      <input {...props} aria-label={label} />
    </label>
  );
}

export function Badge({ tone = 'slate', children, ...props }: BadgeProps) {
  return (
    <span {...props} data-tone={tone} className="badge">
      {children}
    </span>
  );
}

export function HealthDot({ tone = 'slate' }: { tone?: 'green' | 'amber' | 'red' | 'blue' | 'slate' }) {
  return <span data-tone={tone} className="health-dot" />;
}

export function MetricTile({
  dataId,
  label,
  value,
  note,
  icon,
  tone = 'blue',
}: {
  dataId: string;
  label: string;
  value: string;
  note: string;
  icon: ReactNode;
  tone?: 'blue' | 'green' | 'amber' | 'red';
}) {
  return (
    <div data-melius-ui-id={dataId} data-melius-ui-role="metric" data-tone={tone} className="metric-tile">
      <div className="metric-tile__top">
        <span>{label}</span>
        {icon}
      </div>
      <strong>{value}</strong>
      <p>{note}</p>
    </div>
  );
}
