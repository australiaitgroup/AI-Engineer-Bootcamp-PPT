import { useState, type CSSProperties, type ReactNode } from 'react';
import { motion } from 'framer-motion';
import { colors, fonts, border, shadow, shadowSm } from '../styles/theme';

export function Slide({ bg = colors.warmBg, children, style }: { bg?: string; children: ReactNode; style?: CSSProperties }) {
	return (
		<div style={{ width: '100%', height: '100%', background: bg, display: 'flex', alignItems: 'center', justifyContent: 'center', overflow: 'hidden', ...style }}>
			{children}
		</div>
	);
}

export function Inner({ children, center, split, style }: { children: ReactNode; center?: boolean; split?: boolean; style?: CSSProperties }) {
	return (
		<div style={{
			width: '90%', maxWidth: 1400, height: '85%', display: 'flex', gap: 48, padding: 40,
			...(center ? { flexDirection: 'column', justifyContent: 'center', alignItems: 'center', textAlign: 'center' } : {}),
			...(split ? { alignItems: 'center' } : {}),
			...style,
		}}>
			{children}
		</div>
	);
}

export function Half({ children, style }: { children: ReactNode; style?: CSSProperties }) {
	return <div style={{ flex: 1, minWidth: 0, display: 'flex', flexDirection: 'column', justifyContent: 'center', ...style }}>{children}</div>;
}

export function Title({ children, white, size = '64px', style }: { children: ReactNode; white?: boolean; size?: string; style?: CSSProperties }) {
	return <h2 style={{ fontFamily: fonts.heading, fontSize: size, fontWeight: 900, lineHeight: 1.15, color: white ? colors.white : colors.black, letterSpacing: -1, ...style }}>{children}</h2>;
}

export function Subtitle({ children, style }: { children: ReactNode; style?: CSSProperties }) {
	return <p style={{ fontFamily: fonts.body, fontSize: '22px', color: '#555', fontWeight: 500, ...style }}>{children}</p>;
}

export function Highlight({ children, color: bg = colors.red }: { children: ReactNode; color?: string }) {
	const textColor = bg === colors.yellow || bg === colors.green ? colors.black : colors.white;
	return <span style={{ display: 'inline-block', padding: '4px 16px', background: bg, color: textColor }}>{children}</span>;
}

export function Tag({ children, bg = colors.dark, color: c = colors.white }: { children: ReactNode; bg?: string; color?: string }) {
	return (
		<span style={{
			display: 'inline-block', padding: '6px 16px', fontSize: 14, fontWeight: 700,
			fontFamily: fonts.mono, border: `2px solid ${bg}`, background: bg, color: c,
		}}>
			{children}
		</span>
	);
}

export function Divider({ color: c = colors.red, center }: { color?: string; center?: boolean }) {
	return <div style={{ width: 60, height: 4, background: c, margin: '16px 0', ...(center ? { marginLeft: 'auto', marginRight: 'auto' } : {}) }} />;
}

export function Card({ children, bg = colors.white, style }: { children: ReactNode; bg?: string; style?: CSSProperties }) {
	const [hover, setHover] = useState(false);
	return (
		<motion.div
			onMouseEnter={() => setHover(true)}
			onMouseLeave={() => setHover(false)}
			animate={{ x: hover ? 4 : 0, y: hover ? 4 : 0, boxShadow: hover ? '0 0 0 #000' : shadow }}
			transition={{ duration: 0.15 }}
			style={{ border, background: bg, padding: '24px 20px', cursor: 'default', ...style }}
		>
			{children}
		</motion.div>
	);
}

export function CardSm({ children, bg = colors.white, style }: { children: ReactNode; bg?: string; style?: CSSProperties }) {
	const [hover, setHover] = useState(false);
	return (
		<motion.div
			onMouseEnter={() => setHover(true)}
			onMouseLeave={() => setHover(false)}
			animate={{ x: hover ? 3 : 0, y: hover ? 3 : 0, boxShadow: hover ? '0 0 0 #000' : shadowSm }}
			transition={{ duration: 0.15 }}
			style={{ border, background: bg, padding: '16px 14px', cursor: 'default', ...style }}
		>
			{children}
		</motion.div>
	);
}

export function Stagger({ children, style }: { children: ReactNode; style?: CSSProperties }) {
	return (
		<motion.div
			initial="hidden"
			animate="visible"
			variants={{ visible: { transition: { staggerChildren: 0.08 } } }}
			style={style}
		>
			{children}
		</motion.div>
	);
}

export function StaggerItem({ children, style }: { children: ReactNode; style?: CSSProperties }) {
	return (
		<motion.div
			variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 } }}
			transition={{ duration: 0.4, ease: 'easeOut' }}
			style={style}
		>
			{children}
		</motion.div>
	);
}

export function BulletList({ items, white }: { items: (string | ReactNode)[]; white?: boolean }) {
	return (
		<ul style={{ listStyle: 'none', fontSize: '19px', lineHeight: 2, color: white ? colors.white : colors.black }}>
			{items.map((item, i) => (
				<li key={i}><span style={{ color: white ? colors.yellow : colors.red, fontWeight: 700 }}>→ </span>{item}</li>
			))}
		</ul>
	);
}

export function Grid({ children, cols = 3, gap = 20, style }: { children: ReactNode; cols?: number; gap?: number; style?: CSSProperties }) {
	return (
		<div style={{ display: 'grid', gridTemplateColumns: `repeat(${cols}, 1fr)`, gap, ...style }}>
			{children}
		</div>
	);
}

export { colors, fonts, border, shadow, shadowSm };
