import { type ReactElement } from 'react';
import SEOHead from '../components/SEOHead';
import { SNU_SESSIONS } from '../config/snuSchedule';

const card: React.CSSProperties = {
  background: 'var(--bg-white)', border: '1px solid var(--border-light)',
  borderRadius: '16px', padding: '24px 26px', color: 'var(--text-primary)',
};

const fmt = (iso: string, wd: string) => `${iso.slice(5).replace('-', '/')}(${wd})`;

const Classroom = (): ReactElement => {
  const online = SNU_SESSIONS.filter((s) => s.mode === 'online');
  const offline = SNU_SESSIONS.filter((s) => s.mode !== 'online');

  return (
    <>
      <SEOHead title="강의실 안내" description="서울대학교 PBL — 온·오프라인 수업 안내(회차별 교육방식)" path="/classroom" />

      <section className="page-header">
        <div className="container">
          <h2>강의실 안내</h2>
          <p>서울대학교 하계 계절학기 PBL · 온·오프라인 수업 안내</p>
        </div>
      </section>

      <section className="section" style={{ padding: '40px 0 80px' }}>
        <div className="container" style={{ display: 'flex', flexDirection: 'column', gap: '20px', maxWidth: '820px' }}>

          {/* 과정 개요 */}
          <div style={card}>
            <h3 style={{ margin: '0 0 16px', fontSize: '19px' }}>교육 상세 안내</h3>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '14px' }}>
              {[
                ['과정명', '서울대학교 하계 계절학기 PBL'],
                ['교육 기간', '2026.6.24 ~ 7.29 · 총 15회차'],
                ['수업 시간', '10:00 ~ 12:50 (1회차 2시간 50분)'],
                ['교육 방식', `온라인 ${online.length}회차 · 오프라인 ${offline.length}회차 병행`],
              ].map(([k, v]) => (
                <div key={k}>
                  <div style={{ fontSize: '12px', fontWeight: 700, color: 'var(--primary-blue)' }}>{k}</div>
                  <div style={{ fontSize: '15px', fontWeight: 600, marginTop: '2px' }}>{v}</div>
                </div>
              ))}
            </div>
            <div style={{ marginTop: '14px', padding: '10px 14px', borderRadius: '10px', background: '#fef3c7', color: '#92400e', fontSize: '14px', fontWeight: 600 }}>
              ⚠ OT(1회차)·중간(8회차)·기말(15회차)은 오프라인 고정입니다.
            </div>
          </div>

          {/* 온라인 (비대면) */}
          <div style={{ ...card, borderLeft: '4px solid #00855A' }}>
            <h3 style={{ margin: '0 0 6px', fontSize: '18px' }}>💻 온라인 수업 (비대면)</h3>
            <p style={{ margin: '0 0 14px', fontSize: '14px', color: 'var(--text-secondary)' }}>
              아래 회차는 비대면(온라인)으로 진행합니다. 접속 링크는 회차별 공지로 안내됩니다.
            </p>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
              {online.map((s) => (
                <span key={s.no} className="schedule-badge" style={{ background: '#00855A' }}>
                  {s.no}회차 {fmt(s.date, s.weekday)}
                </span>
              ))}
            </div>
          </div>

          {/* 오프라인 (대면) */}
          <div style={{ ...card, borderLeft: '4px solid #0046C8' }}>
            <h3 style={{ margin: '0 0 6px', fontSize: '18px' }}>📍 오프라인 수업 (대면)</h3>
            <p style={{ margin: '0 0 14px', fontSize: '14px', color: 'var(--text-secondary)' }}>
              아래 회차는 대면으로 진행합니다. 강의 장소는 회차별 공지로 안내됩니다.
            </p>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
              {offline.map((s) => (
                <span key={s.no} className="schedule-badge" style={{ background: s.mode === 'offline-fixed' ? '#C8102E' : '#0046C8' }}>
                  {s.no}회차 {fmt(s.date, s.weekday)}{s.mode === 'offline-fixed' ? ' (고정)' : ''}
                </span>
              ))}
            </div>
          </div>

        </div>
      </section>
    </>
  );
};

export default Classroom;
