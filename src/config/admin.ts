// 이 목록의 이메일만 snu(서울대 PBL) 사이트 관리자 권한(대시보드 등)을 가집니다.
// 다른 DreamIT 사이트는 각자의 ADMIN_EMAILS를 쓰므로 권한은 본 사이트에만 한정됩니다.
export const ADMIN_EMAILS: string[] = [
  'aebon@kakao.com',
  'aebon@kyonggi.ac.kr',
  'radical8566@gmail.com',
];

// 동일인이지만 계정(이메일)을 2개 이상 만든 사람 — 화면에서 한 명으로 묶어 표시.
export interface SamePersonGroup {
  name?: string;
  emails: string[];
}

export const SAME_PERSON_EMAIL_GROUPS: SamePersonGroup[] = [];
