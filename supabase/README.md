# Supabase 스키마 — SNU PBL

서울대학교 PBL(snu.dreamitbiz.com) 의 Supabase 스키마입니다.

- **접두사**: 모든 사이트 전용 테이블은 `snu_` 접두사를 사용합니다.
  (공용 Supabase 프로젝트 `hcmgdztsgjvzcyxyayaj` 를 다른 DreamIT 사이트와 공유하므로,
  접두사로 충돌을 방지합니다. `user_profiles` 등 인증·공통 테이블만 사이트 공통으로 공유합니다.)
- **단일 스키마 파일**: [`snu_tables.sql`](snu_tables.sql) 하나로 전체 스키마(테이블·RLS·인덱스·
  강의일정 시드·팀게시판 확장)를 재현할 수 있습니다. (rest 마이그레이션은 모두 통합·정리됨)

## 적용 방법

`snu_tables.sql` 은 **멱등(idempotent)** 합니다 — 모든 정책에 `DROP POLICY IF EXISTS` 가
선행하고, 테이블/인덱스는 `IF NOT EXISTS`, 일정 시드는 `ON CONFLICT DO UPDATE` 라서
**이미 적용된 DB에 다시 실행해도 오류 없이 통과**합니다. Supabase Dashboard → SQL Editor 에
전체를 붙여넣고 실행하면 됩니다.

Management API 로 실행할 수도 있습니다:

```bash
TOKEN=<SUPABASE_ACCESS_TOKEN>   # .env.local 참조
REF=hcmgdztsgjvzcyxyayaj
curl -s -X POST "https://api.supabase.com/v1/projects/$REF/database/query" \
  -H "Authorization: Bearer $TOKEN" -H "Content-Type: application/json" \
  --data "$(jq -Rs '{query: .}' supabase/snu_tables.sql)"
```

## 테이블 (snu_ 접두사)

announcements · assessments · assignments · attendance · materials · pledges ·
project_topics · projects · qna · resources · **schedule**(강의일정 15회차 시드) ·
submissions · teams · team_posts · team_comments · topic_votes

운영자(관리자) 이메일: `aebon@kakao.com`, `aebon@kyonggi.ac.kr`, `radical8566@gmail.com`
(`src/config/admin.ts` 와 일치)
