export type IndustryType = 'mobility' | 'smartfactory' | 'integrated';

export interface ProjectExperience {
  id: string;
  title: string;
  role: string;
  techStack: string[];
  description: string;
  outcome?: string;
}

export interface CandidateProfile {
  major: string;
  majorCategory: 'mechanical' | 'aerospace' | 'electrical_electronic' | 'computer_software' | 'industrial_chemical' | 'other';
  gpa: number;
  maxGpa: 4.5 | 4.3 | 4.0;
  skills: string[];
  projects: ProjectExperience[];
  certificates: string[];
  languageScore: {
    type: 'TOEIC_SPEAKING' | 'OPIC' | 'TOEIC' | 'OTHER' | 'NONE';
    level: string;
  };
  hasEngineeringAccreditation: boolean; // 공학인증(ABEEK)
  targetCompany: string;
  targetDepartment: string;
  targetRole: string;
  targetIndustry: IndustryType;
}

export interface CompanyBenchmark {
  id: string;
  companyName: string;
  department: string;
  roleTitle: string;
  industry: IndustryType;
  avgGpa: number;
  minRecommendedGpa: number;
  recommendedLanguages: string[];
  requiredSkills: string[];
  preferredSkills: string[];
  preferredMajors: string[];
  samplePassedProjects: string[];
  coreCompetencies: string[];
  interviewKeywords: string[];
  hiringTrend: string;
}

export type CompetitivenessLevel = '상' | '중상' | '중' | '보완 필요';

export interface DetailedAnalysis {
  matchPercentage: number;
  competitiveness: CompetitivenessLevel;
  quantitativeScore: {
    gpaScore: number; // 0-100
    languageScore: number; // 0-100
    majorRelevance: number; // 0-100
    overallQuant: number; // 0-100
    analysisText: string;
  };
  skillsAnalysis: {
    score: number; // 0-100
    matchedSkills: string[];
    missingCrucialSkills: string[];
    complementarySkills: string[];
    analysisText: string;
  };
  projectAnalysis: {
    score: number; // 0-100
    relevanceRating: '매우 높음' | '높음' | '보통' | '보완 필요';
    analysisText: string;
  };
  feedback: {
    strengths: string[];
    weaknesses: string[];
    recommendedActions: string[];
    interviewKeywords: [string, string, string]; // exactly 3 keywords
  };
  markdownReport: string;
  benchmarkComparison: {
    userGpa: number;
    benchmarkAvgGpa: number;
    userLangTier: number; // 1-5
    benchmarkLangTier: number; // 1-5
    userSkillMatchRate: number; // 0-100%
    userProjectRelevance: number; // 0-100%
  };
  isAiEnhanced?: boolean;
}
