/**
 * 평가 결과 저장/조회 — Supabase (snu_assessments, UNIQUE(student_id, type)).
 * 객관식+단답형 자동 채점 결과를 저장. answers jsonb 에 문항별 응답·정오를 보관.
 */
import getSupabase from './supabase';
import site from '../config/site';

export const ASSESS_TABLE = `${site.dbPrefix}assessments`;

type AuthUser = { id: string; email?: string } | null | undefined;

export interface ExamResultRow {
  student_id: string;
  type: string;
  score: number;
  correct: number;
  total: number;
  passed: boolean;
  attempts: number;
  answers: any;
  submitted_at?: string;
}

export interface SaveResultInput {
  type: string;
  score: number;
  correct: number;
  total: number;
  passed: boolean;
  attempts: number;
  answers: any;
  studentName?: string;
}

export async function saveResult(user: AuthUser, input: SaveResultInput): Promise<void> {
  const client = getSupabase();
  if (!client || !user) throw new Error('로그인이 필요합니다.');
  const row = {
    student_id: user.id,
    student_name: input.studentName || '',
    student_email: user.email || '',
    type: input.type,
    score: input.score,
    correct: input.correct,
    total: input.total,
    passed: input.passed,
    attempts: input.attempts,
    answers: input.answers,
    submitted_at: new Date().toISOString(),
  };
  const { error } = await client.from(ASSESS_TABLE).upsert(row, { onConflict: 'student_id,type' });
  if (error) throw error;
}

export async function getMyResults(user: AuthUser): Promise<ExamResultRow[]> {
  const client = getSupabase();
  if (!client || !user) return [];
  const { data } = await client.from(ASSESS_TABLE).select('*').eq('student_id', user.id);
  return (data as ExamResultRow[]) || [];
}
