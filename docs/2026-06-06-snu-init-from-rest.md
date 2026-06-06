# 2026-06-06 · SNU PBL 초기 셋업 (rest 베이스)

서울대학교 PBL 하계 계절학기 사이트(`snu.dreamitbiz.com`)를 `rest` 프로젝트를
베이스로 신규 구성했습니다.

## 작업 내용

### 1. 저장소 구성
- `aebonlee/snu` 클론 (기존엔 README + CNAME만 존재)
- `rest` 소스 전체 복사 (`.git` · `node_modules` · `dist` · `.env*` · `CNAME` 제외)
- snu의 git 이력 / 원격 / CNAME(`snu.dreamitbiz.com`) 보존

### 2. 환경변수
- `.env` · `.env.local` · `.env.example` 생성 (koreatech/rest 공용 Supabase 패턴)
- `VITE_SITE_URL=https://snu.dreamitbiz.com`
- Supabase 프로젝트: `hcmgdztsgjvzcyxyayaj` (공용)

### 3. 사이트 식별 정보
- `src/config/site.ts`: id `snu`, name `SNU PBL`, nameKo `서울대학교 PBL`, dbPrefix `snu_`
- `index.html`: title / canonical / OG 메타 → snu 도메인·문구
- `package.json`: name `snu-dreamitbiz`
- `README.md`: snu PBL 개요로 교체

### 4. 강의 일정 데이터 — `src/config/snuSchedule.ts` (신규)
- 총 15회차 (2026-06-24 ~ 2026-07-29), 매 회차 10:00~12:50
- 회차별: 일자 · 요일 · 시간 · 주제 · 세부 topics · 담당강사 · 교육방식
- 담당 강사: 이애본 · 정동엽 · 김현주
- OT(1) · 중간(8) · 기말(15) **오프라인 고정**
- 나머지 12회차 중 **최대 7회차 비대면 가능** (대상 회차 추후 확정 → `mode: 'tbd'`)

## 검증
- `npm install` ✅
- `npm run build` (tsc -b + vite build) ✅ 통과

## 다음 단계 (TODO)
- [ ] rest 잔재 콘텐츠(평가/경진대회/선수과정 등) PBL 맥락으로 정리·삭제
- [ ] `snuSchedule.ts`를 Schedule/Curriculum 페이지에 실제 연결
- [ ] 비대면 7회차 대상 확정 → `mode` 반영
- [ ] Supabase `snu_` 접두사 테이블/RLS 구성
- [ ] GitHub Actions 또는 `npm run deploy` 배포 파이프라인 확인
