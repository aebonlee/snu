# 2026-06-06 · PBL 활동 시스템 (단계별 저장 + 평가)

koreatech 프로젝트 평가(기본정보 입력 + 단계별 메뉴) 구조를 참고해, snu에 **PBL 활동** 메뉴를
신설하고 각 단계의 내용을 **저장**하고 강사가 **평가**할 수 있게 구현.

## 데이터 모델 — `snu_pbl_submissions` (user당 1행)
- 기본정보: student_name, team_name, region, topic_key, track
- `content` jsonb: { [stageKey]: { [fieldId]: 작성내용 } } — 학생 작성(저장)
- `scores` jsonb: { [stageKey]: 점수 } — 강사 평가
- `feedback` jsonb: { [stageKey]: 피드백 } — 강사 피드백
- RLS: 본인 또는 운영자(aebon 3계정) select/update, 본인 insert, 운영자 delete. (멱등 SQL)

## 단계 정의 — `src/config/pblActivity.ts` (루브릭 합계 100점)
1. 문제정의·아이디어 도출 (20) 2. 팀빌딩·구체화 (10) 3. 중간 설계 발표 (15)
4. 컨설팅·멘토링 (10) 5. 기술 기반 구현 (25) 6. 고도화·최종 발표 (20)
- 각 단계: 워크시트 필드(다중 textarea) + 평가 루브릭 기준.

## 유틸 — `src/utils/pblStore.ts`
- getMySubmission / saveInfo / saveStageContent(병합 저장) / saveGrade(강사) / getAllSubmissions.

## 페이지 — `src/pages/pbl/`
- `PblInfo`(/pbl/info): 기본정보 입력 + 단계 바로가기. (로그인)
- `PblStage`(/pbl/:stage): 단계 워크시트 저장 + 내 점수·피드백 표시. (로그인)
- `PblEval`(/pbl/eval): 학생별 작성 내용 확인 + 단계 점수·피드백 입력. (관리자)

## 메뉴·라우트·번역
- site.ts: **PBL 활동** 드롭다운(기본정보·6단계·평가현황) 추가.
- translations: PBL nav 키(ko/en) 추가.
- PublicLayout: /pbl/info·/pbl/eval·/pbl/:stage 라우트(AuthGuard/AdminGuard), /pbl→/pbl/info.

## 검증
- `npm run build` ✅ · snu_pbl_submissions 테이블/RLS 생성 확인 ✅
