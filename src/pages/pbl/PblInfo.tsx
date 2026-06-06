import { useState, useEffect, useCallback, type ReactElement } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import { useToast } from '../../contexts/ToastContext';
import SEOHead from '../../components/SEOHead';
import { updateProfile } from '../../utils/auth';
import { REGIONS, topicsByRegion, type Region } from '../../data/projectTopics';
import { TRACKS } from '../../utils/projectTeams';
import { PBL_STAGES, PBL_TOTAL, autoTotal, autoStagePoints } from '../../config/pblActivity';
import { getMySubmission, saveInfo, type PblSubmission } from '../../utils/pblStore';

const input: React.CSSProperties = {
  width: '100%', padding: '11px 13px', fontSize: '15px', boxSizing: 'border-box',
  border: '1px solid var(--border-light)', borderRadius: '8px',
  background: 'var(--bg-white)', color: 'var(--text-primary)',
};
const labelStyle: React.CSSProperties = { fontSize: '13px', fontWeight: 700, color: 'var(--primary-blue)', marginBottom: '6px', display: 'block' };

const PblInfo = (): ReactElement => {
  const { user, profile, refreshProfile } = useAuth() as any;
  const { showToast } = useToast();
  const [form, setForm] = useState({
    student_name: '', student_no: '', major: '', phone: '',
    region: '서울' as Region, topic_key: '', track: '기술',
  });
  const [saving, setSaving] = useState(false);
  const [loaded, setLoaded] = useState(false);
  const [sub, setSub] = useState<PblSubmission | null>(null);

  const email = profile?.email || user?.email || '';

  const load = useCallback(async () => {
    const row = await getMySubmission(user);
    setSub(row);
    setForm({
      student_name: row?.student_name || profile?.name || profile?.display_name || '',
      student_no: row?.student_no || profile?.student_no || '',
      major: row?.major || profile?.major || '',
      phone: row?.phone || profile?.phone || '',
      region: (row?.region as Region) || '서울',
      topic_key: row?.topic_key || '',
      track: row?.track || '기술',
    });
    setLoaded(true);
  }, [user, profile]);

  useEffect(() => { load(); }, [load]);

  const topics = topicsByRegion(form.region);

  const handleSave = async () => {
    if (!form.student_name.trim()) { showToast('이름을 입력해 주세요.', 'warning'); return; }
    if (!form.student_no.trim()) { showToast('학번을 입력해 주세요.', 'warning'); return; }
    setSaving(true);
    try {
      // 1) PBL 제출 기본정보 저장
      await saveInfo(user, form);
      // 2) 회원정보(user_profiles)에도 반영
      try {
        await updateProfile(user.id, {
          name: form.student_name,
          display_name: form.student_name,
          phone: form.phone,
          student_no: form.student_no,
          major: form.major,
        });
        if (refreshProfile) await refreshProfile();
      } catch { /* 프로필 반영 실패는 무시(제출은 저장됨) */ }
      showToast('기본정보를 저장하고 회원정보에 반영했습니다.', 'success');
      load();
    } catch (e: any) {
      showToast('저장 실패: ' + (e?.message || ''), 'error');
    } finally { setSaving(false); }
  };

  return (
    <>
      <SEOHead title="개인별 PBL활동 · 기본정보" path="/pbl/info" noindex />
      <section className="page-header">
        <div className="container">
          <h2>개인별 PBL활동 · 기본정보</h2>
          <p>나의 정보를 입력하고 단계별 활동을 진행합니다. 작성 내용은 자동 평가되어 점수로 저장되며, 반복해 다듬을수록 실력이 향상됩니다.</p>
        </div>
      </section>

      <section className="section">
        <div className="container" style={{ maxWidth: '720px', display: 'flex', flexDirection: 'column', gap: '18px' }}>
          {!loaded ? (
            <div style={{ textAlign: 'center', padding: '40px' }}><div className="loading-spinner" style={{ margin: '0 auto' }} /></div>
          ) : (
            <>
              <div style={{ fontSize: '13px', color: 'var(--text-secondary)', background: 'var(--bg-light-gray)', borderRadius: '8px', padding: '10px 14px' }}>
                입력한 이름·학번·전공·연락처는 <strong>회원정보에도 함께 저장</strong>됩니다.
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '16px' }}>
                <div>
                  <label style={labelStyle}>이름 *</label>
                  <input style={input} value={form.student_name} onChange={(e) => setForm({ ...form, student_name: e.target.value })} placeholder="이름" />
                </div>
                <div>
                  <label style={labelStyle}>학번 *</label>
                  <input style={input} value={form.student_no} onChange={(e) => setForm({ ...form, student_no: e.target.value })} placeholder="예) 2026-12345" />
                </div>
                <div>
                  <label style={labelStyle}>전공</label>
                  <input style={input} value={form.major} onChange={(e) => setForm({ ...form, major: e.target.value })} placeholder="예) 컴퓨터공학부 / 인류학과" />
                </div>
                <div>
                  <label style={labelStyle}>연락처</label>
                  <input style={input} value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} placeholder="010-0000-0000" />
                </div>
                <div>
                  <label style={labelStyle}>이메일 (회원 가입 계정)</label>
                  <input style={{ ...input, background: 'var(--bg-light-gray)', color: 'var(--text-secondary)' }} value={email} readOnly />
                </div>
                <div>
                  <label style={labelStyle}>트랙</label>
                  <select style={input} value={form.track} onChange={(e) => setForm({ ...form, track: e.target.value })}>
                    {TRACKS.map((t) => <option key={t} value={t}>{t} 트랙</option>)}
                  </select>
                </div>
              </div>

              {/* 관심 프로젝트 주제 (선택) */}
              <div style={{ display: 'grid', gridTemplateColumns: '160px 1fr', gap: '12px' }}>
                <div>
                  <label style={labelStyle}>관심 지역</label>
                  <select style={input} value={form.region} onChange={(e) => setForm({ ...form, region: e.target.value as Region, topic_key: '' })}>
                    {REGIONS.map((r) => <option key={r} value={r}>{r}</option>)}
                  </select>
                </div>
                <div>
                  <label style={labelStyle}>관심 주제 (선택)</label>
                  <select style={input} value={form.topic_key} onChange={(e) => setForm({ ...form, topic_key: e.target.value })}>
                    <option value="">— 주제 선택 —</option>
                    {topics.map((t) => <option key={t.key} value={t.key}>{t.title}</option>)}
                  </select>
                </div>
              </div>

              <button className="btn btn-primary" style={{ alignSelf: 'flex-start', padding: '11px 26px' }} disabled={saving} onClick={handleSave}>
                {saving ? '저장 중…' : '기본정보 저장 (회원정보 반영)'}
              </button>

              {/* 내 점수 요약 */}
              <div style={{ marginTop: '12px', padding: '18px 20px', borderRadius: '14px', background: 'var(--bg-light-gray)' }}>
                <div style={{ display: 'flex', alignItems: 'baseline', gap: '10px', flexWrap: 'wrap' }}>
                  <span style={{ fontSize: '15px', fontWeight: 800 }}>🤖 내 자동 평가 점수</span>
                  <span style={{ fontSize: '28px', fontWeight: 900, color: 'var(--primary-blue)' }}>
                    {autoTotal(sub?.auto)}<span style={{ fontSize: '15px', color: 'var(--text-secondary)' }}>/{PBL_TOTAL}</span>
                  </span>
                  <span style={{ fontSize: '12.5px', color: 'var(--text-secondary)' }}>각 단계에서 저장하면 합산됩니다. 다듬을수록 점수가 오릅니다.</span>
                </div>
              </div>

              {/* 단계 바로가기 */}
              <div style={{ marginTop: '4px' }}>
                <h3 style={{ fontSize: '16px', marginBottom: '10px' }}>PBL 활동 단계</h3>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                  {PBL_STAGES.map((s, i) => {
                    const a = sub?.auto?.[s.key];
                    const teacher = sub?.scores?.[s.key];
                    return (
                    <Link key={s.key} to={`/pbl/${s.key}`} style={{
                      display: 'flex', alignItems: 'center', gap: '10px', padding: '12px 14px',
                      border: '1px solid var(--border-light)', borderRadius: '10px', textDecoration: 'none',
                      color: 'var(--text-primary)', borderLeft: `4px solid ${s.color}`,
                    }}>
                      <span style={{ fontSize: '18px' }}>{s.icon}</span>
                      <span style={{ fontWeight: 700 }}>{i + 1}. {s.label}</span>
                      <span style={{ marginLeft: 'auto', fontSize: '12.5px', color: 'var(--text-secondary)', display: 'flex', gap: '8px', alignItems: 'center' }}>
                        {typeof a === 'number' && <span style={{ fontWeight: 700, color: s.color }}>자동 {autoStagePoints(a, s.max)}/{s.max}</span>}
                        {typeof teacher === 'number' && <span style={{ fontWeight: 700, color: '#92400e' }}>강사 {teacher}/{s.max}</span>}
                        {typeof a !== 'number' && typeof teacher !== 'number' && <span>{s.max}점</span>}
                      </span>
                    </Link>
                    );
                  })}
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
