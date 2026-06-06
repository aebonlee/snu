import { useState, useEffect, useCallback, type ReactElement } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import SEOHead from '../../components/SEOHead';
import { EXAMS, MAX_ATTEMPTS } from '../../config/examData';
import { getMyResults, type ExamResultRow } from '../../utils/examStore';

const ExamList = (): ReactElement => {
  const { user } = useAuth();
  const [results, setResults] = useState<ExamResultRow[]>([]);

  const load = useCallback(async () => {
    setResults(await getMyResults(user));
  }, [user]);
  useEffect(() => { load(); }, [load]);

  const resultOf = (type: string) => results.find((r) => r.type === type);

  return (
    <>
      <SEOHead title="평가" path="/exam" noindex />
      <section className="page-header">
        <div className="container">
          <h2>평가</h2>
          <p>사전·진단·사후 평가 — 객관식과 단답형으로 구성되며, 제출하면 자동 채점되어 점수가 저장됩니다.</p>
        </div>
      </section>

      <section className="section">
        <div className="container" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '20px' }}>
          {EXAMS.map((e) => {
            const r = resultOf(e.type);
            return (
              <div key={e.type} style={{
                background: 'var(--bg-white)', border: '1px solid var(--border-light)',
                borderTop: `4px solid ${e.color}`, borderRadius: '14px', padding: '24px',
                display: 'flex', flexDirection: 'column', gap: '10px',
              }}>
                <div style={{ fontSize: '34px' }}>{e.icon}</div>
                <h3 style={{ margin: 0, fontSize: '19px' }}>{e.title} <span style={{ fontSize: '13px', color: 'var(--text-secondary)', fontWeight: 500 }}>· {e.subtitle}</span></h3>
                <p style={{ margin: 0, fontSize: '14px', color: 'var(--text-secondary)', lineHeight: 1.6, flex: 1 }}>{e.desc}</p>
                <div style={{ fontSize: '12.5px', color: 'var(--text-secondary)' }}>
                  객관식 {e.mcq.length}문항 {e.mode === 'practice' ? '· 자습용(성적 미반영)' : `· 채점 · 응시 ${MAX_ATTEMPTS}회`}
                </div>
                {e.mode === 'practice' ? (
                  <Link to={`/exam/${e.type}`} className="btn btn-secondary" style={{ alignSelf: 'flex-start', padding: '10px 20px' }}>
                    자습 시작 →
                  </Link>
                ) : r ? (
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px', flexWrap: 'wrap' }}>
                    <span style={{ fontSize: '13px', fontWeight: 800, padding: '3px 12px', borderRadius: '999px', background: r.passed ? '#d1fae5' : '#fee2e2', color: r.passed ? '#065f46' : '#991b1b' }}>
                      내 점수 {r.score}점 {r.passed ? '· 통과' : ''}
                    </span>
                    <span style={{ fontSize: '12px', color: 'var(--text-secondary)' }}>응시 {r.attempts ?? 0}/{MAX_ATTEMPTS}</span>
                    {(r.attempts ?? 0) < MAX_ATTEMPTS && <Link to={`/exam/${e.type}`} style={{ fontSize: '13.5px', color: e.color, fontWeight: 700 }}>다시 응시 →</Link>}
                  </div>
                ) : (
                  <Link to={`/exam/${e.type}`} className="btn btn-primary" style={{ alignSelf: 'flex-start', padding: '10px 20px', background: e.color, borderColor: e.color }}>
                    응시하기 →
                  </Link>
                )}
              </div>
            );
          })}
        </div>
      </section>
    </>
  );
};

export default ExamList;
