import './Survey.css';
import './BusinessSurvey.css';

export default function BusinessThanks() {
  return (
    <div className="thanks-page deck-business-page">
      <div className="thanks-content fade-up">
        <div className="thanks-check">✓</div>
        <h2>תודה — העמדה שלך <em>נרשמה</em>.</h2>
        <p>
          התשובות שלך נשמרו ומופיעות עכשיו בשקפים.<br />
          בדקות הקרובות נראה את התפלגות הדעות<br />
          של הכיתה — ונפתח דיון.
        </p>
        <div className="thanks-tag mono">— ההרצאה ממשיכה —</div>
      </div>
    </div>
  );
}
