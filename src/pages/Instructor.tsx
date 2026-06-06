import type { ReactElement } from 'react';
import SEOHead from '../components/SEOHead';
import { sessionsByInstructor } from '../config/snuSchedule';

interface InstructorInfo {
  name: string;
  role: string;
  affiliation: string;
  specialties: string[];
  email: string;
  icon: string;
}

const instructors: InstructorInfo[] = [
  {
    name: '이애본',
    role: '총괄 책임교수',
    affiliation: '한신대학교 AI·SW대학 겸임교수 / 드림아이티비즈(DreamIT Biz) 대표',
    specialties: ['PBL 설계', 'AI·SW 교육', '생성형 AI', '바이브코딩', '경영정보학'],
    email: 'aebon@dreamitbiz.com',
    icon: '👩‍🏫',
  },
  {
    name: '정동엽',
    role: '데이터·기술 트랙 강사',
    affiliation: '드림아이티비즈',
    specialties: ['데이터 탐색·분석', '공공데이터', '문제정의 워크숍', 'AI 서비스 개발'],
    email: 'radical8566@gmail.com',
    icon: '👨‍💻',
  },
  {
    name: '김현주',
    role: '방법론·발표 트랙 강사',
    affiliation: '드림아이티비즈',
    specialties: ['트랙별 방법론', '인문·정책 트랙', '중간설계 코칭', '프로젝트 퍼실리테이션'],
    email: 'dreamitbiz@gmail.com',
    icon: '👩‍💻',
  },
];

const Instructor = (): ReactElement => {
  return (
    <>
      <SEOHead title="담당 강사" path="/instructor" />

      <section className="page-header">
        <div className="container">
          <h2>담당 강사</h2>
          <p>기술 트랙 · 인문 트랙을 함께 이끄는 PBL 운영 강사진</p>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <div className="instructor-grid">
            {instructors.map((inst) => {
              const sessions = sessionsByInstructor(inst.name);
              return (
                <div key={inst.name} className="instructor-card">
                  <div className="instructor-icon">{inst.icon}</div>
                  <div className="instructor-info">
                    <h3 className="instructor-name">{inst.name}</h3>
                    <p className="instructor-role">{inst.role}</p>
                    <p className="instructor-affiliation">{inst.affiliation}</p>
                    <div className="instructor-specialties">
                      {inst.specialties.map((s) => (
                        <span key={s} className="specialty-tag">{s}</span>
                      ))}
                    </div>
                    {sessions.length > 0 && (
                      <p className="instructor-affiliation" style={{ marginTop: '0.75rem' }}>
                        담당 회차: {sessions.map((s) => `${s.no}회차`).join(', ')}
                      </p>
                    )}
                    <a href={`mailto:${inst.email}`} className="instructor-email">
                      {inst.email}
                    </a>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>
    </>
  );
};

export default Instructor;
