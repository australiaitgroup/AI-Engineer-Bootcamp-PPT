import React from 'react';
import { colors, fonts, border, shadow } from '../styles/theme';

// Re-export theme constants so SlideEngine can import from './ui'
export { colors, fonts, border, shadow } from '../styles/theme';

type DivProps = React.HTMLAttributes<HTMLDivElement>;
type PProps = React.HTMLAttributes<HTMLParagraphElement>;

// ─── Slide container ────────────────────────────────────────────────────────
interface SlideProps extends DivProps {
  bg?: string;
}
export function Slide({ bg = colors.warmBg, style, children, ...rest }: SlideProps) {
  return (
    <div
      style={{
        width: '100%',
        height: '100%',
        background: bg,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        overflow: 'hidden',
        position: 'relative',
        ...style,
      }}
      {...rest}
    >
      {children}
    </div>
  );
}

// ─── Inner content wrapper ───────────────────────────────────────────────────
interface InnerProps extends DivProps {
  center?: boolean;
  split?: boolean;
}
export function Inner({ center, split, style, children, ...rest }: InnerProps) {
  return (
    <div
      style={{
        width: '90%',
        maxWidth: 1300,
        display: 'flex',
        flexDirection: split ? 'row' : 'column',
        alignItems: center ? 'center' : 'flex-start',
        justifyContent: center ? 'center' : 'flex-start',
        gap: split ? 48 : 24,
        ...style,
      }}
      {...rest}
    >
      {children}
    </div>
  );
}

// ─── Half (for split layouts) ────────────────────────────────────────────────
export function Half({ style, children, ...rest }: DivProps) {
  return (
    <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: 16, ...style }} {...rest}>
      {children}
    </div>
  );
}

// ─── Title ───────────────────────────────────────────────────────────────────
interface TitleProps extends React.HTMLAttributes<HTMLHeadingElement> {
  size?: string;
}
export function Title({ size, style, children, ...rest }: TitleProps) {
  return (
    <h1
      style={{
        fontFamily: fonts.heading,
        fontSize: size ?? 'clamp(32px, 4vw, 58px)',
        fontWeight: 900,
        color: colors.dark,
        lineHeight: 1.1,
        letterSpacing: -1,
        ...style,
      }}
      {...rest}
    >
      {children}
    </h1>
  );
}

// ─── Subtitle ────────────────────────────────────────────────────────────────
export function Subtitle({ style, children, ...rest }: PProps) {
  return (
    <p
      style={{
        fontFamily: fonts.body,
        fontSize: 'clamp(14px, 1.6vw, 20px)',
        color: '#555',
        lineHeight: 1.6,
        ...style,
      }}
      {...rest}
    >
      {children}
    </p>
  );
}

// ─── Highlight ───────────────────────────────────────────────────────────────
interface HighlightProps extends React.HTMLAttributes<HTMLSpanElement> {
  color?: string;
}
export function Highlight({ color = colors.violet, style, children, ...rest }: HighlightProps) {
  return (
    <span style={{ color, ...style }} {...rest}>
      {children}
    </span>
  );
}

// ─── Tag ─────────────────────────────────────────────────────────────────────
interface TagProps extends DivProps {
  color?: string;
  bg?: string;
}
export function Tag({ color = colors.dark, bg = colors.yellow, style, children, ...rest }: TagProps) {
  return (
    <div
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        padding: '4px 12px',
        background: bg,
        border,
        boxShadow: '3px 3px 0 #000',
        fontFamily: fonts.mono,
        fontSize: 12,
        fontWeight: 700,
        color,
        letterSpacing: 1,
        ...style,
      }}
      {...rest}
    >
      {children}
    </div>
  );
}

// ─── Divider ─────────────────────────────────────────────────────────────────
interface DividerProps {
  color?: string;
  center?: boolean;
  style?: React.CSSProperties;
}
export function Divider({ color = colors.violet, center, style }: DividerProps) {
  return (
    <div
      style={{
        width: 60,
        height: 4,
        background: color,
        margin: center ? '12px auto' : '12px 0',
        ...style,
      }}
    />
  );
}

// ─── Card ─────────────────────────────────────────────────────────────────────
interface CardProps extends DivProps {
  accent?: string;
}
export function Card({ accent, style, children, ...rest }: CardProps) {
  return (
    <div
      style={{
        background: colors.white,
        border,
        boxShadow: shadow,
        padding: '20px 22px',
        borderLeft: accent ? `6px solid ${accent}` : border,
        ...style,
      }}
      {...rest}
    >
      {children}
    </div>
  );
}

// ─── CardSm ──────────────────────────────────────────────────────────────────
export function CardSm({ style, children, ...rest }: DivProps) {
  return (
    <div
      style={{
        background: colors.white,
        border,
        boxShadow: '4px 4px 0 #000',
        padding: '14px 16px',
        ...style,
      }}
      {...rest}
    >
      {children}
    </div>
  );
}

// ─── Grid ────────────────────────────────────────────────────────────────────
interface GridProps extends DivProps {
  cols?: number;
  gap?: number;
}
export function Grid({ cols = 2, gap = 20, style, children, ...rest }: GridProps) {
  return (
    <div
      style={{
        display: 'grid',
        gridTemplateColumns: `repeat(${cols}, 1fr)`,
        gap,
        width: '100%',
        ...style,
      }}
      {...rest}
    >
      {children}
    </div>
  );
}

// ─── Stagger + StaggerItem ────────────────────────────────────────────────────
export function Stagger({ style, children, ...rest }: DivProps) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 12, width: '100%', ...style }} {...rest}>
      {children}
    </div>
  );
}

export function StaggerItem({ style, children, ...rest }: DivProps) {
  return (
    <div
      style={{
        display: 'flex',
        alignItems: 'flex-start',
        gap: 12,
        padding: '12px 16px',
        background: colors.white,
        border,
        boxShadow: '4px 4px 0 #000',
        ...style,
      }}
      {...rest}
    >
      {children}
    </div>
  );
}

// ─── BulletList ──────────────────────────────────────────────────────────────
interface BulletListProps {
  items: string[];
  color?: string;
  style?: React.CSSProperties;
}
export function BulletList({ items, color = colors.violet, style }: BulletListProps) {
  return (
    <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: 8, ...style }}>
      {items.map((item, i) => (
        <li key={i} style={{ display: 'flex', alignItems: 'flex-start', gap: 10 }}>
          <span style={{ color, fontWeight: 900, fontSize: 18, lineHeight: 1.4, flexShrink: 0 }}>▸</span>
          <span style={{ fontFamily: fonts.body, fontSize: 15, color: colors.dark, lineHeight: 1.5 }}>{item}</span>
        </li>
      ))}
    </ul>
  );
}
