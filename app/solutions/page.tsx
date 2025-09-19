import Link from 'next/link';

export default function SolutionsPage() {
  return (
    <div className=\"container\">
      <section className=\"section\">
        <div className=\"text-center mb-xl\">
          <h1>Emergency Solutions for Every Need</h1>
          <p className=\"hero-subtitle\">
            Comprehensive voice-first emergency response tailored for Nigerian communities
          </p>
        </div>

        <div className=\"feature-grid\">
          <div className=\"card feature-card card-hover\" id=\"medical\">
            <div className=\"feature-icon\">🏥</div>
            <h3>Medical Emergency</h3>
            <p>Instant medical emergency reporting with symptom analysis and nearest hospital routing.</p>
            <Link href=\"/report?type=medical\" className=\"btn btn-primary mt-md\">
              Open Voice Assistant
            </Link>
          </div>

          <div className=\"card feature-card card-hover\" id=\"fire\">
            <div className=\"feature-icon\">🔥</div>
            <h3>Fire Safety</h3>
            <p>Rapid fire emergency response with location precision and evacuation guidance.</p>
            <Link href=\"/report?type=fire\" className=\"btn btn-primary mt-md\">
              Open Voice Assistant
            </Link>
          </div>

          <div className=\"card feature-card card-hover\" id=\"security\">
            <div className=\"feature-icon\">🛡️</div>
            <h3>Security Incidents</h3>
            <p>Discreet security threat reporting with priority escalation to law enforcement.</p>
            <Link href=\"/report?type=security\" className=\"btn btn-primary mt-md\">
              Open Voice Assistant
            </Link>
          </div>

          <div className=\"card feature-card card-hover\" id=\"disaster\">
            <div className=\"feature-icon\">🌊</div>
            <h3>Disaster Response</h3>
            <p>Natural disaster coordination including floods, storms, and mass casualty events.</p>
            <Link href=\"/report?type=disaster\" className=\"btn btn-primary mt-md\">
              Open Voice Assistant
            </Link>
          </div>
        </div>
      </section>

      <section className=\"section\">
        <div className=\"card text-center\">
          <h2>Ready to Deploy?</h2>
          <p>Start securing your community with voice-first emergency response</p>
          <div className=\"hero-cta\" style={{ justifyContent: 'center' }}>
            <Link href=\"/get-started\" className=\"btn btn-primary btn-lg\">
              Get Started
            </Link>
            <Link href=\"/pricing\" className=\"btn btn-secondary btn-lg\">
              View Pricing
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}