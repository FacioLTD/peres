# AI Course — Survey + Live Slides

## ארכיטקטורה

```
/server/index.js          Express + WebSocket
/client/src/
  survey/Survey.jsx       עמוד הסקר
  survey/Thanks.jsx       עמוד תודה
  slides/Slides.jsx       שקפים עם גרפים חיים
  hooks/useStats.js       WebSocket hook
```

## הרצה מקומית

### 1. התקנה (פעם אחת)

```bash
# שרת
npm install

# קליינט
cd client && npm install
```

### 2. הפעלה

פתח שני טרמינלים:

```bash
# טרמינל 1 — שרת
node server/index.js
# רץ על http://localhost:3001

# טרמינל 2 — קליינט
cd client && npm run dev
# רץ על http://localhost:5173
```

### 3. שימוש בכיתה

| מסך | URL | מי רואה |
|-----|-----|---------|
| סקר | `http://YOUR_IP:5173/` | סטודנטים (QR) |
| שקפים | `http://YOUR_IP:5173/slides` | אתה — על המסך הגדול |

### WebSocket

כשסטודנט שולח סקר:
1. `POST /api/submit` → שרת שומר
2. שרת מחשב סטטיסטיקות חדשות
3. `broadcast()` לכל לקוחות WebSocket
4. השקפים מתעדכנים **בזמן אמת** ✓

## Deploy

### Render (מומלץ ומהיר)

הפרויקט מוכן ל-Render כ-service יחיד (Express שמגיש גם את ה-client build וגם WebSocket):

1. Render יזהה את `render.yaml` אוטומטית
2. Build: `npm install && npm run build`
3. Start: `npm run start`
4. אחרי דיפלוי, הוסף Custom Domain (למשל `peres.facio.io`)

### הערות חשובות

- ה-WebSocket מחובר אוטומטית לאותו דומיין/פרוטוקול של האתר (ws/wss)
- תשובות סקר נשמרות ב-`server/submissions.json` (לא נכלל ב-git)
