import { useMemo, type ReactElement } from 'react';
import AdminSidebar from '../../components/AdminSidebar';
import SEOHead from '../../components/SEOHead';
import {
  ROSTER,
  ROSTER_COUNT,
  COURSE_TITLE,
  HOST_COLLEGE,
  collegeDistribution,
} from '../../data/rosterData';

const AdminRoster = (): ReactElement => {
  const dist = useMemo(() => collegeDistribution(), []);
  const courseTypeDist = useMemo(() => {
    const m = new Map<string, number>();
    ROSTER.forEach((s) => m.set(s.courseType, (m.get(s.courseType) ?? 0) + 1));
    return Array.from(m, ([k, v]) => ({ k, v }));
  }, []);

  return (
    <>
      <SEOHead title="수강생 명단" path="/admin/roster" noindex />
      <div className="admin-layout">
        <AdminSidebar />
        <div className="admin-content">
          <div style={{ marginBottom: '16px' }}>
            <h2 style={{ margin: 0 }}>수강생 명단</h2>
            <p style={{ margin: '6px 0 0', fontSize: '14px', color: 'var(--text-secondary, #6b7280)' }}>
              <strong>{COURSE_TITLE}</strong> · {HOST_COLLEGE} 개설 · 수강신청 기준 <strong>{ROSTER_COUNT}명</strong>
              (소속·전공 기반 명단으로 개인 이름은 포함하지 않습니다.)
            </p>
          </div>

          {/* 요약 */}
          <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap', marginBottom: '20px' }}>
            {[
              { label: '총 수강 인원', val: ROSTER_COUNT, color: 'var(--primary-blue, #0046C8)' },
              { label: '개설 대학(원)', val: dist.length, color: 'var(--text-primary, #1a1a1a)' },
              ...courseTypeDist.map((c) => ({ label: `교과구분 ${c.k}`, val: c.v, color: '#10b981' })),
            ].map((c) => (
              <div key={c.label} style={{
                flex: '1 1 130px', border: '1px solid var(--border-light, #e5e7eb)',
                borderRadius: '10px', padding: '12px 14px', background: 'var(--bg-white, #fff)',
              }}>
                <div style={{ fontSize: '20px', fontWeight: 800, color: c.color }}>{c.val}</div>
                <div style={{ fontSize: '13px', color: 'var(--text-secondary, #6b7280)' }}>{c.label}</div>
              </div>
            ))}
          </div>

          {/* 대학(원)별 분포 */}
          <h3 style={{ margin: '8px 0 10px' }}>대학(원)별 분포</h3>
          <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap', marginBottom: '24px', fontSize: '13.5px' }}>
            {dist.map((d) => (
              <span key={d.college} style={{
                padding: '4px 12px', borderRadius: '999px', fontWeight: 700,
                background: 'var(--bg-light-gray, #f8f9fa)', color: 'var(--primary-blue, #0046C8)',
                border: '1px solid var(--primary-blue, #0046C8)',
              }}>{d.college} {d.count}명</span>
            ))}
          </div>

          {/* 전체 명단 */}
          <h3 style={{ margin: '8px 0 10px' }}>전체 명단 ({ROSTER_COUNT})</h3>
          <div className="admin-table-wrapper">
            <table className="admin-table">
              <thead>
                <tr>
                  <th>No</th><th>대학(원)</th><th>학과(부)</th><th>전공</th>
                  <th>교과구분</th><th>전공구분</th><th>상태</th>
                </tr>
              </thead>
              <tbody>
                {ROSTER.map((s) => (
                  <tr key={s.no}>
                    <td>{s.no}</td>
                    <td>{s.college}</td>
                    <td>{s.department}</td>
                    <td>{s.major || '-'}</td>
                    <td>{s.courseType}</td>
                    <td>{s.majorType || '-'}</td>
                    <td>
                      <span style={{
                        fontSize: '12.5px', fontWeight: 700, padding: '2px 8px', borderRadius: '999px',
                        background: '#d1fae5', color: '#065f46',
                      }}>{s.status}</span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </>
  );
};

export default AdminRoster;
