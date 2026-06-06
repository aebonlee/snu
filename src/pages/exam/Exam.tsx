import { useState, useEffect, useCallback, type ReactElement } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import { useToast } from '../../contexts/ToastContext';
import SEOHead from '../../components/SEOHead';
import { examByType, MAX_ATTEMPTS, PASS_SCORE } from '../../config/examData';
import { saveResult, getMyResults } from '../../utils/examStore';

const Exam = (): ReactElement => {
  const { type } = useParams<{ type: string }>();
  const { user, profile } = useAuth() as any;
  const { showToast } = useToast();
  const exam = type ? examByType(type) : undefined;
  const isPractice = exam?.mode === 'practice';

  const [ans, setAns] = useState<Record<number, number>>({});
  const [checked, setChecked] = useState(false);
  const [score, setScore] = useState<number | null>(null);
  const [attempts, setAttempts] = useState(0);
  const [bestScore, setBestScore] = useState<number | null>(null);
  const [saving, setSaving] = useState(false);

  const loadPrev = useCallback(async () => {
    if (!exam || isPractice) return;
    const rows = await getMyResults(user);
    const r = rows.find((x) => x.type === exam.type);
    setAttempts(r?.attempts ?? 0);
    setBestScore(r ? r.score : null);
  }, [user, exam, isPractice]);
  useEffect(() => { loadPrev(); }, [loadPrev]);

  if (!exam) {
    return (
      <>
        <SEOHead title="평가" path="/exam" noindex />
        <section className="page-header"><div className="container"><h2>평가</h2><p>존재하지 않는 평가입니다. <Link to="/exam">평가 목록</Link></p></div></section>
      </>
    );
  }

  const total = exam.mcq.length;
  const results = exam.mcq.map((q, i) => ans[i] === q.answer);
  const reveal = isPractice || checked;        // 정답·해설 공개 여부
  const answeredCount = Object.keys(ans).length;
  const overLimit = !isPractice && attempts >= MAX_ATTEMPTS && !checked;

  const goTo = (i: number) => {
    document.getElementById(`q-${i}`)?.scrollIntoView({ behavior: 'smooth', block: 'center' });
  };

  const compute = () => {
    const correct = results.filter(Boolean).length;
    return { correct, score: Math.round((correct / total) * 100) };
  };

  const submitGraded = async () => {
    if (answeredCount < total && !confirm(`아직 ${total - answeredCount}문항이 미응답입니다. 제출할까요?`)) return;
    const { correct, score: sc } = compute();
    setScore(sc); setChecked(true);
    window.scrollTo({ top: 0, behavior: 'smooth' });
    setSaving(true);
    try {
      const newAttempts = attempts + 1;
      await saveResult(user, {
        type: exam.type, score: sc, correct, total, passed: sc >= PASS_SCORE,
        attempts: newAttempts,
        studentName: profile?.name || profile?.display_name || '',
        answers: { mcq: exam.mcq.map((_, i) => ({ selected: ans[i] ?? null, correct: results[i] })) },
      });
      setAttempts(newAttempts); setBestScore(sc);
      showToast(`제출 완료 — ${sc}점 저장 (응시 ${newAttempts}/${MAX_ATTEMPTS})`, 'success');
    } catch (e: any) {
      showToast('저장 실패: ' + (e?.message || ''), 'error');
    } finally { setSaving(false); }
  };

  const selfCheck = () => {
    const { score: sc } = compute();
    setScore(sc); setChecked(true);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const retry = () => { setChecked(false); setScore(null); setAns({}); window.scrollTo({ top: 0 }); };

  return (
    <>
      <SEOHead title={`평가 · ${exam.title}`} path={`/exam/${exam.type}`} noindex />
      <section className="page-header">
        <div className="container">
          <h2>{exam.icon} {exam.title} <span style={{ fontSize: '15px', color: 'var(--text-secondary)' }}>· {exam.subtitle}</span></h2>
          <p>{exam.desc} · 객관식 {total}문항{!isPractice && ` · 통과 ${PASS_SCORE}점`}</p>
        </div>
      </section>

      <div className="sidebar-layout">
        {/* 왼쪽 번호 네비게이터 */}
        <aside className="sidebar">
          <div className="sidebar-menu">
            <div style={{ fontSize: '13px', fontWeight: 800, marginBottom: '8px' }}>
              문항 {answeredCount}/{total}
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(5, 1fr)', gap: '6px' }}>
              {exam.mcq.map((_, i) => {
                const answered = ans[i] !== undefined;
                let bg = 'var(--bg-light-gray)', col = 'var(--text-secondary)', bd = 'transparent';
                if (reveal && answered) { const ok = results[i]; bg = ok ? '#d1fae5' : '#fee2e2'; col = ok ? '#065f46' : '#991b1b'; }
                else if (answered) { bg = exam.color; col = '#fff'; }
                else if (reveal) { bd = '#fca5a5'; }
                return (
                  <button key={i} onClick={() => goTo(i)} title={`${i + 1}번`} style={{
                    height: '34px', borderRadius: '8px', border: `1px solid ${bd}`, cursor: 'pointer',
                    background: bg, color: col, fontWeight: 800, fontSize: '13px',
                  }}>{i + 1}</button>
                );
              })}
            </div>
            {score !== null && (
              <div style={{ marginTop: '14px', textAlign: 'center', padding: '12px', borderRadius: '10px', background: 'var(--bg-light-gray)' }}>
                <div style={{ fontSize: '12px', color: 'var(--text-secondary)' }}>{isPractice ? '자습 점수' : '내 점수'}</div>
                <div style={{ fontSize: '28px', fontWeight: 900, color: exam.color }}>{score}<span style={{ fontSize: '13px', color: 'var(--text-secondary)' }}>/100</span></div>
              </div>
            )}
            {!isPractice && (
              <div style={{ marginTop: '10px', fontSize: '12px', color: 'var(--text-secondary)', textAlign: 'center' }}>
                응시 {attempts}/{MAX_ATTEMPTS}회{bestScore !== null && ` · 최근 ${bestScore}점`}
              </div>
            )}
          </div>
        </aside>

        {/* 문항 */}
        <div className="sidebar-content" style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          {isPractice && (
            <div style={{ fontSize: '13.5px', color: '#1e40af', background: '#eff6ff', borderRadius: '10px', padding: '12px 16px' }}>
              🩺 <strong>자습용 평가</strong> — 정답·해설이 공개되어 있으며 성적에는 <strong>반영되지 않습니다</strong>. 사후평가 전에 충분히 연습하세요.
            </div>
          )}
          {overLimit && (
            <div style={{ fontSize: '13.5px', color: '#991b1b', background: '#fee2e2', borderRadius: '10px', padding: '12px 16px' }}>
              응시 횟수({MAX_ATTEMPTS}회)를 모두 사용했습니다. 최근 점수: <strong>{bestScore}점</strong>.
            </div>
          )}

          {exam.mcq.map((q, i) => {
            const ok = results[i];
            return (
              <div id={`q-${i}`} key={i} style={{ padding: '16px 18px', border: `1px solid ${reveal && ans[i] !== undefined ? (ok ? '#a7f3d0' : '#fecaca') : 'var(--border-light)'}`, borderRadius: '12px', background: 'var(--bg-white)', scrollMarginTop: '90px' }}>
                <div style={{ fontWeight: 700, marginBottom: '10px' }}>{i + 1}. {q.q}</div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                  {q.options.map((opt, oi) => {
                    const sel = ans[i] === oi;
                    const isAnswer = reveal && oi === q.answer;
                    const disabled = (overLimit) || (!isPractice && checked);
                    return (
                      <label key={oi} style={{
                        display: 'flex', alignItems: 'center', gap: '8px', padding: '8px 12px', borderRadius: '8px',
                        cursor: disabled ? 'default' : 'pointer',
                        background: isAnswer ? '#ecfdf5' : sel ? 'var(--bg-light-gray)' : 'transparent',
                        border: `1px solid ${isAnswer ? '#10B981' : 'transparent'}`,
                      }}>
                        <input type="radio" name={`q-${i}`} checked={sel} disabled={disabled}
                          onChange={() => { setAns({ ...ans, [i]: oi }); if (isPractice) { setChecked(true); } }} />
                        <span style={{ fontSize: '14.5px' }}>{opt}</span>
                        {isAnswer && <span style={{ marginLeft: 'auto', fontSize: '12px', color: '#059669', fontWeight: 700 }}>정답</span>}
                      </label>
                    );
                  })}
                </div>
                {reveal && ans[i] !== undefined && (
                  <div style={{ marginTop: '8px', fontSize: '13px', color: 'var(--text-secondary)' }}>{ok ? '✅ 정답' : '❌ 오답'} · {q.explain}</div>
                )}
                {isPractice && ans[i] === undefined && (
                  <div style={{ marginTop: '8px', fontSize: '12.5px', color: 'var(--text-secondary)' }}>정답: {q.options[q.answer]} · {q.explain}</div>
                )}
              </div>
            );
          })}

          {/* 액션 */}
          <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap', marginTop: '4px' }}>
            {isPractice ? (
              <>
                <button className="btn btn-primary" style={{ padding: '11px 24px' }} onClick={selfCheck}>자습 점수 보기</button>
                <button className="btn btn-secondary" style={{ padding: '11px 18px' }} onClick={retry}>다시 풀기</button>
              </>
            ) : checked ? (
              <>
                {attempts < MAX_ATTEMPTS
                  ? <button className="btn btn-secondary" style={{ padding: '11px 18px' }} onClick={retry}>다시 응시 ({MAX_ATTEMPTS - attempts}회 남음)</button>
                  : <span style={{ fontSize: '13.5px', color: 'var(--text-secondary)', alignSelf: 'center' }}>응시 횟수를 모두 사용했습니다.</span>}
                <Link to="/exam" className="btn btn-primary" style={{ padding: '11px 18px' }}>평가 목록</Link>
              </>
            ) : (
              <button className="btn btn-primary" style={{ padding: '12px 30px', fontSize: '16px' }} disabled={saving || overLimit} onClick={submitGraded}>
                {overLimit ? '응시 횟수 초과' : '제출하고 채점하기'}
              </button>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default Exam;
