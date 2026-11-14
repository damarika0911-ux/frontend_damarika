import LegalLayout from "./LegalLayout";
import { BUSINESS } from "../../utils/business";
import { openCookieSettings } from "../../utils/consent";

const toc = [
  { id: "who", label: "Who we are" },
  { id: "collect", label: "What we collect" },
  { id: "use", label: "How we use it" },
  { id: "third-parties", label: "Services we use" },
  { id: "cookies", label: "Cookie policy" },
  { id: "retention", label: "How long we keep it" },
  { id: "rights", label: "Your rights" },
  { id: "deletion", label: "Delete your data" },
  { id: "children", label: "Children" },
  { id: "contact", label: "Contact & grievances" },
];

const deletionMail = `mailto:${BUSINESS.email}?subject=${encodeURIComponent("Data deletion request")}&body=${encodeURIComponent(
  "Please delete the personal data you hold about me.\n\nName:\nEmail address I used:\nApproximate date I contacted you:\n",
)}`;

export default function PrivacyScreen() {
  return (
    <LegalLayout
      title="Privacy & Cookie Policy"
      description="How Damarika collects, uses and protects your personal data, which cookies we use, and how to ask us to delete your data."
      path="/privacy"
      toc={toc}
    >
      <h2 id="who">Who we are</h2>
      <p>
        This website is run by <strong>{BUSINESS.legalName}</strong> ("Damarika", "we", "us"), {BUSINESS.addressLines.join(", ")}.
        We are the data fiduciary for the personal data described here, under India's Digital Personal Data Protection Act, 2023.
      </p>

      <h2 id="collect">What we collect</h2>
      <p>We only collect what we need to reply to you. We do not require you to create an account.</p>
      <ul>
        <li>
          <strong>Contact form:</strong> first name, last name (optional), email address, subject (optional) and your message.
        </li>
        <li>
          <strong>WhatsApp, email or phone:</strong> whatever you choose to send us, plus your phone number or email address.
        </li>
        <li>
          <strong>Analytics (only if you accept cookies):</strong> pages visited, approximate location (city level), device and
          browser type, and the campaign link you arrived from (UTM tags). IP addresses are anonymised.
        </li>
        <li>
          <strong>Server logs:</strong> our hosting providers briefly record IP addresses and request details to keep the site
          secure and working.
        </li>
      </ul>
      <p>We do not collect payment card details on this website, and we do not sell your personal data.</p>

      <h2 id="use">How we use it</h2>
      <ul>
        <li>To answer your enquiry and register you for programs you ask about.</li>
        <li>To arrange orders for tools you ask to buy.</li>
        <li>To understand which pages are useful (analytics, only with your consent).</li>
        <li>To keep the website secure and prevent abuse (for example, rate limiting the contact form).</li>
      </ul>
      <p>
        We do not send marketing emails. If we ever start a newsletter, it will be opt-in only and every email will contain a
        one-click unsubscribe link.
      </p>

      <h2 id="third-parties">Services we use</h2>
      <p>These providers process data on our behalf, or load content on our pages:</p>
      <div className="lg-table-wrap">
        <table className="lg-table">
          <thead>
            <tr>
              <th scope="col">Service</th>
              <th scope="col">Purpose</th>
              <th scope="col">When</th>
            </tr>
          </thead>
          <tbody>
            <tr><td>Cloudflare</td><td>Website hosting, security and fast delivery</td><td>Every visit</td></tr>
            <tr><td>Render</td><td>Hosting for our website's data service (API)</td><td>Every visit</td></tr>
            <tr><td>Supabase</td><td>Database and image storage</td><td>Every visit; contact form</td></tr>
            <tr><td>Google Analytics</td><td>Visit statistics</td><td>Only if you accept cookies</td></tr>
            <tr><td>Google Maps</td><td>Map on the Contact page</td><td>Only if you accept cookies, or click "Load map"</td></tr>
            <tr><td>WhatsApp (Meta)</td><td>Chat and orders</td><td>Only when you click a WhatsApp button</td></tr>
            <tr><td>Instagram, YouTube, Facebook, X</td><td>Our social media pages</td><td>Only when you click their links</td></tr>
          </tbody>
        </table>
      </div>
      <p>Fonts and images are served from our own website, so loading a page does not contact Google Fonts.</p>

      <h2 id="cookies">Cookie policy</h2>
      <p>
        Cookies and similar browser storage are small pieces of data saved on your device. We use two kinds:
      </p>
      <h3>Essential (always on)</h3>
      <div className="lg-table-wrap">
        <table className="lg-table">
          <thead>
            <tr><th scope="col">Name</th><th scope="col">Purpose</th><th scope="col">Duration</th></tr>
          </thead>
          <tbody>
            <tr><td>damarika-consent-v1</td><td>Remembers your cookie choice</td><td>Until you clear it</td></tr>
            <tr><td>damarika-theme</td><td>Remembers light or dark mode</td><td>Until you clear it</td></tr>
            <tr><td>damarika-utm</td><td>Remembers the campaign link you arrived from, for this visit only</td><td>Until you close the tab</td></tr>
          </tbody>
        </table>
      </div>
      <h3>Analytics and embedded content (only with your consent)</h3>
      <div className="lg-table-wrap">
        <table className="lg-table">
          <thead>
            <tr><th scope="col">Name</th><th scope="col">Set by</th><th scope="col">Purpose</th><th scope="col">Duration</th></tr>
          </thead>
          <tbody>
            <tr><td>_ga, _ga_*</td><td>Google Analytics</td><td>Distinguish visitors to count visits</td><td>Up to 2 years</td></tr>
            <tr><td>NID and similar</td><td>Google Maps</td><td>Set by Google when the map loads</td><td>Up to 6 months</td></tr>
          </tbody>
        </table>
      </div>
      <p>
        "Accept all" and "Reject non-essential" are equally easy, and rejecting does not limit any part of the site. You can
        change your choice at any time:
      </p>
      <p>
        <button type="button" className="lg-btn" onClick={openCookieSettings}>
          Open cookie settings
        </button>
      </p>

      <h2 id="retention">How long we keep it</h2>
      <ul>
        <li>Contact form messages: up to 24 months after our last conversation with you, then deleted.</li>
        <li>Program registration and order records: as long as Indian tax and accounting law requires.</li>
        <li>Analytics data: 14 months (Google Analytics retention setting).</li>
      </ul>

      <h2 id="rights">Your rights</h2>
      <p>You can ask us to:</p>
      <ul>
        <li>tell you what personal data we hold about you and how we use it;</li>
        <li>correct or update it;</li>
        <li>delete it (see below);</li>
        <li>withdraw consent you gave earlier, such as for analytics cookies;</li>
        <li>nominate someone to exercise these rights for you if you are unable to.</li>
      </ul>
      <p>We will reply within 30 days.</p>

      <h2 id="deletion">Delete your data</h2>
      <div className="lg-card">
        <p style={{ marginBottom: "0.75rem" }}>
          Email us from the address you used, or tell us on WhatsApp, and we will delete your contact form messages and any other
          personal data we hold about you, except records the law requires us to keep. We will confirm once it is done.
        </p>
        <a className="lg-btn" href={deletionMail}>
          Request data deletion by email
        </a>
      </div>

      <h2 id="children">Children</h2>
      <p>
        Many of our programs are for students. If you are under 18, please ask a parent or guardian before sending us your
        details; the contact form asks you to confirm this. If we learn that we have collected a child's data without a parent's
        or guardian's consent, we will delete it. We do not track children or show them targeted advertising.
      </p>

      <h2 id="contact">Contact & grievances</h2>
      <p>
        Questions, complaints or requests about your data go to our Grievance Officer:
        <br />
        Email: <a href={`mailto:${BUSINESS.email}`}>{BUSINESS.email}</a>
        <br />
        Phone: <a href={`tel:${BUSINESS.phoneE164}`}>{BUSINESS.phoneDisplay}</a>
        <br />
        Post: {BUSINESS.legalName}, {BUSINESS.addressLines.join(", ")}
      </p>
      <p>If you are not satisfied with our reply, you can complain to the Data Protection Board of India.</p>
    </LegalLayout>
  );
}
