const express = require('express');
const { WebSocketServer } = require('ws');
const cors = require('cors');
const http = require('http');
const fs = require('fs');
const path = require('path');

const app = express();
app.use(cors());
app.use(express.json());

// ── Deck configuration ───────────────────────────────────────
const DECKS = ['foundations', 'llm', 'business'];

// ── Fallback seed data (foundations only) ────────────────────
const fallbackSeedData = [
  { q1:'נקבה', q2:24, q3:84, q4:82, q5:'7 שעות',   q6:'קבועות — אותה שעה כל יום',      q7:'85%–100%', q8:'4–5 שעות', q9:8,  q10:8,  q11:'4–7 פעמים',        q12:88 },
  { q1:'זכר',  q2:22, q3:71, q4:68, q5:'5 שעות ↓', q6:'משתנות — תלוי בלוח הזמנים',      q7:'70%–85%',  q8:'2–3 שעות', q9:6,  q10:6,  q11:'1–3 פעמים',        q12:75 },
  { q1:'נקבה', q2:27, q3:91, q4:90, q5:'8+ שעות',  q6:'קבועות — אותה שעה כל יום',      q7:'85%–100%', q8:'6+ שעות',  q9:9,  q10:9,  q11:'כל יום, כמה פעמים', q12:93 },
  { q1:'זכר',  q2:23, q3:78, q4:76, q5:'6 שעות',   q6:'משתנות — תלוי בלוח הזמנים',      q7:'70%–85%',  q8:'4–5 שעות', q9:7,  q10:7,  q11:'4–7 פעמים',        q12:80 },
  { q1:'זכר',  q2:21, q3:65, q4:63, q5:'5 שעות ↓', q6:'משתנות — תלוי בלוח הזמנים',      q7:'פחות מ-70%', q8:'0–1 שעות', q9:4, q10:5,  q11:'כלל לא',          q12:70 },
  { q1:'נקבה', q2:25, q3:88, q4:87, q5:'7 שעות',   q6:'קבועות — אותה שעה כל יום',      q7:'85%–100%', q8:'4–5 שעות', q9:8,  q10:9,  q11:'כל יום, כמה פעמים', q12:90 },
  { q1:'זכר',  q2:23, q3:73, q4:70, q5:'6 שעות',   q6:'משתנות — תלוי בלוח הזמנים',      q7:'70%–85%',  q8:'2–3 שעות', q9:6,  q10:6,  q11:'1–3 פעמים',        q12:78 },
  { q1:'נקבה', q2:29, q3:95, q4:94, q5:'8+ שעות',  q6:'קבועות — אותה שעה כל יום',      q7:'85%–100%', q8:'6+ שעות',  q9:10, q10:10, q11:'כל יום, כמה פעמים', q12:96 },
  { q1:'זכר',  q2:20, q3:60, q4:58, q5:'5 שעות ↓', q6:'משתנות — תלוי בלוח הזמנים',      q7:'פחות מ-70%', q8:'0–1 שעות', q9:3, q10:4,  q11:'כלל לא',          q12:65 },
  { q1:'נקבה', q2:26, q3:82, q4:80, q5:'7 שעות',   q6:'קבועות — אותה שעה כל יום',      q7:'85%–100%', q8:'4–5 שעות', q9:8,  q10:7,  q11:'4–7 פעמים',        q12:85 },
  { q1:'זכר',  q2:24, q3:76, q4:74, q5:'6 שעות',   q6:'משתנות — תלוי בלוח הזמנים',      q7:'70%–85%',  q8:'2–3 שעות', q9:7,  q10:7,  q11:'1–3 פעמים',        q12:79 },
  { q1:'נקבה', q2:28, q3:89, q4:91, q5:'8+ שעות',  q6:'קבועות — אותה שעה כל יום',      q7:'85%–100%', q8:'6+ שעות',  q9:9,  q10:9,  q11:'כל יום, כמה פעמים', q12:92 },
  { q1:'זכר',  q2:30, q3:68, q4:66, q5:'5 שעות ↓', q6:'משתנות — תלוי בלוח הזמנים',      q7:'פחות מ-70%', q8:'0–1 שעות', q9:4, q10:5,  q11:'כלל לא',          q12:71 },
  { q1:'נקבה', q2:23, q3:86, q4:84, q5:'7 שעות',   q6:'קבועות — אותה שעה כל יום',      q7:'85%–100%', q8:'4–5 שעות', q9:8,  q10:8,  q11:'4–7 פעמים',        q12:88 },
  { q1:'זכר',  q2:27, q3:80, q4:78, q5:'6 שעות',   q6:'משתנות — תלוי בלוח הזמנים',      q7:'70%–85%',  q8:'2–3 שעות', q9:6,  q10:6,  q11:'1–3 פעמים',        q12:81 },
  { q1:'נקבה', q2:21, q3:74, q4:72, q5:'6 שעות',   q6:'משתנות — תלוי בלוח הזמנים',      q7:'70%–85%',  q8:'2–3 שעות', q9:7,  q10:7,  q11:'1–3 פעמים',        q12:77 },
  { q1:'זכר',  q2:25, q3:92, q4:90, q5:'8+ שעות',  q6:'קבועות — אותה שעה כל יום',      q7:'85%–100%', q8:'6+ שעות',  q9:9,  q10:9,  q11:'כל יום, כמה פעמים', q12:94 },
];

// ── Per-deck submission storage ──────────────────────────────
function submissionsPath(deck) {
  // Backward compat: foundations checks legacy 'submissions.json' first
  if (deck === 'foundations') {
    const named  = path.join(__dirname, 'foundations-submissions.json');
    const legacy = path.join(__dirname, 'submissions.json');
    if (fs.existsSync(named))  return named;
    if (fs.existsSync(legacy)) return legacy;
    return named;
  }
  return path.join(__dirname, `${deck}-submissions.json`);
}

function loadSubmissions(deck) {
  const file = submissionsPath(deck);
  try {
    if (fs.existsSync(file)) {
      const raw = fs.readFileSync(file, 'utf8');
      const parsed = JSON.parse(raw);
      if (Array.isArray(parsed)) return parsed;
    }
  } catch (err) {
    console.error(`Failed to load ${deck} submissions:`, err.message);
  }
  return deck === 'foundations' ? [...fallbackSeedData] : [];
}

function persistSubmissions(deck) {
  const file = submissionsPath(deck);
  try {
    fs.writeFileSync(file, JSON.stringify(submissions[deck], null, 2), 'utf8');
  } catch (err) {
    console.error(`Failed to persist ${deck} submissions:`, err.message);
  }
}

const submissions = {};
for (const deck of DECKS) {
  submissions[deck] = loadSubmissions(deck);
}

// ── Stats computation — dispatcher ───────────────────────────
function computeStats(deck) {
  const data = submissions[deck] || [];
  switch (deck) {
    case 'foundations': return computeFoundationsStats(data);
    case 'llm':        return computeLLMStats(data);
    case 'business':   return computeBusinessStats(data);
    default:           return { n: data.length };
  }
}

// ── Foundations stats (original, unchanged) ───────────────────
function computeFoundationsStats(data) {
  const n = data.length;
  if (n === 0) {
    return {
      n: 0,
      grades: [], gpas: [], mean: 0, min: 0, max: 0, variance: 0,
      histogram: [], scatterPoints: [], ageGradePoints: [],
      engagementPoints: [], clusteringPoints: [],
      genderCounts: {}, sleepCounts: {}, aiCounts: {},
    };
  }

  const attendancePercent = (v) => {
    if (typeof v === 'number') return v;
    if (!v) return null;
    const s = String(v).trim();
    if (s === '85%–100%' || s.includes('high')) return 92;
    if (s === '70%–85%' || s.includes('medium')) return 78;
    if (s === 'פחות מ-70%' || s.includes('low')) return 62;
    return null;
  };

  const aiUsageWeekly = (v) => {
    if (typeof v === 'number') return v;
    if (!v) return null;
    const s = String(v).trim();
    if (s === 'כל יום, כמה פעמים' || s.includes('daily')) return 7;
    if (s === '4–7 פעמים' || s.includes('4-7')) return 5;
    if (s === '1–3 פעמים' || s.includes('1-3')) return 2;
    if (s === 'כלל לא' || s === '0') return 0;
    return null;
  };

  const studyHoursWeekly = (v) => {
    if (typeof v === 'number') return v;
    if (!v) return null;
    const s = String(v).trim();
    if (s === '6+ שעות' || s.includes('6+')) return 6.5;
    if (s === '4–5 שעות' || s.includes('4-5')) return 4.5;
    if (s === '2–3 שעות' || s.includes('2-3')) return 2.5;
    if (s === '0–1 שעות' || s.includes('0-1')) return 0.5;
    return null;
  };

  const grades  = data.map(s => Number(s.q12)).filter(Boolean);
  const gpas    = data.map(s => Number(s.q3)).filter(Boolean);
  const mean    = +(grades.reduce((a,b)=>a+b,0)/grades.length).toFixed(1);
  const variance= +(grades.reduce((a,b)=>a+Math.pow(b-mean,2),0)/grades.length).toFixed(1);
  const min     = Math.min(...grades);
  const max     = Math.max(...grades);

  const binEdges = [55,60,65,70,75,80,85,90,95,100];
  const histogram = binEdges.slice(0,-1).map((edge,i) => ({
    bin: `${edge}–${binEdges[i+1]}`,
    count: grades.filter(g => g >= edge && g < binEdges[i+1]).length
  }));

  const scatterPoints = data
    .filter(s => s.q3 && s.q12)
    .map(s => ({ gpa: Number(s.q3), grade: Number(s.q12) }));

  const ageGradePoints = data
    .filter(s => s.q2 && s.q12)
    .map(s => ({ age: Number(s.q2), grade: Number(s.q12) }));

  const engagementPoints = data
    .map((s) => {
      const interest = Number(s.q9);
      const usage = aiUsageWeekly(s.q11);
      const attendance = attendancePercent(s.q7);
      if (!interest || usage == null || attendance == null) return null;
      const engaged = interest >= 7 && attendance >= 85;
      return { interest, aiUsage: usage, attendance, engaged };
    })
    .filter(Boolean);

  const clusteringPoints = data
    .map((s) => {
      const usage = aiUsageWeekly(s.q11);
      const study = studyHoursWeekly(s.q8);
      if (usage == null || study == null) return null;
      return { aiUsage: usage, studyHours: study };
    })
    .filter(Boolean);

  const genderCounts = data.reduce((acc, s) => {
    const g = s.q1 || 'לא צוין';
    acc[g] = (acc[g] || 0) + 1;
    return acc;
  }, {});

  const sleepCounts = data.reduce((acc, s) => {
    const v = s.q5 ? `${s.q5} שעות` : 'לא צוין';
    acc[v] = (acc[v] || 0) + 1;
    return acc;
  }, {});

  const aiCounts = data.reduce((acc, s) => {
    const v = s.q11 || 'לא צוין';
    acc[v] = (acc[v] || 0) + 1;
    return acc;
  }, {});

  const rows = data.slice(0, 10).map((s, i) => ({
    id: `#${String(i + 1).padStart(3, '0')}`,
    gender: s.q1 || '—',
    age: s.q2 || '—',
    gpa: s.q3 || '—',
    sleep: s.q5 || '—',
    attendance: s.q7 || '—',
    motivation: s.q9 || '—',
    grade: s.q12 || '—',
  }));

  return {
    n, grades, gpas, mean, variance, min, max,
    histogram, scatterPoints, ageGradePoints,
    engagementPoints, clusteringPoints,
    genderCounts, sleepCounts, aiCounts, rows,
  };
}

// ── LLM stats ────────────────────────────────────────────────
function computeLLMStats(data) {
  const n = data.length;
  if (n === 0) return { n: 0, toolCounts: {}, frequencyCounts: {}, trustScores: [], understandScores: [], prompts: [] };

  const toolCounts = countField(data, 'tool');
  const frequencyCounts = countField(data, 'frequency');

  const trustScores = data.map(s => Number(s.trust)).filter(v => v > 0);
  const understandScores = data.map(s => Number(s.understand)).filter(v => v > 0);

  // Trust vs Understanding scatter
  const trustUnderstandPoints = data
    .filter(s => s.trust && s.understand)
    .map(s => ({ trust: Number(s.trust), understand: Number(s.understand) }));

  // Prompt length distribution
  const promptLengths = data.map(s => Number(s.promptLength)).filter(v => v > 0);

  // Collect free-text prompts (for live tokenization demo)
  const prompts = data
    .filter(s => s.samplePrompt && s.samplePrompt.trim())
    .map(s => s.samplePrompt.trim())
    .slice(-20); // last 20

  // Image gen vs code gen usage
  const imageGenCounts = countField(data, 'usedImageGen');
  const codeGenCounts = countField(data, 'usedCodeGen');
  const firstTryCounts = countField(data, 'firstTry');

  // Workflow impact scores
  const workflowScores = data.map(s => Number(s.workflowImpact)).filter(v => v > 0);

  const rows = data.slice(0, 10).map((s, i) => ({
    id: `#${String(i + 1).padStart(3, '0')}`,
    tool: s.tool || '—',
    frequency: s.frequency || '—',
    promptLength: s.promptLength || '—',
    trust: s.trust || '—',
    understand: s.understand || '—',
    workflowImpact: s.workflowImpact || '—',
  }));

  return {
    n, toolCounts, frequencyCounts,
    trustScores, understandScores, trustUnderstandPoints,
    promptLengths, prompts,
    imageGenCounts, codeGenCounts, firstTryCounts,
    workflowScores, rows,
  };
}

// ── Business stats ───────────────────────────────────────────
function computeBusinessStats(data) {
  const n = data.length;
  if (n === 0) return { n: 0, industryCounts: {}, adoptionCounts: {}, riskCounts: {} };

  const industryCounts = countField(data, 'industry');
  const adoptionCounts = countField(data, 'adoption');
  const riskCounts = countField(data, 'biggestRisk');
  const disclosureCounts = countField(data, 'disclosure');
  const hiringCounts = countField(data, 'aiHiring');

  // Scale questions
  const jobsScores = data.map(s => Number(s.jobsStatement)).filter(v => v > 0);
  const explainableScores = data.map(s => Number(s.explainable)).filter(v => v > 0);
  const labeledScores = data.map(s => Number(s.labeled)).filter(v => v > 0);
  const regulationReadiness = data.map(s => Number(s.regulationReady)).filter(v => v > 0);
  const deepfakeConcern = data.map(s => Number(s.deepfakeConcern)).filter(v => v > 0);

  // Free text
  const shouldNotUse = data
    .filter(s => s.shouldNotUse && s.shouldNotUse.trim())
    .map(s => s.shouldNotUse.trim())
    .slice(-20);

  const lastAITool = data
    .filter(s => s.lastAITool && s.lastAITool.trim())
    .map(s => s.lastAITool.trim())
    .slice(-20);

  const rows = data.slice(0, 10).map((s, i) => ({
    id: `#${String(i + 1).padStart(3, '0')}`,
    industry: s.industry || '—',
    adoption: s.adoption || '—',
    biggestRisk: s.biggestRisk || '—',
    regulationReady: s.regulationReady || '—',
  }));

  return {
    n, industryCounts, adoptionCounts, riskCounts,
    disclosureCounts, hiringCounts,
    jobsScores, explainableScores, labeledScores,
    regulationReadiness, deepfakeConcern,
    shouldNotUse, lastAITool, rows,
  };
}

// ── Utility ──────────────────────────────────────────────────
function countField(data, field) {
  return data.reduce((acc, s) => {
    const v = s[field] || 'לא צוין';
    acc[v] = (acc[v] || 0) + 1;
    return acc;
  }, {});
}

// ── REST API ─────────────────────────────────────────────────
function handleSubmit(deck, req, res) {
  if (!DECKS.includes(deck)) {
    return res.status(400).json({ error: `Unknown deck: ${deck}` });
  }
  const entry = { ...req.body, timestamp: new Date().toISOString() };
  submissions[deck].push(entry);
  persistSubmissions(deck);
  broadcastToDeck(deck, {
    type: 'NEW_SUBMISSION',
    payload: computeStats(deck),
    submittedAt: entry.timestamp,
  });
  res.json({ ok: true, n: submissions[deck].length });
}

// Backward-compatible endpoints (foundations)
app.post('/api/submit', (req, res) => handleSubmit('foundations', req, res));
app.get('/api/stats',   (req, res) => res.json(computeStats('foundations')));

// Deck-specific endpoints
app.post('/api/:deck/submit', (req, res) => handleSubmit(req.params.deck, req, res));
app.get('/api/:deck/stats',   (req, res) => {
  const { deck } = req.params;
  if (!DECKS.includes(deck)) return res.status(400).json({ error: `Unknown deck: ${deck}` });
  res.json(computeStats(deck));
});

app.get('/healthz', (req, res) => res.json({ ok: true }));

// ── WebSocket — deck-aware ───────────────────────────────────
const server = http.createServer(app);
const wss = new WebSocketServer({ server });

const deckClients = {};
for (const deck of DECKS) deckClients[deck] = new Set();

wss.on('connection', (ws, req) => {
  const url  = new URL(req.url, `http://${req.headers.host || 'localhost'}`);
  const deck = url.searchParams.get('deck') || 'foundations';
  const clientSet = deckClients[deck] || (deckClients[deck] = new Set());
  clientSet.add(ws);

  // Send current state immediately
  ws.send(JSON.stringify({ type: 'INIT', payload: computeStats(deck) }));
  ws.on('close', () => clientSet.delete(ws));
});

function broadcastToDeck(deck, msg) {
  const data = JSON.stringify(msg);
  const clientSet = deckClients[deck];
  if (clientSet) {
    clientSet.forEach(ws => { if (ws.readyState === 1) ws.send(data); });
  }
}

// ── Serve Vite build in production ───────────────────────────
const clientDistPath = path.join(__dirname, '../client/dist');
if (fs.existsSync(clientDistPath)) {
  app.use(express.static(clientDistPath));
  app.get('*', (req, res) => {
    res.sendFile(path.join(clientDistPath, 'index.html'));
  });
}

const PORT = Number(process.env.PORT) || 3001;
const HOST = process.env.HOST || '0.0.0.0';
server.listen(PORT, HOST, () => console.log(`✓ Server running on http://${HOST}:${PORT}`));
