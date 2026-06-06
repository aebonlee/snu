/**
 * 프로젝트 팀 구성 명단 — 비움(rest 팀 제거). PBL 팀 확정 시 채웁니다.
 */
export interface RosterTeam {
  no: number;
  topic: string;
  members: string[];
}
export const CONFIRMED_TEAMS: RosterTeam[] = [];
export const teamName = (no: number) => `${no}팀`;
