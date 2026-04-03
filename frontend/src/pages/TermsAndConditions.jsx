import React from 'react';

const TermsAndConditions = () => {
  return (
    <div className="container" style={{ padding: '4rem 0', maxWidth: '800px', margin: '0 auto' }}>
      <h1 style={{ color: 'var(--primary)', marginBottom: '2rem', fontSize: '2.5rem' }}>Terms & Conditions</h1>
      
      <div style={{ background: '#fff', padding: '3rem', borderRadius: '1rem', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}>
        <p style={{ color: 'var(--text-dim)', marginBottom: '1.5rem' }}>
          Last updated: {new Date().toLocaleDateString()}
        </p>

        <section style={{ marginBottom: '2rem' }}>
          <h2 style={{ color: 'var(--primary)', fontSize: '1.5rem', marginBottom: '1rem' }}>1. Introduction</h2>
          <p style={{ color: 'var(--text-dim)', lineHeight: '1.6' }}>
            Welcome to NaseeeEdu. By accessing this website and using our services, you agree to comply with and be bound by the following terms and conditions of use.
          </p>
        </section>

        <section style={{ marginBottom: '2rem' }}>
          <h2 style={{ color: 'var(--primary)', fontSize: '1.5rem', marginBottom: '1rem' }}>2. Services Provided</h2>
          <p style={{ color: 'var(--text-dim)', lineHeight: '1.6' }}>
            We provide college admission consulting, cutoff prediction, AI career guidance, and general educational advisory services. The information provided on our platform is for general guidance purposes only.
          </p>
        </section>

        <section style={{ marginBottom: '2rem' }}>
          <h2 style={{ color: 'var(--primary)', fontSize: '1.5rem', marginBottom: '1rem' }}>3. User Accounts</h2>
          <p style={{ color: 'var(--text-dim)', lineHeight: '1.6' }}>
            To access certain features of the platform, you may be required to register for an account. You are responsible for maintaining the confidentiality of your account information.
          </p>
        </section>

        <section style={{ marginBottom: '2rem' }}>
          <h2 style={{ color: 'var(--primary)', fontSize: '1.5rem', marginBottom: '1rem' }}>4. Data Privacy</h2>
          <p style={{ color: 'var(--text-dim)', lineHeight: '1.6' }}>
            Our collection and use of personal information in connection with your access to and use of the platform and services is described in our Privacy Policy.
          </p>
        </section>

        <section>
          <h2 style={{ color: 'var(--primary)', fontSize: '1.5rem', marginBottom: '1rem' }}>5. Contact Us</h2>
          <p style={{ color: 'var(--text-dim)', lineHeight: '1.6' }}>
            If you have any questions about these Terms, please contact us at support@hariedu.com.
          </p>
        </section>
      </div>
    </div>
  );
};

export default TermsAndConditions;
