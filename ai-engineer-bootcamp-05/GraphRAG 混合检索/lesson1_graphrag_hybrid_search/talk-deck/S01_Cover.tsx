import React from 'react';
import { Slide, Inner, Title, Subtitle, Tag, Stagger, StaggerItem } from '../ui';
import { colors } from '../../styles/theme';

export default function S01_Cover() {
  return (
    <Slide style={{ background: colors.warmBg }}>
      <Inner
        style={{
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'flex-start',
          height: '100%',
          gap: 32,
        }}
      >
        <Stagger>
          {/* Top accent bar */}
          <StaggerItem>
            <div
              style={{
                width: 80,
                height: 8,
                background: colors.green,
                border: '2px solid black',
                marginBottom: 8,
              }}
            />
          </StaggerItem>

          {/* Phase tag */}
          <StaggerItem>
            <Tag style={{ background: colors.yellow, color: colors.dark }}>
              PHASE 3: RAG · 2026-06-03 · 19:00 Sydney
            </Tag>
          </StaggerItem>

          {/* Main title */}
          <StaggerItem>
            <Title
              style={{
                fontSize: 80,
                lineHeight: 1.05,
                fontWeight: 900,
                color: colors.dark,
                maxWidth: 900,
              }}
            >
              GraphRAG +<br />
              <span style={{ color: colors.green }}>混合检索</span>
            </Title>
          </StaggerItem>

          {/* Subtitle */}
          <StaggerItem>
            <Subtitle
              style={{
                fontSize: 26,
                color: colors.dark,
                fontWeight: 600,
                border: '3px solid black',
                boxShadow: '6px 6px 0 black',
                background: '#fff',
                padding: '12px 24px',
                display: 'inline-block',
              }}
            >
              Vector + BM25 + Graph 三路融合 · Neo4j + LangChain
            </Subtitle>
          </StaggerItem>

          {/* Bottom row */}
          <StaggerItem>
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: 24,
                marginTop: 24,
                paddingTop: 24,
                borderTop: '3px solid black',
              }}
            >
              <span
                style={{
                  fontSize: 18,
                  fontWeight: 700,
                  color: colors.dark,
                  letterSpacing: 1,
                }}
              >
                Liangjun Song · JR Academy AI Bootcamp
              </span>
              <div
                style={{
                  width: 12,
                  height: 12,
                  background: colors.green,
                  border: '2px solid black',
                  transform: 'rotate(45deg)',
                }}
              />
            </div>
          </StaggerItem>
        </Stagger>

        {/* Decorative graph nodes (bottom-right) */}
        <div
          style={{
            position: 'absolute',
            right: 80,
            bottom: 80,
            opacity: 0.15,
            pointerEvents: 'none',
          }}
        >
          <svg width="320" height="280" viewBox="0 0 320 280">
            <circle cx="60" cy="60" r="30" fill={colors.green} stroke="black" strokeWidth="3" />
            <circle cx="200" cy="40" r="22" fill={colors.yellow} stroke="black" strokeWidth="3" />
            <circle cx="280" cy="140" r="28" fill={colors.blue} stroke="black" strokeWidth="3" />
            <circle cx="140" cy="200" r="25" fill={colors.green} stroke="black" strokeWidth="3" />
            <circle cx="50" cy="200" r="18" fill={colors.red} stroke="black" strokeWidth="3" />
            <line x1="60" y1="60" x2="200" y2="40" stroke="black" strokeWidth="3" />
            <line x1="200" y1="40" x2="280" y2="140" stroke="black" strokeWidth="3" />
            <line x1="280" y1="140" x2="140" y2="200" stroke="black" strokeWidth="3" />
            <line x1="60" y1="60" x2="50" y2="200" stroke="black" strokeWidth="3" />
            <line x1="140" y1="200" x2="50" y2="200" stroke="black" strokeWidth="3" />
            <line x1="60" y1="60" x2="140" y2="200" stroke="black" strokeWidth="2" strokeDasharray="6,4" />
          </svg>
        </div>
      </Inner>
    </Slide>
  );
}
