import { useEffect, type ReactElement } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import SEOHead from '../components/SEOHead';
import { SNU_SESSIONS, MODE_LABEL, type SnuSession } from '../config/snuSchedule';
import { planByNo } from '../config/lessonPlans';

const pad2 = (n: number) => String(n).padStart(2, '0');
const dayLabel = (no: number) => `Day${pad2(no)}`;
const fmtDate = (iso: string, wd: string) => `${iso.slice(5).replace('-', '/')}(${wd})`;

const modeColor: Record<string, string> = {
  'offline-fixed': '#C8102E', offline: '#0046C8', online: '#00855A', tbd: '#6B7280',
};

const Section = ({ icon, title, children }: { icon: string; title: string; children: React.ReactNode }): ReactElement => (
  <section className="pgd-section">
    <h2><span className="pgd-section-icon">{icon}</span> {title}</h2>
    <div className="pgd-card">{children}</div>
  </section>
);

const Lessons = (): ReactElement => {
  const { day } = useParams<{ day: string }>();
  const navigate = useNavigate();

  // day 파라미터: 'day01' 또는 '1'
  const parseNo = (d?: string): number => {
    if (!d) return 1;
    const m = d.match(/\d+/);
    return m ? Number(m[0]) : 1;
  };
  const no = parseNo(day);
  const session: SnuSession | undefined = SNU_SESSIONS.find((s) => s.no === no);

  useEffect(() => {
    if (day && !SNU_SESSIONS.some((s) => s.no === no)) {
      navigate('/lessons/day01', { replace: true });
    }
  }, [day, no, navigate]);

  const select = (n: number) => {
    navigate(`/lessons/day${pad2(n)}`, { replace: true });
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  if (!session) {
    return (
      <>
        <SEOHead title="수업강의안" path="/lessons" />
        <section className="page-header"><div className="container"><h2>수업강의안</h2><p>준비 중입니다.</p></div></section>
      </>
    );
  }

  const plan = planByNo(session.no);
  const color = modeColor[session.mode] || '#0046C8';

  return (
    <>
      <SEOHead title={`수업강의안 · ${dayLabel(session.no)} ${session.title}`} path={`/lessons/day${pad2(session.no)}`} />

      <section className="page-header">
        <div className="container">
          <h2>수업강의안</h2>
          <p>일정표 15회차의 회차별 학습안 — {dayLabel(1)}부터 {dayLabel(SNU_SESSIONS.length)}까지</p>
        </div>
      </section>

      <div className="sidebar-layout">
        <aside className="sidebar">
          <nav className="sidebar-menu">
            {SNU_SESSIONS.map((s) => (
              <button key={s.no} className={`sidebar-item ${s.no === session.no ? 'active' : ''}`} onClick={() => select(s.no)}>
                <span className="sidebar-item-text">
                  <strong>{dayLabel(s.no)}</strong> · {fmtDate(s.date, s.weekday)}
                  <br /><span style={{ fontSize: '12px', color: 'var(--text-secondary)' }}>{s.title}</span>
                </span>
              </button>
            ))}
          </nav>
        </aside>

        <div className="sidebar-content">
          {/* 히어로 */}
          <div className="pgd-hero-card" style={{ borderLeftColor: color }}>
            <span className="pgd-hero-icon" style={{ background: `${color}18`, color }}>{dayLabel(session.no)}</span>
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', flexWrap: 'wrap', marginBottom: '4px' }}>
                <span style={{ fontSize: '12.5px', fontWeight: 800, padding: '2px 10px', borderRadius: '999px', background: `${color}18`, color }}>
                  {fmtDate(session.date, session.weekday)} · {session.time}
                </span>
                <span style={{ fontSize: '12.5px', fontWeight: 700, color: 'var(--text-secondary)' }}>
                  {session.modeLabel ?? MODE_LABEL[session.mode]} · {session.instructor ?? '-'}
                </span>
              </div>
              <h3 className="pgd-hero-title">{session.title}</h3>
            </div>
          </div>

          {plan && (
            <Section icon="🎯" title="학습목표">
              <ul style={{ margin: 0, paddingLeft: '18px', lineHeight: 1.9 }}>
                {plan.objectives.map((o, i) => <li key={i}>{o}</li>)}
              </ul>
            </Section>
          )}

          <Section icon="📚" title="학습내용">
            <ul style={{ margin: 0, paddingLeft: '18px', lineHeight: 1.9 }}>
              {session.topics.map((t, i) => <li key={i}>{t}</li>)}
            </ul>
          </Section>

          {plan && (
            <Section icon="🛠️" title="활동·실습">
              <ul style={{ margin: 0, paddingLeft: '18px', lineHeight: 1.9 }}>
                {plan.activities.map((a, i) => <li key={i}>{a}</li>)}
              </ul>
            </Section>
          )}

          {plan?.homework && (
            <Section icon="📝" title="과제·산출물">
              <p style={{ margin: 0, lineHeight: 1.7 }}>{plan.homework}</p>
            </Section>
          )}

          {/* 이동 */}
          <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap', marginTop: '8px' }}>
            {session.no > 1 && <button className="btn btn-secondary" style={{ padding: '11px 18px' }} onClick={() => select(session.no - 1)}>← {dayLabel(session.no - 1)}</button>}
            {session.no < SNU_SESSIONS.length && <button className="btn btn-secondary" style={{ padding: '11px 18px' }} onClick={() => select(session.no + 1)}>{dayLabel(session.no + 1)} →</button>}
            <Link to="/schedule" className="btn btn-primary" style={{ padding: '11px 18px', marginLeft: 'auto' }}>전체 일정표</Link>
          </div>
        </div>
      </div>
    </>
  );
};

export default Lessons;
