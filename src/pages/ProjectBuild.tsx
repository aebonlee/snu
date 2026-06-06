import { useEffect, type ReactElement } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import SEOHead from '../components/SEOHead';
import {
  PRESET_TOPICS, REGIONS, DIFFICULTY_COLOR, getTopic, topicsByRegion, type Region,
} from '../data/projectTopics';
import { getBuild } from '../data/projectBuilds';

const regionColor: Record<Region, string> = { 서울: '#0046C8', 제주: '#00855A' };

const Section = ({ icon, title, children }: { icon: string; title: string; children: React.ReactNode }): ReactElement => (
  <section className="pgd-section">
    <h2><span className="pgd-section-icon">{icon}</span> {title}</h2>
    <div className="pgd-card">{children}</div>
  </section>
);

const ProjectBuild = (): ReactElement => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const selectedKey = id && getTopic(id) ? id : PRESET_TOPICS[0]?.key;
  const topic = selectedKey ? getTopic(selectedKey) : undefined;
  const build = selectedKey ? getBuild(selectedKey) : undefined;

  useEffect(() => {
    if (id && !getTopic(id) && PRESET_TOPICS[0]) {
      navigate(`/project-build/${PRESET_TOPICS[0].key}`, { replace: true });
    }
  }, [id, navigate]);

  const handleSelect = (key: string) => {
    navigate(`/project-build/${key}`, { replace: true });
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  if (!topic) {
    return (
      <>
        <SEOHead title="프로젝트 아이디어 구현" path="/project-build" />
        <section className="page-header"><div className="container"><h2>프로젝트 아이디어 구현</h2><p>준비 중입니다.</p></div></section>
      </>
    );
  }

  const color = regionColor[topic.region];
  const diffColor = DIFFICULTY_COLOR[topic.difficulty];

  return (
    <>
      <SEOHead title={`구현 가이드 · ${topic.region} ${topic.short}`} path={`/project-build/${topic.key}`} />

      <section className="page-header">
        <div className="container">
          <h2>프로젝트 아이디어 구현</h2>
          <p>14개 주제별 화면 설계 · 데이터 스키마 · 단계별 구현 가이드 — 착수용 참고 설계</p>
        </div>
      </section>

      <div className="sidebar-layout">
        <aside className="sidebar">
          <nav className="sidebar-menu">
            {REGIONS.map((region) => (
              <div key={region} style={{ marginBottom: '6px' }}>
                <div style={{
                  padding: '8px 12px 6px', fontSize: '13px', fontWeight: 900,
                  color: '#fff', background: regionColor[region], borderRadius: '8px', marginBottom: '4px',
                }}>
                  {region === '서울' ? '🏙️' : '🌊'} {region} 지역문제 {topicsByRegion(region).length}
                </div>
                {topicsByRegion(region).map((t, i) => (
                  <button
                    key={t.key}
                    className={`sidebar-item ${t.key === topic.key ? 'active' : ''}`}
                    onClick={() => handleSelect(t.key)}
                    style={{ fontSize: '14.5px' }}
                  >
                    <span style={{ width: '20px', flexShrink: 0, textAlign: 'right', fontWeight: 800, opacity: 0.6 }}>{i + 1}</span>
                    <span className="sidebar-item-text">{t.short}</span>
                    <span style={{ flexShrink: 0, width: '7px', height: '7px', borderRadius: '50%', background: DIFFICULTY_COLOR[t.difficulty] }} title={t.difficulty} />
                  </button>
                ))}
              </div>
            ))}
          </nav>
        </aside>

        <div className="sidebar-content">
          {/* 히어로 */}
          <div className="pgd-hero-card" style={{ borderLeftColor: color }}>
            <span className="pgd-hero-icon" style={{ background: `${color}18`, color }}>🧩</span>
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', flexWrap: 'wrap', marginBottom: '6px' }}>
                <span style={{ fontSize: '12.5px', fontWeight: 800, padding: '2px 10px', borderRadius: '999px', background: `${color}18`, color }}>{topic.region}</span>
                <span style={{ fontSize: '12.5px', fontWeight: 800, padding: '2px 10px', borderRadius: '999px', background: `${diffColor}18`, color: diffColor }}>난이도 {topic.difficulty}</span>
                {build && <span style={{ fontSize: '12.5px', fontWeight: 700, color: 'var(--text-secondary)' }}>{build.archetype}</span>}
              </div>
              <h3 className="pgd-hero-title">{topic.title}</h3>
              <p className="pgd-hero-subtitle">{topic.deliverable}</p>
            </div>
          </div>

          {!build ? (
            <div className="pgd-card">이 주제의 구현 가이드는 준비 중입니다.</div>
          ) : (
            <>
              {/* 추천 스택 */}
              <Section icon="🧰" title="추천 기술 스택">
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
                  {build.stack.map((s) => (
                    <span key={s} style={{ fontSize: '13px', fontWeight: 600, padding: '6px 12px', borderRadius: '8px', background: 'var(--bg-light-gray)', color: 'var(--text-primary)' }}>{s}</span>
                  ))}
                </div>
              </Section>

              {/* 화면 설계 */}
              <Section icon="🖥️" title="화면 설계">
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '12px' }}>
                  {build.screens.map((s, i) => (
                    <div key={i} style={{ border: '1px solid var(--border-light)', borderRadius: '10px', padding: '14px 16px', background: 'var(--bg-light-gray)' }}>
                      <div style={{ fontSize: '13px', fontWeight: 800, color, marginBottom: '4px' }}>화면 {i + 1}. {s.name}</div>
                      <div style={{ fontSize: '13.5px', lineHeight: 1.6, color: 'var(--text-secondary)' }}>{s.desc}</div>
                    </div>
                  ))}
                </div>
              </Section>

              {/* 데이터 스키마 */}
              <Section icon="🗂️" title="데이터 스키마">
                <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
                  {build.schema.map((t) => (
                    <div key={t.name} style={{ border: '1px solid var(--border-light)', borderRadius: '10px', overflow: 'hidden' }}>
                      <div style={{ padding: '8px 14px', background: `${color}10`, fontWeight: 800, fontSize: '14px', fontFamily: 'monospace', color }}>
                        {t.name} <span style={{ fontWeight: 500, fontFamily: 'inherit', color: 'var(--text-secondary)', fontSize: '12.5px' }}>— {t.note}</span>
                      </div>
                      <div style={{ padding: '10px 14px', display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
                        {t.fields.map((f) => (
                          <code key={f} style={{ fontSize: '12.5px', padding: '3px 8px', borderRadius: '6px', background: 'var(--bg-light-gray)', color: 'var(--text-primary)' }}>{f}</code>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </Section>

              {/* 단계별 구현 가이드 */}
              <Section icon="🪜" title="단계별 구현 가이드">
                <ol style={{ margin: 0, paddingLeft: 0, listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '10px' }}>
                  {build.steps.map((s, i) => (
                    <li key={i} style={{ display: 'flex', gap: '12px', alignItems: 'flex-start' }}>
                      <span style={{ flexShrink: 0, width: '26px', height: '26px', borderRadius: '50%', background: color, color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '13px', fontWeight: 800 }}>{i + 1}</span>
                      <div>
                        <div style={{ fontWeight: 700, fontSize: '14.5px' }}>{s.title}</div>
                        <div style={{ fontSize: '13.5px', lineHeight: 1.6, color: 'var(--text-secondary)' }}>{s.detail}</div>
                      </div>
                    </li>
                  ))}
                </ol>
              </Section>

              {/* CTA */}
              <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap', marginTop: '8px' }}>
                <Link to={`/project-guide/${topic.key}`} className="btn btn-secondary" style={{ padding: '11px 22px' }}>← 아이디어 개요</Link>
                <Link to="/project-vote" className="btn btn-primary" style={{ padding: '11px 22px' }}>이 주제로 팀 만들기 →</Link>
              </div>
            </>
          )}
        </div>
      </div>
    </>
  );
};

export default ProjectBuild;
