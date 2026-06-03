import React from 'react';
import { Slide, Inner, Title, Card, Tag, Grid } from '../ui';
import { colors } from '../../styles/theme';

function Node({ label, type }: { label: string; type?: string }) {
  return (
    <div
      style={{
        background: colors.green,
        border: '3px solid black',
        boxShadow: '4px 4px 0 black',
        padding: '10px 20px',
        fontSize: 16,
        fontWeight: 800,
        color: '#fff',
        display: 'inline-flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: 2,
        minWidth: 120,
      }}
    >
      <span>{label}</span>
      {type && (
        <span style={{ fontSize: 10, fontWeight: 600, color: 'rgba(255,255,255,0.75)', letterSpacing: 1 }}>
          :{type}
        </span>
      )}
    </div>
  );
}

function Arrow({ label }: { label: string }) {
  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: 2,
        padding: '0 8px',
      }}
    >
      <span
        style={{
          fontSize: 11,
          fontWeight: 700,
          color: colors.dark,
          background: colors.yellow,
          border: '2px solid black',
          padding: '2px 8px',
          whiteSpace: 'nowrap',
        }}
      >
        {label}
      </span>
      <span style={{ fontSize: 20, color: colors.dark, lineHeight: 1 }}>─────→</span>
    </div>
  );
}

export default function S06_KnowledgeGraph() {
  return (
    <Slide style={{ background: colors.warmBg }}>
      <Inner style={{ display: 'flex', flexDirection: 'column', height: '100%', gap: 24, paddingTop: 40 }}>
        {/* Title */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
          <div style={{ width: 12, height: 48, background: colors.green, border: '2px solid black' }} />
          <Title style={{ fontSize: 42, fontWeight: 900, color: colors.dark }}>
            知识图谱 — 连接实体的网络
          </Title>
          <Tag style={{ background: colors.green, color: '#fff', marginLeft: 'auto' }}>
            Knowledge Graph
          </Tag>
        </div>

        {/* Core concept */}
        <Card
          style={{
            border: '3px solid black',
            boxShadow: '6px 6px 0 black',
            background: '#fff',
            padding: '24px 32px',
          }}
        >
          <div style={{ fontSize: 15, fontWeight: 700, color: '#666', marginBottom: 20, letterSpacing: 1 }}>
            基本结构：节点 → 关系 → 节点（三元组）
          </div>

          {/* Main graph diagram */}
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: 0,
              overflowX: 'auto',
              padding: '16px 0',
            }}
          >
            <Node label="苹果公司" type="Company" />
            <Arrow label="CEO_OF" />
            <Node label="Tim Cook" type="Person" />
            <Arrow label="STUDIED_AT" />
            <Node label="Auburn 大学" type="University" />
            <Arrow label="LOCATED_IN" />
            <Node label="Alabama 州" type="Location" />
          </div>
        </Card>

        {/* Three key concepts */}
        <Grid cols={3} style={{ flex: 1, gap: 20 }}>
          <Card
            style={{
              border: '3px solid black',
              boxShadow: '6px 6px 0 black',
              background: '#fff',
              padding: '20px 20px',
              borderTop: `6px solid ${colors.green}`,
            }}
          >
            <div style={{ fontSize: 28, marginBottom: 10 }}>🔵</div>
            <div style={{ fontSize: 17, fontWeight: 800, color: colors.dark, marginBottom: 8 }}>节点 (Node)</div>
            <div style={{ fontSize: 14, color: '#555', lineHeight: 1.6 }}>
              代表实体：人、公司、地点、概念、产品
              <br />
              具有属性（name, age, founded...）
            </div>
            <div
              style={{
                marginTop: 12,
                background: '#f0fff4',
                border: `2px solid ${colors.green}`,
                padding: '6px 10px',
                fontSize: 12,
                fontFamily: 'monospace',
              }}
            >
              (p:Person &#123;name: "Tim Cook"&#125;)
            </div>
          </Card>

          <Card
            style={{
              border: '3px solid black',
              boxShadow: '6px 6px 0 black',
              background: '#fff',
              padding: '20px 20px',
              borderTop: `6px solid ${colors.yellow}`,
            }}
          >
            <div style={{ fontSize: 28, marginBottom: 10 }}>➡️</div>
            <div style={{ fontSize: 17, fontWeight: 800, color: colors.dark, marginBottom: 8 }}>关系 (Relationship)</div>
            <div style={{ fontSize: 14, color: '#555', lineHeight: 1.6 }}>
              有方向的连接，描述实体间的语义关系
              <br />
              支持属性（since, weight...）
            </div>
            <div
              style={{
                marginTop: 12,
                background: '#fffdf0',
                border: `2px solid ${colors.yellow}`,
                padding: '6px 10px',
                fontSize: 12,
                fontFamily: 'monospace',
              }}
            >
              -[:CEO_OF &#123;since: 2011&#125;]-&gt;
            </div>
          </Card>

          <Card
            style={{
              border: '3px solid black',
              boxShadow: '6px 6px 0 black',
              background: '#fff',
              padding: '20px 20px',
              borderTop: `6px solid ${colors.blue}`,
            }}
          >
            <div style={{ fontSize: 28, marginBottom: 10 }}>🕸️</div>
            <div style={{ fontSize: 17, fontWeight: 800, color: colors.dark, marginBottom: 8 }}>图 (Graph)</div>
            <div style={{ fontSize: 14, color: '#555', lineHeight: 1.6 }}>
              节点 + 关系的整体网络
              <br />
              支持多跳遍历、路径查询
            </div>
            <div
              style={{
                marginTop: 12,
                background: '#eff6ff',
                border: `2px solid ${colors.blue}`,
                padding: '6px 10px',
                fontSize: 12,
                fontFamily: 'monospace',
              }}
            >
              MATCH path = (a)-[*1..3]-&gt;(b)
            </div>
          </Card>
        </Grid>
      </Inner>
    </Slide>
  );
}
