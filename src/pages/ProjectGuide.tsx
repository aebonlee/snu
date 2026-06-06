import { useEffect, type ReactElement } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import SEOHead from '../components/SEOHead';
import {
  PRESET_TOPICS,
  REGIONS,
  REGION_DATA_GUIDE,
  STANDARD_DELIVERABLES,
  getTopic,
  topicsByRegion,
  type Region,
} from '../data/projectTopics';
import { MAX_TEAM_SIZE, TRACK_CAP } from '../utils/projectTeams';

const regionColor: Record<Region, string> = { 서울: '#0046C8', 제주: '#00855A' };

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
        <SEOHead title="프로젝트 안내" path="/project-guide" />
        <section className="page-header">
          <div className="container"><h2>프로젝트 안내</h2><p>준비 중입니다.</p></div>
        </section>
      </>
    );
  }

  const color = regionColor[topic.region];
  const idx = topicsByRegion(topic.region).findIndex((t) => t.key === topic.key) + 1;

  return (
    <>
      <SEOHead title={`${topic.region} · ${topic.title}`} path={`/project-guide/${topic.key}`} />

      <section className="page-header">
        <div className="container">
          <h2>프로젝트 안내</h2>
          <p>서울·제주 지역문제 해결형 PBL 프로젝트 14선 — 기술·인문 듀얼 트랙, 생성형 AI 기반</p>
        </div>
      </section>

      <div className="sidebar-layout">
        <aside className="sidebar">
          <nav className="sidebar-menu">
            {REGIONS.map((region) => (
              <div key={region}>
                <div style={{
                  padding: '10px 14px 6px', fontSize: '12px', fontWeight: 800,
                  letterSpacing: '0.04em', color: regionColor[region],
                }}>
                  {region} 지역문제 ({topicsByRegion(region).length})
                </div>
                {topicsByRegion(region).map((t) => (
                  <button
                    key={t.key}
                    className={`sidebar-item ${t.key === topic.key ? 'active' : ''}`}
                    onClick={() => handleSelect(t.key)}
                  >
                    <span className="sidebar-item-text">{t.title}</span>
                  </button>
                ))}
              </div>
            ))}
          </nav>
        </aside>

        <div className="sidebar-content">
          {/* 히어로 */}
          <div className="pgd-hero-card" style={{ borderLeftColor: color }}>
            <span className="pgd-hero-icon" style={{ background: `${color}18`, color }}>
              {topic.region === '서울' ? '🏙️' : '🌊'}
            </span>
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', flexWrap: 'wrap', marginBottom: '4px' }}>
                <span style={{ fontSize: '12.5px', fontWeight: 800, padding: '2px 10px', borderRadius: '999px', background: `${color}18`, color }}>
                  {topic.region} {idx}
                </span>
              </div>
              <h3 className="pgd-hero-title">{topic.title}</h3>
              <p className="pgd-hero-subtitle">{topic.description}</p>
            </div>
          </div>

          {/* 듀얼 트랙 */}
          <section className="pgd-section">
            <h2><span className="pgd-section-icon">🧭</span> 듀얼 트랙 역할 분담</h2>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '16px' }}>
              <div className="pgd-card" style={{ borderTop: '4px solid #0046C8' }}>
                <h4 style={{ margin: '0 0 8px', color: '#0046C8' }}>🛠️ 기술 트랙</h4>
                <p style={{ margin: 0, lineHeight: 1.7 }}>{topic.techTrack}</p>
              </div>
              <div className="pgd-card" style={{ borderTop: '4px solid #00855A' }}>
                <h4 style={{ margin: '0 0 8px', color: '#00855A' }}>📖 인문 트랙</h4>
                <p style={{ margin: 0, lineHeight: 1.7 }}>{topic.humanTrack}</p>
              </div>
            </div>
          </section>

          {/* 팀 구성 */}
          <section className="pgd-section">
            <h2><span className="pgd-section-icon">👥</span> 팀 구성</h2>
            <div className="pgd-card">
              <p style={{ margin: 0, lineHeight: 1.7 }}>
                한 팀 <strong>{MAX_TEAM_SIZE}명</strong> — 기술 트랙 {TRACK_CAP}명 + 인문 트랙 {TRACK_CAP}명.
                관심 도메인에 따라 트랙을 선택해 한 팀 안에서 자연스럽게 역할이 나뉩니다.
              </p>
            </div>
          </section>

          {/* 착수 데이터 */}
          <section className="pgd-section">
            <h2><span className="pgd-section-icon">📊</span> 착수 데이터 가이드</h2>
            <div className="pgd-card">
              <p style={{ margin: '0 0 10px', lineHeight: 1.7 }}>
                3주차 데이터 탐색 워크숍에서 아래 공공데이터로 착수 데이터를 먼저 확보하세요.
              </p>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
                {REGION_DATA_GUIDE[topic.region].map((d) => (
                  <a key={d.name} href={d.url} target="_blank" rel="noopener noreferrer"
                    style={{ fontSize: '13.5px', fontWeight: 600, padding: '6px 12px', borderRadius: '999px', background: `${color}14`, color, textDecoration: 'none' }}>
                    {d.name} ↗
                  </a>
                ))}
              </div>
            </div>
          </section>

          {/* 산출물 */}
          <section className="pgd-section">
            <h2><span className="pgd-section-icon">🎯</span> 최종 산출물</h2>
            <div className="pgd-card">
              <ul style={{ margin: 0, paddingLeft: '18px', lineHeight: 1.9 }}>
                {STANDARD_DELIVERABLES.map((d, i) => (
                  <li key={i}><span style={{ color }}>✓</span> {d}</li>
                ))}
              </ul>
            </div>
          </section>

          {/* CTA */}
          <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap', marginTop: '8px' }}>
            <Link to="/project-vote" className="btn btn-primary" style={{ padding: '11px 22px' }}>
              이 주제로 팀 만들기 →
            </Link>
            <Link to="/schedule" className="btn btn-secondary" style={{ padding: '11px 22px' }}>
              강의 일정 보기
            </Link>
          </div>
        </div>
      </div>
    </>
  );
};

export default ProjectGuide;
