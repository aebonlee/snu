/**
 * 프로젝트 주제(팀구성·투표용) — 서울 7 + 제주 7 (총 14).
 * ESG·환경/사회 문제 해결형. 기술/인문 듀얼 트랙 + 생성형 AI 기반,
 * 공공데이터로 착수 가능하고 3분 피치덱·프로토타입으로 마무리 가능한 주제로 구성.
 * 제주 주제는 제주국제 생태포럼 해커톤 연계를 전제로 합니다.
 */
export type Region = '서울' | '제주';

export interface PresetTopic {
  key: string;
  region: Region;
  title: string;
  description: string;   // 문제 개요
  techTrack: string;     // 기술 트랙 역할
  humanTrack: string;    // 인문 트랙 역할
}

export const PRESET_TOPICS: PresetTopic[] = [
  // ───────── 서울 지역문제 해결 ─────────
  {
    key: 'seoul-1', region: '서울',
    title: '폭염 사각지대 — 무더위쉼터 접근성 지도',
    description: '열섬과 폭염은 심해지는데 무더위쉼터가 정작 취약계층 동선과 어긋나 있는 문제.',
    techTrack: 'S-DoT 기온 데이터와 쉼터 위치·독거노인 분포를 겹쳐 "더운데 쉼터가 먼" 사각지대를 지도화.',
    humanTrack: '폭염 취약계층(독거노인·쪽방촌·야외노동자) 여정 분석과 쉼터 운영 정책 제안.',
  },
  {
    key: 'seoul-2', region: '서울',
    title: '반지하의 여름 — 상습침수·주거 취약 위험 지도',
    description: '반지하 거주와 상습침수구역이 겹치는 주거 안전 문제. 사회적 메시지가 강해 해커톤 서사가 묵직합니다.',
    techTrack: '침수 이력·강우·저지대·반지하 분포 데이터를 결합해 위험 우선순위 대시보드를 구현.',
    humanTrack: '주거 취약가구 이해관계자 정리와 대피·이주 지원 정책 시나리오 구성.',
  },
  {
    key: 'seoul-3', region: '서울',
    title: '모두의 환승 — 교통약자 무장애 이동 경로 서비스',
    description: '지하철 엘리베이터·경사로가 없는 역에서 휠체어·유모차·노인이 막히는 이동권 문제. 웹 풀스택 데모가 깔끔하게 나옵니다.',
    techTrack: '역사별 무장애 시설 데이터로 "환승 가능/불가" 경로 추천 프로토타입 구현.',
    humanTrack: '교통약자 사용자 여정과 이동권 정책 제안.',
  },
  {
    key: 'seoul-4', region: '서울',
    title: '혼자 살아도 안전하게 — 1인가구·고독사 예방 돌봄 설계',
    description: '1인가구 급증과 고독사 위험 문제.',
    techTrack: '자치구별 1인가구·연령·위험지표 데이터를 결합한 모니터링 대시보드 구현.',
    humanTrack: '돌봄 서비스 흐름과 이웃·복지관·통신 데이터 기반 조기경보 시나리오, 행동변화 캠페인 설계.',
  },
  {
    key: 'seoul-5', region: '서울',
    title: '사라지는 골목 — 골목상권 쇠퇴·젠트리피케이션 분석',
    description: '임대료 상승과 생활인구 변화로 골목상권이 밀려나는 문제.',
    techTrack: '상권·생활인구·매출/폐업 데이터를 분석해 위험 상권 시각화.',
    humanTrack: '소상공인·임대인·주민 이해관계자 갈등 정리와 상생 정책 제안.',
  },
  {
    key: 'seoul-6', region: '서울',
    title: '키오스크 앞에서 멈춘 사람들 — 노인 디지털 격차 해소',
    description: '무인주문기·디지털 행정에서 소외되는 고령층 문제. 인문 트랙 비중이 높아 비개발 학생 만족도가 좋습니다.',
    techTrack: '생성형 AI로 "쉬운 말·큰 글씨·음성 안내" 키오스크/안내 챗봇 프로토타입 구현.',
    humanTrack: '고령 사용자 여정과 세대 친화 콘텐츠·교육 프로그램 기획.',
  },
  {
    key: 'seoul-7', region: '서울',
    title: '우리 동네 안전 제보 — 보행위험·어린이보호구역 시민과학 앱',
    description: '파손 도로·불법주정차·어린이보호구역 위험 등 일상 보행 안전 문제. 참여형 데모라 모의 해커톤에서 즉시 시연 가능.',
    techTrack: '시민이 위치·사진을 제보하면 위험 우선순위 지도가 그려지는 크라우드소싱 웹앱 구현.',
    humanTrack: '참여 동기 설계와 보행 약자(어린이·노인) 관점 캠페인.',
  },

  // ───────── 제주 지역문제 해결 (제주국제 생태포럼 해커톤 연계) ─────────
  {
    key: 'jeju-1', region: '제주',
    title: '사라지는 물질(物質) — 해녀 어업영역 지도 & 구술 아카이브',
    description: '고령화·해양온난화로 해녀 수와 채취 가능 해역이 빠르게 줄고 있는 문제. UNESCO 무형유산이라 해커톤 서사가 강력합니다.',
    techTrack: '해녀 연령분포·어촌계별 데이터를 지도/대시보드로 시각화하고 채취 가능 해역 변화 추이 표시.',
    humanTrack: '해녀–어촌계–관광객 이해관계자 분석과 구술 스토리라인(AI로 인터뷰 정리).',
  },
  {
    key: 'jeju-2', region: '제주',
    title: '관광객을 흩뿌리다 — 오버투어리즘 분산 추천 서비스',
    description: '특정 명소 과밀 vs 주민 생활권 충돌 문제. 웹 풀스택 관점에서 가장 데모가 화려하게 나오는 주제입니다.',
    techTrack: '관광 데이터로 혼잡 히트맵을 만들고 시간대·대안 코스 추천 로직을 프로토타입화.',
    humanTrack: '주민–관광객 갈등 구조와 "지속가능 관광" 정책 제안.',
  },
  {
    key: 'jeju-3', region: '제주',
    title: '곶자왈·오름 생태 위협 모니터링',
    description: '난개발·기후변화로 곶자왈과 오름 생태가 훼손되는 문제.',
    techTrack: '토지이용·식생·탐방객 데이터를 분석해 훼손 위험 지역을 지도화.',
    humanTrack: '보전 vs 개발 이해관계자 정리와 보호구역 정책 시나리오 작성.',
  },
  {
    key: 'jeju-4', region: '제주',
    title: '생명수 — 제주 지하수 사용 대시보드',
    description: '지하수가 사실상 유일한 수자원인데 관광·농업 수요로 압박받는 문제.',
    techTrack: '지역별 취수량·강수량 데이터를 결합한 모니터링 대시보드와 간단한 수요 예측 구현.',
    humanTrack: '물 절약 행동변화 캠페인과 정책 제안 설계.',
  },
  {
    key: 'jeju-5', region: '제주',
    title: '카본프리 아일랜드 2030 — 전기차·재생에너지 격차 분석',
    description: 'EV 보급 선두지만 충전 인프라 불균형과 풍력·태양광 출력제한(curtailment) 문제가 큽니다.',
    techTrack: '충전소 분포·재생에너지 발전 데이터로 "사각지대" 지도와 시각화 구현.',
    humanTrack: '정의로운 전환(주민 수용성) 관점의 정책 메시지 구성.',
  },
  {
    key: 'jeju-6', region: '제주',
    title: '우리 바다 지킴이 — 해안 플라스틱 시민과학 앱',
    description: '해류로 밀려오는 해안 쓰레기 문제. 참여형 데모라 모의 해커톤에서 즉시 시연 가능.',
    techTrack: '시민이 위치·사진을 제보하면 정화 우선순위 지도가 그려지는 크라우드소싱 웹앱 프로토타입.',
    humanTrack: '참여 동기 설계와 행동변화 콘텐츠.',
  },
  {
    key: 'jeju-7', region: '제주',
    title: '제주어가 사라지기 전에 — 마을 이야기 AI 아카이브',
    description: '소멸위기 언어인 제주어와 마을 설화·당 문화 보존 문제. 인문 트랙 비중이 가장 높아 비개발 학생 만족도가 높습니다.',
    techTrack: '생성형 AI로 제주어 학습/번역 챗봇 또는 마을 스토리 지도를 구현.',
    humanTrack: '채록·맥락 정리와 세대 전승 콘텐츠 기획.',
  },
];

export const PRESET_KEYS = new Set(PRESET_TOPICS.map((t) => t.key));
export const REGIONS: Region[] = ['서울', '제주'];

/** 지역별 착수 데이터 가이드 (3주차 데이터 탐색 워크숍에서 우선 확보) */
export const REGION_DATA_GUIDE: Record<Region, { name: string; url: string }[]> = {
  서울: [
    { name: '서울 열린데이터광장', url: 'https://data.seoul.go.kr' },
    { name: 'S-DoT 도시데이터(서울 열린데이터광장)', url: 'https://data.seoul.go.kr' },
    { name: '공공데이터포털', url: 'https://www.data.go.kr' },
  ],
  제주: [
    { name: '제주데이터허브', url: 'https://www.jejudatahub.net' },
    { name: '공공데이터포털', url: 'https://www.data.go.kr' },
    { name: '환경부·해양수산부 공공데이터', url: 'https://www.data.go.kr' },
  ],
};

/** 모든 팀 공통 산출물 (3분 피치덱·프로토타입으로 마무리) */
export const STANDARD_DELIVERABLES: string[] = [
  '문제정의서 — “왜 중요한 문제인가” 정리',
  '데이터 분석·시각화 (지도/대시보드 등)',
  '프로토타입 — 웹앱/대시보드/챗봇 등 기술 산출물',
  '3분 피치덱 + 발표 스크립트 (해커톤 제출형)',
];

/** key 로 주제 찾기 */
export const getTopic = (key: string): PresetTopic | undefined =>
  PRESET_TOPICS.find((t) => t.key === key);

/** 지역별 주제 목록 */
export const topicsByRegion = (region: Region): PresetTopic[] =>
  PRESET_TOPICS.filter((t) => t.region === region);
