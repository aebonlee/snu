# 2026-06-06 · 프로젝트 14개 상세페이지 · 메뉴 · Home 미리보기 · LMS 시드 · 배포 자동화

## 1. 프로젝트 14개 상세 페이지 — `ProjectGuide.tsx` 전면 재작성
- 데이터 소스를 rest `projectDetails`(삭제) → **`projectTopics`(서울 7 + 제주 7)**로 전환.
- 사이드바를 지역별(서울/제주)로 그룹화, 라우트 `/project-guide/:key`(예: `seoul-1`, `jeju-3`).
- 상세: 지역 배지·문제 개요 / 🛠️기술·📖인문 트랙 카드 / 팀구성(4명=기술2+인문2) /
  착수 데이터 가이드(지역별 공공데이터 링크) / 표준 산출물 / CTA(팀 만들기·일정).
- `projectTopics.ts`에 `REGION_DATA_GUIDE`·`STANDARD_DELIVERABLES`·`getTopic`·`topicsByRegion` 추가.
- 미사용 파일 삭제: `data/projectDetails.ts`, `components/FlowDiagram.tsx`.

## 2. 프로젝트 메뉴 점검
- 드롭다운 라벨 확인(적절): 프로젝트 아이디어 예시(/project-guide) · 프로젝트 팀구성(/project-vote) ·
  프로젝트 관리(/project-board) · 프로젝트 구현 예시(/projects/apps). 라우트 정상.

## 3. Home — 서울/제주 대표 주제 미리보기 섹션
- 서울 7 / 제주 7 주제 리스트(각 항목 `/project-guide/:key` 링크) + 지역별 전체 보기 버튼.

## 4. LMS 초기 콘텐츠 시드
- `snu_announcements`에 공지 3건 시드(개강 안내·주제 공개·데이터 워크숍 준비). 멱등(제목 중복 방지).
- 재현용 `supabase/snu_seed.sql` 추가.

## 5. 배포 자동화 — GitHub Actions
- `.github/workflows/deploy.yml`: main 푸시(또는 수동 실행) 시 `npm ci`→`npm run build`→
  peaceiris로 **gh-pages 브랜치 배포**(현재 Pages 소스와 동일, build_type 변경 불필요). CNAME 유지.
- VITE_ 값은 클라이언트 공개 값이라 워크플로 env에 직접 지정.

## 검증
- `npm run build` ✅ (각 단계)
- 공지 시드 적용 확인 ✅
