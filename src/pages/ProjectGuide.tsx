import { useEffect, type ReactElement } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import SEOHead from '../components/SEOHead';
import {
  PRESET_TOPICS,
  REGIONS,
  REGION_DATA_GUIDE,
  STANDARD_DELIVERABLES,
  DIFFICULTY_COLOR,
  getTopic,
  topicsByRegion,
  type Region,
} from '../data/projectTopics';
import { MAX_TEAM_SIZE, TRACK_CAP } from '../utils/projectTeams';

const regionColor: Record<Region, string> = { 서울: '#0046C8', 제주: '#00855A' };

const Section = ({ icon, title, children }: { icon: string; title: string; children: React.ReactNode }): ReactElement => (
  <section className="pgd-section">
    <h2><span className="pgd-section-icon">{icon}</span> {title}</h2>
    <div className="pgd-card">{children}</div>
  </section>
);

const ProjectGuide = (): ReactElement => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const selectedKey = id && getTopic(id) ? id : PRESET_TOPICS[0]?.key;
  const topic = selectedKey ? getTopic(selectedKey) : undefined;

  useEffect(() => {
    if (id && !getTopic(id) && PRESET_TOPICS[0]) {
      navigate(`/project-guide/${PRESET_TOPICS[0].key}`, { replace: true });
    }
  }, [id, navigate]);

  const handleSelect = (key: string) => {
    navigate(`/project-guide/${key}`, { replace: true });
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  if (!topic) {
    return (
      <>
        <SEOHead title="프로젝트 아이디어 예시" path="/project-guide" />
        <section className="page-header">
          <div className="container"><h2>프로젝트 아이디어 예시</h2><p>준비 중입니다.</p></div>
        </section>
      </>
    );
  }

  const color = regionColor[topic.region];
  const idx = topicsByRegion(topic.region).findIndex((t) => t.key === topic.key) + 1;
  const diffColor = DIFFICULTY_COLOR[topic.difficulty];

  return (
    <>
      <SEOHead title={`${topic.region} · ${topic.short}`} path={`/project-guide/${topic.key}`} />

      <section className="page-header">
        <div className="container">
          <h2>프로젝트 아이디어 예시</h2>
          <p>서울·제주 지역문제 해결형 PBL 프로젝트 14선 — 기술·인문 듀얼 트랙, 생성형 AI 기반</p>
        </div>
      </section>

      <div className="sidebar-layout">
        <aside className="sidebar">
          <nav className="sidebar-menu">
            {REGIONS.map((region) => (
              <div key={region} style={{ marginBottom: '6px' }}>
                <div style={{
                  padding: '8px 12px 6px', fontSize: '13px', fontWeight: 900,
                  letterSpacing: '0.02em', color: '#fff', background: regionColor[region],
                  borderRadius: '8px', marginBottom: '4px',
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
            <div style={{ padding: '8px 12px', fontSize: '11.5px', color: 'var(--text-secondary)' }}>
              ● <span style={{ color: DIFFICULTY_COLOR['입문'] }}>입문</span> · <span style={{ color: DIFFICULTY_COLOR['중급'] }}>중급</span> · <span style={{ color: DIFFICULTY_COLOR['심화'] }}>심화</span>
            </div>
          </nav>
        </aside>

        <div className="sidebar-content">
          {/* 히어로 */}
          <div className="pgd-hero-card" style={{ borderLeftColor: color }}>
            <span className="pgd-hero-icon" style={{ background: `${color}18`, color }}>
              {topic.region === '서울' ? '🏙️' : '🌊'}
            </span>
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', flexWrap: 'wrap', marginBottom: '6px' }}>
                <span style={{ fontSize: '12.5px', fontWeight: 800, padding: '2px 10px', borderRadius: '999px', background: `${color}18`, color }}>
                  {topic.region} {idx}
                </span>
                <span style={{ fontSize: '12.5px', fontWeight: 800, padding: '2px 10px', borderRadius: '999px', background: `${diffColor}18`, color: diffColor }}>
                  난이도 {topic.difficulty}
                </span>
              </div>
              <h3 className="pgd-hero-title">{topic.title}</h3>
              <p className="pgd-hero-subtitle">{topic.description}</p>
            </div>
          </div>

          {/* 듀얼 트랙 */}
          <Section icon="🧭" title="듀얼 트랙 역할 분담">
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '16px' }}>
              <div style={{ borderTop: '4px solid #0046C8', borderRadius: '10px', padding: '14px 16px', background: 'var(--bg-light-gray)' }}>
                <h4 style={{ margin: '0 0 8px', color: '#0046C8' }}>🛠️ 기술 트랙</h4>
                <p style={{ margin: 0, lineHeight: 1.7 }}>{topic.techTrack}</p>
              </div>
              <div style={{ borderTop: '4px solid #00855A', borderRadius: '10px', padding: '14px 16px', background: 'var(--bg-light-gray)' }}>
                <h4 style={{ margin: '0 0 8px', color: '#00855A' }}>📖 인문 트랙</h4>
                <p style={{ margin: 0, lineHeight: 1.7 }}>{topic.humanTrack}</p>
              </div>
            </div>
          </Section>

          {/* 핵심 기능 */}
          <Section icon="✨" title="핵심 기능 · 산출 요소">
            <ul style={{ margin: 0, paddingLeft: '18px', lineHeight: 1.9 }}>
              {topic.features.map((f, i) => <li key={i}>{f}</li>)}
            </ul>
          </Section>

          {/* 추천 데이터 */}
          <Section icon="📊" title="추천 착수 데이터">
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px', marginBottom: '12px' }}>
              {topic.dataSets.map((d) => (
                <span key={d} style={{ fontSize: '13px', fontWeight: 600, padding: '6px 12px', borderRadius: '999px', background: `${color}12`, color }}>{d}</span>
              ))}
            </div>
            <p style={{ margin: 0, fontSize: '13px', color: 'var(--text-secondary)' }}>
              데이터 포털:{' '}
              {REGION_DATA_GUIDE[topic.region].map((g, i) => (
                <span key={g.name}>
                  {i > 0 && ' · '}
                  <a href={g.url} target="_blank" rel="noopener noreferrer" style={{ color }}>{g.name} ↗</a>
                </span>
              ))}
            </p>
          </Section>

          {/* 대표 산출물 + 팀 구성 */}
          <Section icon="🎯" title="대표 산출물 · 팀 구성">
            <p style={{ margin: '0 0 10px', lineHeight: 1.7 }}>
              <strong style={{ color }}>대표 산출물</strong> — {topic.deliverable}
            </p>
            <p style={{ margin: '0 0 12px', lineHeight: 1.7, color: 'var(--text-secondary)' }}>
              <strong>팀 구성</strong> — 한 팀 {MAX_TEAM_SIZE}명(기술 {TRACK_CAP} · 인문 {TRACK_CAP}). 관심 도메인에 따라 트랙을 선택해 자연스럽게 역할이 나뉩니다.
            </p>
            <ul style={{ margin: 0, paddingLeft: '18px', lineHeight: 1.8, fontSize: '13.5px', color: 'var(--text-secondary)' }}>
              {STANDARD_DELIVERABLES.map((d, i) => <li key={i}>{d}</li>)}
            </ul>
          </Section>

          {/* 확장 아이디어 */}
          <Section icon="🚀" title="확장 · 해커톤 발전 아이디어">
            <ul style={{ margin: 0, paddingLeft: '18px', lineHeight: 1.9 }}>
              {topic.expansion.map((e, i) => <li key={i}><span style={{ color }}>✓</span> {e}</li>)}
            </ul>
          </Section>

          {/* CTA */}
          <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap', marginTop: '8px' }}>
            <Link to="/project-vote" className="btn btn-primary" style={{ padding: '11px 22px' }}>이 주제로 팀 만들기 →</Link>
            <Link to="/pbl/info" className="btn btn-secondary" style={{ padding: '11px 22px' }}>개인별 PBL활동 시작</Link>
          </div>
        </div>
      </div>
    </>
  );
};

export default ProjectGuide;
