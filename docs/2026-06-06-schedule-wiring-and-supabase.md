# 2026-06-06 · 일정 화면 연결 · rest 잔재 정리 · Supabase snu_ 구성

초기 셋업에 이어 일정 데이터 화면 연결(2), rest 잔재 정리(3), Supabase 테이블 구성(4)을 진행했습니다.

## 0. 일정 데이터 확정 (교육방식·강사)
- 온라인(비대면) 7회차 확정: **3·4·5·6·10·11·14**
- 오프라인 고정: **1(OT)·8(중간)·15(기말)**
- 오프라인: **2·7·9·12·13**
- 강사 정정: **5회차 정동엽 → 김현주**
- `snuSchedule.ts`에 `mode`/`instructor` 반영, 헬퍼 추가
  (`ONLINE_SESSION_NOS`, `OFFLINE_FIXED_NOS`, `MODE_LABEL`, `sessionsByInstructor`)

## 2. 일정 데이터 화면 연결
- **`Schedule.tsx`**: `coursePhases`(rest) → `SNU_SESSIONS` 기반으로 재작성.
  회차·일자·요일·시간·주제·세부내용·담당강사·교육방식 표 + 범례(온라인/오프라인 고정).
- **`Instructor.tsx`**: 김현주 추가(3인), `sessionsByInstructor`로 강사별 담당 회차 표시.

## 3. rest 잔재 정리
- **`site.ts` 메뉴**: 선수/정규/코칭(learning) · 평가 3종(assessment) · 경진대회(competition)
  제거 → `일정(/schedule)` 상위 메뉴로 단순화.
- **`Home.tsx`**: AI 리부트 경진대회 콘텐츠 제거, PBL 구조로 재작성
  (기술/인문 트랙 카드, 4단계 진행 흐름, 해커톤 연계 운영 안내).
- 라우트(경로)는 유지 — 메뉴에서만 비노출(직접 접근 시 동작). 추후 페이지 단위 정리 예정.

## 4. Supabase `snu_` 테이블 구성
- **`supabase/snu_tables.sql`**: `rest_tables.sql`을 `snu_` 접두사로 변환 + `snu_schedule` 추가.
- Management API(`.env.local`의 `SUPABASE_ACCESS_TOKEN`)로 공용 프로젝트
  `hcmgdztsgjvzcyxyayaj`에 적용 (HTTP 201).
- 생성 테이블 15종: announcements, assessments, assignments, attendance, materials,
  pledges, project_topics, projects, qna, resources, **schedule**, submissions,
  team_posts, teams, topic_votes.
- `snu_schedule` 시드: 15행 (online 7 / offline-fixed 3 / offline 5) 검증 완료.
- 앱 코드의 테이블 참조는 `${site.dbPrefix}` = `snu_` 로 자동 매핑.

## 검증
- `npm run build` ✅ 통과
- snu_ 테이블/일정 시드 쿼리 검증 ✅

## 다음 단계 (TODO)
- [ ] `Curriculum`/`Classroom`/`About`/`ProjectGuide` 등 잔여 페이지 PBL 콘텐츠로 정리
- [ ] `snu_schedule` 테이블을 화면에서 직접 fetch(현재는 정적 `snuSchedule.ts` 사용)할지 결정
- [ ] 관리자/팀/과제 등 LMS 기능 PBL 운영 흐름에 맞춰 점검
- [ ] 배포 파이프라인(`npm run deploy` 또는 GitHub Actions) 확인
