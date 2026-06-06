/**
 * 팀 프로젝트(앱 갤러리) — 비움. PBL 팀 산출물로 추후 채웁니다.
 */
export interface TeamProject {
  id: number;
  team: string;
  title: string;
  tagline: string;
  description: string;
  color: string;
  icon: string;
  url?: string;
  repo?: string;
  members: string[];
  tags?: string[];
}
export const TEAM_PROJECTS: TeamProject[] = [];
export const getTeamProject = (id: number): TeamProject | undefined =>
  TEAM_PROJECTS.find((p) => p.id === id);
