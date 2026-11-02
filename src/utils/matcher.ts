import { CandidateProfile, CompanyBenchmark, DetailedAnalysis, CompetitivenessLevel } from '../types';
import { COMPANY_BENCHMARKS } from '../data/benchmarks';

/**
 * Finds the closest company benchmark or creates a synthesized one
 */
export function findBenchmark(profile: CandidateProfile): CompanyBenchmark {
  const matched = COMPANY_BENCHMARKS.find(b => 
    b.companyName.toLowerCase().includes(profile.targetCompany.toLowerCase()) ||
    profile.targetCompany.toLowerCase().includes(b.companyName.toLowerCase())
  );
  if (matched) return matched;

  // Synthesize a general mobility or smart factory benchmark
  const isMobility = profile.targetIndustry === 'mobility' || 
    /자율주행|모빌리티|전기차|로봇|항공|비행|드론|우주/i.test(profile.targetRole + profile.targetDepartment);

  return {
    id: 'custom-benchmark',
    companyName: profile.targetCompany || '목표 기업',
    department: profile.targetDepartment || '핵심 R&D/엔지니어링팀',
    roleTitle: profile.targetRole || (isMobility ? '모빌리티 시스템 엔지니어' : '스마트팩토리 제어/설비 엔지니어'),
    industry: isMobility ? 'mobility' : 'smartfactory',
    avgGpa: 3.65,
    minRecommendedGpa: 3.3,
    recommendedLanguages: ['OPIc IM2 / 토익스피킹 IM 이상', '토익 750 이상'],
    requiredSkills: isMobility ? ['C++', 'Python', 'MATLAB/Simulink'] : ['PLC', 'Python', 'CAD/CATIA'],
    preferredSkills: isMobility ? ['ROS', 'Linux', 'CAN 통신'] : ['공정 데이터 분석', 'SQL', 'AutoCAD'],
    preferredMajors: isMobility ? ['기계공학', '항공우주공학', '전자공학'] : ['기계공학', '산업공학', '전자공학'],
    samplePassedProjects: ['핵심 제어 알고리즘 구현', '실무 지향 공정/시스템 자동화 프로젝트'],
    coreCompetencies: ['실무 툴 활용성', '문제 해결 역량', '데이터 기반 공정/제어 이해'],
    interviewKeywords: ['직무 전문성', '실무 트러블슈팅', '공정/시스템 최적화'],
    hiringTrend: '직무 연관 프로젝트와 실무 툴(Tool) 활용 경험 중심 수시 채용'
  };
}

/**
 * Normalizes language scores to a 1-5 tier
 * 5: AL/IH (토스 160+ / OPIc AL,IH / 토익 900+)
 * 4: IM3/IH (토스 140-150 / OPIc IM3 / 토익 850+)
 * 3: IM2 (토스 130 / OPIc IM2 / 토익 750-840)
 * 2: IM1/IL (토스 110-120 / OPIc IM1,IL / 토익 650-740)
 * 1: Low / None
 */
export function evaluateLanguageTier(lang: CandidateProfile['languageScore']): { tier: number; label: string } {
  const level = (lang.level || '').toUpperCase();
  if (lang.type === 'NONE' || !level) {
    return { tier: 1, label: '어학 성적 없음/미취득' };
  }

  if (level.includes('AL') || level.includes('AH') || level.includes('ADVANCED') || level.includes('900') || level.includes('950')) {
    return { tier: 5, label: '최상위권 (AL / 900점 이상)' };
  }
  if (level.includes('IH') || level.includes('150') || level.includes('160') || level.includes('850')) {
    return { tier: 4, label: '우수권 (IH / 140-160점)' };
  }
  if (level.includes('IM3') || level.includes('IM2') || level.includes('IM') || level.includes('130') || level.includes('800') || level.includes('750')) {
    return { tier: 3, label: '기준 충족 (IM2~IM3 / 130점)' };
  }
  if (level.includes('IL') || level.includes('IM1') || level.includes('110') || level.includes('120') || level.includes('700')) {
    return { tier: 2, label: '최소 지원선 (IL~IM1 / 110점)' };
  }

  return { tier: 2, label: '기본 등급' };
}

/**
 * Calculates quantitative score (0-100)
 */
export function calculateQuantitativeScore(profile: CandidateProfile, benchmark: CompanyBenchmark) {
  // GPA normalized to 4.5 scale
  const normalizedGpa = (profile.gpa / profile.maxGpa) * 4.5;
  const gpaDiff = normalizedGpa - benchmark.avgGpa;
  let gpaScore = 75; // base
  if (gpaDiff >= 0.2) gpaScore = 95;
  else if (gpaDiff >= 0) gpaScore = 88;
  else if (gpaDiff >= -0.2) gpaScore = 78;
  else if (gpaDiff >= -0.4) gpaScore = 68;
  else gpaScore = 55;

  // Language Tier
  const lang = evaluateLanguageTier(profile.languageScore);
  let langScore = 60;
  if (lang.tier >= 4) langScore = 95;
  else if (lang.tier === 3) langScore = 82;
  else if (lang.tier === 2) langScore = 65;
  else langScore = 40;

  // Major relevance
  const isMajorMatched = benchmark.preferredMajors.some(m => 
    profile.major.includes(m.replace('공학', '')) || m.includes(profile.major)
  );
  let majorRelevance = isMajorMatched ? 92 : 72;
  if (profile.hasEngineeringAccreditation) majorRelevance += 5;
  if (profile.certificates.length > 0) majorRelevance += Math.min(profile.certificates.length * 3, 8);
  majorRelevance = Math.min(100, majorRelevance);

  // Overall quantitative weight: GPA 35%, Language 25%, Major/Cert 40%
  const overallQuant = Math.round(gpaScore * 0.35 + langScore * 0.25 + majorRelevance * 0.40);

  let analysisText = '';
  if (normalizedGpa >= benchmark.avgGpa) {
    analysisText += `학점(${normalizedGpa.toFixed(2)}/4.5)은 합격자 평균(${benchmark.avgGpa}/4.5) 이상으로 서류 통과선에서 안정적인 강점을 가집니다. `;
  } else if (normalizedGpa >= benchmark.minRecommendedGpa) {
    analysisText += `학점(${normalizedGpa.toFixed(2)}/4.5)은 합격자 평균 대비 소폭 낮으나 최소 권장선(${benchmark.minRecommendedGpa}/4.5)을 충족하여 직무 역량으로 충분히 커버 가능합니다. `;
  } else {
    analysisText += `학점(${normalizedGpa.toFixed(2)}/4.5)이 합격자 평균(${benchmark.avgGpa}) 대비 다소 낮아 프로젝트 실무 성과로 강하게 방어해야 합니다. `;
  }

  if (lang.tier <= 2) {
    analysisText += `어학(${profile.languageScore.level || 'IL/미보유'})은 대기업 모빌리티/스마트팩토리 직무 최소 컷에 근접해 있어, 입사 전 OPIc IM2 이상 또는 토익스피킹 IM3(130점) 이상으로 보완 시 서류 및 면접 안정권에 진입합니다.`;
  } else {
    analysisText += `어학 역량(${profile.languageScore.level})은 지원 요건을 안정적으로 상회합니다.`;
  }

  if (profile.hasEngineeringAccreditation) {
    analysisText += ' 공학인증(ABEEK) 이수는 전공 설계 능력의 신뢰도를 높여주는 긍정적 요소입니다.';
  }

  return {
    gpaScore,
    languageScore: langScore,
    majorRelevance,
    overallQuant,
    analysisText,
    normalizedGpa,
    langTier: lang.tier
  };
}

/**
 * Evaluates technical skills matching against required and preferred benchmark skills
 */
export function evaluateSkills(profile: CandidateProfile, benchmark: CompanyBenchmark) {
  const userSkillsNormalized = profile.skills.map(s => s.toLowerCase().trim());

  const matchedSkills: string[] = [];
  const missingCrucialSkills: string[] = [];
  const complementarySkills: string[] = [];

  benchmark.requiredSkills.forEach(req => {
    const isMatched = userSkillsNormalized.some(us => 
      us.includes(req.toLowerCase()) || req.toLowerCase().includes(us)
    );
    if (isMatched) {
      matchedSkills.push(req);
    } else {
      missingCrucialSkills.push(req);
    }
  });

  benchmark.preferredSkills.forEach(pref => {
    const isMatched = userSkillsNormalized.some(us => 
      us.includes(pref.toLowerCase()) || pref.toLowerCase().includes(us)
    );
    if (isMatched && !matchedSkills.includes(pref)) {
      complementarySkills.push(pref);
    }
  });

  // Calculate skill score
  const requiredRatio = benchmark.requiredSkills.length > 0 
    ? (matchedSkills.length / benchmark.requiredSkills.length)
    : 1;
  const preferredBonus = Math.min(complementarySkills.length * 8, 25);
  
  const score = Math.min(100, Math.round(requiredRatio * 75 + preferredBonus));

  let analysisText = `요구되는 핵심 툴 중 [${matchedSkills.join(', ') || '기초 툴'}]을(를) 충실히 보유하고 있어 직무 적응력이 기대됩니다. `;
  if (missingCrucialSkills.length > 0) {
    analysisText += `다만 직무 핵심 필수 툴인 [${missingCrucialSkills.join(', ')}] 경험이 보완될 경우 직무 일치도가 크게 도약할 수 있습니다. `;
  }
  if (complementarySkills.length > 0) {
    analysisText += `추가 우대 스킬인 [${complementarySkills.join(', ')}] 보유는 실무 투입 시 큰 차별화 포인트가 됩니다.`;
  }

  return {
    score,
    matchedSkills,
    missingCrucialSkills,
    complementarySkills,
    analysisText
  };
}

/**
 * Evaluates projects relevance
 */
export function evaluateProjects(profile: CandidateProfile, benchmark: CompanyBenchmark) {
  if (profile.projects.length === 0) {
    return {
      score: 45,
      relevanceRating: '보완 필요' as const,
      analysisText: '기록된 프로젝트 경험이 부족하여 직무 적합성을 입증할 정성적 근거가 취약합니다. 캡스톤 디자인이나 실무형 툴 활용 프로젝트 추가가 시급합니다.'
    };
  }

  // Check relevance keywords
  const allProjectText = profile.projects.map(p => 
    `${p.title} ${p.role} ${p.techStack.join(' ')} ${p.description} ${p.outcome || ''}`
  ).join(' ').toLowerCase();

  const domainKeywords = [
    '자율주행', '로버', 'ros', 'slam', '제어', 'simulink', 'plc', '시퀀스',
    '설비', '공정', '자동화', 'catia', 'cad', '비전', '검사', 'opencv',
    '아스펜', 'aspen', '큐브샛', '센서', '모터', 'can', '최적화', '수율'
  ];

  let hitCount = 0;
  domainKeywords.forEach(k => {
    if (allProjectText.includes(k)) hitCount++;
  });

  const hasOutcome = profile.projects.some(p => (p.outcome && p.outcome.length > 5));
  let score = 65 + Math.min(hitCount * 4, 25) + (hasOutcome ? 10 : 0);
  score = Math.min(100, score);

  let relevanceRating: '매우 높음' | '높음' | '보통' | '보완 필요' = '보통';
  if (score >= 88) relevanceRating = '매우 높음';
  else if (score >= 75) relevanceRating = '높음';
  else if (score >= 60) relevanceRating = '보통';
  else relevanceRating = '보완 필요';

  const firstProj = profile.projects[0];
  let analysisText = `[${firstProj.title}] 등 실제 현업과 직결되는 하드웨어/소프트웨어 결합 프로젝트를 주도적으로 수행하였습니다. `;
  if (hitCount >= 4) {
    analysisText += '산업군 핵심 제어/해석 도구와 센서 인터페이스를 직접 다뤄본 경험은 면접관에게 즉시 전력감이라는 강력한 인상을 줍니다. ';
  }
  if (hasOutcome) {
    analysisText += '정량적 성과(오차 반경, 사이클 타임 단축, 수율 개선 등)가 구체적으로 기술되어 있어 직무 기여도 설득력이 매우 뛰어납니다.';
  } else {
    analysisText += '프로젝트 수행 과정에서의 정량적 수치(개선율 %, 데이터 정밀도 등)를 보강하면 자소서 및 면접 매력도가 한층 상승합니다.';
  }

  return {
    score,
    relevanceRating,
    analysisText
  };
}

/**
 * Generates the full deterministic matching report matching user instructions exactly
 */
export function analyzeProfile(profile: CandidateProfile): DetailedAnalysis {
  const benchmark = findBenchmark(profile);
  const quant = calculateQuantitativeScore(profile, benchmark);
  const skills = evaluateSkills(profile, benchmark);
  const projects = evaluateProjects(profile, benchmark);

  // Overall Match Percentage
  // Weighted: Skills 40%, Projects 40%, Quantitative 20%
  const matchPercentage = Math.round(skills.score * 0.40 + projects.score * 0.40 + quant.overallQuant * 0.20);

  let competitiveness: CompetitivenessLevel = '중';
  if (matchPercentage >= 85) competitiveness = '상';
  else if (matchPercentage >= 75) competitiveness = '중상';
  else if (matchPercentage >= 65) competitiveness = '중';
  else competitiveness = '보완 필요';

  // Strengths
  const strengths: string[] = [];
  if (skills.matchedSkills.length >= 2) {
    strengths.push(`현업 직무 필수 툴인 [${skills.matchedSkills.join(', ')}] 기반의 실무 구현 및 분석 역량`);
  }
  if (projects.relevanceRating === '매우 높음' || projects.relevanceRating === '높음') {
    strengths.push(`실제 모빌리티/스마트팩토리 타겟 플랫폼(${profile.projects[0]?.title}) 실증 경험과 문제 해결력`);
  }
  if (quant.normalizedGpa >= benchmark.avgGpa) {
    strengths.push(`합격자 평균을 상회하는 안정적인 학점(${quant.normalizedGpa.toFixed(2)}/4.5) 및 전공 기초 역량`);
  }
  if (profile.hasEngineeringAccreditation) {
    strengths.push('공학인증(ABEEK) 이수로 증명된 체계적인 종합 설계 및 캡스톤 수행 이력');
  }
  if (strengths.length < 2) {
    strengths.push('성장 잠재력과 직무 관련 전공 지식의 유기적 결합');
  }

  // Weaknesses & Recommendations
  const weaknesses: string[] = [];
  const recommendedActions: string[] = [];

  if (quant.langTier <= 2) {
    weaknesses.push(`어학 성적(${profile.languageScore.level || 'IL/미보유'}): 주요 대기업 권장 기준(OPIc IM2 / 토스 IM3 130점) 대비 보완 요망`);
    recommendedActions.push('단기 2~3주 스피킹 집중 대비를 통해 토익스피킹 IM3(130점+) 또는 OPIc IM2 확보');
  }
  if (skills.missingCrucialSkills.length > 0) {
    weaknesses.push(`희망 직무 핵심 도구인 [${skills.missingCrucialSkills.join(', ')}] 활용 경험 부재`);
    recommendedActions.push(`[${skills.missingCrucialSkills[0]}] 기본 문법 및 현업 예제 실습 미니 프로젝트 포트폴리오 추가`);
  }
  if (profile.projects.some(p => !p.outcome || p.outcome.length < 5)) {
    weaknesses.push('프로젝트 설명 내 수치화된 성과 및 문제 해결(Troubleshooting) 기여도 기술 보완 필요');
    recommendedActions.push('STAR(Situation-Task-Action-Result) 기법으로 프로젝트 전후 개선 지표(%) 명문화');
  }

  // Interview Keywords (exactly 3 keywords)
  const interviewKeywords: [string, string, string] = [
    benchmark.interviewKeywords[0] || '센서퓨전 / 실시간제어',
    benchmark.interviewKeywords[1] || 'PLC / 공정최적화',
    benchmark.interviewKeywords[2] || '트러블슈팅(Troubleshooting)'
  ];

  // Exact Markdown structure required by user specification
  const targetLabel = `${profile.targetCompany} / ${profile.targetDepartment || profile.targetRole}`;
  const markdownReport = `### 🎯 [${targetLabel}] 직무 매칭 분석 리포트
- **종합 직무 일치도:** ${matchPercentage}%
- **예상 합격 경쟁력:** ${competitiveness}

#### 📊 항목별 상세 분석
- **핵심 기술 및 툴 적합도:** ${skills.analysisText}
- **프로젝트 경험 평가:** ${projects.analysisText}
- **정량적 스펙 평가:** ${quant.analysisText}

#### 🔥 합격률을 높이기 위한 맞춤형 피드백
1. **강점 포인트:** ${strengths.slice(0, 2).join(' 및 ')}
2. **보완이 필요한 부분:** ${weaknesses.length > 0 ? weaknesses.join(', ') : '전반적 스펙 우수하며 실무 면접 대비 역량 심화 추천'}
3. **추천 면접/자소서 키워드:** ${interviewKeywords[0]}, ${interviewKeywords[1]}, ${interviewKeywords[2]}
`;

  return {
    matchPercentage,
    competitiveness,
    quantitativeScore: quant,
    skillsAnalysis: skills,
    projectAnalysis: projects,
    feedback: {
      strengths,
      weaknesses,
      recommendedActions,
      interviewKeywords
    },
    markdownReport,
    benchmarkComparison: {
      userGpa: Number(quant.normalizedGpa.toFixed(2)),
      benchmarkAvgGpa: benchmark.avgGpa,
      userLangTier: quant.langTier,
      benchmarkLangTier: 3, // Standard target is IM2/IM3 (tier 3)
      userSkillMatchRate: skills.score,
      userProjectRelevance: projects.score
    }
  };
}
