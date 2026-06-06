# 2026-06-06 · 개인별 PBL · 수업강의안 · 메뉴 재정렬 · 히어로 조정

## 1. 개인별 PBL활동 (기본정보 개편 + 회원정보 반영)
- PBL 메뉴명 → **개인별 PBL활동**.
- `PblInfo` 기본정보: 팀명 제거 → **이름·학번·전공·연락처·이메일(읽기전용)**.
- 저장 시 `snu_pbl_submissions`(student_no/major/phone 컬럼 추가) + **`user_profiles`에 반영**
  (`updateProfile` name/phone/student_no/major → `refreshProfile`). user_profiles에 student_no·major 컬럼 추가.
- PblEval: 팀명 대신 학번·전공·연락처 표시.
- 안내문: 자동 평가로 반복해 다듬으며 개인 실력을 향상시키는 활동으로 프레이밍.

## 2. 수업강의안 (Day01~Day15)
- `config/lessonPlans.ts`: 15회차 학습목표·활동·과제(일정표 매핑).
- `pages/Lessons.tsx`: 사이드바 Day01~15 + 상세(일자·교육방식·강사 / 학습목표 / 학습내용 / 활동·실습 / 과제).
- 라우트 `/lessons`→`/lessons/day01`, `/lessons/:day`.

## 3. 상단 메뉴 재정렬·명칭
- 순서: **About · 일정표 · 수업강의안 · 개인별 PBL활동 · 프로젝트 · 학습추천사이트 · 학습관리**
- About 드롭다운에서 일정표 제거(상위 메뉴로), 학습자료→**학습추천사이트**, 수업강의안 신설.

## 4. Home 히어로 조정
- 소개 문구 3줄 줄바꿈(COSS / ESG 캡스톤 / 2트랙·해커톤).
- `.hero-title` 폰트 10% 축소 (54/40/32/25/41/31/23px).

## 검증
- `npm run build` ✅ · DB 컬럼(student_no·major·phone, user_profiles student_no·major) 추가 ✅
