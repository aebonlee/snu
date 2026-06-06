import { useState, useEffect, useCallback, type ReactElement } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import { useToast } from '../../contexts/ToastContext';
import SEOHead from '../../components/SEOHead';
import { examByType, gradeShort, PASS_SCORE } from '../../config/examData';
import { saveResult, getMyResults } from '../../utils/examStore';

interface Graded {
  score: number; correct: number; total: number; passed: boolean;
  mcqResults: boolean[]; shortResults: boolean[];
}

const Exam = (): ReactElement => {
  const { type } = useParams<{ type: string }>();
  const { user, profile } = useAuth() as any;
  const { showToast } = useToast();
  const exam = type ? examByType(type) : undefined;

  const [mcqAns, setMcqAns] = useState<Record<number, number>>({});
  const [shortAns, setShortAns] = useState<Record<number, string>>({});
  const [result, setResult] = useState<Graded | null>(null);
  const [prevScore, setPrevScore] = useState<number | null>(null);
  const [saving, setSaving] = useState(false);

  const loadPrev = useCallback(async () => {
    if (!exam) return;
    const rows = await getMyResults(user);
    const r = rows.find((x) => x.type === exam.type);
    setPrevScore(r ? r.score : null);
  }, [user, exam]);
  useEffect(() => { loadPrev(); }, [loadPrev]);

  if (!exam) {
    return (
      <>
        <SEOHead title="평가" path="/exam" noindex />
        <section className="page-header"><div className="container"><h2>평가</h2><p>존재하지 않는 평가입니다. <Link to="/exam">평가 목록</Link></p></div></section>
      </>
    );
  }

  const total = exam.mcq.length + exam.short.length;

  const submit = async () => {
    const mcqResults = exam.mcq.map((q, i) => mcqAns[i] === q.answer);
    const shortResults = exam.short.map((q, i) => gradeShort(q, shortAns[i] || ''));
    const correct = mcqResults.filter(Boolean).length + shortResults.filter(Boolean).length;
    const score = Math.round((correct / total) * 100);
    const passed = score >= PASS_SCORE;
    const graded: Graded = { score, correct, total, passed, mcqResults, shortResults };
    setResult(graded);
    window.scrollTo({ top: 0, behavior: 'smooth' });

    setSaving(true);
    try {
      await saveResult(user, {
        type: exam.type, score, correct, total, passed,
        studentName: profile?.name || profile?.display_name || '',
        answers: {
          mcq: exam.mcq.map((_, i) => ({ selected: mcqAns[i] ?? null, correct: mcqResults[i] })),
          short: exam.short.map((_, i) => ({ text: shortAns[i] || '', correct: shortResults[i] })),
        },
      });
      setPrevScore(score);
      showToast('제출 완료 — 점수가 저장되었습니다.', 'success');
    } catch (e: any) {
      showToast('저장 실패: ' + (e?.message || ''), 'error');
    } finally { setSaving(false); }
  };

  const retake = () => { setResult(null); setMcqAns({}); setShortAns({}); window.scrollTo({ top: 0 }); };

  return (
    <>
      <SEOHead title={`평가 · ${exam.title}`} path={`/exam/${exam.type}`} noindex />
      <section className="page-header">
        <div className="container">
          <h2>{exam.icon} {exam.title} <span style={{ fontSize: '15px', color: 'var(--text-secondary)' }}>· {exam.subtitle}</span></h2>
          <p>{exam.desc} · 객관식 {exam.mcq.length} + 단답형 {exam.short.length} (통과 {PASS_SCORE}점)</p>
        </div>
      </section>

      <section className="section">
        <div className="container" style={{ maxWidth: '780px', display: 'flex', flexDirection: 'column', gap: '20px' }}>
          {/* 결과 카드 */}
          {result && (
            <div style={{ padding: '22px 24px', borderRadius: '16px', border: `2px solid ${result.passed ? '#059669' : '#DC2626'}`, background: 'var(--bg-white)' }}>
              <div style={{ display: 'flex', alignItems: 'baseline', gap: '12px', flexWrap: 'wrap' }}>
                <span style={{ fontSize: '15px', fontWeight: 800 }}>채점 결과</span>
                <span style={{ fontSize: '34px', fontWeight: 900, color: result.passed ? '#059669' : '#DC2626' }}>{result.score}<span style={{ fontSize: '16px', color: 'var(--text-secondary)' }}>/100</span></span>
                <span style={{ fontSize: '13px', fontWeight: 800, color: '#fff', background: result.passed ? '#059669' : '#DC2626', padding: '3px 12px', borderRadius: '999px' }}>
                  {result.correct}/{result.total} 정답 · {result.passed ? '통과' : '미통과'}
                </span>
                {saving && <span style={{ fontSize: '12.5px', color: 'var(--text-secondary)' }}>저장 중…</span>}
              </div>
              <div style={{ marginTop: '12px', display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
                <button className="btn btn-secondary" style={{ padding: '9px 18px' }} onClick={retake}>다시 풀기</button>
                <Link to="/exam" className="btn btn-primary" style={{ padding: '9px 18px' }}>평가 목록</Link>
              </div>
            </div>
          )}

          {!result && prevScore !== null && (
            <div style={{ fontSize: '13.5px', color: 'var(--text-secondary)', background: 'var(--bg-light-gray)', borderRadius: '8px', padding: '10px 14px' }}>
              이전 응시 점수: <strong>{prevScore}점</strong> · 다시 제출하면 점수가 갱신됩니다.
            </div>
          )}

          {/* 객관식 */}
          <h3 style={{ margin: 0, fontSize: '17px' }}>📝 객관식</h3>
          {exam.mcq.map((q, i) => {
            const correct = result?.mcqResults[i];
            return (
              <div key={i} style={{ padding: '16px 18px', border: `1px solid ${result ? (correct ? '#a7f3d0' : '#fecaca') : 'var(--border-light)'}`, borderRadius: '12px', background: 'var(--bg-white)' }}>
                <div style={{ fontWeight: 700, marginBottom: '10px' }}>{i + 1}. {q.q}</div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                  {q.options.map((opt, oi) => {
                    const sel = mcqAns[i] === oi;
                    const isAnswer = result && oi === q.answer;
                    return (
                      <label key={oi} style={{
                        display: 'flex', alignItems: 'center', gap: '8px', padding: '8px 12px', borderRadius: '8px', cursor: result ? 'default' : 'pointer',
                        background: isAnswer ? '#ecfdf5' : sel ? 'var(--bg-light-gray)' : 'transparent',
                        border: `1px solid ${isAnswer ? '#10B981' : 'transparent'}`,
                      }}>
                        <input type="radio" name={`mcq-${i}`} checked={sel} disabled={!!result} onChange={() => setMcqAns({ ...mcqAns, [i]: oi })} />
                        <span style={{ fontSize: '14.5px' }}>{opt}</span>
                        {isAnswer && <span style={{ marginLeft: 'auto', fontSize: '12px', color: '#059669', fontWeight: 700 }}>정답</span>}
                      </label>
                    );
                  })}
                </div>
                {result && <div style={{ marginTop: '8px', fontSize: '13px', color: 'var(--text-secondary)' }}>{correct ? '✅ 정답' : '❌ 오답'} · {q.explain}</div>}
              </div>
            );
          })}

          {/* 단답형 */}
          <h3 style={{ margin: '8px 0 0', fontSize: '17px' }}>✍️ 단답형</h3>
          {exam.short.map((q, i) => {
            const correct = result?.shortResults[i];
            return (
              <div key={i} style={{ padding: '16px 18px', border: `1px solid ${result ? (correct ? '#a7f3d0' : '#fecaca') : 'var(--border-light)'}`, borderRadius: '12px', background: 'var(--bg-white)' }}>
                <div style={{ fontWeight: 700, marginBottom: '10px' }}>{exam.mcq.length + i + 1}. {q.q}</div>
                <input
                  value={shortAns[i] || ''}
                  disabled={!!result}
                  onChange={(e) => setShortAns({ ...shortAns, [i]: e.target.value })}
                  placeholder="답을 입력하세요"
                  style={{ width: '100%', padding: '10px 13px', fontSize: '15px', boxSizing: 'border-box', border: '1px solid var(--border-light)', borderRadius: '8px', background: 'var(--bg-white)', color: 'var(--text-primary)' }}
                />
                {result && (
                  <div style={{ marginTop: '8px', fontSize: '13px', color: 'var(--text-secondary)' }}>
                    {correct ? '✅ 정답' : '❌ 보완 필요'} · 예시 답안: {q.sample}
                  </div>
                )}
              </div>
            );
          })}

          {!result && (
            <button className="btn btn-primary" style={{ alignSelf: 'flex-start', padding: '12px 30px', fontSize: '16px' }} disabled={saving} onClick={submit}>
              제출하고 채점하기
            </button>
          )}
        </div>
      </section>
    </>
  );
};

export default Exam;
