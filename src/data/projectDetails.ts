/**
 * 프로젝트 상세 가이드 — 비움(rest 경진대회 예시 제거). PBL 프로젝트로 추후 채웁니다.
 */
export interface ProjectData {
  id: number;
  title: string;
  subtitle: string;
  color: string;
  icon: string;
  overview: string;
  targetUsers: string[];
  objectives: string[];
  architecture: { description: string; components: { name: string; description: string; tech: string }[]; diagram: string };
  pipeline: { steps: { step: number; title: string; description: string; tools: string }[] };
  solarApi: { description: string; endpoints: { name: string; purpose: string; example: string }[] };
  prompts: { description: string; examples: { title: string; prompt: string; note: string }[] };
  implementation: {
    frontend: { description: string; pages: string[]; stack: string };
    backend: { description: string; apis: string[]; stack: string };
    database: { tables: { name: string; fields: string }[] };
  };
  deployment: { steps: string[]; infra: string };
  expansion: string[];
}
export const PROJECT_DATA: ProjectData[] = [];
