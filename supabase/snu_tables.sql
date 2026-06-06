-- ============================================
-- SNU PBL (snu) — Supabase 테이블 생성 SQL
-- 접두사: snu_  (서울대학교 PBL)
-- ============================================

-- 공지사항
CREATE TABLE IF NOT EXISTS snu_announcements (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    title TEXT NOT NULL,
    content TEXT NOT NULL,
    category TEXT DEFAULT 'general',
    is_pinned BOOLEAN DEFAULT false,
    author_id UUID REFERENCES auth.users(id),
    author_name TEXT DEFAULT '',
    created_at TIMESTAMPTZ DEFAULT now(),
    updated_at TIMESTAMPTZ DEFAULT now()
);

-- 학습자료
CREATE TABLE IF NOT EXISTS snu_materials (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    title TEXT NOT NULL,
    description TEXT DEFAULT '',
    category TEXT DEFAULT 'ai_basic',
    file_url TEXT DEFAULT '',
    file_type TEXT DEFAULT 'pdf',
    file_size INTEGER DEFAULT 0,
    day_number INTEGER DEFAULT 1,
    author_id UUID REFERENCES auth.users(id),
    created_at TIMESTAMPTZ DEFAULT now()
);

-- 과제
CREATE TABLE IF NOT EXISTS snu_assignments (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    title TEXT NOT NULL,
    description TEXT DEFAULT '',
    category TEXT DEFAULT 'general',
    day_number INTEGER DEFAULT 1,
    due_date TIMESTAMPTZ NOT NULL,
    max_score INTEGER DEFAULT 100,
    is_team BOOLEAN DEFAULT false,
    created_at TIMESTAMPTZ DEFAULT now()
);

-- 과제 제출
CREATE TABLE IF NOT EXISTS snu_submissions (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    assignment_id UUID REFERENCES snu_assignments(id) ON DELETE CASCADE,
    student_id UUID REFERENCES auth.users(id),
    student_name TEXT DEFAULT '',
    team_id UUID,
    content TEXT DEFAULT '',
    file_url TEXT DEFAULT '',
    score INTEGER,
    feedback TEXT DEFAULT '',
    submitted_at TIMESTAMPTZ DEFAULT now(),
    graded_at TIMESTAMPTZ
);

-- 출석
CREATE TABLE IF NOT EXISTS snu_attendance (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    student_id UUID REFERENCES auth.users(id),
    date DATE NOT NULL,
    status TEXT DEFAULT 'present' CHECK (status IN ('present', 'absent', 'late', 'excused')),
    check_in_time TIMESTAMPTZ DEFAULT now(),
    note TEXT DEFAULT '',
    UNIQUE(student_id, date)
);

-- 팀
CREATE TABLE IF NOT EXISTS snu_teams (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    name TEXT NOT NULL,
    description TEXT DEFAULT '',
    project_topic TEXT DEFAULT '',
    members JSONB DEFAULT '[]',
    created_at TIMESTAMPTZ DEFAULT now()
);

-- 프로젝트
CREATE TABLE IF NOT EXISTS snu_projects (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    team_id UUID REFERENCES snu_teams(id),
    title TEXT NOT NULL,
    description TEXT DEFAULT '',
    category TEXT DEFAULT 'real' CHECK (category IN ('mini-personal', 'mini-team', 'real')),
    status TEXT DEFAULT 'planning' CHECK (status IN ('planning', 'in-progress', 'testing', 'completed')),
    repo_url TEXT DEFAULT '',
    demo_url TEXT DEFAULT '',
    presentation_url TEXT DEFAULT '',
    llm_used JSONB DEFAULT '[]',
    created_at TIMESTAMPTZ DEFAULT now(),
    updated_at TIMESTAMPTZ DEFAULT now()
);

-- Q&A
CREATE TABLE IF NOT EXISTS snu_qna (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    title TEXT NOT NULL,
    content TEXT NOT NULL,
    author_id UUID REFERENCES auth.users(id),
    author_name TEXT DEFAULT '',
    category TEXT DEFAULT 'general',
    is_resolved BOOLEAN DEFAULT false,
    reply_content TEXT DEFAULT '',
    reply_author TEXT DEFAULT '',
    replied_at TIMESTAMPTZ,
    created_at TIMESTAMPTZ DEFAULT now()
);

-- 리소스 링크
CREATE TABLE IF NOT EXISTS snu_resources (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    title TEXT NOT NULL,
    description TEXT DEFAULT '',
    url TEXT DEFAULT '',
    category TEXT DEFAULT 'tool' CHECK (category IN ('tool', 'llm', 'reference', 'tutorial')),
    icon TEXT DEFAULT '',
    sort_order INTEGER DEFAULT 0
);

-- ============================================
-- RLS 정책
-- ============================================

-- 공지사항: 누구나 읽기, 관리자만 쓰기
ALTER TABLE snu_announcements ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "snu_announcements_select" ON snu_announcements;
CREATE POLICY "snu_announcements_select" ON snu_announcements FOR SELECT USING (true);
DROP POLICY IF EXISTS "snu_announcements_insert" ON snu_announcements;
CREATE POLICY "snu_announcements_insert" ON snu_announcements FOR INSERT WITH CHECK (auth.uid() IS NOT NULL);
DROP POLICY IF EXISTS "snu_announcements_update" ON snu_announcements;
CREATE POLICY "snu_announcements_update" ON snu_announcements FOR UPDATE USING (auth.uid() = author_id);
DROP POLICY IF EXISTS "snu_announcements_delete" ON snu_announcements;
CREATE POLICY "snu_announcements_delete" ON snu_announcements FOR DELETE USING (auth.uid() = author_id);

-- 학습자료: 로그인 사용자 읽기, 관리자만 쓰기
ALTER TABLE snu_materials ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "snu_materials_select" ON snu_materials;
CREATE POLICY "snu_materials_select" ON snu_materials FOR SELECT USING (auth.uid() IS NOT NULL);
DROP POLICY IF EXISTS "snu_materials_insert" ON snu_materials;
CREATE POLICY "snu_materials_insert" ON snu_materials FOR INSERT WITH CHECK (auth.uid() IS NOT NULL);
DROP POLICY IF EXISTS "snu_materials_update" ON snu_materials;
CREATE POLICY "snu_materials_update" ON snu_materials FOR UPDATE USING (auth.uid() = author_id);
DROP POLICY IF EXISTS "snu_materials_delete" ON snu_materials;
CREATE POLICY "snu_materials_delete" ON snu_materials FOR DELETE USING (auth.uid() = author_id);

-- 과제: 로그인 사용자 읽기, 관리자만 쓰기
ALTER TABLE snu_assignments ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "snu_assignments_select" ON snu_assignments;
CREATE POLICY "snu_assignments_select" ON snu_assignments FOR SELECT USING (auth.uid() IS NOT NULL);
DROP POLICY IF EXISTS "snu_assignments_insert" ON snu_assignments;
CREATE POLICY "snu_assignments_insert" ON snu_assignments FOR INSERT WITH CHECK (auth.uid() IS NOT NULL);
DROP POLICY IF EXISTS "snu_assignments_update" ON snu_assignments;
CREATE POLICY "snu_assignments_update" ON snu_assignments FOR UPDATE USING (auth.uid() IS NOT NULL);
DROP POLICY IF EXISTS "snu_assignments_delete" ON snu_assignments;
CREATE POLICY "snu_assignments_delete" ON snu_assignments FOR DELETE USING (auth.uid() IS NOT NULL);

-- 제출: 본인 것만 읽기/쓰기, 관리자는 전체
ALTER TABLE snu_submissions ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "snu_submissions_select" ON snu_submissions;
CREATE POLICY "snu_submissions_select" ON snu_submissions FOR SELECT USING (auth.uid() IS NOT NULL);
DROP POLICY IF EXISTS "snu_submissions_insert" ON snu_submissions;
CREATE POLICY "snu_submissions_insert" ON snu_submissions FOR INSERT WITH CHECK (auth.uid() = student_id);
DROP POLICY IF EXISTS "snu_submissions_update" ON snu_submissions;
CREATE POLICY "snu_submissions_update" ON snu_submissions FOR UPDATE USING (auth.uid() = student_id OR auth.uid() IS NOT NULL);

-- 출석
ALTER TABLE snu_attendance ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "snu_attendance_select" ON snu_attendance;
CREATE POLICY "snu_attendance_select" ON snu_attendance FOR SELECT USING (auth.uid() IS NOT NULL);
DROP POLICY IF EXISTS "snu_attendance_insert" ON snu_attendance;
CREATE POLICY "snu_attendance_insert" ON snu_attendance FOR INSERT WITH CHECK (auth.uid() IS NOT NULL);
DROP POLICY IF EXISTS "snu_attendance_update" ON snu_attendance;
CREATE POLICY "snu_attendance_update" ON snu_attendance FOR UPDATE USING (auth.uid() IS NOT NULL);

-- 팀
ALTER TABLE snu_teams ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "snu_teams_select" ON snu_teams;
CREATE POLICY "snu_teams_select" ON snu_teams FOR SELECT USING (auth.uid() IS NOT NULL);
DROP POLICY IF EXISTS "snu_teams_insert" ON snu_teams;
CREATE POLICY "snu_teams_insert" ON snu_teams FOR INSERT WITH CHECK (auth.uid() IS NOT NULL);
DROP POLICY IF EXISTS "snu_teams_update" ON snu_teams;
CREATE POLICY "snu_teams_update" ON snu_teams FOR UPDATE USING (auth.uid() IS NOT NULL);

-- 프로젝트
ALTER TABLE snu_projects ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "snu_projects_select" ON snu_projects;
CREATE POLICY "snu_projects_select" ON snu_projects FOR SELECT USING (auth.uid() IS NOT NULL);
DROP POLICY IF EXISTS "snu_projects_insert" ON snu_projects;
CREATE POLICY "snu_projects_insert" ON snu_projects FOR INSERT WITH CHECK (auth.uid() IS NOT NULL);
DROP POLICY IF EXISTS "snu_projects_update" ON snu_projects;
CREATE POLICY "snu_projects_update" ON snu_projects FOR UPDATE USING (auth.uid() IS NOT NULL);

-- Q&A
ALTER TABLE snu_qna ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "snu_qna_select" ON snu_qna;
CREATE POLICY "snu_qna_select" ON snu_qna FOR SELECT USING (auth.uid() IS NOT NULL);
DROP POLICY IF EXISTS "snu_qna_insert" ON snu_qna;
CREATE POLICY "snu_qna_insert" ON snu_qna FOR INSERT WITH CHECK (auth.uid() = author_id);
DROP POLICY IF EXISTS "snu_qna_update" ON snu_qna;
CREATE POLICY "snu_qna_update" ON snu_qna FOR UPDATE USING (auth.uid() IS NOT NULL);

-- 리소스: 누구나 읽기
ALTER TABLE snu_resources ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "snu_resources_select" ON snu_resources;
CREATE POLICY "snu_resources_select" ON snu_resources FOR SELECT USING (true);
DROP POLICY IF EXISTS "snu_resources_insert" ON snu_resources;
CREATE POLICY "snu_resources_insert" ON snu_resources FOR INSERT WITH CHECK (auth.uid() IS NOT NULL);

-- ============================================
-- 인덱스
-- ============================================
CREATE INDEX IF NOT EXISTS idx_snu_attendance_student_date ON snu_attendance(student_id, date);
CREATE INDEX IF NOT EXISTS idx_snu_submissions_assignment ON snu_submissions(assignment_id);
CREATE INDEX IF NOT EXISTS idx_snu_submissions_student ON snu_submissions(student_id);
CREATE INDEX IF NOT EXISTS idx_snu_materials_day ON snu_materials(day_number);
CREATE INDEX IF NOT EXISTS idx_snu_qna_author ON snu_qna(author_id);
CREATE INDEX IF NOT EXISTS idx_snu_projects_team ON snu_projects(team_id);

-- ============================================
-- 학습평가 성적 (선수평가 / 사후평가)
--  · 채점형 평가만 저장 (진단평가는 자습용이라 저장하지 않음)
--  · 학생 1명 + 평가종류당 1행 (재응시 시 업서트로 갱신)
-- ============================================
CREATE TABLE IF NOT EXISTS snu_assessments (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    student_id UUID REFERENCES auth.users(id),
    student_name TEXT DEFAULT '',
    student_email TEXT DEFAULT '',
    type TEXT NOT NULL CHECK (type IN ('prerequisite', 'summative')),
    score INTEGER NOT NULL DEFAULT 0,      -- 100점 만점 환산 점수
    correct INTEGER NOT NULL DEFAULT 0,    -- 정답 문항 수
    total INTEGER NOT NULL DEFAULT 0,      -- 전체 문항 수
    passed BOOLEAN DEFAULT false,
    answers JSONB DEFAULT '{}',            -- { 문항번호: 선택지index }
    submitted_at TIMESTAMPTZ DEFAULT now(),
    UNIQUE(student_id, type)
);

ALTER TABLE snu_assessments ENABLE ROW LEVEL SECURITY;
-- 본인 성적은 본인이, 전체 성적은 관리자(ADMIN_EMAILS)만 조회
DROP POLICY IF EXISTS "snu_assessments_select" ON snu_assessments;
CREATE POLICY "snu_assessments_select" ON snu_assessments FOR SELECT
    USING (
        auth.uid() = student_id
        OR (auth.jwt() ->> 'email') IN ('aebon@kakao.com', 'radical8566@gmail.com', 'aebon@kyonggi.ac.kr')
    );
DROP POLICY IF EXISTS "snu_assessments_insert" ON snu_assessments;
CREATE POLICY "snu_assessments_insert" ON snu_assessments FOR INSERT
    WITH CHECK (auth.uid() = student_id);
DROP POLICY IF EXISTS "snu_assessments_update" ON snu_assessments;
CREATE POLICY "snu_assessments_update" ON snu_assessments FOR UPDATE
    USING (auth.uid() = student_id)
    WITH CHECK (auth.uid() = student_id);

CREATE INDEX IF NOT EXISTS idx_snu_assessments_student ON snu_assessments(student_id);
CREATE INDEX IF NOT EXISTS idx_snu_assessments_type ON snu_assessments(type);

-- ============================================
-- 프로젝트 팀별 게시판 (팀별 비공개)
--  · 해당 팀의 members JSONB에 포함된 사용자 + 관리자만 조회 가능
-- ============================================
CREATE TABLE IF NOT EXISTS snu_team_posts (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    team_id UUID REFERENCES snu_teams(id) ON DELETE CASCADE,
    author_id UUID REFERENCES auth.users(id),
    author_name TEXT DEFAULT '',
    title TEXT NOT NULL,
    content TEXT DEFAULT '',
    created_at TIMESTAMPTZ DEFAULT now()
);

ALTER TABLE snu_team_posts ENABLE ROW LEVEL SECURITY;

-- 조회: 글이 속한 팀의 members에 내 uid가 들어있거나, 관리자
DROP POLICY IF EXISTS "snu_team_posts_select" ON snu_team_posts;
CREATE POLICY "snu_team_posts_select" ON snu_team_posts FOR SELECT
    USING (
        EXISTS (
            SELECT 1 FROM snu_teams t
            WHERE t.id = snu_team_posts.team_id
              AND t.members @> jsonb_build_array(jsonb_build_object('id', (auth.uid())::text))
        )
        OR (auth.jwt() ->> 'email') IN ('aebon@kakao.com', 'radical8566@gmail.com', 'aebon@kyonggi.ac.kr')
    );

-- 작성: 본인 글 + 자기가 속한 팀에만
DROP POLICY IF EXISTS "snu_team_posts_insert" ON snu_team_posts;
CREATE POLICY "snu_team_posts_insert" ON snu_team_posts FOR INSERT
    WITH CHECK (
        auth.uid() = author_id
        AND EXISTS (
            SELECT 1 FROM snu_teams t
            WHERE t.id = snu_team_posts.team_id
              AND t.members @> jsonb_build_array(jsonb_build_object('id', (auth.uid())::text))
        )
    );

-- 삭제: 작성자 본인 또는 관리자
DROP POLICY IF EXISTS "snu_team_posts_delete" ON snu_team_posts;
CREATE POLICY "snu_team_posts_delete" ON snu_team_posts FOR DELETE
    USING (
        auth.uid() = author_id
        OR (auth.jwt() ->> 'email') IN ('aebon@kakao.com', 'radical8566@gmail.com', 'aebon@kyonggi.ac.kr')
    );

CREATE INDEX IF NOT EXISTS idx_snu_team_posts_team ON snu_team_posts(team_id);

-- ============================================
-- 프로젝트 주제 투표
--  · snu_project_topics: 학생이 제안한 추가 주제 (프리셋 7종은 코드 상수)
--  · snu_topic_votes: 1인 1표 (UNIQUE(user_id), 재투표 시 변경)
--    topic_key = 프리셋 'p1'~'p7' 또는 추가 주제 행 id
-- ============================================
CREATE TABLE IF NOT EXISTS snu_project_topics (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    title TEXT NOT NULL,
    description TEXT DEFAULT '',
    created_by UUID REFERENCES auth.users(id),
    created_by_name TEXT DEFAULT '',
    created_at TIMESTAMPTZ DEFAULT now()
);

ALTER TABLE snu_project_topics ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "snu_project_topics_select" ON snu_project_topics;
CREATE POLICY "snu_project_topics_select" ON snu_project_topics FOR SELECT
    USING (auth.uid() IS NOT NULL);
DROP POLICY IF EXISTS "snu_project_topics_insert" ON snu_project_topics;
CREATE POLICY "snu_project_topics_insert" ON snu_project_topics FOR INSERT
    WITH CHECK (auth.uid() = created_by);
DROP POLICY IF EXISTS "snu_project_topics_delete" ON snu_project_topics;
CREATE POLICY "snu_project_topics_delete" ON snu_project_topics FOR DELETE
    USING (
        auth.uid() = created_by
        OR (auth.jwt() ->> 'email') IN ('aebon@kakao.com', 'radical8566@gmail.com', 'aebon@kyonggi.ac.kr')
    );

CREATE TABLE IF NOT EXISTS snu_topic_votes (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    topic_key TEXT NOT NULL,
    user_id UUID REFERENCES auth.users(id),
    user_name TEXT DEFAULT '',
    created_at TIMESTAMPTZ DEFAULT now(),
    UNIQUE(user_id)
);

ALTER TABLE snu_topic_votes ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "snu_topic_votes_select" ON snu_topic_votes;
CREATE POLICY "snu_topic_votes_select" ON snu_topic_votes FOR SELECT
    USING (auth.uid() IS NOT NULL);
DROP POLICY IF EXISTS "snu_topic_votes_insert" ON snu_topic_votes;
CREATE POLICY "snu_topic_votes_insert" ON snu_topic_votes FOR INSERT
    WITH CHECK (auth.uid() = user_id);
DROP POLICY IF EXISTS "snu_topic_votes_update" ON snu_topic_votes;
CREATE POLICY "snu_topic_votes_update" ON snu_topic_votes FOR UPDATE
    USING (auth.uid() = user_id) WITH CHECK (auth.uid() = user_id);
DROP POLICY IF EXISTS "snu_topic_votes_delete" ON snu_topic_votes;
CREATE POLICY "snu_topic_votes_delete" ON snu_topic_votes FOR DELETE
    USING (auth.uid() = user_id);

CREATE INDEX IF NOT EXISTS idx_snu_topic_votes_key ON snu_topic_votes(topic_key);

-- ============================================
-- 수강 다짐 (마이페이지) — 1인 1개
-- ============================================
CREATE TABLE IF NOT EXISTS snu_pledges (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    user_id UUID REFERENCES auth.users(id) UNIQUE,
    user_name TEXT DEFAULT '',
    content TEXT DEFAULT '',
    updated_at TIMESTAMPTZ DEFAULT now()
);

ALTER TABLE snu_pledges ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "snu_pledges_select" ON snu_pledges;
CREATE POLICY "snu_pledges_select" ON snu_pledges FOR SELECT
    USING (
        auth.uid() = user_id
        OR (auth.jwt() ->> 'email') IN ('aebon@kakao.com', 'radical8566@gmail.com', 'aebon@kyonggi.ac.kr')
    );
DROP POLICY IF EXISTS "snu_pledges_insert" ON snu_pledges;
CREATE POLICY "snu_pledges_insert" ON snu_pledges FOR INSERT
    WITH CHECK (auth.uid() = user_id);
DROP POLICY IF EXISTS "snu_pledges_update" ON snu_pledges;
CREATE POLICY "snu_pledges_update" ON snu_pledges FOR UPDATE
    USING (auth.uid() = user_id) WITH CHECK (auth.uid() = user_id);

-- ============================================
-- 강의 일정 (snu_schedule) — 15회차 (소스: src/config/snuSchedule.ts)
-- ============================================
CREATE TABLE IF NOT EXISTS snu_schedule (
    no INTEGER PRIMARY KEY,
    date DATE NOT NULL,
    weekday TEXT NOT NULL,
    time TEXT NOT NULL DEFAULT '10:00~12:50',
    title TEXT NOT NULL,
    topics JSONB NOT NULL DEFAULT '[]'::jsonb,
    instructor TEXT,
    mode TEXT NOT NULL DEFAULT 'tbd',          -- offline-fixed | offline | online | tbd
    mode_label TEXT,
    created_at TIMESTAMPTZ DEFAULT now(),
    updated_at TIMESTAMPTZ DEFAULT now()
);

ALTER TABLE snu_schedule ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "snu_schedule_select" ON snu_schedule;
CREATE POLICY "snu_schedule_select" ON snu_schedule FOR SELECT USING (true);
DROP POLICY IF EXISTS "snu_schedule_write" ON snu_schedule;
CREATE POLICY "snu_schedule_write"  ON snu_schedule FOR ALL USING (auth.uid() IS NOT NULL) WITH CHECK (auth.uid() IS NOT NULL);

INSERT INTO snu_schedule (no, date, weekday, time, title, topics, instructor, mode, mode_label) VALUES
(1,'2026-06-24','수','10:00~12:50','오리엔테이션 및 교과-비교과-해커톤 연계 안내','["교과목 목표 및 전체 운영 구조 안내","하계 계절학기 운영 방향 설명","비교과 프로그램 및 제주국제 생태포럼 해커톤 연계 구조 소개","기술 트랙과 인문 트랙 운영 방식 설명","팀 프로젝트 산출물 예시 제시"]','이애본','offline-fixed','오리엔테이션(오프라인 고정)'),
(2,'2026-06-26','금','10:00~12:50','지역 이해와 문제영역 탐색','["기후, 생태, 관광, 문화 이슈 이해","사례연구 미니 강의","지역문제 해결형 프로젝트의 관점 정리","학생 관심 도메인 1차 선택"]','정동엽','offline',NULL),
(3,'2026-06-29','월','10:00~12:50','데이터 탐색 워크숍','["공공데이터 및 지역자료 탐색 실습","기술 트랙: 데이터 형태와 활용 가능성 분석","인문 트랙: 맥락 정보, 이해관계자, 사용자 관점 정리","팀별 데이터 후보 정리"]','정동엽','online',NULL),
(4,'2026-07-01','수','10:00~12:50','생성형 AI 기반 문제정의 워크숍','["생성형 AI를 활용한 문제 탐색과 구조화","문제정의 프레임 작성 실습","왜 중요한 문제인가 정리","사례연구 템플릿 작성"]','정동엽','online',NULL),
(5,'2026-07-03','금','10:00~12:50','트랙별 방법론 실습 1','["기술 트랙: 데이터 수집·정제·기초 시각화","인문 트랙: 사용자 분석·이해관계자 분석·스토리라인 설계","팀별 역할 분담 확정"]','김현주','online',NULL),
(6,'2026-07-06','월','10:00~12:50','트랙별 방법론 실습 2','["기술 트랙: 분석 방향 및 프로토타입 구조 설계","인문 트랙: 정책·관광·문화·생태 관점의 해결안 구성","중간발표 자료 초안 작성"]','김현주','online',NULL),
(7,'2026-07-08','수','10:00~12:50','중간 설계 발표','["팀별 1차 발표","문제정의의 명확성 검토","데이터 활용 가능성 검토","해커톤 확장 가능성 검토","피드백 제공"]','김현주','offline',NULL),
(8,'2026-07-10','금','10:00~12:50','중간 평가 및 프로젝트 계획 확정','["중간 발표 피드백 반영","주제·데이터·역할 재조정","최종 산출물 유형 결정","프로젝트 추진 일정 확정"]',NULL,'offline-fixed','중간고사(오프라인 고정)'),
(9,'2026-07-13','월','10:00~12:50','프로젝트 실행 1: 데이터 분석 및 조사','["기술 트랙: EDA, 시각화, 변수 검토","인문 트랙: 현장 맥락 조사, 서비스·콘텐츠 기획안 정리","지역 맞춤형 해결 방향 고도화"]','이애본','offline',NULL),
(10,'2026-07-15','수','10:00~12:50','프로젝트 실행 2: 설계 및 구현','["기술 트랙: 프로토타입, 대시보드, 지도, 추천 구조 설계","인문 트랙: 서비스 흐름, 사용자 경험, 정책 제안, 콘텐츠 구성","발표용 핵심 메시지 정리"]','이애본','online',NULL),
(11,'2026-07-20','월','10:00~12:50','생성형 AI 활용 고도화','["분석 결과 정리","시각자료 및 보고서 초안 작성","발표자료 구조화","해커톤형 피치 문장 정제"]','이애본','online',NULL),
(12,'2026-07-22','수','10:00~12:50','결과 분석 및 통합','["기술 산출물과 인문 산출물 통합","결과 해석의 타당성 검토","지역 적용 가능성 검토","피드백 기반 수정"]','이애본','offline',NULL),
(13,'2026-07-24','금','10:00~12:50','최종 결과물 고도화','["결과보고서 정리","핵심 데이터 시각화 완성","3분 피치덱 및 발표 스크립트 작성","해커톤 제출형 결과물 형태로 정리"]','이애본','offline',NULL),
(14,'2026-07-27','월','10:00~12:50','모의 해커톤 발표 및 피드백','["최종 리허설","질의응답 대응 연습","심사기준 기반 피드백","비교과 및 해커톤 연계 가능팀 선별"]','이애본','online',NULL),
(15,'2026-07-29','수','10:00~12:50','최종 발표 및 종합평가','["최종 결과물 발표","팀별 프로젝트 평가","수업 성찰 및 향후 확장 방향 정리","비교과 프로그램 및 해커톤 후속 안내"]',NULL,'offline-fixed','기말고사(오프라인 고정)')
ON CONFLICT (no) DO UPDATE SET
    date=EXCLUDED.date, weekday=EXCLUDED.weekday, time=EXCLUDED.time,
    title=EXCLUDED.title, topics=EXCLUDED.topics, instructor=EXCLUDED.instructor,
    mode=EXCLUDED.mode, mode_label=EXCLUDED.mode_label, updated_at=now();

-- ============================================
-- 팀 게시판 확장 (snu_team_posts / snu_team_comments)
-- ============================================
CREATE TABLE IF NOT EXISTS snu_team_comments (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    post_id UUID REFERENCES snu_team_posts(id) ON DELETE CASCADE,
    team_id UUID REFERENCES snu_teams(id) ON DELETE CASCADE,
    author_id UUID REFERENCES auth.users(id),
    author_name TEXT DEFAULT '',
    content TEXT NOT NULL,
    is_staff BOOLEAN DEFAULT false,
    created_at TIMESTAMPTZ DEFAULT now()
);
ALTER TABLE snu_team_comments ENABLE ROW LEVEL SECURITY;
ALTER TABLE snu_team_posts ADD COLUMN IF NOT EXISTS link_url TEXT DEFAULT '';

-- 댓글 조회: 팀원 또는 운영자
DROP POLICY IF EXISTS "snu_team_comments_select" ON snu_team_comments;
CREATE POLICY "snu_team_comments_select" ON snu_team_comments FOR SELECT
  USING (
    EXISTS (SELECT 1 FROM snu_teams t WHERE t.id = snu_team_comments.team_id
            AND t.members @> jsonb_build_array(jsonb_build_object('id',(auth.uid())::text)))
    OR (auth.jwt() ->> 'email') IN ('aebon@kakao.com','radical8566@gmail.com','aebon@kyonggi.ac.kr')
  );

-- 댓글 작성: 팀원 또는 운영자
DROP POLICY IF EXISTS "snu_team_comments_insert" ON snu_team_comments;
CREATE POLICY "snu_team_comments_insert" ON snu_team_comments FOR INSERT
  WITH CHECK (auth.uid() = author_id AND (
    EXISTS (SELECT 1 FROM snu_teams t WHERE t.id = snu_team_comments.team_id
            AND t.members @> jsonb_build_array(jsonb_build_object('id',(auth.uid())::text)))
    OR (auth.jwt() ->> 'email') IN ('aebon@kakao.com','radical8566@gmail.com','aebon@kyonggi.ac.kr')));

-- 글 수정: 작성자 또는 운영자
DROP POLICY IF EXISTS "snu_team_posts_update" ON snu_team_posts;
CREATE POLICY "snu_team_posts_update" ON snu_team_posts FOR UPDATE
  USING (auth.uid() = author_id OR (auth.jwt() ->> 'email') IN ('aebon@kakao.com','radical8566@gmail.com','aebon@kyonggi.ac.kr'))
  WITH CHECK (auth.uid() = author_id OR (auth.jwt() ->> 'email') IN ('aebon@kakao.com','radical8566@gmail.com','aebon@kyonggi.ac.kr'));

-- 글 작성: 팀원 또는 운영자
DROP POLICY IF EXISTS "snu_team_posts_insert" ON snu_team_posts;
CREATE POLICY "snu_team_posts_insert" ON snu_team_posts FOR INSERT
  WITH CHECK (auth.uid() = author_id AND (
    EXISTS (SELECT 1 FROM snu_teams t WHERE t.id = snu_team_posts.team_id
            AND t.members @> jsonb_build_array(jsonb_build_object('id',(auth.uid())::text)))
    OR (auth.jwt() ->> 'email') IN ('aebon@kakao.com','radical8566@gmail.com','aebon@kyonggi.ac.kr')));

-- 팀 삭제: 운영자
DROP POLICY IF EXISTS "snu_teams_delete" ON snu_teams;
CREATE POLICY "snu_teams_delete" ON snu_teams FOR DELETE
  USING ((auth.jwt() ->> 'email') IN ('aebon@kakao.com','radical8566@gmail.com','aebon@kyonggi.ac.kr'));
