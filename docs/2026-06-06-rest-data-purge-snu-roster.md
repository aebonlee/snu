# 2026-06-06 · rest 데이터 전면 제거 · SNU 명단 · Supabase snu_ 정리 · 운영방향 반영

## 1. rest 데이터 전면 제거 (PII·콘텐츠)
- `data/rosterData.ts` → **SNU 수강생 명단**으로 교체 (아래 2).
- 빈 stub으로 교체(타입 보존, 데이터 제거): `data/learningData.ts`, `data/assessmentData.ts`,
  `data/projectDetails.ts`, `data/projectTopics.ts`, `data/teamProjects.ts`, `data/resourceSites.ts`,
  `config/teamRoster.ts`.
- `config/admin.ts`: rest 스태프 이메일·동일인 묶음(PII) 제거 → 운영자 aebon 3계정만 유지.
- `config/regularSchedule.ts`: REGULAR_DATES를 SNU 15회차 일자로 교체.
- `config/curriculum.ts`: 미사용 → 삭제.
- 소비자 페이지 보정: `AdminRoster`(소속 기반 명단 뷰로 재작성), `ProjectGuide`(빈 데이터 가드).

## 2. SNU 수강생 명단 — `data/rosterData.ts`
- 교과목 `(공유)빅데이터 캡스톤 디자인` / 혁신공유학부 개설 · 수강신청 기준 **26명**.
- 이름/연락처 없는 소속·전공 기반 명단(no/대학/학과/전공/교과구분/전공구분/상태).
- 대학(원) 분포(검증 일치): 인문4·사회4·공과4·경영3·농생대3·자유전공3·생활2·미술1·음악1·혁신공유1 = 26.

## 3. Supabase snu_ 접두사 정리
- 코드의 모든 사이트 전용 테이블 참조는 `${site.dbPrefix}` = `snu_` (rest_ 하드코딩 없음, 주석도 정리).
- 누락 테이블 생성: `snu_team_comments`, 팀게시판 컬럼(`link_url`,`is_staff`)·정책(글/댓글 작성·수정, 팀 삭제).
- `supabase/` 폴더 정리: rest 전용/데이터 SQL 9개 삭제, **`snu_tables.sql` 단일 스키마**로 통합 + `README.md`.
- 운영자 이메일을 aebon 3계정으로 통일(정책 내 rest 스태프 이메일 제거).

## 4. 강사 배정 갱신 (코드+DB)
- 8회차(7/10 중간) · 15회차(7/29 기말) 담당강사 **이애본** 배정.
- 최종: 이애본 1·8·9~15 / 정동엽 2~4 / 김현주 5~7.

## 5. 운영 방향 반영 (콘텐츠)
- Home: PBL **6단계 운영 흐름**(문제정의→팀빌딩→심사·평가→컨설팅·멘토링→구현→고도화·발표),
  **ESG·환경 주제 분야**(탄소중립/환경오염/안전/자원순환) 섹션 추가, ESG 캡스톤·2트랙·해커톤 연계로 히어로 문구 개편.
- site.ts description: 빅데이터 혁신공유대학(COSS) 데이터 창업 MD · ESG 캡스톤으로 갱신.

## 검증
- `npm run build` ✅
- DB: snu_schedule 강사 배정·snu_team_comments 존재·팀게시판 정책 적용 확인 ✅
