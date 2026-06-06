-- ============================================
-- SNU PBL — 초기 LMS 콘텐츠 시드 (멱등)
-- 공지(snu_announcements). 제목 중복 시 재삽입하지 않습니다.
-- ============================================

INSERT INTO snu_announcements (title, content, category, is_pinned, author_name)
SELECT v.title, v.content, v.category, v.is_pinned, v.author_name
FROM (VALUES
  ('[필독] 하계 계절학기 PBL 개강 안내',
   E'서울대학교 하계 계절학기 PBL(빅데이터 캡스톤 디자인)에 오신 것을 환영합니다.\n\n· 1회차(OT): 2026-06-24(수) 10:00~12:50, 오프라인 고정\n· 총 15회차(6/24~7/29), 매 회차 10:00~12:50\n· 교과-비교과-제주국제 생태포럼 해커톤 연계, 기술/인문 2개 트랙 운영\n\n강의 일정은 [강의 일정] 메뉴에서, 운영 구조는 [회사소개]에서 확인하세요.',
   'general', true, '운영팀'),
  ('프로젝트 주제 공개 — 서울 7 · 제주 7',
   E'지역문제 해결형 프로젝트 주제 14개(서울 7, 제주 7)를 공개합니다.\n\n· [프로젝트 안내]에서 주제별 상세(기술/인문 트랙 역할·착수 데이터·산출물)를 확인하세요.\n· [프로젝트 팀구성]에서 트랙(기술/인문)을 선택해 팀을 구성합니다. 7팀 × 4명(기술 2 + 인문 2).',
   'general', true, '운영팀'),
  ('3주차 데이터 탐색 워크숍 준비 안내',
   E'3회차(6/29) 데이터 탐색 워크숍 전, 팀별 착수 데이터를 미리 살펴보세요.\n\n· 서울: 서울 열린데이터광장(data.seoul.go.kr), S-DoT 도시데이터, 공공데이터포털\n· 제주: 제주데이터허브(jejudatahub.net), 공공데이터포털\n\n데이터 확보가 어려운 팀은 생성형/제보형 주제(서울 6·7, 제주 6·7)로 방향을 잡으면 리스크가 줄어듭니다.',
   'general', false, '운영팀')
) AS v(title, content, category, is_pinned, author_name)
WHERE NOT EXISTS (SELECT 1 FROM snu_announcements a WHERE a.title = v.title);
