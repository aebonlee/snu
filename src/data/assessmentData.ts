/**
 * 평가 데이터 — 비움(rest 문항 제거). 서울대 PBL 평가로 추후 채웁니다.
 */
export type AssessmentType = 'prerequisite' | 'diagnostic' | 'summative';
export type AssessmentMode = 'graded' | 'practice';
export interface MCQuestion {
  no: number;
  question: string;
  options: string[];
  answer: number;
  explanation: string;
}
export interface AssessmentSet {
  type: AssessmentType;
  title: string;
  subtitle: string;
  description: string;
  duration: string;
  passingScore: number;
  mode: AssessmentMode;
  mcq: MCQuestion[];
}
const empty = (type: AssessmentType, title: string): AssessmentSet => ({
  type, title, subtitle: '', description: '준비 중입니다.', duration: '-',
  passingScore: 0, mode: 'practice', mcq: [],
});
export const assessmentSets: Record<AssessmentType, AssessmentSet> = {
  prerequisite: empty('prerequisite', '사전평가'),
  diagnostic: empty('diagnostic', '진단평가'),
  summative: empty('summative', '총괄평가'),
};
export const assessmentList: AssessmentSet[] = [
  assessmentSets.prerequisite, assessmentSets.diagnostic, assessmentSets.summative,
];
