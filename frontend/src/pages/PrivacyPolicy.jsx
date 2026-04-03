import React from 'react';

const PrivacyPolicy = () => {
  return (
    <div className="container" style={{ padding: '4rem 0', maxWidth: '800px', margin: '0 auto' }}>
      <h1 style={{ color: 'var(--primary)', marginBottom: '2rem', fontSize: '2.5rem' }}>Privacy Policy</h1>
      
      <div style={{ background: '#fff', padding: '3rem', borderRadius: '1rem', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}>
        <p style={{ color: 'var(--text-dim)', marginBottom: '1.5rem' }}>
          Last updated: {new Date().toLocaleDateString()}
        </p>

        <section style={{ marginBottom: '2rem' }}>
          <h2 style={{ color: 'var(--primary)', fontSize: '1.5rem', marginBottom: '1rem' }}>1. Information We Collect</h2>
          <p style={{ color: 'var(--text-dim)', lineHeight: '1.6' }}>
            When you visit our website, register for an account, or use our services, we may collect personal information such as your name, email address, phone number, and academic details for admission prediction purposes.
          </p>
        </section>

        <section style={{ marginBottom: '2rem' }}>
          <h2 style={{ color: 'var(--primary)', fontSize: '1.5rem', marginBottom: '1rem' }}>2. How We Use Your Information</h2>
          <p style={{ color: 'var(--text-dim)', lineHeight: '1.6' }}>
            We use the information we collect to provide, maintain, and improve our services, communicate with you, analyze how you use our platform, and personalize your experience. We do not sell your personal data to third parties.
          </p>
        </section>

        <section style={{ marginBottom: '2rem' }}>
          <h2 style={{ color: 'var(--primary)', fontSize: '1.5rem', marginBottom: '1rem' }}>3. Data Security</h2>
          <p style={{ color: 'var(--text-dim)', lineHeight: '1.6' }}>
            We implement reasonable security measures to protect your personal information from unauthorized access, alteration, disclosure, or destruction. We use industry-standard encryption for sensitive data handling.
          </p>
        </section>

        <section>
          <h2 style={{ color: 'var(--primary)', fontSize: '1.5rem', marginBottom: '1rem' }}>4. Your Rights</h2>
          <p style={{ color: 'var(--text-dim)', lineHeight: '1.6' }}>
            You have the right to access, update, or delete your personal information at any time. If you wish to exercise these rights or have questions about our privacy practices, please contact our support team.
          </p>
        </section>
      </div>
    </div>
  );
};

export default PrivacyPolicy;
