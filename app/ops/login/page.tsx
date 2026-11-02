"use client";

import { useState, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { login } from "./actions";

function LoginForm() {
  const searchParams = useSearchParams();
  const error = searchParams.get("error");
  const [email, setEmail] = useState("info@sashagc.com");

  return (
    <div className="login-card">
      <div className="login-logo-header">
        <img src="/sasha-mark.svg" alt="SASHA GC Logo" width="56" height="56" className="login-brand-icon" />
        <div className="login-logo-text">
          SASHA <span>GC</span>
        </div>
      </div>
      <h1>Operations Portal</h1>
      <p className="login-sub">
        Authorized management access for SASHA General Contracting Abu Dhabi.
      </p>

      {error && (
        <div className="login-error-alert" role="alert">
          The identifier or password was not accepted. Please verify credentials.
        </div>
      )}

      <form className="login-form" action={login}>
        <div className="form-group">
          <label htmlFor="email">Operator Account / Email</label>
          <input
            id="email"
            name="email"
            type="text"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            autoComplete="username"
            placeholder="e.g. naushad@sashagc.com or amzad@sashagc.com"
          />
        </div>

        <div className="form-group">
          <label htmlFor="password">Security Password</label>
          <input
            id="password"
            name="password"
            type="password"
            required
            autoComplete="current-password"
            placeholder="Enter operations password"
          />
        </div>

        <button type="submit" className="btn-login-submit">
          Sign In to Operations Desk →
        </button>
      </form>

      <div className="operator-quick-hints">
        <span className="hint-label">Quick Select Operator:</span>
        <div className="hint-badges">
          <button
            type="button"
            className={`hint-badge-btn ${email === "amzad@sashagc.com" ? "selected" : ""}`}
            onClick={() => setEmail("amzad@sashagc.com")}
          >
            👤 Amzad Ali (COO)
          </button>
          <button
            type="button"
            className={`hint-badge-btn ${email === "naushad@sashagc.com" ? "selected" : ""}`}
            onClick={() => setEmail("naushad@sashagc.com")}
          >
            👤 Mohammad Naushad (MD)
          </button>
          <button
            type="button"
            className={`hint-badge-btn ${email === "info@sashagc.com" ? "selected" : ""}`}
            onClick={() => setEmail("info@sashagc.com")}
          >
            🛡️ Admin (info@sashagc.com)
          </button>
        </div>
      </div>

      <div className="login-footer">
        <a href="/">← Return to Public Website</a>
      </div>
    </div>
  );
}

export default function Login() {
  return (
    <main className="ops-login-page">
      <Suspense fallback={<div className="login-card"><p>Loading portal...</p></div>}>
        <LoginForm />
      </Suspense>
    </main>
  );
}
