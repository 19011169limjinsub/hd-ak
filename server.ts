import express from 'express';
import path from 'path';
import dotenv from 'dotenv';
import { GoogleGenAI } from '@google/genai';
import { analyzeProfile, findBenchmark } from './src/utils/matcher';
import { CandidateProfile } from './src/types';

dotenv.config();

const app = express();
const PORT = process.env.PORT ? parseInt(process.env.PORT, 10) : 3000;

app.use(express.json({ limit: '5mb' }));

// Initialize Google GenAI client
const apiKey = process.env.GEMINI_API_KEY;
let ai: GoogleGenAI | null = null;
if (apiKey) {
  ai = new GoogleGenAI({
    apiKey,
    httpOptions: {
      headers: {
        'User-Agent': 'aistudio-build',
      },
    },
  });
}

// Career Analysis API Endpoint
app.post('/api/analyze', async (req, res) => {
  try {
    const profile: CandidateProfile = req.body;
    if (!profile || !profile.major) {
      return res.status(400).json({ error: '전공 및 기본 스펙 정보가 필요합니다.' });
    }

    // Baseline deterministic analysis
    const baselineAnalysis = analyzeProfile(profile);
    const benchmark = findBenchmark(profile);

    // If Gemini AI is available, attempt AI analysis with a strict timeout so it never hangs
    if (ai && apiKey) {
      try {
        const prompt = `
당신은 모빌리티(자율주행, 전기차, 로보틱스, 항공우주 등) 및 스마트팩토리(MES, 자동화 설비, AI Vision, 공정 최적화 등) 분야의 전문 취업 컨설턴트이자 데이터 분석 AI입니다.

[지원자 스펙 데이터]
- 전공 및 학점: ${profile.major} (${profile.majorCategory}), 학점 ${profile.gpa}/${profile.maxGpa} (4.5 만점 환산: ${((profile.gpa / profile.maxGpa) * 4.5).toFixed(2)})
- 공학인증(ABEEK) 이수 여부: ${profile.hasEngineeringAccreditation ? '이수 완료' : '미이수'}
- 핵심 보유 기술 및 툴: ${profile.skills.join(', ')}
- 주요 프로젝트 경험:
${profile.projects.map((p, idx) => `  ${idx + 1}. [${p.title}] (역할: ${p.role}, 기술스택: ${p.techStack.join(', ')}, 성과: ${p.outcome || 'N/A'})\n     내용: ${p.description}`).join('\n')}
- 자격증: ${profile.certificates.join(', ') || '없음'}
- 어학: ${profile.languageScore.type} ${profile.languageScore.level}
- 희망 기업 및 직무: ${profile.targetCompany} / ${profile.targetDepartment || profile.targetRole} (${profile.targetIndustry})

[해당 기업/직무 합격자 DB 벤치마크]
- 기업 및 직무: ${benchmark.companyName} - ${benchmark.roleTitle} (${benchmark.department})
- 합격자 평균 학점: ${benchmark.avgGpa}/4.5 (최소 권장선: ${benchmark.minRecommendedGpa})
- 권장 어학: ${benchmark.recommendedLanguages.join(', ')}
- 직무 필수 핵심 기술: ${benchmark.requiredSkills.join(', ')}
- 우대 기술/툴: ${benchmark.preferredSkills.join(', ')}
- 최신 채용 트렌드: ${benchmark.hiringTrend}

[분석 및 평가 규칙]
1. 직무 연관성 매칭: 지원자가 입력한 프로젝트와 툴이 희망 직무의 핵심 역량과 얼마나 일치하는지 냉철하게 분석하고 직무 일치도(%)를 ${Math.max(40, baselineAnalysis.matchPercentage - 5)}% ~ ${Math.min(98, baselineAnalysis.matchPercentage + 5)}% 범위에서 현실적으로 산출하세요.
2. 현실적이고 객관적인 피드백: 단순 위로가 아닌 현업 채용 트렌드(직무 중심 수시 채용, 실무 역량 강조)에 맞춰 냉철하고 건설적인 조언을 제공하세요.
3. 강점 및 약점 분석: 합격자 평균 스펙 대비 지원자의 차별화된 강점과 보완해야 할 약점(어학, 현업 필수 툴 부족 등)을 명확히 짚어주세요.

[출력 형식 - 반드시 다음 마크다운 형식을 100% 준수하여 출력]:
### 🎯 [${profile.targetCompany} / ${profile.targetDepartment || profile.targetRole}] 직무 매칭 분석 리포트
- **종합 직무 일치도:** [OO]%
- **예상 합격 경쟁력:** [상 / 중상 / 중 / 보완 필요 중 택1]

#### 📊 항목별 상세 분석
- **핵심 기술 및 툴 적합도:** (보유 툴과 직무 요구 툴 비교)
- **프로젝트 경험 평가:** (프로젝트의 산업군 연관성 및 기여도 분석)
- **정량적 스펙 평가:** (학점, 전공 적합도 등)

#### 🔥 합격률을 높이기 위한 맞춤형 피드백
1. **강점 포인트:** (자소서나 면접에서 어필해야 할 핵심 역량)
2. **보완이 필요한 부분:** (추가로 취득하면 좋은 자격증, 툴, 직무 경험)
3. **추천 면접/자소서 키워드:** (현업 실무진이 선호하는 키워드 3가지, 쉼표로 구분)
`;

        const geminiPromise = ai.models.generateContent({
          model: 'gemini-3.8-flash',
          contents: prompt,
          config: {
            systemInstruction: '모빌리티 및 스마트팩토리 분야의 수석 채용 컨설턴트 관점에서 냉철하고 전문적인 직무 일치도 보고서를 마크다운으로 작성하세요.',
          },
        });

        // 3-second timeout safeguard so the user never gets stuck waiting
        const timeoutPromise = new Promise<null>((resolve) => {
          setTimeout(() => resolve(null), 3000);
        });

        const response = await Promise.race([geminiPromise, timeoutPromise]);

        if (response && response.text && response.text.includes('### 🎯')) {
          const aiText = response.text;
          const matchPercentMatch = aiText.match(/종합 직무 일치도:\*\*\s*(\d+)%/);
          const competitivenessMatch = aiText.match(/예상 합격 경쟁력:\*\*\s*(상|중상|중|보완 필요)/);

          const updatedMatch = matchPercentMatch ? parseInt(matchPercentMatch[1], 10) : baselineAnalysis.matchPercentage;
          const updatedComp = competitivenessMatch ? (competitivenessMatch[1] as any) : baselineAnalysis.competitiveness;

          return res.json({
            ...baselineAnalysis,
            matchPercentage: updatedMatch,
            competitiveness: updatedComp,
            markdownReport: aiText,
            isAiEnhanced: true,
          });
        }
      } catch (geminiError) {
        console.warn('Gemini API call timed out or failed, returning benchmark analysis:', geminiError);
      }
    }

    // Return deterministic analysis result immediately
    return res.json({
      ...baselineAnalysis,
      isAiEnhanced: false,
    });
  } catch (error: any) {
    console.error('Analysis error:', error);
    res.status(500).json({ error: error.message || '분석 중 오류가 발생했습니다.' });
  }
});

// Setup Vite development middleware or static serving
async function startServer() {
  if (process.env.NODE_ENV !== 'production') {
    const { createServer: createViteServer } = await import('vite');
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.resolve(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (_req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`Server running at http://0.0.0.0:${PORT}`);
  });
}

startServer();
