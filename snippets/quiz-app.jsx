import { useState } from "react"

export const QuizApp = () => {
  const departments = [
    "Sales & CS",
    "Finance",
    "R&D/Product",
    "IT Infrastructure",
    "SEO & Marketing",
  ]

  const scoredQuestions = [
    {
      stage: "Sales fundamentals",
      text: "An escort says, 'Why should I pay for Exotic when there are free listing sites?' Which answer is strongest?",
      options: [
        "Because Exotic looks more premium than free sites",
        "Because paid profiles get better visibility, higher-quality leads, and dedicated support",
        "Because all free sites are scams",
        "Because Exotic is the cheapest platform in every market",
      ],
      correct: 1,
      explanation: "The strongest answer ties together visibility, lead quality, and ongoing support.",
    },
    {
      stage: "Discount judgment",
      text: "A customer asks for a discount immediately. What should the agent do first?",
      options: [
        "Give the discount quickly to avoid losing them",
        "Refuse all discounts because it creates bad habits",
        "Understand the reason, solve the real objection, then decide if a discount is commercially justified",
        "Escalate every discount request to Finance",
      ],
      correct: 2,
      explanation: "Discounting should support a real commercial purpose, not replace diagnosis or relationship management.",
    },
    {
      stage: "Lead quality",
      text: "An escort says they are getting low-quality leads. What is the best first response?",
      options: [
        "Promise a refund immediately",
        "Check profile quality, tier, market context, and traffic signals before deciding the root cause",
        "Tell them all leads are the same everywhere",
        "Escalate directly to IT Infrastructure",
      ],
      correct: 1,
      explanation: "Low-quality-lead complaints need diagnosis first: profile quality, tier, visibility, and market context matter.",
    },
    {
      stage: "Retention",
      text: "A customer says they want to leave Exotic for a competitor. What is the strongest sales response?",
      options: [
        "Let them go immediately so you can focus on other customers",
        "Argue that the competitor is worse and end the call",
        "Understand why they want to leave, reinforce retained value, and work on the real issue before offering any concession",
        "Transfer the case to Finance because churn is a revenue problem",
      ],
      correct: 2,
      explanation: "The best retention response is curious, calm, and issue-focused rather than defensive or transactional.",
    },
    {
      stage: "Market diagnosis",
      text: "Sales suddenly drop in your market. What should you check first?",
      options: [
        "Only ask agents to make more calls",
        "Traffic, indexation, contact-tap trends, payment failures, new sign-ups, expired subscriptions, and renewal activity",
        "Whether every customer needs a discount",
        "Only the Finance reconciliation report",
      ],
      correct: 1,
      explanation: "A market drop needs a full funnel diagnosis before deciding where the issue sits.",
    },
    {
      stage: "Escalation discipline",
      text: "If multiple escorts in one market complain at the same time that they are not getting calls, what is the best next move?",
      options: [
        "Treat every complaint as unrelated and answer one by one only",
        "Check whether it is a market-wide pattern and compare traffic, visibility, and conversion data with SEO & Marketing",
        "Tell everyone to upgrade immediately",
        "Assume WhatsApp is broken and blame IT Infrastructure",
      ],
      correct: 1,
      explanation: "A cluster of similar complaints usually needs a market-level diagnosis, not only one-to-one replies.",
    },
    {
      stage: "Renewal mindset",
      text: "Which activity usually gives the highest ROI for Sales & CS?",
      options: [
        "Cold outbound only",
        "Renewals and retention conversations",
        "Giving all customers discounts",
        "Waiting for self-service sign-ups",
      ],
      correct: 1,
      explanation: "Renewals are high ROI because the relationship, profile, and trust already exist.",
    },
    {
      stage: "Self-service conversion",
      text: "A new escort registered by themselves overnight. What should the agent do?",
      options: [
        "Wait and see if they subscribe without support",
        "Reach out proactively, guide them, and help convert them while intent is still warm",
        "Mark them as lost if they did not pay immediately",
        "Escalate them to R&D/Product",
      ],
      correct: 1,
      explanation: "Warm self-service sign-ups are already halfway down the funnel and should be worked proactively.",
    },
    {
      stage: "Customer experience",
      text: "What is the healthiest way to think about discounts?",
      options: [
        "As a cure for every objection",
        "As something Finance owns completely",
        "As a commercial tool that can prevent churn when used well, but create dependency when used badly",
        "As proof that the platform is overpriced",
      ],
      correct: 2,
      explanation: "Discounts should protect customer experience and revenue, but poor discipline creates long-term damage.",
    },
    {
      stage: "Low visibility",
      text: "An escort says, 'My profile is not visible.' What should you do first?",
      options: [
        "Check the public site yourself, confirm the profile is live, and verify city/category/tier before escalating",
        "Tell them Google is probably delayed",
        "Issue a free trial immediately",
        "Ask Finance to inspect the deal",
      ],
      correct: 0,
      explanation: "Always verify the live experience first before promising a fix or blaming another team.",
    },
    {
      stage: "Commercial ownership",
      text: "Who owns package tiers and pricing decisions?",
      options: [
        "Finance",
        "R&D/Product",
        "The CS head for each market or region, with Head of CS/Sales approval",
        "SEO & Marketing",
      ],
      correct: 2,
      explanation: "Commercial ownership sits with CS leadership, not the technical or finance teams.",
    },
    {
      stage: "Cross-functional response",
      text: "If traffic is healthy but payment completion suddenly falls, who should Sales & CS involve fastest?",
      options: [
        "R&D/Product and IT Infrastructure, because the problem may be in payment flow or environment health",
        "Only SEO & Marketing",
        "Only Finance",
        "No one - just wait 24 hours",
      ],
      correct: 0,
      explanation: "A drop after traffic but before activation points to checkout, callback, or environment issues.",
    },
  ]

  const reflectionQuestions = [
    {
      id: "discount_call",
      stage: "Sales scenario",
      title: "A customer is asking for a discount. How do you decide whether to give one?",
      placeholder: "Explain how you would diagnose the reason, protect customer experience, and stay within market discount guardrails.",
      maxLength: 400,
    },
    {
      id: "low_quality_leads",
      stage: "Sales scenario",
      title: "A customer is complaining about low-quality leads. How do you respond and what do you check first?",
      placeholder: "Describe your response, what you would inspect, and when you would escalate.",
      maxLength: 450,
    },
    {
      id: "wants_to_leave",
      stage: "Retention scenario",
      title: "A customer wants to leave Exotic. Walk through your retention approach.",
      placeholder: "Explain how you would understand the issue, retain value, and decide whether an offer is justified.",
      maxLength: 450,
    },
    {
      id: "market_drop",
      stage: "Market diagnosis",
      title: "Sales have dropped in your market. How would you diagnose the issue and who would you escalate to?",
      placeholder: "Cover traffic, visibility, conversion, payments, renewals, and the cross-functional teams you would involve.",
      maxLength: 500,
    },
    {
      id: "biggest_blocker",
      stage: "Your view",
      title: "In your own opinion, what is the biggest blocker to Customers and Revenue in your market right now?",
      placeholder: "Share your honest assessment and why you believe it matters most.",
      maxLength: 350,
    },
    {
      id: "typical_day",
      stage: "Take me through your day",
      title: "Take me through your typical day as a Sales & CS agent.",
      placeholder: "Describe how you work the day: operations checks, outbound sales, renewals, payment recovery, support, visibility complaints, and wrap-up.",
      maxLength: 700,
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
  const [email, setEmail] = useState("")
  const [department, setDepartment] = useState("Sales & CS")
  const [index, setIndex] = useState(0)
  const [selected, setSelected] = useState(null)
  const [mcqAnswers, setMcqAnswers] = useState([])
  const [reflections, setReflections] = useState({})
  const [finished, setFinished] = useState(false)
  const [copied, setCopied] = useState(false)

  const totalQuestions = scoredQuestions.length + reflectionQuestions.length
  const isReflectionStage = index >= scoredQuestions.length
  const currentScoredQuestion = !isReflectionStage ? scoredQuestions[index] : null
  const currentReflection = isReflectionStage ? reflectionQuestions[index - scoredQuestions.length] : null
  const currentReflectionValue = currentReflection ? reflections[currentReflection.id] || "" : ""
  const score = mcqAnswers.reduce((total, answer, answerIndex) => {
    return total + (answer === scoredQuestions[answerIndex].correct ? 1 : 0)
  }, 0)
  const percentage = Math.round((score / scoredQuestions.length) * 100)
  const passed = percentage >= 80 && reflectionQuestions.every((question) => (reflections[question.id] || "").trim())
  const wrongAnswers = mcqAnswers
    .map((answer, answerIndex) => ({ answer, question: scoredQuestions[answerIndex] }))
    .filter((item) => item.answer !== item.question.correct)

  const beginQuiz = () => {
    if (!name.trim() || !email.trim()) {
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

  const updateReflection = (questionId, value) => {
    setReflections((current) => ({
      ...current,
      [questionId]: value,
    }))
  }

  const goNext = () => {
    if (!isReflectionStage) {
      const nextAnswers = [...mcqAnswers, selected]
      setMcqAnswers(nextAnswers)
      setSelected(null)
    }

    if (index === totalQuestions - 1) {
      setFinished(true)
      return
    }

    setIndex(index + 1)
  }

  const resetQuiz = () => {
    setStarted(false)
    setIndex(0)
    setSelected(null)
    setMcqAnswers([])
    setReflections({})
    setFinished(false)
    setCopied(false)
  }

  const certificateDate = () => {
    return new Intl.DateTimeFormat("en-GB", {
      day: "numeric",
      month: "long",
      year: "numeric",
    }).format(new Date())
  }

  const buildSummary = () => {
    const scoredSection = scoredQuestions.map((question, questionIndex) => {
      const chosenIndex = mcqAnswers[questionIndex]
      const chosenAnswer = chosenIndex === undefined ? "Not answered" : question.options[chosenIndex]
      const correctAnswer = question.options[question.correct]

      return [
        `${questionIndex + 1}. ${question.text}`,
        `Chosen answer: ${chosenAnswer}`,
        `Correct answer: ${correctAnswer}`,
        `Explanation: ${question.explanation}`,
      ].join("\n")
    }).join("\n\n")

    const reflectionSection = reflectionQuestions.map((question, questionIndex) => {
      return [
        `${questionIndex + 1}. ${question.title}`,
        `Response: ${(reflections[question.id] || "").trim() || "No response provided"}`,
      ].join("\n")
    }).join("\n\n")

    return [
      "Exotic Online University - Sales Quiz Submission",
      `Name: ${name}`,
      `Email: ${email}`,
      `Department: ${department || "Not provided"}`,
      `Date: ${certificateDate()}`,
      `Score: ${percentage}% (${score}/${scoredQuestions.length})`,
      `Status: ${passed ? "Passed" : "Review needed"}`,
      "",
      "Scored sales questions",
      scoredSection,
      "",
      "Written responses",
      reflectionSection,
    ].join("\n")
  }

  const emailSummary = () => {
    const recipients = [email.trim(), "ian@exotic-online.com", "ceo@exotic-online.com"].filter(Boolean).join(",")
    const subject = `Exotic Online University Sales Quiz - ${name}`
    const body = buildSummary()

    return `mailto:${recipients}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`
  }

  const copySummary = async () => {
    try {
      await navigator.clipboard.writeText(buildSummary())
      setCopied(true)
    } catch {
      setCopied(false)
    }
  }

  if (!started) {
    return (
      <div className="not-prose" style={cardStyle}>
        <h2 style={{ marginTop: 0, marginBottom: "8px" }}>Sales Readiness Quiz</h2>
        <p style={{ marginTop: 0, color: "#4b5563" }}>
          Sales-focused certification with scored questions plus written responses on discounting, lead quality, churn risk, and market diagnosis.
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
            <div style={{ fontWeight: 600, marginBottom: "6px" }}>Your email</div>
            <input
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              placeholder="e.g. amara@exotic-online.com"
              type="email"
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
              {departments.map((item) => (
                <option key={item} value={item}>
                  {item}
                </option>
              ))}
            </select>
          </label>
        </div>
        <div style={{ display: "flex", gap: "12px", flexWrap: "wrap", marginTop: "18px", color: "#6b7280" }}>
          <span><strong>{scoredQuestions.length}</strong> scored sales questions</span>
          <span><strong>{reflectionQuestions.length}</strong> written responses</span>
          <span><strong>80%</strong> pass mark</span>
        </div>
        <div style={{ marginTop: "16px", padding: "14px 16px", borderRadius: "12px", background: "#f9fafb", color: "#4b5563" }}>
          Responses are compiled into an email draft addressed to you, <strong>ian@exotic-online.com</strong>, and <strong>ceo@exotic-online.com</strong> when you finish.
        </div>
        <button
          onClick={beginQuiz}
          disabled={!name.trim() || !email.trim()}
          style={{
            ...buttonStyle,
            marginTop: "18px",
            background: "#fc2c24",
            color: "#ffffff",
            cursor: !name.trim() || !email.trim() ? "not-allowed" : "pointer",
            opacity: !name.trim() || !email.trim() ? 0.5 : 1,
          }}
        >
          Start quiz
        </button>
      </div>
    )
  }

  if (!finished && !isReflectionStage) {
    const isCorrect = selected === currentScoredQuestion.correct

    return (
      <div className="not-prose" style={cardStyle}>
        <div style={{ fontSize: "12px", fontWeight: 700, color: "#fc2c24", textTransform: "uppercase", letterSpacing: "0.08em" }}>
          {currentScoredQuestion.stage}
        </div>
        <div style={{ marginTop: "10px", marginBottom: "6px", fontSize: "14px", color: "#6b7280" }}>
          Question {index + 1} of {totalQuestions}
        </div>
        <div style={{ height: "8px", borderRadius: "999px", background: "#e5e7eb", overflow: "hidden", marginTop: "10px" }}>
          <div
            style={{
              width: `${((index + 1) / totalQuestions) * 100}%`,
              height: "100%",
              background: "#fc2c24",
            }}
          />
        </div>
        <h2 style={{ marginTop: "18px", marginBottom: "16px" }}>{currentScoredQuestion.text}</h2>

        <div style={{ display: "grid", gap: "10px" }}>
          {currentScoredQuestion.options.map((option, optionIndex) => {
            const showState = selected !== null
            const background =
              !showState
                ? "#ffffff"
                : optionIndex === currentScoredQuestion.correct
                  ? "#dcfce7"
                  : optionIndex === selected
                    ? "#fee2e2"
                    : "#ffffff"
            const border =
              !showState
                ? "1px solid #d1d5db"
                : optionIndex === currentScoredQuestion.correct
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
            <strong>{isCorrect ? "Correct." : "Not quite."}</strong> {currentScoredQuestion.explanation}
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
          {index === scoredQuestions.length - 1 ? "Move to written responses" : "Next question"}
        </button>
      </div>
    )
  }

  if (!finished && isReflectionStage) {
    return (
      <div className="not-prose" style={cardStyle}>
        <div style={{ fontSize: "12px", fontWeight: 700, color: "#fc2c24", textTransform: "uppercase", letterSpacing: "0.08em" }}>
          {currentReflection.stage}
        </div>
        <div style={{ marginTop: "10px", marginBottom: "6px", fontSize: "14px", color: "#6b7280" }}>
          Question {index + 1} of {totalQuestions}
        </div>
        <div style={{ height: "8px", borderRadius: "999px", background: "#e5e7eb", overflow: "hidden", marginTop: "10px" }}>
          <div
            style={{
              width: `${((index + 1) / totalQuestions) * 100}%`,
              height: "100%",
              background: "#fc2c24",
            }}
          />
        </div>
        <h2 style={{ marginTop: "18px", marginBottom: "12px" }}>{currentReflection.title}</h2>
        <p style={{ marginTop: 0, marginBottom: "14px", color: "#6b7280" }}>
          Keep it practical and specific. Your response is included in the submission email summary.
        </p>
        <textarea
          value={currentReflectionValue}
          onChange={(event) => updateReflection(currentReflection.id, event.target.value)}
          placeholder={currentReflection.placeholder}
          maxLength={currentReflection.maxLength}
          style={{
            width: "100%",
            minHeight: "220px",
            padding: "14px 16px",
            borderRadius: "12px",
            border: "1px solid #d1d5db",
            resize: "vertical",
            font: "inherit",
            lineHeight: 1.6,
          }}
        />
        <div style={{ marginTop: "10px", color: "#6b7280", fontSize: "13px" }}>
          {currentReflectionValue.length}/{currentReflection.maxLength} characters
        </div>
        <button
          onClick={goNext}
          disabled={!currentReflectionValue.trim()}
          style={{
            ...buttonStyle,
            marginTop: "18px",
            background: "#111827",
            color: "#ffffff",
            cursor: !currentReflectionValue.trim() ? "not-allowed" : "pointer",
            opacity: !currentReflectionValue.trim() ? 0.5 : 1,
          }}
        >
          {index === totalQuestions - 1 ? "Finish quiz" : "Next response"}
        </button>
      </div>
    )
  }

  return (
    <div className="not-prose" style={{ display: "grid", gap: "20px" }}>
      <div style={cardStyle}>
        <h2 style={{ marginTop: 0 }}>Quiz Results</h2>
        <p>
          {name}, you scored <strong>{percentage}%</strong> ({score}/{scoredQuestions.length}) on the scored sales questions.
        </p>
        <p>
          {passed
            ? "You passed the scored section and completed all written responses."
            : "Review the scored questions below and refine your written answers if needed."}
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
          <a
            href={emailSummary()}
            style={{
              ...buttonStyle,
              display: "inline-flex",
              alignItems: "center",
              justifyContent: "center",
              background: "#111827",
              color: "#ffffff",
              textDecoration: "none",
            }}
          >
            Open email draft
          </a>
          <button
            onClick={copySummary}
            style={{ ...buttonStyle, background: "#f3f4f6", color: "#111827", cursor: "pointer" }}
          >
            {copied ? "Copied summary" : "Copy summary"}
          </button>
          <button
            onClick={resetQuiz}
            style={{ ...buttonStyle, background: "#ffffff", color: "#111827", border: "1px solid #d1d5db", cursor: "pointer" }}
          >
            Retake quiz
          </button>
        </div>
        <div style={{ marginTop: "16px", padding: "14px 16px", borderRadius: "12px", background: "#f9fafb", color: "#4b5563" }}>
          This docs site is static, so the quiz prepares a full email draft with your answers addressed to you, <strong>ian@exotic-online.com</strong>, and <strong>ceo@exotic-online.com</strong>. Use <strong>Copy summary</strong> as a backup if your email client trims long responses.
        </div>
      </div>

      {passed && (
        <div style={{ border: "2px solid #fc2c24", borderRadius: "16px", padding: "28px", background: "#ffffff" }}>
          <div style={{ fontSize: "12px", letterSpacing: "0.12em", textTransform: "uppercase", color: "#6b7280" }}>
            Certificate of Completion
          </div>
          <h2 style={{ marginBottom: "8px" }}>{name}</h2>
          <p style={{ marginTop: 0 }}>
            has successfully completed the Exotic Online University sales readiness quiz with a scored result of <strong>{percentage}%</strong>.
          </p>
          <div style={{ display: "grid", gap: "6px", marginTop: "18px" }}>
            <div><strong>Email:</strong> {email}</div>
            <div><strong>Department:</strong> {department || "Not provided"}</div>
            <div><strong>Date issued:</strong> {certificateDate()}</div>
            <div><strong>Scope:</strong> Sales judgment, retention, discounts, market diagnosis, and customer experience</div>
          </div>
        </div>
      )}

      {wrongAnswers.length > 0 && (
        <div style={cardStyle}>
          <h3 style={{ marginTop: 0 }}>Scored questions to review</h3>
          <div style={{ display: "grid", gap: "16px" }}>
            {wrongAnswers.map(({ answer, question }) => (
              <div key={question.text} style={{ paddingTop: "12px", borderTop: "1px solid #e5e7eb" }}>
                <div style={{ fontWeight: 700 }}>{question.text}</div>
                <div style={{ marginTop: "8px", color: "#b91c1c" }}>
                  <strong>Your answer:</strong> {question.options[answer] || "Not answered"}
                </div>
                <div style={{ marginTop: "6px", color: "#166534" }}>
                  <strong>Best answer:</strong> {question.options[question.correct]}
                </div>
                <div style={{ marginTop: "6px", color: "#4b5563" }}>{question.explanation}</div>
              </div>
            ))}
          </div>
        </div>
      )}

      <div style={cardStyle}>
        <h3 style={{ marginTop: 0 }}>Written response summary</h3>
        <div style={{ display: "grid", gap: "16px" }}>
          {reflectionQuestions.map((question) => (
            <div key={question.id} style={{ paddingTop: "12px", borderTop: "1px solid #e5e7eb" }}>
              <div style={{ fontWeight: 700 }}>{question.title}</div>
              <div style={{ marginTop: "8px", whiteSpace: "pre-wrap", color: "#374151" }}>
                {(reflections[question.id] || "").trim() || "No response provided"}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
