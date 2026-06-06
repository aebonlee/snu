/**
 * 자료실 사이트 링크 — 비움(rest 링크 제거). PBL 자료로 추후 채웁니다.
 */
export interface SiteLink { name: string; desc: string; url: string; featured?: boolean; accent?: string; badge?: string; }
export interface SiteGroup { id: string; label: string; icon: string; owner: 'mine' | 'external'; sites: SiteLink[]; }
export const SITE_GROUPS: SiteGroup[] = [];
