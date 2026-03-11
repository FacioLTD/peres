import './Thanks.css';

export default function Thanks() {
  return (
    <div className="thanks-page">
      <div className="thanks-content fade-up">
        <div className="thanks-check">✓</div>
        <h2>תודה — אתה עכשיו <em>data point</em>.</h2>
        <p>
          התשובות שלך נשמרו ומופיעות עכשיו בשקפים.<br />
          בדקות הקרובות נציג את ה-dataset של הכיתה כולה<br />
          ונתחיל לחפש דפוסים.
        </p>
        <div className="thanks-tag mono">— ההרצאה מתחילה עכשיו —</div>
      </div>
    </div>
  );
}
