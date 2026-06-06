// OG 이미지 생성 (1200x630) — sharp로 SVG → PNG
// 실행: node scripts/generate-og.mjs  (sharp 필요)
import sharp from 'sharp';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';

const __dirname = dirname(fileURLToPath(import.meta.url));
const OUT = join(__dirname, '..', 'public', 'og-image.png');

const FONT = "'Noto Sans KR','Apple SD Gothic Neo','AppleGothic','Malgun Gothic',sans-serif";

const chip = (x, y, label) => `
  <g transform="translate(${x},${y})">
    <rect rx="20" ry="20" width="${28 + label.length * 26}" height="44" fill="#ffffff" fill-opacity="0.14"/>
    <text x="${(28 + label.length * 26) / 2}" y="29" font-family="${FONT}" font-size="22" font-weight="600" fill="#dbeafe" text-anchor="middle">${label}</text>
  </g>`;

const svg = `<?xml version="1.0" encoding="UTF-8"?>
<svg width="1200" height="630" viewBox="0 0 1200 630" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="bg" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0" stop-color="#0a1f44"/>
      <stop offset="0.55" stop-color="#0d2b5e"/>
      <stop offset="1" stop-color="#00855a"/>
    </linearGradient>
    <linearGradient id="accent" x1="0" y1="0" x2="1" y2="0">
      <stop offset="0" stop-color="#60a5fa"/>
      <stop offset="1" stop-color="#34d399"/>
    </linearGradient>
  </defs>

  <rect width="1200" height="630" fill="url(#bg)"/>
  <circle cx="1040" cy="120" r="220" fill="#ffffff" fill-opacity="0.05"/>
  <circle cx="150" cy="560" r="180" fill="#ffffff" fill-opacity="0.04"/>

  <!-- 상단 라벨 -->
  <text x="80" y="118" font-family="${FONT}" font-size="26" font-weight="700" letter-spacing="3" fill="#9fc3ff">SNU PBL · DreamIT Biz</text>
  <rect x="80" y="138" width="120" height="6" rx="3" fill="url(#accent)"/>

  <!-- 메인 타이틀 -->
  <text x="80" y="250" font-family="${FONT}" font-size="64" font-weight="800" fill="#ffffff">서울대학교 하계 계절학기</text>
  <text x="80" y="340" font-family="${FONT}" font-size="72" font-weight="900" fill="url(#accent)">PBL · 빅데이터 캡스톤 디자인</text>

  <!-- 서브 카피 -->
  <text x="80" y="410" font-family="${FONT}" font-size="30" font-weight="500" fill="#cbd5e1">ESG·환경 문제를 데이터·생성형 AI로 해결하는</text>
  <text x="80" y="452" font-family="${FONT}" font-size="30" font-weight="500" fill="#cbd5e1">융합형 캡스톤 — 기술·인문 2개 트랙</text>

  <!-- 도메인 칩 -->
  ${chip(80, 500, '탄소중립')}
  ${chip(240, 500, '환경오염')}
  ${chip(400, 500, '안전')}
  ${chip(520, 500, '자원순환')}

  <!-- 하단 도메인 -->
  <text x="80" y="600" font-family="${FONT}" font-size="26" font-weight="700" fill="#9fc3ff">snu.dreamitbiz.com</text>
  <text x="1120" y="600" font-family="${FONT}" font-size="24" font-weight="600" fill="#9fc3ff" text-anchor="end">제주국제 생태포럼 해커톤 연계</text>
</svg>`;

await sharp(Buffer.from(svg)).png().toFile(OUT);
console.log('OG 이미지 생성 완료:', OUT);
