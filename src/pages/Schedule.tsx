import { type ReactElement } from 'react';
import SEOHead from '../components/SEOHead';
import {
  SNU_SESSIONS,
  MODE_LABEL,
  ONLINE_SESSION_NOS,
  OFFLINE_FIXED_NOS,
  type DeliveryMode,
} from '../config/snuSchedule';

const fmtDate = (iso: string): string => {
  const [, m, d] = iso.split('-').map(Number);
  return `${m}월 ${d}일`;
};

const modeColor: Record<DeliveryMode, string> = {
  'offline-fixed': '#C8102E',
  offline: '#0046C8',
  online: '#00855A',
  tbd: '#6B7280',
};

const todayISO = (): string => {
  const n = new Date();
  const p = (x: number) => String(x).padStart(2, '0');
  return `${n.getFullYear()}-${p(n.getMonth() + 1)}-${p(n.getDate())}`;
};

const Schedule = (): ReactElement => {
  const today = todayISO();

  return (
    <>
      <SEOHead title="강의 일정" path="/schedule" />

      <section className="page-header">
        <div className="container">
          <h2>강의 일정</h2>
          <p>
            서울대학교 하계 계절학기 PBL · 총 {SNU_SESSIONS.length}회차 (2026-06-24 ~ 2026-07-29) ·
            매 회차 10:00~12:50
          </p>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <div className="schedule-legend">
            <div className="legend-item">
              <span className="legend-dot" style={{ background: modeColor['offline-fixed'] }}></span>
              <span>🏫 오프라인 고정 (OT·중간·기말) — {OFFLINE_FIXED_NOS.join('·')}회차</span>
            </div>
            <div className="legend-item">
              <span className="legend-dot" style={{ background: modeColor.online }}></span>
              <span>💻 온라인 (비대면) — {ONLINE_SESSION_NOS.join('·')}회차 (총 {ONLINE_SESSION_NOS.length})</span>
            </div>
            <div className="legend-item">
              <span className="legend-dot" style={{ background: modeColor.offline }}></span>
              <span>🏫 오프라인</span>
            </div>
          </div>

          <div className="schedule-table-wrapper">
            <table className="schedule-table">
              <thead>
                <tr>
                  <th>회차</th>
                  <th>일자</th>
                  <th>시간</th>
                  <th>강의주제</th>
                  <th>세부 내용</th>
                  <th>담당강사</th>
                  <th>교육방식</th>
                </tr>
              </thead>
              <tbody>
                {SNU_SESSIONS.map((s) => (
                  <tr key={s.no} className={s.date === today ? 'is-today' : undefined}>
                    <td><strong>{s.no}</strong></td>
                    <td>
                      <strong>{fmtDate(s.date)}</strong>
                      <br />
                      <span style={{ color: '#6B7280' }}>({s.weekday})</span>
                    </td>
                    <td>{s.time}</td>
                    <td><strong>{s.title}</strong></td>
                    <td>
                      <ul className="schedule-topics">
                        {s.topics.map((topic, j) => (
                          <li key={j}>{topic}</li>
                        ))}
                      </ul>
                    </td>
                    <td>{s.instructor ?? '-'}</td>
                    <td>
                      <span
                        className="schedule-badge"
                        style={{ background: modeColor[s.mode] }}
                      >
                        {s.modeLabel ?? MODE_LABEL[s.mode]}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>
    </>
  );
};

export default Schedule;
