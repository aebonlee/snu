# SNU PBL — 서울대학교 하계 계절학기

서울대학교 하계 계절학기 **PBL(Project-Based Learning)** LMS 사이트입니다.
교과 · 비교과 · 제주국제 생태포럼 해커톤을 연계하여, **기술 트랙 / 인문 트랙**으로
지역문제 해결형 프로젝트를 진행합니다.

- 🌐 배포: https://snu.dreamitbiz.com
- 🗓️ 운영: 2026-06-24 ~ 2026-07-29 · 총 15회차 · 매 회차 10:00~12:50
- 🏫 운영: 드림아이티비즈(DreamIT Biz)

## 운영 개요

- 총 15회차 중 **OT(1회차) · 중간(8회차) · 기말(15회차)** 은 오프라인 고정
- 나머지 12회차 중 **최대 7회차** 비대면(온라인) 진행 가능
- 담당 강사: 이애본 · 정동엽 · 김현주

강의 일정 데이터: [`src/config/snuSchedule.ts`](src/config/snuSchedule.ts)

## 기술 스택

- React 19 · Vite 7 · TypeScript
- React Router 7
- Supabase (Auth · DB)
- GitHub Pages 배포 (`npm run deploy`)

## 개발

```bash
npm install
npm run dev       # 로컬 개발 서버 (http://localhost:5174)
npm run build     # 프로덕션 빌드
npm run deploy    # gh-pages 배포
```

환경변수는 `.env.example`을 참고하여 `.env`를 구성하세요.
