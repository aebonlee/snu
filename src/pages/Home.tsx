import { Link } from 'react-router-dom';
import SEOHead from '../components/SEOHead';
import site from '../config/site';
import {
  SNU_SESSIONS,
  ONLINE_SESSION_NOS,
  OFFLINE_FIXED_NOS,
} from '../config/snuSchedule';
import { topicsByRegion, REGIONS, type Region } from '../data/projectTopics';
import type { ReactElement } from 'react';

const regionMeta: Record<Region, { icon: string; color: string; sub: string }> = {
  서울: { icon: '🏙️', color: '#0046C8', sub: '도시 생활·안전·복지 문제' },
  제주: { icon: '🌊', color: '#00855A', sub: '생태·관광·자원 문제 (해커톤 연계)' },
};

const offlineCount = SNU_SESSIONS.length - ONLINE_SESSION_NOS.length;

const domains = [
  { icon: '🌱', title: '탄소중립', desc: 'RE100 및 에너지 효율화 아이디어·구현' },
  { icon: '💧', title: '환경오염', desc: '대기·수질 환경 개선, 생활 밀착형 환경 문제 해결' },
  { icon: '🦺', title: '안전', desc: '중대재해처벌법 관련 산업·노동 안전 솔루션' },
  { icon: '♻️', title: '자원순환', desc: '해양 쓰레기 및 폐기물 문제 해결' },
];

const tracks = [
  {
    icon: '🛠️',
    color: '#0046C8',
    title: '기술 트랙',
    desc: '공공·지역 데이터 탐색부터 분석·시각화, 프로토타입·대시보드·지도·추천 구조 설계까지 데이터 기반 해결안을 구현합니다.',
    points: ['데이터 수집·정제·EDA', '시각화·대시보드', '프로토타입 설계'],
  },
  {
    icon: '📖',
    color: '#00855A',
    title: '인문 트랙',
    desc: '사용자·이해관계자 분석과 맥락 조사를 통해 정책·관광·문화·생태 관점의 서비스·콘텐츠 해결안을 기획합니다.',
    points: ['사용자·이해관계자 분석', '스토리라인·서비스 흐름', '정책·콘텐츠 기획'],
  },
];

const phases = [
  { n: 1, color: '#10B981', title: '문제정의 및 아이디어 도출', desc: 'ESG·환경 관점에서 사회·환경 문제 탐색, 생성형 AI 기반 문제정의' },
  { n: 2, color: '#22A06B', title: '팀 빌딩 및 아이디어 구체화', desc: '기술·인문 융합 팀 구성, 주제·데이터·역할 확정' },
  { n: 3, color: '#3B82F6', title: '심사 및 평가', desc: '중간 설계 발표 · 문제정의·데이터 활용 가능성 검토 · 피드백' },
  { n: 4, color: '#6B21A8', title: '팀별 컨설팅 및 기술 멘토링', desc: '트랙별 방법론 코칭, 분석·구현 방향 멘토링' },
  { n: 5, color: '#9333EA', title: '기술 기반 아이디어 구현', desc: '데이터 분석·시각화·프로토타입 구현, 생성형 AI 활용 고도화' },
  { n: 6, color: '#0D2B5E', title: '결과물 고도화 및 최종 발표', desc: '결과보고서·피치덱 완성 · 모의 해커톤 · 제주국제 생태포럼 해커톤 연계' },
];

const Home = (): ReactElement => {
  return (
    <>
      <SEOHead title={`${site.name} | ${site.nameKo}`} description={site.description} />

      {/* Hero */}
      <section className="hero">
        <div className="hero-bg-effect">
          <div className="particles">
            {Array.from({ length: 20 }, (_, i) => (
              <div key={i} className="particle" style={{
                left: `${(i * 53) % 100}%`,
                top: `${(i * 37) % 100}%`,
                width: `${3 + (i % 6)}px`,
                height: `${3 + (i % 6)}px`,
                animationDelay: `${(i * 1.1) % 20}s`,
                animationDuration: `${15 + (i % 10)}s`,
              }} />
            ))}
          </div>
        </div>
        <div className="container">
          <div className="hero-content">
            <h1 className="hero-title">
              <span className="title-line">서울대학교 하계 계절학기</span>
              <span className="title-line"><span className="highlight">PBL · 지역문제 해결 프로젝트</span></span>
            </h1>
            <p className="hero-description">
              빅데이터 혁신공유대학(COSS) 데이터 창업 MD 교과목.<br />
              ESG 관점의 사회·환경 문제를 데이터로 정의·분석하고 생성형 AI로 해결하는, 전공 무관 융합형 캡스톤 디자인.<br />
              기술·인문 2개 트랙으로 운영하며 제주국제 생태포럼 해커톤과 연계합니다.
            </p>
            <div className="hero-info-cards">
              <div className="hero-info-card">
                <span className="hero-info-icon">📅</span>
                <div><strong>교육 기간</strong><br/>2026.6.24 ~ 7.29</div>
              </div>
              <div className="hero-info-card">
                <span className="hero-info-icon">⏱️</span>
                <div><strong>운영 회차</strong><br/>총 {SNU_SESSIONS.length}회차 · 10:00~12:50</div>
              </div>
              <div className="hero-info-card">
                <span className="hero-info-icon">💻</span>
                <div><strong>교육 방식</strong><br/>오프라인 {offlineCount} · 온라인 {ONLINE_SESSION_NOS.length}회차</div>
              </div>
              <div className="hero-info-card">
                <span className="hero-info-icon">🏆</span>
                <div><strong>목표</strong><br/>제주국제 생태포럼 해커톤 연계</div>
              </div>
            </div>
            <div className="hero-buttons">
              <Link to="/schedule" className="btn btn-primary">강의 일정 보기</Link>
              <Link to="/instructor" className="btn btn-secondary">담당 강사</Link>
            </div>
          </div>
        </div>
      </section>

      {/* 트랙 운영 구조 */}
      <section className="section">
        <div className="container">
          <div className="section-header">
            <h2 className="section-title">두 개의 트랙으로 함께 달립니다</h2>
            <p className="section-subtitle">학생의 관심 도메인에 따라 기술 트랙 / 인문 트랙으로 역할을 분담해 협업합니다.</p>
          </div>
          <div className="course-cards two">
            {tracks.map((tr) => (
              <div key={tr.title} className="course-card" style={{ borderTopColor: tr.color }}>
                <div className="course-card-icon">{tr.icon}</div>
                <h3 className="course-card-title">{tr.title}</h3>
                <p className="course-card-desc">{tr.desc}</p>
                <div className="course-card-days">{tr.points.join(' · ')}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ESG 주제 분야 (학생 선택형) */}
      <section className="section section-alt">
        <div className="container">
          <div className="section-header">
            <h2 className="section-title">ESG · 환경 주제 분야 (학생 선택형)</h2>
            <p className="section-subtitle">사회·환경 문제 해결형 프로젝트 — 관심 주제를 선택해 팀 프로젝트를 설계합니다.</p>
          </div>
          <div className="course-cards four">
            {domains.map((d) => (
              <div key={d.title} className="course-card" style={{ borderTopColor: '#00855A' }}>
                <div className="course-card-icon">{d.icon}</div>
                <h3 className="course-card-title">{d.title}</h3>
                <p className="course-card-desc">{d.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 프로젝트 진행 단계 */}
      <section className="section">
        <div className="container">
          <div className="section-header">
            <h2 className="section-title">PBL 운영 단계</h2>
            <p className="section-subtitle">문제정의·아이디어 도출부터 결과물 고도화·최종 발표까지 6단계로 진행합니다.</p>
          </div>
          <div className="project-timeline">
            {phases.map((p) => (
              <div key={p.n} className="timeline-item">
                <div className="timeline-marker" style={{ background: p.color }}>{p.n}</div>
                <div className="timeline-content">
                  <h4>{p.title}</h4>
                  <p>{p.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 프로젝트 주제 미리보기 (서울/제주) */}
      <section className="section section-alt">
        <div className="container">
          <div className="section-header">
            <h2 className="section-title">프로젝트 주제 — 서울 7 · 제주 7</h2>
            <p className="section-subtitle">지역문제 해결형 14개 주제 중 하나를 골라 팀을 구성합니다. 모든 주제는 기술·인문 듀얼 트랙으로 진행됩니다.</p>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '20px' }}>
            {REGIONS.map((region) => (
              <div key={region} style={{ background: 'var(--bg-white, #fff)', border: '1px solid var(--border-light, #e5e7eb)', borderTop: `4px solid ${regionMeta[region].color}`, borderRadius: '14px', padding: '22px 24px' }}>
                <h3 style={{ margin: '0 0 4px', fontSize: '18px' }}>
                  {regionMeta[region].icon} {region} 지역문제 해결
                </h3>
                <p style={{ margin: '0 0 12px', fontSize: '13px', color: 'var(--text-secondary, #6b7280)' }}>{regionMeta[region].sub}</p>
                <ul style={{ margin: 0, paddingLeft: '18px', lineHeight: 1.9, fontSize: '14.5px' }}>
                  {topicsByRegion(region).map((t) => (
                    <li key={t.key}>
                      <Link to={`/project-guide/${t.key}`} style={{ color: 'var(--text-primary, #1a1a1a)', textDecoration: 'none' }}>
                        {t.title}
                      </Link>
                    </li>
                  ))}
                </ul>
                <Link to="/project-guide" className="btn btn-secondary" style={{ marginTop: '16px', padding: '9px 18px', fontSize: '14px' }}>
                  {region} 주제 전체 보기 →
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 운영 특이사항 */}
      <section className="section">
        <div className="container">
          <div className="section-header">
            <h2 className="section-title">운영 안내</h2>
          </div>
          <div className="eligibility-cards">
            <div className="eligibility-card">
              <h4>연계 구조</h4>
              <p>교과 · 비교과 · 제주국제 생태포럼 해커톤을 하나의 흐름으로 연계해 운영합니다.</p>
            </div>
            <div className="eligibility-card">
              <h4>교육 방식</h4>
              <p>OT·중간·기말({OFFLINE_FIXED_NOS.join('·')}회차)은 오프라인 고정, 그 외 최대 {ONLINE_SESSION_NOS.length}회차 비대면(온라인) 진행.</p>
            </div>
            <div className="eligibility-card">
              <h4>최종 산출물</h4>
              <p>결과보고서 · 핵심 데이터 시각화 · 3분 피치덱 등 해커톤 제출형 결과물로 정리합니다.</p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Home;
