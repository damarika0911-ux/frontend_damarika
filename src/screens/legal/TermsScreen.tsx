import { Link } from "react-router-dom";
import LegalLayout from "./LegalLayout";
import { BUSINESS, whatsappLink } from "../../utils/business";

/*
 * REFUND / CANCELLATION TERMS — business decisions.
 * Confirm these numbers with the Damarika team before launch; change them here only.
 */
const REFUND = {
  fullRefundDaysBefore: 7, // cancel at least this many days before a program starts → full refund
  lateCancelRefundPercent: 50, // cancel later than that (but before it starts) → this % back, or a free transfer
  refundProcessingDays: 7, // working days to process an approved refund
  productReportDays: 7, // days after delivery to report a damaged or wrong item
};

const toc = [
  { id: "about", label: "About these terms" },
  { id: "programs", label: "Programs & registration" },
  { id: "products", label: "Products & orders" },
  { id: "pricing", label: "Prices & fees" },
  { id: "refunds", label: "Refund & cancellation policy" },
  { id: "conduct", label: "Field safety & conduct" },
  { id: "content", label: "Content & intellectual property" },
  { id: "liability", label: "Liability" },
  { id: "law", label: "Governing law" },
  { id: "contact", label: "Business details & contact" },
];

export default function TermsScreen() {
  return (
    <LegalLayout
      title="Terms of Service & Refund Policy"
      description="Terms for Damarika programs, workshops and archaeological tools, including our refund and cancellation policy."
      path="/terms"
      toc={toc}
    >
      <h2 id="about">About these terms</h2>
      <p>
        These terms apply when you use damarika.in, register for a Damarika program, or order products from us. They are
        between you and <strong>{BUSINESS.legalName}</strong>. By registering or ordering, you agree to them. Our{" "}
        <Link to="/privacy">Privacy & Cookie Policy</Link> explains how we handle your data.
      </p>

      <h2 id="programs">Programs & registration</h2>
      <ul>
        <li>
          Your place is confirmed only when we confirm it to you in writing (email or WhatsApp) after receiving any fee due.
        </li>
        <li>
          Program details (dates, sessions, location, number of places) are shown on the program page. If something changes, we
          will tell registered participants as soon as possible.
        </li>
        <li>Participants under 18 need a parent's or guardian's consent to register.</li>
        <li>E-certificates, where offered, are issued to participants who attend the required sessions.</li>
      </ul>

      <h2 id="products">Products & orders</h2>
      <ul>
        <li>
          Orders are placed by contacting us on <a href={whatsappLink("Hello Damarika! I'd like to order a product.")} target="_blank" rel="noopener noreferrer">WhatsApp</a>,
          email or phone. We will confirm availability, the total price and delivery details before you pay.
        </li>
        <li>Product photos show the type of item; finish and colour of handmade items can vary slightly.</li>
      </ul>

      <h2 id="pricing">Prices & fees</h2>
      <ul>
        <li>All prices are in Indian Rupees (₹).</li>
        <li>
          <strong>No hidden fees.</strong> Before you pay, we tell you the full amount, including any delivery charges and
          taxes. You only pay the total you agreed to.
        </li>
        <li>We do not take card payments on this website. Payment details are shared with you directly when we confirm your order or registration.</li>
      </ul>

      <h2 id="refunds">Refund & cancellation policy</h2>
      <h3>If you cancel a program registration</h3>
      <ul>
        <li>
          <strong>{REFUND.fullRefundDaysBefore} or more days</strong> before the program starts: full refund.
        </li>
        <li>
          <strong>Less than {REFUND.fullRefundDaysBefore} days</strong> before it starts: {REFUND.lateCancelRefundPercent}% refund,
          or move your place to a later batch of the same program at no cost.
        </li>
        <li>
          <strong>After the program has started:</strong> no refund, but you keep access to any materials provided.
        </li>
      </ul>
      <h3>If we cancel or reschedule</h3>
      <p>You choose: a full refund, or a free place in the rescheduled or another batch.</p>
      <h3>Products</h3>
      <ul>
        <li>
          If an item arrives damaged, faulty or is not what you ordered, tell us within{" "}
          <strong>{REFUND.productReportDays} days of delivery</strong> with a photo. We will replace it or give a full refund,
          including delivery charges.
        </li>
        <li>Items that are not faulty can be returned only if we agree in advance.</li>
      </ul>
      <h3>How refunds are paid</h3>
      <p>
        Approved refunds are paid to the original payment method within {REFUND.refundProcessingDays} working days. To ask for a
        refund, email <a href={`mailto:${BUSINESS.email}`}>{BUSINESS.email}</a> or message us on WhatsApp with your name and
        program or order details.
      </p>

      <h2 id="conduct">Field safety & conduct</h2>
      <ul>
        <li>On site visits and field training, follow the instructions of Damarika staff and site authorities.</li>
        <li>Never remove, damage or collect artefacts from protected sites; this is prohibited under Indian law.</li>
        <li>We may remove a participant whose behaviour puts others or a heritage site at risk; no refund is due in that case.</li>
      </ul>

      <h2 id="content">Content & intellectual property</h2>
      <p>
        Text, photos, logos and course materials on this site belong to Damarika or are used with permission. You may share
        links and short quotes with credit; please ask before reusing anything else. Fonts used on this site (Poppins and DM
        Sans) are licensed under the SIL Open Font License, and icons under the Apache License 2.0.
      </p>

      <h2 id="liability">Liability</h2>
      <p>
        We work to keep information on this site accurate, but program details can change. Nothing in these terms limits your
        rights under the Consumer Protection Act, 2019, or our liability where the law does not allow it to be limited.
      </p>

      <h2 id="law">Governing law</h2>
      <p>These terms are governed by the laws of India. Courts in Thanjavur, Tamil Nadu have jurisdiction.</p>

      <h2 id="contact">Business details & contact</h2>
      <div className="lg-card">
        <p style={{ margin: 0 }}>
          <strong>{BUSINESS.legalName}</strong>
          <br />
          {BUSINESS.addressLines.map((l) => (
            <span key={l}>
              {l}
              <br />
            </span>
          ))}
          Email: <a href={`mailto:${BUSINESS.email}`}>{BUSINESS.email}</a>
          <br />
          Phone / WhatsApp: <a href={`tel:${BUSINESS.phoneE164}`}>{BUSINESS.phoneDisplay}</a>
        </p>
      </div>
    </LegalLayout>
  );
}
