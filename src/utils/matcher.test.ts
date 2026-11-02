import test from 'node:test';
import assert from 'node:assert/strict';
import { analyzeProfile, evaluateLanguageTier, findBenchmark } from './matcher';
import { PRESET_PROFILES } from '../data/presets';

test('Language tier evaluation assigns correct tier', () => {
  const al = evaluateLanguageTier({ type: 'TOEIC_SPEAKING', level: 'AL (160점)' });
  assert.equal(al.tier, 5);

  const ih = evaluateLanguageTier({ type: 'OPIC', level: 'IH' });
  assert.equal(ih.tier, 4);

  const im2 = evaluateLanguageTier({ type: 'OPIC', level: 'IM2' });
  assert.equal(im2.tier, 3);

  const il = evaluateLanguageTier({ type: 'TOEIC_SPEAKING', level: 'IL (110점)' });
  assert.equal(il.tier, 2);

  const none = evaluateLanguageTier({ type: 'NONE', level: '' });
  assert.equal(none.tier, 1);
});

test('findBenchmark resolves target company accurately', () => {
  const hmcProfile = PRESET_PROFILES[0].profile;
  const benchmark = findBenchmark(hmcProfile);
  assert.equal(benchmark.companyName, '현대자동차');
  assert.equal(benchmark.industry, 'mobility');
});

test('analyzeProfile outputs required markdown structure and valid scores', () => {
  const profile = PRESET_PROFILES[0].profile;
  const result = analyzeProfile(profile);

  // Validate Score boundaries
  assert.ok(result.matchPercentage >= 0 && result.matchPercentage <= 100);
  assert.ok(['상', '중상', '중', '보완 필요'].includes(result.competitiveness));

  // Validate exact markdown format requested by prompt
  assert.match(result.markdownReport, /### 🎯 \[.*\] 직무 매칭 분석 리포트/);
  assert.match(result.markdownReport, /- \*\*종합 직무 일치도:\*\* \d+%/);
  assert.match(result.markdownReport, /- \*\*예상 합격 경쟁력:\*\* (상|중상|중|보완 필요)/);
  assert.match(result.markdownReport, /#### 📊 항목별 상세 분석/);
  assert.match(result.markdownReport, /- \*\*핵심 기술 및 툴 적합도:\*\*/);
  assert.match(result.markdownReport, /- \*\*프로젝트 경험 평가:\*\*/);
  assert.match(result.markdownReport, /- \*\*정량적 스펙 평가:\*\*/);
  assert.match(result.markdownReport, /#### 🔥 합격률을 높이기 위한 맞춤형 피드백/);
  assert.match(result.markdownReport, /1\. \*\*강점 포인트:\*\*/);
  assert.match(result.markdownReport, /2\. \*\*보완이 필요한 부분:\*\*/);
  assert.match(result.markdownReport, /3\. \*\*추천 면접\/자소서 키워드:\*\*/);

  // Validate exactly 3 interview keywords
  assert.equal(result.feedback.interviewKeywords.length, 3);
});

test('analyzeProfile identifies language weakness for IL score', () => {
  const profile = PRESET_PROFILES[0].profile; // has TOEIC_SPEAKING IL
  const result = analyzeProfile(profile);

  const hasLanguageWeakness = result.feedback.weaknesses.some(w => w.includes('어학'));
  assert.ok(hasLanguageWeakness, 'Should detect language weakness for IL score');
});
