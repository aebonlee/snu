/**
 * 프로젝트 사전 주제(투표용) — 비움. PBL 주제로 추후 채웁니다.
 */
export interface PresetTopic {
  key: string;
  title: string;
  description: string;
}
export const PRESET_TOPICS: PresetTopic[] = [];
export const PRESET_KEYS = new Set(PRESET_TOPICS.map((t) => t.key));
