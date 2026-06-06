import { Link } from 'react-router-dom';
import SEOHead from '../components/SEOHead';
import site from '../config/site';
import {
  SNU_SESSIONS,
  ONLINE_SESSION_NOS,
  OFFLINE_FIXED_NOS,
} from '../config/snuSchedule';
import type { ReactElement } from 'react';

const offlineCount = SNU_SESSIONS.length - ONLINE_SESSION_NOS.length;

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
  { n: 1, color: '#10B981', title: '문제정의 (1~5회차)', desc: '지역 이해 · 데이터 탐색 · 생성형 AI 기반 문제정의 · 트랙별 방법론' },
  { n: 2, color: '#3B82F6', title: '중간 설계 (6~8회차)', desc: '중간 설계 발표 · 피드백 · 주제·데이터·역할 확정' },
  { n: 3, color: '#6B21A8', title: '프로젝트 실행 (9~13회차)', desc: '데이터 분석·구현 · 생성형 AI 고도화 · 결과 통합·고도화' },
  { n: 4, color: '#0D2B5E', title: '해커톤 연계 (14~15회차)', desc: '모의 해커톤 발표 · 최종 발표 · 제주국제 생태포럼 해커톤 후속 연계' },
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
              교과 · 비교과 · 제주국제 생태포럼 해커톤을 연계하여, 기술 트랙과 인문 트랙으로
              지역문제 해결형 프로젝트를 수행합니다.
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
          <div className="course-cards">
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

      {/* 프로젝트 진행 단계 */}
      <section className="section section-alt">
        <div className="container">
          <div className="section-header">
            <h2 className="section-title">프로젝트 진행 단계</h2>
            <p className="section-subtitle">문제정의 → 중간설계 → 실행 → 해커톤 연계의 흐름으로 산출물을 완성합니다.</p>
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
