/**
 * 회차별 수업 날짜 (서울대 PBL, 총 15회차 6/24~7/29).
 * snuSchedule.ts(SNU_SESSIONS)의 일자와 동일 — 사이드바·"오늘" 표시에 사용됩니다.
 */
export const REGULAR_DATES: string[] = [
  '2026-06-24', // 1회차 (수) OT
  '2026-06-26', // 2회차 (금)
  '2026-06-29', // 3회차 (월)
  '2026-07-01', // 4회차 (수)
  '2026-07-03', // 5회차 (금)
  '2026-07-06', // 6회차 (월)
  '2026-07-08', // 7회차 (수)
  '2026-07-10', // 8회차 (금) 중간
  '2026-07-13', // 9회차 (월)
  '2026-07-15', // 10회차 (수)
  '2026-07-20', // 11회차 (월)
  '2026-07-22', // 12회차 (수)
  '2026-07-24', // 13회차 (금)
  '2026-07-27', // 14회차 (월)
  '2026-07-29', // 15회차 (수) 기말
];

const WD = ['일', '월', '화', '수', '목', '금', '토'];

/** 'YYYY-MM-DD' → 'M/D(요일)' */
export const fmtKDate = (iso: string): string => {
  const [, m, d] = iso.split('-').map(Number);
  const wd = WD[new Date(`${iso}T00:00:00`).getDay()];
  return `${m}/${d}(${wd})`;
};

/** 오늘 날짜를 'YYYY-MM-DD'(로컬)로 */
export const todayISO = (): string => {
  const n = new Date();
  const p = (x: number) => String(x).padStart(2, '0');
  return `${n.getFullYear()}-${p(n.getMonth() + 1)}-${p(n.getDate())}`;
};
