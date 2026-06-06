/**
 * 사이트 설정 파일 — snu.dreamitbiz.com
 * 서울대학교 PBL 하계 계절학기 LMS 사이트
 */

import type { SiteConfig } from '../types';

const site: SiteConfig = {
  id: 'snu',
  name: 'SNU PBL',
  nameKo: '서울대학교 PBL',
  description: '서울대학교 하계 계절학기 PBL — 빅데이터 혁신공유대학(COSS) 데이터 창업 MD. ESG·환경 문제를 데이터·생성형 AI로 해결하는 융합형 캡스톤 디자인 (기술·인문 2트랙, 제주국제 생태포럼 해커톤 연계)',
  url: 'https://snu.dreamitbiz.com',
  dbPrefix: 'snu_',
  parentSite: {
    name: 'DreamIT Biz',
    url: 'https://www.dreamitbiz.com'
  },
  brand: {
    parts: [
      { text: 'SNU ', className: 'brand-dream' },
      { text: 'PBL', className: 'brand-it' }
    ]
  },
  themeColor: '#0046C8',
  company: {
    name: '드림아이티비즈(DreamIT Biz)',
    ceo: '이애본',
    bizNumber: '601-45-20154',
    salesNumber: '제2024-수원팔달-0584호',
    address: '경기도 수원시 팔달구 매산로 45, 419호',
    email: 'aebon@dreamitbiz.com',
    phone: '010-3700-0629',
    kakao: 'aebon',
    businessHours: '평일: 09:00 ~ 18:00',
  },
  features: {
    shop: false,
    community: true,
    search: true,
    auth: true,
    license: false,
  },
  colors: [
    { name: 'blue', color: '#0046C8' },
    { name: 'red', color: '#C8102E' },
    { name: 'green', color: '#00855A' },
    { name: 'purple', color: '#6B21A8' },
    { name: 'orange', color: '#C87200' },
  ],
  menuItems: [
    {
      labelKey: 'site.nav.about',
      path: '/about',
      activePath: '/about',
      dropdown: [
        { path: '/about', labelKey: 'nav.about' },
        { path: '/classroom', labelKey: 'site.nav.classroom' },
        { path: '/curriculum', labelKey: 'site.nav.curriculum' },
        { path: '/instructor', labelKey: 'site.nav.instructor' },
      ]
    },
    { path: '/schedule', labelKey: 'site.nav.schedule' },
    { path: '/lessons', labelKey: 'site.nav.lessons' },
    {
      labelKey: 'site.nav.pbl',
      path: '/pbl/info',
      activePath: '/pbl',
      dropdown: [
        { path: '/pbl/info', labelKey: 'site.nav.pblInfo' },
        { path: '/pbl/problem', labelKey: 'site.nav.pblProblem' },
        { path: '/pbl/teaming', labelKey: 'site.nav.pblTeaming' },
        { path: '/pbl/midreview', labelKey: 'site.nav.pblMidreview' },
        { path: '/pbl/mentoring', labelKey: 'site.nav.pblMentoring' },
        { path: '/pbl/build', labelKey: 'site.nav.pblBuild' },
        { path: '/pbl/final', labelKey: 'site.nav.pblFinal' },
        { path: '/pbl/rubric', labelKey: 'site.nav.pblRubric' },
        { path: '/pbl/eval', labelKey: 'site.nav.pblEval' },
      ]
    },
    {
      labelKey: 'site.nav.project',
      path: '/project-guide',
      activePath: '/project',
      dropdown: [
        { path: '/project-guide', labelKey: 'site.nav.projectIntro' },
        { path: '/project-build', labelKey: 'site.nav.projectBuild' },
        { path: '/project-vote', labelKey: 'site.nav.projectVote' },
        { path: '/project-board', labelKey: 'site.nav.projectBoard' },
        { path: '/projects/apps', labelKey: 'site.nav.projectApps' },
      ]
    },
    { path: '/resources', labelKey: 'site.nav.resources' },
    {
      labelKey: 'site.nav.lms',
      path: '/dashboard',
      activePath: '/dashboard',
      dropdown: [
        { path: '/dashboard', labelKey: 'site.nav.dashboard' },
        { path: '/announcements', labelKey: 'site.nav.announcements' },
        { path: '/materials', labelKey: 'site.nav.materials' },
        { path: '/assignments', labelKey: 'site.nav.assignments' },
        { path: '/qna', labelKey: 'site.nav.qna' },
      ]
    },
  ],
  footerLinks: [
    { path: '/curriculum', labelKey: 'site.nav.curriculum' },
    { path: '/schedule', labelKey: 'site.nav.schedule' },
    { path: '/instructor', labelKey: 'site.nav.instructor' },
    { path: '/resources', labelKey: 'site.nav.resources' },
  ],
  familySites: [
    { name: 'DreamIT Biz (본사이트)', url: 'https://www.dreamitbiz.com' },
    { name: 'AI 프롬프트 엔지니어링', url: 'https://ai-prompt.dreamitbiz.com' },
    { name: 'ChatGPT 학습', url: 'https://chatgpt.dreamitbiz.com' },
    { name: '바이브코딩', url: 'https://vibe.dreamitbiz.com' },
  ]
};

export default site;
