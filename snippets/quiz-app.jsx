import { useState } from "react"

export const QuizApp = () => {
  const departments = [
    "Sales & CS",
    "Finance",
    "R&D/Product",
    "IT Infrastructure",
    "SEO & Marketing",
  ]

  const questions = [
    {
      stage: "Stage 1 - Discover",
      text: "Which discovery channel typically produces the highest conversion rate for new escorts?",
      options: [
        "Organic SEO arrivals who found Exotic on Google",
        "Outbound cold calls made by the sales team",
        "Referrals from existing escorts on the platform",
        "Social media advertising",
      ],
      correct: 2,
      explanation: "Referrals convert fastest because trust already exists before the first call.",
    },
    {
      stage: "Stage 1 - Discover",
      text: "After how many failed contact attempts should you mark a prospect as lost?",
      options: [
        "After 1 attempt with no response",
        "After 3 attempts over 7 days",
        "After 10 attempts over a month",
        "Only when they explicitly say they are not interested",
      ],
      correct: 1,
      explanation: "Standard practice is 3 contact attempts over 7 days before marking a lead as lost.",
    },
    {
      stage: "Stage 2 - Register",
      text: "What is the default `profile_status` immediately after registration?",
      options: ["active", "pending_review", "private", "draft"],
      correct: 2,
      explanation: "New profiles remain private until verification and subscription activation are complete.",
    },
    {
      stage: "Stage 2 - Register",
      text: "An escort self-registered on the website but does not appear in the CRM. What is your first action?",
      options: [
        "Create a new client record manually",
        "Ask them to register again with a different email",
        "Run a manual sync from CRM -> Settings -> Integrations -> [market] -> Sync clients",
        "Escalate to R&D/Product immediately",
      ],
      correct: 2,
      explanation: "Run the sync first. The record often exists in WordPress and just has not synced across yet.",
    },
    {
      stage: "Stage 3 - Media",
      text: "What is the maximum upload limit for profile photos?",
      options: [
        "10 photos, 10 MB each",
        "20 photos, 5 MB each",
        "15 photos, 8 MB each",
        "Unlimited photos, 2 MB each",
      ],
      correct: 1,
      explanation: "The current limit is 20 images at up to 5 MB each.",
    },
    {
      stage: "Stage 3 - Media",
      text: "A newly activated escort has a profile completeness score of 35%. What should you do first?",
      options: [
        "Upgrade their subscription tier immediately",
        "Guide them to complete missing profile fields and target 80%+",
        "Escalate to R&D/Product to inspect the completeness calculation",
        "Tell them to wait because all new profiles take time",
      ],
      correct: 1,
      explanation: "Low completeness is a performance problem before it is a systems problem.",
    },
    {
      stage: "Stage 4 - Verification",
      text: "When must verification be completed?",
      options: [
        "Before profile photos are uploaded",
        "Before the first subscription can be activated",
        "Before WordPress registration",
        "Before the profile appears in Google Search",
      ],
      correct: 1,
      explanation: "Verification is mandatory before first activation and is not repeated at renewal.",
    },
    {
      stage: "Stage 4 - Verification",
      text: "An escort's ID shows they are 17 years old. What is the correct action?",
      options: [
        "Approve anyway because they are close to 18",
        "Ask for a different ID",
        "Delay verification until they turn 18",
        "Decline the account, mark high risk, and escalate to a supervisor immediately",
      ],
      correct: 3,
      explanation: "Under-age applicants must be declined with no exceptions.",
    },
    {
      stage: "Stage 5a - Subscription",
      text: "An escort sees no packages on checkout. What should you check first?",
      options: [
        "Their payment history",
        "Whether the market has at least one active provider binding",
        "Their profile completeness score",
        "The WordPress sync status",
      ],
      correct: 1,
      explanation: "No packages usually means there is no active `subscription_push` provider binding for that market.",
    },
    {
      stage: "Stage 5b - Payment",
      text: "An escort wants to pay from a different phone number. Which method should CS suggest?",
      options: [
        "Update the registered phone number first",
        "Use STK Push because it works from any number",
        "Use a payment link",
        "Tell them to pay cash at an agent",
      ],
      correct: 2,
      explanation: "A payment link can be opened and completed from another supported device or phone number.",
    },
    {
      stage: "Stage 5c - Confirmation",
      text: "A payment shows `completed` but the deal is still `pending`. What is the most likely cause?",
      options: [
        "The escort cancelled after paying",
        "M-Pesa reversed the payment",
        "Provisioning is stuck",
        "The payment is not actually confirmed yet",
      ],
      correct: 2,
      explanation: "Completed payment plus a pending deal usually means provisioning failed or stalled.",
    },
    {
      stage: "Stage 5c - Confirmation",
      text: "What does `wallet_funding_settlement_review` mean?",
      options: [
        "The escort had insufficient balance",
        "The payment amount differs from the expected amount by more than 5% and Finance must review it",
        "The provider has not settled funds to Exotic yet",
        "The CRM is waiting for a second callback",
      ],
      correct: 1,
      explanation: "Amount mismatches beyond tolerance move the payment into Finance review.",
    },
    {
      stage: "Stage 5d - Activation",
      text: "Under normal conditions, how long does profile activation take after payment is confirmed?",
      options: ["Under 1 second", "30-60 seconds", "5-10 minutes", "Up to 24 hours"],
      correct: 1,
      explanation: "Normal activation time is roughly 30-60 seconds.",
    },
    {
      stage: "Stage 5e - Failures",
      text: "What does `client_unresolved` mean on a completed payment?",
      options: [
        "M-Pesa reversed the payment",
        "The escort chose the wrong package",
        "The payment could not be automatically linked to a CRM client",
        "The WordPress site was offline",
      ],
      correct: 2,
      explanation: "The payment reached the CRM but could not be matched automatically to a client record, so Sales & CS market operations need to confirm the correct client before provisioning can complete.",
    },
    {
      stage: "Stage 5e - Failures",
      text: "Logs show `webhook_verification_failed` errors during a 90-minute window. What is the root cause?",
      options: [
        "The WordPress site was down",
        "The webhook secret is mismatched",
        "The escorts paid the wrong amount",
        "The payment provider is offline",
      ],
      correct: 1,
      explanation: "A 401 verification failure points to a webhook secret mismatch.",
    },
    {
      stage: "Stage 6 - Contact",
      text: "An escort has been live for 2 weeks and reports no WhatsApp messages. What is the most likely cause?",
      options: [
        "The WhatsApp integration is broken",
        "The profile quality, completeness, or tier is too weak to generate visibility",
        "The escort's number is not on WhatsApp",
        "The escort needs re-verification",
      ],
      correct: 1,
      explanation: "This is usually a visibility or profile-quality issue, not a contact-channel failure.",
    },
    {
      stage: "Stage 6 - Contact",
      text: "What is Exotic Chat and what problem does it solve?",
      options: [
        "A CRM tool for staff to message escorts internally",
        "A bulk WhatsApp tool for renewal campaigns",
        "A future Exotic-to-escort communication channel for more consistent support, renewals, and updates",
        "A replacement for the SupportBoard live chat widget",
      ],
      correct: 2,
      explanation: "Exotic Chat is being built to help Exotic maintain more consistent communication with escorts. It is not the public visitor contact method on profile pages.",
    },
    {
      stage: "Stage 7 - Renewal",
      text: "What happens to profile data when a subscription expires?",
      options: [
        "The profile and photos are deleted",
        "The profile is set to private but the data is preserved",
        "The profile becomes a free listing",
        "The profile stays live for 7 more days automatically",
      ],
      correct: 1,
      explanation: "Expiry hides the profile but preserves the data for faster renewal recovery.",
    },
    {
      stage: "Stage 8 - Upgrades",
      text: "How are package upgrades processed on Exotic?",
      options: [
        "The escort upgrades themselves from a dashboard",
        "Staff process upgrades through the CRM deal flow",
        "Upgrades are automatic once enquiries increase",
        "The escort emails support and waits 24 hours",
      ],
      correct: 1,
      explanation: "Upgrades are staff-assisted and flow through CRM deal updates plus payment confirmation.",
    },
    {
      stage: "Cross-stage - Ownership",
      text: "Who owns package tiers and pricing, and who makes the final decision to open a new market?",
      options: [
        "Finance owns tiers and pricing, while R&D/Product decides new markets",
        "The CS head for each market or region owns tiers and pricing with Head of CS/Sales approval, while the CEO decides on market expansion",
        "SEO & Marketing owns tiers and pricing, while Sales & CS decides on market expansion",
        "R&D/Product owns tiers, pricing, and market expansion",
      ],
      correct: 1,
      explanation: "Commercial ownership sits with market or regional CS leadership, with Head of CS/Sales approval. The CEO makes the final market-expansion decision, guided by Sales, RD, and market research.",
    },
  ]

  const cardStyle = {
    border: "1px solid #e5e7eb",
    borderRadius: "16px",
    padding: "24px",
    background: "#ffffff",
  }

  const buttonStyle = {
    border: 0,
    borderRadius: "999px",
    padding: "12px 18px",
    fontWeight: 700,
  }

  const [started, setStarted] = useState(false)
  const [name, setName] = useState("")
  const [department, setDepartment] = useState("")
  const [index, setIndex] = useState(0)
  const [answers, setAnswers] = useState([])
  const [selected, setSelected] = useState(null)
  const [finished, setFinished] = useState(false)

  const currentQuestion = questions[index]
  const score = answers.reduce((total, answer, answerIndex) => {
    return total + (answer === questions[answerIndex].correct ? 1 : 0)
  }, 0)
  const percentage = Math.round((score / questions.length) * 100)
  const passed = percentage >= 80
  const wrongAnswers = answers
    .map((answer, answerIndex) => ({ answer, question: questions[answerIndex] }))
    .filter((item) => item.answer !== item.question.correct)

  const beginQuiz = () => {
    if (!name.trim()) {
      return
    }

    setStarted(true)
  }

  const submitAnswer = (choice) => {
    if (selected !== null) {
      return
    }

    setSelected(choice)
  }

  const goNext = () => {
    const nextAnswers = [...answers, selected]
    setAnswers(nextAnswers)
    setSelected(null)

    if (index === questions.length - 1) {
      setFinished(true)
      return
    }

    setIndex(index + 1)
  }

  const resetQuiz = () => {
    setStarted(false)
    setIndex(0)
    setAnswers([])
    setSelected(null)
    setFinished(false)
  }

  const certificateDate = () => {
    return new Intl.DateTimeFormat("en-GB", {
      day: "numeric",
      month: "long",
      year: "numeric",
    }).format(new Date())
  }

  if (!started) {
    return (
      <div className="not-prose" style={cardStyle}>
        <h2 style={{ marginTop: 0, marginBottom: "8px" }}>Certification Quiz</h2>
        <p style={{ marginTop: 0, color: "#4b5563" }}>
          20 questions across the full escort lifecycle. Score 80% or above to pass.
        </p>
        <div style={{ display: "grid", gap: "12px", marginTop: "20px" }}>
          <label>
            <div style={{ fontWeight: 600, marginBottom: "6px" }}>Your full name</div>
            <input
              value={name}
              onChange={(event) => setName(event.target.value)}
              placeholder="e.g. Amara Osei"
              style={{ width: "100%", padding: "12px", borderRadius: "10px", border: "1px solid #d1d5db" }}
            />
          </label>
          <label>
            <div style={{ fontWeight: 600, marginBottom: "6px" }}>Department</div>
            <select
              value={department}
              onChange={(event) => setDepartment(event.target.value)}
              style={{ width: "100%", padding: "12px", borderRadius: "10px", border: "1px solid #d1d5db" }}
            >
              <option value="">Select department</option>
              {departments.map((item) => (
                <option key={item} value={item}>
                  {item}
                </option>
              ))}
            </select>
          </label>
        </div>
        <div style={{ display: "flex", gap: "12px", flexWrap: "wrap", marginTop: "18px", color: "#6b7280" }}>
          <span><strong>20</strong> questions</span>
          <span><strong>80%</strong> pass mark</span>
          <span><strong>All 54 African markets</strong> scope</span>
        </div>
        <button
          onClick={beginQuiz}
          disabled={!name.trim()}
          style={{
            ...buttonStyle,
            marginTop: "18px",
            background: "#fc2c24",
            color: "#ffffff",
            cursor: !name.trim() ? "not-allowed" : "pointer",
            opacity: !name.trim() ? 0.5 : 1,
          }}
        >
          Start quiz
        </button>
      </div>
    )
  }

  if (!finished) {
    const isCorrect = selected === currentQuestion.correct

    return (
      <div className="not-prose" style={cardStyle}>
        <div style={{ fontSize: "12px", fontWeight: 700, color: "#fc2c24", textTransform: "uppercase", letterSpacing: "0.08em" }}>
          {currentQuestion.stage}
        </div>
        <div style={{ marginTop: "10px", marginBottom: "6px", fontSize: "14px", color: "#6b7280" }}>
          Question {index + 1} of {questions.length}
        </div>
        <div style={{ height: "8px", borderRadius: "999px", background: "#e5e7eb", overflow: "hidden", marginTop: "10px" }}>
          <div
            style={{
              width: `${((index + 1) / questions.length) * 100}%`,
              height: "100%",
              background: "#fc2c24",
            }}
          />
        </div>
        <h2 style={{ marginTop: "18px", marginBottom: "16px" }}>{currentQuestion.text}</h2>

        <div style={{ display: "grid", gap: "10px" }}>
          {currentQuestion.options.map((option, optionIndex) => {
            const showState = selected !== null
            const background =
              !showState
                ? "#ffffff"
                : optionIndex === currentQuestion.correct
                  ? "#dcfce7"
                  : optionIndex === selected
                    ? "#fee2e2"
                    : "#ffffff"
            const border =
              !showState
                ? "1px solid #d1d5db"
                : optionIndex === currentQuestion.correct
                  ? "1px solid #16a34a"
                  : optionIndex === selected
                    ? "1px solid #dc2626"
                    : "1px solid #d1d5db"

            return (
              <button
                key={option}
                onClick={() => submitAnswer(optionIndex)}
                disabled={selected !== null}
                style={{
                  textAlign: "left",
                  padding: "14px 16px",
                  borderRadius: "12px",
                  border,
                  background,
                  cursor: selected !== null ? "default" : "pointer",
                  fontWeight: 500,
                }}
              >
                {String.fromCharCode(65 + optionIndex)}. {option}
              </button>
            )
          })}
        </div>

        {selected !== null && (
          <div
            style={{
              marginTop: "16px",
              padding: "14px 16px",
              borderRadius: "12px",
              background: isCorrect ? "#dcfce7" : "#fef3c7",
            }}
          >
            <strong>{isCorrect ? "Correct." : "Not quite."}</strong> {currentQuestion.explanation}
          </div>
        )}

        <button
          onClick={goNext}
          disabled={selected === null}
          style={{
            ...buttonStyle,
            marginTop: "18px",
            background: "#111827",
            color: "#ffffff",
            cursor: selected === null ? "not-allowed" : "pointer",
            opacity: selected === null ? 0.5 : 1,
          }}
        >
          {index === questions.length - 1 ? "See results" : "Next question"}
        </button>
      </div>
    )
  }

  return (
    <div className="not-prose" style={{ display: "grid", gap: "20px" }}>
      <div style={cardStyle}>
        <h2 style={{ marginTop: 0 }}>Quiz Results</h2>
        <p>
          {name}, you scored <strong>{percentage}%</strong> ({score}/{questions.length}).
        </p>
        <p>
          {passed
            ? "You passed the certification quiz."
            : "You need 80% or above to pass. Review the answers below and try again."}
        </p>
        <div style={{ display: "flex", gap: "12px", flexWrap: "wrap", marginTop: "16px" }}>
          {passed && (
            <button
              onClick={() => window.print()}
              style={{ ...buttonStyle, background: "#fc2c24", color: "#ffffff", cursor: "pointer" }}
            >
              Print certificate
            </button>
          )}
          <button
            onClick={resetQuiz}
            style={{ ...buttonStyle, background: "#111827", color: "#ffffff", cursor: "pointer" }}
          >
            Retake quiz
          </button>
        </div>
      </div>

      {passed && (
        <div style={{ border: "2px solid #fc2c24", borderRadius: "16px", padding: "28px", background: "#ffffff" }}>
          <div style={{ fontSize: "12px", letterSpacing: "0.12em", textTransform: "uppercase", color: "#6b7280" }}>
            Certificate of Completion
          </div>
          <h2 style={{ marginBottom: "8px" }}>{name}</h2>
          <p style={{ marginTop: 0 }}>
            has successfully completed the Exotic Online University certification with a score of <strong>{percentage}%</strong>.
          </p>
          <div style={{ display: "grid", gap: "6px", marginTop: "18px" }}>
            <div><strong>Department:</strong> {department || "Not provided"}</div>
            <div><strong>Date issued:</strong> {certificateDate()}</div>
            <div><strong>Scope:</strong> All 54 African markets</div>
          </div>
        </div>
      )}

      {wrongAnswers.length > 0 && (
        <div style={cardStyle}>
          <h2 style={{ marginTop: 0 }}>Questions To Review</h2>
          <div style={{ display: "grid", gap: "14px" }}>
            {wrongAnswers.map((item, reviewIndex) => (
              <div
                key={`${item.question.text}-${reviewIndex}`}
                style={{ padding: "14px 16px", borderRadius: "12px", background: "#f9fafb" }}
              >
                <div style={{ fontWeight: 700 }}>{item.question.text}</div>
                <div style={{ marginTop: "6px" }}>
                  <strong>Your answer:</strong> {item.question.options[item.answer]}
                </div>
                <div>
                  <strong>Correct answer:</strong> {item.question.options[item.question.correct]}
                </div>
                <div style={{ marginTop: "6px", color: "#4b5563" }}>{item.question.explanation}</div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}
