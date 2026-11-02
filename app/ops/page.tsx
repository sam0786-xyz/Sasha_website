import { db } from "@/lib/db";
import { isAuthed, getCurrentUser } from "@/lib/auth";
import { redirect } from "next/navigation";
import { VoiceDesk } from "@/components/VoiceDesk";
import {
  closeJob,
  openJob,
  deleteJob,
  createJob,
  approveRecord,
  deleteRecord,
  deleteEnquiry,
  logout,
} from "./actions";

export default async function OpsPage() {
  if (!(await isAuthed())) {
    redirect("/ops/login");
  }

  const currentUser = await getCurrentUser();

  const [jobs, records, enquiries] = await Promise.all([
    db.job.findMany(),
    db.record.findMany({ take: 30 }),
    db.enquiry.findMany({ take: 30 }),
  ]);

  const openJobsCount = jobs.filter((j) => j.status === "OPEN").length;
  const draftRecordsCount = records.filter((r) => r.status === "DRAFT").length;

  return (
    <div className="ops-dashboard-wrapper">
      {/* Top Navbar */}
      <header className="ops-top-nav">
        <div className="ops-brand">
          <img src="/sasha-mark.svg" alt="SASHA GC" width="40" height="40" className="ops-nav-logo" />
          <div className="ops-brand-info">
            <span className="brand-title">SASHA <span>GC</span></span>
            <span className="ops-badge">OPERATIONS DESK</span>
          </div>
        </div>

        <div className="ops-user-badge">
          <span className="ops-user-avatar">
            {currentUser?.name?.slice(0, 2).toUpperCase() || "OP"}
          </span>
          <div className="ops-user-meta">
            <strong>{currentUser?.name || "Operations Officer"}</strong>
            <small>{currentUser?.title || "Abu Dhabi Hub"}</small>
          </div>
        </div>

        <div className="ops-nav-actions">
          <a href="/" target="_blank" className="btn-view-site">
            View Live Public Site ↗
          </a>
          <form action={logout}>
            <button type="submit" className="btn-ops-logout">
              Sign Out
            </button>
          </form>
        </div>
      </header>

      <main className="ops-container">
        {/* Metric Badges */}
        <div className="ops-stats-grid">
          <div className="stat-card">
            <span className="stat-num">{openJobsCount}</span>
            <span className="stat-label">Live Public Opportunities</span>
            <small>Displayed on top carousel & listings</small>
          </div>
          <div className="stat-card highlight">
            <span className="stat-num">{draftRecordsCount}</span>
            <span className="stat-label">Pending AI Drafts</span>
            <small>Offers, Visas, Contracts, Bills</small>
          </div>
          <div className="stat-card">
            <span className="stat-num">{enquiries.length}</span>
            <span className="stat-label">Received Requirements</span>
            <small>From employers & site contractors</small>
          </div>
        </div>

        {/* Voice Operations Component */}
        <section className="ops-section voice-section">
          <VoiceDesk />
        </section>

        {/* Section: Live Work Notices (Connected to Public Site) */}
        <section className="ops-section jobs-section" id="jobs">
          <div className="section-head">
            <div>
              <h2>Public Work Opportunities & Live Notices</h2>
              <p>
                These notices appear on the public website under the Top Carousel and Live Opportunities section. Closing or publishing updates the website instantly.
              </p>
            </div>
          </div>

          {/* Quick Create Opportunity Form */}
          <div className="ops-create-job-card">
            <h3>+ Post New Work Opportunity</h3>
            <form action={createJob} className="ops-job-form">
              <div className="form-grid-3">
                <div className="ops-field">
                  <label htmlFor="job-title">Position / Trade Title *</label>
                  <input
                    id="job-title"
                    name="title"
                    type="text"
                    placeholder="e.g. Senior Shuttering Carpenter"
                    required
                  />
                </div>
                <div className="ops-field">
                  <label htmlFor="company-name">Company Name</label>
                  <input
                    id="company-name"
                    name="companyName"
                    type="text"
                    defaultValue="SASHA General Contracting"
                    required
                  />
                </div>
                <div className="ops-field">
                  <label htmlFor="company-logo">Company Logo URL / Path</label>
                  <input
                    id="company-logo"
                    name="companyLogo"
                    type="text"
                    defaultValue="/sasha-mark.svg"
                    placeholder="/sasha-mark.svg or image URL"
                  />
                </div>
              </div>

              <div className="form-grid-3">
                <div className="ops-field">
                  <label htmlFor="job-salary">Monthly Salary</label>
                  <input
                    id="job-salary"
                    name="salaryText"
                    type="text"
                    placeholder="e.g. 2,400 AED/month"
                    defaultValue="2,400 AED/month"
                  />
                </div>
                <div className="ops-field">
                  <label htmlFor="job-exp">Experience Required *</label>
                  <input
                    id="job-exp"
                    name="experience"
                    type="text"
                    defaultValue="2+ Years UAE / Gulf Site Experience"
                    required
                  />
                </div>
                <div className="ops-field">
                  <label htmlFor="job-loc">Project Location</label>
                  <input
                    id="job-loc"
                    name="location"
                    type="text"
                    defaultValue="Abu Dhabi - Saadiyat / Mussafah"
                  />
                </div>
              </div>

              <div className="form-grid-2">
                <div className="ops-field">
                  <label htmlFor="job-req">Requirements (Things needed / Qualifications) *</label>
                  <textarea
                    id="job-req"
                    name="requirements"
                    rows={2}
                    defaultValue="Valid passport • Practical site experience • Immediate deployment • Medical fitness"
                    required
                  />
                </div>
                <div className="ops-field">
                  <label htmlFor="job-desc">Work Scope / Description</label>
                  <textarea
                    id="job-desc"
                    name="description"
                    rows={2}
                    defaultValue="Formwork, slab casting, and columns for commercial building project under site supervisor."
                  />
                </div>
              </div>

              <div className="ops-form-actions">
                <input type="hidden" name="workType" value="Site contracting" />
                <button type="submit" className="btn-ops-submit">
                  Publish to Live Website & Carousel →
                </button>
              </div>
            </form>
          </div>

          <div className="jobs-table-container">
            {jobs.length === 0 ? (
              <div className="empty-state">No site job notices exist yet. Use the form above to post one.</div>
            ) : (
              <div className="jobs-list">
                {jobs.map((job) => (
                  <div key={job.id} className={`job-row ${job.status.toLowerCase()}`}>
                    <div className="job-row-top">
                      <div className="job-company-badge">
                        <img
                          src={job.companyLogo || "/sasha-mark.svg"}
                          alt={job.companyName || "Company"}
                          width="28"
                          height="28"
                          className="job-logo-thumb"
                        />
                        <span className="job-company-name">{job.companyName || "SASHA General Contracting"}</span>
                      </div>
                      <span className={`status-pill ${job.status.toLowerCase()}`}>
                        {job.status === "OPEN" ? "● LIVE ON WEBSITE" : "CLOSED"}
                      </span>
                    </div>

                    <div className="job-details">
                      <div className="job-badge-row">
                        <span className="trade-tag">{job.workType}</span>
                        <span className="loc-tag">📍 {job.location}</span>
                        {job.salaryText && <span className="sal-tag">💰 {job.salaryText}</span>}
                      </div>

                      <h3 className="job-position-heading">{job.title}</h3>
                      <p className="job-desc-text">{job.description}</p>

                      <div className="job-specs-preview">
                        <div className="spec-line">
                          <strong>📋 Requirements:</strong> {job.requirements}
                        </div>
                        <div className="spec-line">
                          <strong>⏱️ Experience:</strong> {job.experience || "1-2 Years UAE Site Experience"}
                        </div>
                      </div>
                    </div>

                    <div className="job-actions">
                      {job.status === "OPEN" ? (
                        <form action={closeJob.bind(null, job.id)}>
                          <button type="submit" className="btn-action close">
                            Close Notice
                          </button>
                        </form>
                      ) : (
                        <form action={openJob.bind(null, job.id)}>
                          <button type="submit" className="btn-action open">
                            Publish Again
                          </button>
                        </form>
                      )}
                      <form action={deleteJob.bind(null, job.id)}>
                        <button type="submit" className="btn-action delete">
                          Remove
                        </button>
                      </form>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </section>

        {/* Section: AI Drafts & Operations Records */}
        <section className="ops-section records-section" id="records">
          <div className="section-head">
            <div>
              <h2>Operations Records & Legal Drafts</h2>
              <p>
                Employment offers, visa commitments, subcontract agreements, and expense records created automatically via voice or agent.
              </p>
            </div>
          </div>

          <div className="records-table-container">
            {records.length === 0 ? (
              <div className="empty-state">
                No records created yet. Speak an update above to draft an employment offer, visa, or bill.
              </div>
            ) : (
              <div className="records-list">
                {records.map((rec) => (
                  <div key={rec.id} className={`record-card ${rec.status.toLowerCase()}`}>
                    <div className="rec-info">
                      <div className="rec-badge-row">
                        <span className={`type-tag ${rec.type.toLowerCase().replace(/\s+/g, "-")}`}>
                          {rec.type}
                        </span>
                        <span className={`status-pill ${rec.status.toLowerCase()}`}>
                          {rec.status}
                        </span>
                        {rec.amount !== null && (
                          <span className="amount-tag">
                            {rec.currency} {(rec.amount / 100).toLocaleString()}
                          </span>
                        )}
                      </div>
                      <h3 className="rec-title">{rec.title}</h3>
                      {rec.note && <p className="rec-note">{rec.note}</p>}
                      <span className="rec-date">
                        Logged: {new Date(rec.createdAt).toLocaleString("en-GB", { timeZone: "Asia/Dubai" })} GST
                      </span>
                    </div>

                    <div className="rec-actions">
                      {rec.status === "DRAFT" ? (
                        <form action={approveRecord.bind(null, rec.id)}>
                          <button type="submit" className="btn-action approve">
                            ✓ Approve
                          </button>
                        </form>
                      ) : (
                        <span className="approved-indicator">✓ Approved</span>
                      )}
                      <form action={deleteRecord.bind(null, rec.id)}>
                        <button type="submit" className="btn-action delete">
                          Delete
                        </button>
                      </form>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </section>

        {/* Section: Received Inquiries */}
        <section className="ops-section enquiries-section" id="enquiries">
          <div className="section-head">
            <div>
              <h2>Employer Requirements & Website Inquiries</h2>
              <p>Detailed project requirements and workforce requests submitted by UAE employers and subcontractors.</p>
            </div>
          </div>

          <div className="enquiries-container">
            {enquiries.length === 0 ? (
              <div className="empty-state">No enquiries received yet.</div>
            ) : (
              <div className="enquiries-grid">
                {enquiries.map((enq) => (
                  <div key={enq.id} className="enquiry-card-admin">
                    <div className="enq-top">
                      <span className="enq-kind">{enq.kind}</span>
                      <span className="enq-date">
                        {new Date(enq.createdAt).toLocaleDateString("en-GB")}
                      </span>
                    </div>

                    {enq.companyName && (
                      <div className="enq-company-tag">
                        🏢 <strong>Company:</strong> {enq.companyName}
                      </div>
                    )}

                    <h4>{enq.name}</h4>

                    <div className="enq-contacts">
                      <a href={`tel:${enq.phone}`}>📞 {enq.phone}</a>
                      {enq.email && <a href={`mailto:${enq.email}`}>✉️ {enq.email}</a>}
                    </div>

                    {/* Structured Specs if available */}
                    {(enq.tradePosition || enq.workersCount || enq.projectLocation || enq.experience) && (
                      <div className="enq-structured-details">
                        {enq.tradePosition && <div><strong>Trade Needed:</strong> {enq.tradePosition}</div>}
                        {enq.workersCount && <div><strong>Workers Needed:</strong> {enq.workersCount}</div>}
                        {enq.projectLocation && <div><strong>Location:</strong> 📍 {enq.projectLocation}</div>}
                        {enq.experience && <div><strong>Experience:</strong> ⏱️ {enq.experience}</div>}
                      </div>
                    )}

                    {enq.remarks && (
                      <div className="enq-remarks-box">
                        <strong>Remarks & Notes:</strong>
                        <p>{enq.remarks}</p>
                      </div>
                    )}

                    <div className="enq-raw-msg">
                      <small>Full Submission Summary:</small>
                      <p>{enq.message}</p>
                    </div>

                    <form action={deleteEnquiry.bind(null, enq.id)} className="enq-delete-form">
                      <button type="submit" className="btn-enq-del">Dismiss</button>
                    </form>
                  </div>
                ))}
              </div>
            )}
          </div>
        </section>
      </main>
    </div>
  );
}
