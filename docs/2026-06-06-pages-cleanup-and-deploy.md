# 2026-06-06 · 잔여 페이지 PBL 정리 · gh-pages 배포

## 잔여 페이지 PBL 정리 (TODO 1)
- **`Curriculum.tsx`**: `coursePhases`(rest) → `SNU_SESSIONS` 기반 재작성.
  4단계(문제정의 1~5 / 중간설계 6~8 / 실행 9~13 / 해커톤 14~15) 그룹 + 회차 카드.
- **`Classroom.tsx`**: rest의 가짜 Zoom/오프라인 장소 제거 → snuSchedule 기반
  온라인/오프라인 회차 배지 안내(접속 링크·장소는 회차별 공지로 안내).
- **`About.tsx`**: `AI Reboot Academy` 브랜딩·경진대회 문구 → `서울대학교 PBL`/해커톤 연계로 치환.
- **`ProjectGuide.tsx`**: 도입부를 PBL 참고 가이드로 정리(본문 예시 데이터는 참고용 유지, 전면 교체는 추후).

## gh-pages 배포
- `public/CNAME` 추가(`snu.dreamitbiz.com`) → 빌드 산출물(dist)에 CNAME 포함되도록.
- `npm run build` 후 `npx gh-pages -d dist` 로 **gh-pages 브랜치 배포(Published)**.
- GitHub Pages 설정 확인(API):
  - source: `gh-pages` / `/`, cname: `snu.dreamitbiz.com`, status: `built`, build_type: `legacy`(branch 배포 정상)
- 사이트: http://snu.dreamitbiz.com/ (HTTPS 인증서 발급은 시간차 발생 가능)

## 검증
- `npm run build` ✅
- gh-pages Published ✅, Pages source/cname 확인 ✅

## 남은 작업
- [ ] HTTPS 강제(https_enforced) — 인증서 발급 후 활성화
- [ ] ProjectGuide 본문을 PBL 프로젝트 가이드로 전면 교체(현재 rest 예시 데이터)
- [ ] 관리자/팀/과제 LMS 기능 PBL 운영 흐름 점검
- [ ] 배포 자동화(GitHub Actions) 도입 여부 결정 (현재 수동 `npm run deploy`)
