/**
 * 학습 노트 데이터 — 비움(rest 콘텐츠 제거). 서울대 PBL 콘텐츠로 추후 채웁니다.
 */
export interface ContentSection {
  subtitle?: string;
  text?: string;
  items?: string[];
  code?: { lang?: string; content: string };
  table?: { headers: string[]; rows: string[][] };
  callout?: { type: 'tip' | 'warn' | 'info'; text: string };
  svg?: string;
}
export interface SubTopic {
  id: string;
  title: string;
  icon?: string;
  summary?: string;
  content: ContentSection[];
}
export interface Topic {
  id: string;
  title: string;
  icon: string;
  description: string;
  content: ContentSection[];
  subSections?: SubTopic[];
}
export const prerequisiteTopics: Topic[] = [];
export const regularTopics: Topic[] = [];
export const coachingTopics: Topic[] = [];
