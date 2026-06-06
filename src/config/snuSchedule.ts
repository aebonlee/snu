/**
 * 서울대학교 PBL 하계 계절학기 강의 일정 (snu.dreamitbiz.com)
 *
 * 총 15회차 (2026-06-24 ~ 2026-07-29), 매 회차 10:00~12:50.
 * 교과 - 비교과 - 제주국제 생태포럼 해커톤 연계, 기술 트랙 / 인문 트랙 운영.
 *
 * 운영 규칙:
 *  - OT(1회차) · 중간(8회차) · 기말(15회차)은 오프라인 고정.
 *  - 나머지 12회차 중 7회차까지 비대면 진행 가능 (대상 회차는 추후 확정).
 */

export type DeliveryMode = 'offline-fixed' | 'offline' | 'online' | 'tbd';

export interface SnuSession {
  /** 회차 번호 (1~15) */
  no: number;
  /** 강의 일자 (YYYY-MM-DD) */
  date: string;
  /** 요일 */
  weekday: string;
  /** 강의 시간 */
  time: string;
  /** 강의 주제 (제목) */
  title: string;
  /** 세부 내용 (불릿) */
  topics: string[];
  /** 담당 강사 (미정이면 null) */
  instructor: string | null;
  /** 교육 방식 */
  mode: DeliveryMode;
  /** 교육 방식 표기 (예: 오리엔테이션 / 중간고사 / 기말고사) */
  modeLabel?: string;
}

export const COURSE_TIME = '10:00~12:50';

export const SNU_SESSIONS: SnuSession[] = [
  {
    no: 1, date: '2026-06-24', weekday: '수', time: COURSE_TIME,
    title: '오리엔테이션 및 교과-비교과-해커톤 연계 안내',
    topics: [
      '교과목 목표 및 전체 운영 구조 안내',
      '하계 계절학기 운영 방향 설명',
      '비교과 프로그램 및 제주국제 생태포럼 해커톤 연계 구조 소개',
      '기술 트랙과 인문 트랙 운영 방식 설명',
      '팀 프로젝트 산출물 예시 제시',
    ],
    instructor: '이애본', mode: 'offline-fixed', modeLabel: '오리엔테이션(오프라인 고정)',
  },
  {
    no: 2, date: '2026-06-26', weekday: '금', time: COURSE_TIME,
    title: '지역 이해와 문제영역 탐색',
    topics: [
      '기후, 생태, 관광, 문화 이슈 이해',
      '사례연구 미니 강의',
      '지역문제 해결형 프로젝트의 관점 정리',
      '학생 관심 도메인 1차 선택',
    ],
    instructor: '정동엽', mode: 'offline',
  },
  {
    no: 3, date: '2026-06-29', weekday: '월', time: COURSE_TIME,
    title: '데이터 탐색 워크숍',
    topics: [
      '공공데이터 및 지역자료 탐색 실습',
      '기술 트랙: 데이터 형태와 활용 가능성 분석',
      '인문 트랙: 맥락 정보, 이해관계자, 사용자 관점 정리',
      '팀별 데이터 후보 정리',
    ],
    instructor: '정동엽', mode: 'online',
  },
  {
    no: 4, date: '2026-07-01', weekday: '수', time: COURSE_TIME,
    title: '생성형 AI 기반 문제정의 워크숍',
    topics: [
      '생성형 AI를 활용한 문제 탐색과 구조화',
      '문제정의 프레임 작성 실습',
      '“왜 중요한 문제인가” 정리',
      '사례연구 템플릿 작성',
    ],
    instructor: '정동엽', mode: 'online',
  },
  {
    no: 5, date: '2026-07-03', weekday: '금', time: COURSE_TIME,
    title: '트랙별 방법론 실습 1',
    topics: [
      '기술 트랙: 데이터 수집·정제·기초 시각화',
      '인문 트랙: 사용자 분석·이해관계자 분석·스토리라인 설계',
      '팀별 역할 분담 확정',
    ],
    instructor: '김현주', mode: 'online',
  },
  {
    no: 6, date: '2026-07-06', weekday: '월', time: COURSE_TIME,
    title: '트랙별 방법론 실습 2',
    topics: [
      '기술 트랙: 분석 방향 및 프로토타입 구조 설계',
      '인문 트랙: 정책·관광·문화·생태 관점의 해결안 구성',
      '중간발표 자료 초안 작성',
    ],
    instructor: '김현주', mode: 'online',
  },
  {
    no: 7, date: '2026-07-08', weekday: '수', time: COURSE_TIME,
    title: '중간 설계 발표',
    topics: [
      '팀별 1차 발표',
      '문제정의의 명확성 검토',
      '데이터 활용 가능성 검토',
      '해커톤 확장 가능성 검토',
      '피드백 제공',
    ],
    instructor: '김현주', mode: 'offline',
  },
  {
    no: 8, date: '2026-07-10', weekday: '금', time: COURSE_TIME,
    title: '중간 평가 및 프로젝트 계획 확정',
    topics: [
      '중간 발표 피드백 반영',
      '주제·데이터·역할 재조정',
      '최종 산출물 유형 결정',
      '프로젝트 추진 일정 확정',
    ],
    instructor: '이애본', mode: 'offline-fixed', modeLabel: '중간고사(오프라인 고정)',
  },
  {
    no: 9, date: '2026-07-13', weekday: '월', time: COURSE_TIME,
    title: '프로젝트 실행 1: 데이터 분석 및 조사',
    topics: [
      '기술 트랙: EDA, 시각화, 변수 검토',
      '인문 트랙: 현장 맥락 조사, 서비스·콘텐츠 기획안 정리',
      '지역 맞춤형 해결 방향 고도화',
    ],
    instructor: '이애본', mode: 'offline',
  },
  {
    no: 10, date: '2026-07-15', weekday: '수', time: COURSE_TIME,
    title: '프로젝트 실행 2: 설계 및 구현',
    topics: [
      '기술 트랙: 프로토타입, 대시보드, 지도, 추천 구조 설계',
      '인문 트랙: 서비스 흐름, 사용자 경험, 정책 제안, 콘텐츠 구성',
      '발표용 핵심 메시지 정리',
    ],
    instructor: '이애본', mode: 'online',
  },
  {
    no: 11, date: '2026-07-20', weekday: '월', time: COURSE_TIME,
    title: '생성형 AI 활용 고도화',
    topics: [
      '분석 결과 정리',
      '시각자료 및 보고서 초안 작성',
      '발표자료 구조화',
      '해커톤형 피치 문장 정제',
    ],
    instructor: '이애본', mode: 'online',
  },
  {
    no: 12, date: '2026-07-22', weekday: '수', time: COURSE_TIME,
    title: '결과 분석 및 통합',
    topics: [
      '기술 산출물과 인문 산출물 통합',
      '결과 해석의 타당성 검토',
      '지역 적용 가능성 검토',
      '피드백 기반 수정',
    ],
    instructor: '이애본', mode: 'offline',
  },
  {
    no: 13, date: '2026-07-24', weekday: '금', time: COURSE_TIME,
    title: '최종 결과물 고도화',
    topics: [
      '결과보고서 정리',
      '핵심 데이터 시각화 완성',
      '3분 피치덱 및 발표 스크립트 작성',
      '해커톤 제출형 결과물 형태로 정리',
    ],
    instructor: '이애본', mode: 'offline',
  },
  {
    no: 14, date: '2026-07-27', weekday: '월', time: COURSE_TIME,
    title: '모의 해커톤 발표 및 피드백',
    topics: [
      '최종 리허설',
      '질의응답 대응 연습',
      '심사기준 기반 피드백',
      '비교과 및 해커톤 연계 가능팀 선별',
    ],
    instructor: '이애본', mode: 'online',
  },
  {
    no: 15, date: '2026-07-29', weekday: '수', time: COURSE_TIME,
    title: '최종 발표 및 종합평가',
    topics: [
      '최종 결과물 발표',
      '팀별 프로젝트 평가',
      '수업 성찰 및 향후 확장 방향 정리',
      '비교과 프로그램 및 해커톤 후속 안내',
    ],
    instructor: '이애본', mode: 'offline-fixed', modeLabel: '기말고사(오프라인 고정)',
  },
];

/** 비대면(온라인) 진행 회차 — 3·4·5·6·10·11·14 (총 7회차) */
export const ONLINE_SESSION_NOS = SNU_SESSIONS
  .filter((s) => s.mode === 'online')
  .map((s) => s.no);

/** 오프라인 고정 회차 — OT(1)·중간(8)·기말(15) */
export const OFFLINE_FIXED_NOS = SNU_SESSIONS
  .filter((s) => s.mode === 'offline-fixed')
  .map((s) => s.no);

/** 교육방식 한글 라벨 */
export const MODE_LABEL: Record<DeliveryMode, string> = {
  'offline-fixed': '오프라인(고정)',
  offline: '오프라인',
  online: '온라인',
  tbd: '미정',
};

/** 담당 강사 목록 */
export const INSTRUCTORS = ['이애본', '정동엽', '김현주'] as const;

/** 강사별 담당 회차 */
export const sessionsByInstructor = (name: string): SnuSession[] =>
  SNU_SESSIONS.filter((s) => s.instructor === name);
