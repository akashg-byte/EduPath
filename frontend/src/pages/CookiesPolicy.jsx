import React from 'react';

const CookiesPolicy = () => {
  return (
    <div className="container" style={{ padding: '4rem 0', maxWidth: '800px', margin: '0 auto' }}>
      <h1 style={{ color: 'var(--primary)', marginBottom: '2rem', fontSize: '2.5rem' }}>Cookies Policy</h1>
      
      <div style={{ background: '#fff', padding: '3rem', borderRadius: '1rem', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}>
        <p style={{ color: 'var(--text-dim)', marginBottom: '1.5rem' }}>
          Last updated: {new Date().toLocaleDateString()}
        </p>

        <section style={{ marginBottom: '2rem' }}>
          <h2 style={{ color: 'var(--primary)', fontSize: '1.5rem', marginBottom: '1rem' }}>1. What Are Cookies</h2>
          <p style={{ color: 'var(--text-dim)', lineHeight: '1.6' }}>
            Cookies are small text files that are placed on your computer or mobile device when you visit our website. They are widely used to make websites work more efficiently and provide a better viewing experience.
          </p>
        </section>

        <section style={{ marginBottom: '2rem' }}>
          <h2 style={{ color: 'var(--primary)', fontSize: '1.5rem', marginBottom: '1rem' }}>2. How We Use Cookies</h2>
          <p style={{ color: 'var(--text-dim)', lineHeight: '1.6', marginBottom: '1rem' }}>
            We use cookies for a variety of reasons detailed below:
          </p>
          <ul style={{ color: 'var(--text-dim)', lineHeight: '1.6', paddingLeft: '1.5rem' }}>
            <li><strong>Essential Cookies:</strong> Required to provide you with features or services that you have requested.</li>
            <li><strong>Functional Cookies:</strong> Used to record your choices and settings regarding our services.</li>
            <li><strong>Performance/Analytics Cookies:</strong> Allow us to understand how visitors use our site so we can improve it.</li>
          </ul>
        </section>

        <section style={{ marginBottom: '2rem' }}>
          <h2 style={{ color: 'var(--primary)', fontSize: '1.5rem', marginBottom: '1rem' }}>3. Disabling Cookies</h2>
          <p style={{ color: 'var(--text-dim)', lineHeight: '1.6' }}>
            You can prevent the setting of cookies by adjusting the settings on your browser (see your browser Help for how to do this). Be aware that disabling cookies will affect the functionality of this and many other websites that you visit.
          </p>
        </section>
        
        <section>
          <h2 style={{ color: 'var(--primary)', fontSize: '1.5rem', marginBottom: '1rem' }}>4. More Information</h2>
          <p style={{ color: 'var(--text-dim)', lineHeight: '1.6' }}>
            Hopefully, this has clarified things for you. If there is something you aren't sure whether you need or not, it's usually safer to leave cookies enabled in case it does interact with one of the features you use on our site.
          </p>
        </section>
      </div>
    </div>
  );
};

export default CookiesPolicy;
