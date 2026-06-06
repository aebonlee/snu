import { useState, type ReactElement } from 'react';
import SEOHead from '../components/SEOHead';
import { SNU_SESSIONS, MODE_LABEL, type SnuSession } from '../config/snuSchedule';

interface Phase {
  id: string;
  name: string;
  icon: string;
  color: string;
  description: string;
  range: [number, number];
}

const PHASES: Phase[] = [
  { id: 'define',   name: '문제정의',     icon: '🔍', color: '#10B981', description: '지역 이해 · 데이터 탐색 · 생성형 AI 기반 문제정의 · 트랙별 방법론', range: [1, 5] },
  { id: 'design',   name: '중간설계',     icon: '📐', color: '#3B82F6', description: '중간 설계 발표 · 피드백 · 주제·데이터·역할 확정', range: [6, 8] },
  { id: 'execute',  name: '프로젝트 실행', icon: '⚙️', color: '#6B21A8', description: '데이터 분석·구현 · 생성형 AI 고도화 · 결과 통합·고도화', range: [9, 13] },
  { id: 'hackathon', name: '해커톤 연계',  icon: '🏆', color: '#0D2B5E', description: '모의 해커톤 발표 · 최종 발표 · 제주국제 생태포럼 해커톤 후속 연계', range: [14, 15] },
];

const sessionsOf = (p: Phase): SnuSession[] =>
  SNU_SESSIONS.filter((s) => s.no >= p.range[0] && s.no <= p.range[1]);

const Curriculum = (): ReactElement => {
  const [active, setActive] = useState<string>('all');
  const shown = active === 'all' ? PHASES : PHASES.filter((p) => p.id === active);

  return (
    <>
      <SEOHead title="커리큘럼" path="/curriculum" />

      <section className="page-header">
        <div className="container">
          <h2>커리큘럼</h2>
          <p>총 {SNU_SESSIONS.length}회차 · 문제정의 → 중간설계 → 실행 → 해커톤 연계의 PBL 흐름</p>
        </div>
      </section>

      <section className="section">
        <div className="container">
          {/* 단계 필터 */}
          <div className="curriculum-filter">
            <button className={`filter-btn ${active === 'all' ? 'active' : ''}`} onClick={() => setActive('all')}>전체</button>
            {PHASES.map((p) => (
              <button key={p.id} className={`filter-btn ${active === p.id ? 'active' : ''}`}
                onClick={() => setActive(p.id)} style={active === p.id ? { background: p.color, borderColor: p.color } : {}}>
                {p.icon} {p.name} ({sessionsOf(p).length}회차)
              </button>
            ))}
          </div>

          {/* 단계별 목록 */}
          {shown.map((phase) => (
            <div key={phase.id} className="curriculum-phase">
              <div className="phase-header" style={{ borderLeftColor: phase.color }}>
                <span className="phase-icon">{phase.icon}</span>
                <div>
                  <h3>{phase.name} <span className="phase-hours">({sessionsOf(phase).length}회차)</span></h3>
                  <p>{phase.description}</p>
                </div>
              </div>
              <div className="phase-days">
                {sessionsOf(phase).map((s) => (
                  <div key={s.no} className="day-card">
                    <div className="day-number" style={{ background: phase.color }}>
                      {s.no}회차
                    </div>
                    <div className="day-info">
                      <div className="day-date">
                        {s.date.slice(5).replace('-', '/')}({s.weekday}) · {s.instructor ?? '-'}
                      </div>
                      <h4 className="day-title">{s.title}</h4>
                      <ul className="day-topics">
                        {s.topics.map((topic, i) => (
                          <li key={i}>{topic}</li>
                        ))}
                      </ul>
                      <div className="day-project">
                        <span>🎓 {s.modeLabel ?? MODE_LABEL[s.mode]}</span>
                      </div>
                      <span className="day-hours">{s.time}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>
    </>
  );
};

export default Curriculum;
