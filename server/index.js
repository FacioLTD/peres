const express = require('express');
const { WebSocketServer } = require('ws');
const cors = require('cors');
const http = require('http');
const fs = require('fs');
const path = require('path');

const app = express();
app.use(cors());
app.use(express.json());

// ── In-memory store (+ persistence + fallback seed) ──────────
const SUBMISSIONS_FILE = path.join(__dirname, 'submissions.json');
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

function loadSubmissions() {
  try {
    if (fs.existsSync(SUBMISSIONS_FILE)) {
      const raw = fs.readFileSync(SUBMISSIONS_FILE, 'utf8');
      const parsed = JSON.parse(raw);
      if (Array.isArray(parsed)) return parsed;
    }
  } catch (err) {
    console.error('Failed to load submissions file, using fallback seed:', err.message);
  }
  return [...fallbackSeedData];
}

function persistSubmissions() {
  try {
    fs.writeFileSync(SUBMISSIONS_FILE, JSON.stringify(submissions, null, 2), 'utf8');
  } catch (err) {
    console.error('Failed to persist submissions:', err.message);
  }
}

let submissions = loadSubmissions();

// ── REST API ──────────────────────────────────────────────────
app.post('/api/submit', (req, res) => {
  const entry = { ...req.body, timestamp: new Date().toISOString() };
  submissions.push(entry);
  persistSubmissions();

  // Broadcast to all slides clients — include submittedAt so client can animate
  broadcast({ type: 'NEW_SUBMISSION', payload: computeStats(), submittedAt: entry.timestamp });

  res.json({ ok: true, n: submissions.length });
});

app.get('/api/stats', (req, res) => {
  res.json(computeStats());
});

app.get('/healthz', (req, res) => {
  res.json({ ok: true });
});

// ── Stats computation ─────────────────────────────────────────
function computeStats() {
  const n = submissions.length;
  if (n === 0) {
    return {
      n: 0,
      grades: [],
      gpas: [],
      mean: 0,
      min: 0,
      max: 0,
      variance: 0,
      histogram: [],
      scatterPoints: [],
      ageGradePoints: [],
      engagementPoints: [],
      clusteringPoints: [],
      genderCounts: {},
      sleepCounts: {},
      aiCounts: {},
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

  const grades  = submissions.map(s => Number(s.q12)).filter(Boolean);
  const gpas    = submissions.map(s => Number(s.q3)).filter(Boolean);
  const mean    = +(grades.reduce((a,b)=>a+b,0)/grades.length).toFixed(1);
  const variance= +(grades.reduce((a,b)=>a+Math.pow(b-mean,2),0)/grades.length).toFixed(1);
  const min     = Math.min(...grades);
  const max     = Math.max(...grades);

  // Histogram bins
  const binEdges = [55,60,65,70,75,80,85,90,95,100];
  const histogram = binEdges.slice(0,-1).map((edge,i) => ({
    bin: `${edge}–${binEdges[i+1]}`,
    count: grades.filter(g => g >= edge && g < binEdges[i+1]).length
  }));

  // Scatter: GPA vs expected grade
  const scatterPoints = submissions
    .filter(s => s.q3 && s.q12)
    .map(s => ({ gpa: Number(s.q3), grade: Number(s.q12) }));

  // Regression demo: Age vs expected grade
  const ageGradePoints = submissions
    .filter(s => s.q2 && s.q12)
    .map(s => ({ age: Number(s.q2), grade: Number(s.q12) }));

  // Classification demo: Interest vs AI usage + engaged label
  const engagementPoints = submissions
    .map((s) => {
      const interest = Number(s.q9);
      const usage = aiUsageWeekly(s.q11);
      const attendance = attendancePercent(s.q7);
      if (!interest || usage == null || attendance == null) return null;
      const engaged = interest >= 7 && attendance >= 85;
      return { interest, aiUsage: usage, attendance, engaged };
    })
    .filter(Boolean);

  // Clustering demo: AI usage vs study hours
  const clusteringPoints = submissions
    .map((s) => {
      const usage = aiUsageWeekly(s.q11);
      const study = studyHoursWeekly(s.q8);
      if (usage == null || study == null) return null;
      return { aiUsage: usage, studyHours: study };
    })
    .filter(Boolean);

  // Gender distribution
  const genderCounts = submissions.reduce((acc, s) => {
    const g = s.q1 || 'לא צוין';
    acc[g] = (acc[g] || 0) + 1;
    return acc;
  }, {});

  // Sleep distribution
  const sleepCounts = submissions.reduce((acc, s) => {
    const v = s.q5 ? `${s.q5} שעות` : 'לא צוין';
    acc[v] = (acc[v] || 0) + 1;
    return acc;
  }, {});

  // AI usage
  const aiCounts = submissions.reduce((acc, s) => {
    const v = s.q11 || 'לא צוין';
    acc[v] = (acc[v] || 0) + 1;
    return acc;
  }, {});

  // Table rows for dataset slide (first 10)
  const rows = submissions.slice(0, 10).map((s, i) => ({
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
    n,
    grades,
    gpas,
    mean,
    variance,
    min,
    max,
    histogram,
    scatterPoints,
    ageGradePoints,
    engagementPoints,
    clusteringPoints,
    genderCounts,
    sleepCounts,
    aiCounts,
    rows,
  };
}

// ── WebSocket ─────────────────────────────────────────────────
const server = http.createServer(app);
const wss = new WebSocketServer({ server });
const clients = new Set();

wss.on('connection', (ws) => {
  clients.add(ws);
  // Send current state immediately on connect
  ws.send(JSON.stringify({ type: 'INIT', payload: computeStats() }));
  ws.on('close', () => clients.delete(ws));
});

function broadcast(msg) {
  const data = JSON.stringify(msg);
  clients.forEach(ws => { if (ws.readyState === 1) ws.send(data); });
}

// Serve Vite build in production (single service on Render)
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
