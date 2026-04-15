import './Survey.css';
import './LLMSurvey.css';

export default function LLMThanks() {
  return (
    <div className="thanks-page deck-llm-page">
      <div className="thanks-content fade-up">
        <div className="thanks-check">✓</div>
        <h2>תודה — אתה עכשיו <em>token</em>.</h2>
        <p>
          התשובות שלך נשמרו ומופיעות עכשיו בשקפים.<br />
          בדקות הקרובות נראה איך מודל שפה מעבד<br />
          את הטקסטים שכתבתם.
        </p>
        <div className="thanks-tag mono">— ההרצאה ממשיכה —</div>
      </div>
    </div>
  );
}
