# 2026-06-06 · PBL 활동 자동 평가(프롬프트 평가) + 내용·점수 DB 저장

koreatech의 프롬프트 자동 평가(`evaluateWriting`)를 이식해, 학생이 작성한 내용을 즉시
자동 채점하고 **작성 내용 + 자동 점수를 모두 DB에 저장**하도록 개선.
(koreatech는 점수만 DB·내용은 localStorage라 내용이 보존되지 않던 문제 해결)

## 자동 평가 — `src/utils/promptEval.ts`
- `evaluateWriting(text, keywords)`: 분량(25)+구체성(15)+구조화(20)+핵심요소(40) → 0~100 + 등급/팁.
- `PBL_STAGE_KEYWORDS`: 6단계별 기대 키워드(동의어 `|` 묶음).

## 저장 모델 — `snu_pbl_submissions`에 `auto` jsonb 추가
- `content`(작성) · **`auto`(자동 0~100/단계)** · `scores`(강사) · `feedback`(강사).
- `pblStore.saveStageContent(user, stageKey, fields, autoScore)` — 내용+자동점수 함께 저장.
- `pblActivity`: `autoStagePoints(0~100, max)` 환산, `autoTotal(auto)` = 단계 배점 합산(100점).

## 화면
- **PblStage**: 작성 중 실시간 자동 평가 카드(점수/100·등급·항목별 막대·개선 팁 + 단계 환산점).
  저장 시 내용+자동점수 DB 저장, 저장된 자동점수·강사평가 표시.
- **PblInfo**: ‘내 자동 평가 점수’ 총점(/100) + 단계별 자동/강사 점수 요약.
- **PblEval(강사)**: 학생 작성 내용 + 🤖자동 점수 + 👩‍🏫강사 점수 함께 확인, 강사 점수·피드백 입력.

## 검증
- DB `auto` 컬럼 추가(snu_tables.sql 반영) ✅ · `npm run build` ✅
