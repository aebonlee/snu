import { useState, useEffect, useCallback, type ReactElement } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import { useToast } from '../../contexts/ToastContext';
import SEOHead from '../../components/SEOHead';
import { REGIONS, topicsByRegion, type Region } from '../../data/projectTopics';
import { TRACKS } from '../../utils/projectTeams';
import { PBL_STAGES } from '../../config/pblActivity';
import { getMySubmission, saveInfo } from '../../utils/pblStore';

const input: React.CSSProperties = {
  width: '100%', padding: '11px 13px', fontSize: '15px', boxSizing: 'border-box',
  border: '1px solid var(--border-light)', borderRadius: '8px',
  background: 'var(--bg-white)', color: 'var(--text-primary)',
};
const labelStyle: React.CSSProperties = { fontSize: '13px', fontWeight: 700, color: 'var(--primary-blue)', marginBottom: '6px', display: 'block' };

const PblInfo = (): ReactElement => {
  const { user, profile } = useAuth();
  const { showToast } = useToast();
  const [form, setForm] = useState({ student_name: '', team_name: '', region: '서울' as Region, topic_key: '', track: '기술' });
  const [saving, setSaving] = useState(false);
  const [loaded, setLoaded] = useState(false);

  const load = useCallback(async () => {
    const row = await getMySubmission(user);
    if (row) {
      setForm({
        student_name: row.student_name || profile?.name || profile?.display_name || '',
        team_name: row.team_name || '',
        region: (row.region as Region) || '서울',
        topic_key: row.topic_key || '',
        track: row.track || '기술',
      });
    } else {
      setForm((p) => ({ ...p, student_name: profile?.name || profile?.display_name || '' }));
    }
    setLoaded(true);
  }, [user, profile]);

  useEffect(() => { load(); }, [load]);

  const topics = topicsByRegion(form.region);

  const handleSave = async () => {
    if (!form.student_name.trim()) { showToast('이름을 입력해 주세요.', 'warning'); return; }
    setSaving(true);
    try {
      await saveInfo(user, form);
      showToast('기본정보를 저장했습니다.', 'success');
    } catch (e: any) {
      showToast('저장 실패: ' + (e?.message || ''), 'error');
    } finally { setSaving(false); }
  };

  return (
    <>
      <SEOHead title="PBL 활동 · 기본정보" path="/pbl/info" noindex />
      <section className="page-header">
        <div className="container">
          <h2>PBL 활동 · 기본정보</h2>
          <p>이름·팀·주제·트랙을 입력하고 단계별 활동을 진행합니다. (입력 내용은 저장되어 평가에 반영됩니다)</p>
        </div>
      </section>

      <section className="section">
        <div className="container" style={{ maxWidth: '720px', display: 'flex', flexDirection: 'column', gap: '18px' }}>
          {!loaded ? (
            <div style={{ textAlign: 'center', padding: '40px' }}><div className="loading-spinner" style={{ margin: '0 auto' }} /></div>
          ) : (
            <>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '16px' }}>
                <div>
                  <label style={labelStyle}>이름</label>
                  <input style={input} value={form.student_name} onChange={(e) => setForm({ ...form, student_name: e.target.value })} placeholder="이름" />
                </div>
                <div>
                  <label style={labelStyle}>팀명</label>
                  <input style={input} value={form.team_name} onChange={(e) => setForm({ ...form, team_name: e.target.value })} placeholder="예) 1팀 / 폭염사각지대팀" />
                </div>
                <div>
                  <label style={labelStyle}>지역</label>
                  <select style={input} value={form.region} onChange={(e) => setForm({ ...form, region: e.target.value as Region, topic_key: '' })}>
                    {REGIONS.map((r) => <option key={r} value={r}>{r}</option>)}
                  </select>
                </div>
                <div>
                  <label style={labelStyle}>트랙</label>
                  <select style={input} value={form.track} onChange={(e) => setForm({ ...form, track: e.target.value })}>
                    {TRACKS.map((t) => <option key={t} value={t}>{t} 트랙</option>)}
                  </select>
                </div>
              </div>
              <div>
                <label style={labelStyle}>프로젝트 주제</label>
                <select style={input} value={form.topic_key} onChange={(e) => setForm({ ...form, topic_key: e.target.value })}>
                  <option value="">— 주제 선택 —</option>
                  {topics.map((t) => <option key={t.key} value={t.key}>{t.title}</option>)}
                </select>
              </div>
              <button className="btn btn-primary" style={{ alignSelf: 'flex-start', padding: '11px 26px' }} disabled={saving} onClick={handleSave}>
                {saving ? '저장 중…' : '기본정보 저장'}
              </button>

              {/* 단계 바로가기 */}
              <div style={{ marginTop: '12px' }}>
                <h3 style={{ fontSize: '16px', marginBottom: '10px' }}>PBL 활동 단계</h3>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                  {PBL_STAGES.map((s, i) => (
                    <Link key={s.key} to={`/pbl/${s.key}`} style={{
                      display: 'flex', alignItems: 'center', gap: '10px', padding: '12px 14px',
                      border: '1px solid var(--border-light)', borderRadius: '10px', textDecoration: 'none',
                      color: 'var(--text-primary)', borderLeft: `4px solid ${s.color}`,
                    }}>
                      <span style={{ fontSize: '18px' }}>{s.icon}</span>
                      <span style={{ fontWeight: 700 }}>{i + 1}. {s.label}</span>
                      <span style={{ marginLeft: 'auto', fontSize: '12.5px', color: 'var(--text-secondary)' }}>{s.max}점</span>
                    </Link>
                  ))}
                </div>
              </div>
            </>
          )}
        </div>
      </section>
    </>
  );
};

export default PblInfo;
