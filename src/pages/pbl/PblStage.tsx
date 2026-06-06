import { useState, useEffect, useCallback, type ReactElement } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import { useToast } from '../../contexts/ToastContext';
import SEOHead from '../../components/SEOHead';
import { PBL_STAGES, stageByKey } from '../../config/pblActivity';
import { getMySubmission, saveStageContent } from '../../utils/pblStore';

const textarea: React.CSSProperties = {
  width: '100%', minHeight: '120px', padding: '12px 14px', fontSize: '15px', lineHeight: 1.7,
  boxSizing: 'border-box', border: '1px solid var(--border-light)', borderRadius: '10px',
  background: 'var(--bg-white)', color: 'var(--text-primary)', resize: 'vertical', fontFamily: 'inherit',
};

const PblStage = (): ReactElement => {
  const { stage: stageKey } = useParams<{ stage: string }>();
  const navigate = useNavigate();
  const { user } = useAuth();
  const { showToast } = useToast();
  const stage = stageKey ? stageByKey(stageKey) : undefined;

  const [values, setValues] = useState<Record<string, string>>({});
  const [score, setScore] = useState<number | null>(null);
  const [feedback, setFeedback] = useState<string>('');
  const [saving, setSaving] = useState(false);
  const [loaded, setLoaded] = useState(false);

  const load = useCallback(async () => {
    if (!stage) return;
    const row = await getMySubmission(user);
    setValues(row?.content?.[stage.key] || {});
    setScore(typeof row?.scores?.[stage.key] === 'number' ? row!.scores[stage.key] : null);
    setFeedback(row?.feedback?.[stage.key] || '');
    setLoaded(true);
  }, [user, stage]);

  useEffect(() => { setLoaded(false); load(); }, [load]);

  if (!stage) {
    return (
      <>
        <SEOHead title="PBL 활동" path="/pbl" noindex />
        <section className="page-header"><div className="container"><h2>PBL 활동</h2><p>존재하지 않는 단계입니다.</p></div></section>
      </>
    );
  }

  const idx = PBL_STAGES.findIndex((s) => s.key === stage.key);
  const prev = PBL_STAGES[idx - 1];
  const next = PBL_STAGES[idx + 1];

  const handleSave = async () => {
    setSaving(true);
    try {
      await saveStageContent(user, stage.key, values);
      showToast('저장했습니다.', 'success');
    } catch (e: any) {
      showToast('저장 실패: ' + (e?.message || ''), 'error');
    } finally { setSaving(false); }
  };

  return (
    <>
      <SEOHead title={`PBL 활동 · ${stage.label}`} path={`/pbl/${stage.key}`} noindex />
      <section className="page-header">
        <div className="container">
          <h2>{stage.icon} {idx + 1}. {stage.label}</h2>
          <p>{stage.desc}</p>
        </div>
      </section>

      <section className="section">
        <div className="container" style={{ maxWidth: '820px', display: 'flex', flexDirection: 'column', gap: '18px' }}>
          {/* 단계 네비 */}
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
            {PBL_STAGES.map((s, i) => (
              <Link key={s.key} to={`/pbl/${s.key}`} style={{
                fontSize: '12.5px', fontWeight: 700, padding: '5px 12px', borderRadius: '999px', textDecoration: 'none',
                background: s.key === stage.key ? s.color : 'var(--bg-light-gray)',
                color: s.key === stage.key ? '#fff' : 'var(--text-secondary)',
              }}>{i + 1}. {s.label}</Link>
            ))}
          </div>

          {/* 루브릭 */}
          <div style={{ padding: '12px 16px', borderRadius: '10px', background: `${stage.color}12`, fontSize: '13.5px', color: 'var(--text-secondary)' }}>
            <strong style={{ color: stage.color }}>평가 기준 ({stage.max}점)</strong> · {stage.rubric}
          </div>

          {!loaded ? (
            <div style={{ textAlign: 'center', padding: '40px' }}><div className="loading-spinner" style={{ margin: '0 auto' }} /></div>
          ) : (
            <>
              {stage.fields.map((f) => (
                <div key={f.id}>
                  <label style={{ fontSize: '14px', fontWeight: 700, marginBottom: '6px', display: 'block' }}>{f.label}</label>
                  <textarea style={textarea} value={values[f.id] || ''} placeholder={f.placeholder}
                    onChange={(e) => setValues({ ...values, [f.id]: e.target.value })} />
                </div>
              ))}

              {/* 강사 평가 표시(읽기 전용) */}
              {(score !== null || feedback) && (
                <div style={{ padding: '14px 16px', borderRadius: '10px', border: `1px solid ${stage.color}`, background: 'var(--bg-white)' }}>
                  <div style={{ fontSize: '13px', fontWeight: 800, color: stage.color, marginBottom: '4px' }}>
                    강사 평가 {score !== null && <>· {score} / {stage.max}점</>}
                  </div>
                  {feedback && <p style={{ margin: 0, fontSize: '14px', whiteSpace: 'pre-wrap' }}>{feedback}</p>}
                </div>
              )}

              <div style={{ display: 'flex', gap: '8px', alignItems: 'center', flexWrap: 'wrap' }}>
                <button className="btn btn-primary" style={{ padding: '11px 26px' }} disabled={saving} onClick={handleSave}>
                  {saving ? '저장 중…' : '이 단계 저장'}
                </button>
                {prev && <button className="btn btn-secondary" style={{ padding: '11px 18px' }} onClick={() => navigate(`/pbl/${prev.key}`)}>← {prev.label}</button>}
                {next && <button className="btn btn-secondary" style={{ padding: '11px 18px' }} onClick={() => navigate(`/pbl/${next.key}`)}>{next.label} →</button>}
                <Link to="/pbl/info" style={{ marginLeft: 'auto', fontSize: '13.5px', color: 'var(--primary-blue)' }}>기본정보</Link>
              </div>
            </>
          )}
        </div>
      </section>
    </>
  );
};

export default PblStage;
