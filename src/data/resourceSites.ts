/**
 * 학습자료 — ESG·환경 데이터 캡스톤 교과목에 맞춘 외부 추천 자료/도구.
 * 분야별 그룹. owner: 'external'(외부 제공) | 'mine'(드림아이티비즈 운영).
 */
export interface SiteLink { name: string; desc: string; url: string; featured?: boolean; accent?: string; badge?: string; }
export interface SiteGroup { id: string; label: string; icon: string; owner: 'mine' | 'external'; sites: SiteLink[]; }

export const SITE_GROUPS: SiteGroup[] = [
  {
    id: 'esg', label: 'ESG·환경 정책/기관', icon: '🌱', owner: 'external',
    sites: [
      { name: '온실가스종합정보센터(GIR)', desc: '국가 온실가스 인벤토리·배출 통계 (탄소중립 핵심 데이터)', url: 'https://www.gir.go.kr', featured: true, accent: '#00855A', badge: '탄소중립' },
      { name: '환경부', desc: '환경 정책·통계·보도자료 (대기·수질·자원순환 등)', url: 'https://me.go.kr' },
      { name: '2050 탄소중립녹색성장위원회', desc: '탄소중립 국가 정책·로드맵·자료실', url: 'https://www.2050cnc.go.kr' },
      { name: '한국환경공단', desc: '자원순환·대기·물환경 사업 및 데이터', url: 'https://www.keco.or.kr' },
      { name: 'RE100 (공식)', desc: '재생에너지 100% 캠페인 국제 이니셔티브', url: 'https://www.there100.org' },
      { name: '한국ESG기준원(KCGS)', desc: 'ESG 평가·기준·연구자료', url: 'https://www.cgs.or.kr' },
    ],
  },
  {
    id: 'opendata', label: '공공데이터·통계', icon: '📊', owner: 'external',
    sites: [
      { name: '공공데이터포털', desc: '국가 공공데이터 통합 포털 (API·파일)', url: 'https://www.data.go.kr', featured: true, accent: '#0046C8', badge: '필수' },
      { name: '서울 열린데이터광장', desc: '서울시 데이터·S-DoT 도시데이터', url: 'https://data.seoul.go.kr', featured: true, accent: '#0046C8', badge: '서울' },
      { name: '제주데이터허브', desc: '제주 지역 공공·관광·환경 데이터', url: 'https://www.jejudatahub.net', featured: true, accent: '#00855A', badge: '제주' },
      { name: '국가통계포털 KOSIS', desc: '인구·경제·사회 국가통계 통합', url: 'https://kosis.kr' },
      { name: '통계지리정보서비스 SGIS', desc: '지도 기반 통계·생활권 분석', url: 'https://sgis.kostat.go.kr' },
      { name: '에어코리아', desc: '실시간 대기질(미세먼지·오존) 데이터', url: 'https://www.airkorea.or.kr' },
      { name: '해양환경정보포털(MEIS)', desc: '해양환경·해양쓰레기 데이터', url: 'https://www.meis.go.kr' },
    ],
  },
  {
    id: 'analysis', label: '데이터 분석·시각화', icon: '📈', owner: 'external',
    sites: [
      { name: 'Google Colab', desc: '브라우저 파이썬 분석 환경 (설치 불필요)', url: 'https://colab.research.google.com', featured: true, accent: '#EA580C', badge: '추천' },
      { name: 'Kaggle', desc: '데이터셋·노트북·분석 예제', url: 'https://www.kaggle.com' },
      { name: 'Datawrapper', desc: '코드 없이 차트·지도 제작', url: 'https://www.datawrapper.de' },
      { name: 'Flourish', desc: '인터랙티브 시각화·스토리텔링', url: 'https://flourish.studio' },
      { name: 'Looker Studio', desc: '무료 대시보드(구글 데이터 스튜디오)', url: 'https://lookerstudio.google.com' },
      { name: 'kepler.gl', desc: '대용량 지도·공간 데이터 시각화', url: 'https://kepler.gl' },
    ],
  },
  {
    id: 'genai', label: '생성형 AI 도구', icon: '🤖', owner: 'external',
    sites: [
      { name: 'ChatGPT', desc: '문제정의·분석·코딩 보조 (OpenAI)', url: 'https://chatgpt.com' },
      { name: 'Claude', desc: '문서·데이터·코드 분석에 강한 LLM (Anthropic)', url: 'https://claude.ai', featured: true, accent: '#6B21A8', badge: '추천' },
      { name: 'Gemini', desc: '구글 생성형 AI (검색·데이터 연계)', url: 'https://gemini.google.com' },
      { name: 'Perplexity', desc: '출처 기반 리서치·자료 조사', url: 'https://www.perplexity.ai' },
      { name: 'Gamma', desc: 'AI 발표자료·피치덱 자동 생성', url: 'https://gamma.app' },
      { name: 'Napkin AI', desc: '텍스트를 다이어그램·시각자료로', url: 'https://www.napkin.ai' },
    ],
  },
  {
    id: 'build', label: '프로토타입·배포', icon: '⚙️', owner: 'external',
    sites: [
      { name: 'Streamlit', desc: '파이썬으로 데이터 앱·대시보드 빠르게', url: 'https://streamlit.io', featured: true, accent: '#9333EA', badge: '프로토타입' },
      { name: 'v0 (Vercel)', desc: '프롬프트로 웹 UI 프로토타입 생성', url: 'https://v0.dev' },
      { name: 'Figma', desc: 'UI/UX 디자인·와이어프레임 협업', url: 'https://www.figma.com' },
      { name: 'GitHub', desc: '코드 저장소·협업·버전관리', url: 'https://github.com' },
      { name: 'Vercel', desc: '웹앱 무료 배포(프론트엔드)', url: 'https://vercel.com' },
    ],
  },
];
