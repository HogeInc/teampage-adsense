import React from 'react';

interface PrivacyPolicyProps {
  onBack: () => void;
}

const PrivacyPolicy: React.FC<PrivacyPolicyProps> = ({ onBack }) => {
  return (
    <div className="max-w-4xl mx-auto py-12 px-4 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <button 
        onClick={onBack}
        className="mb-8 flex items-center gap-2 text-cyan-400 hover:text-cyan-300 transition-colors font-medium group"
      >
        <span className="group-hover:-translate-x-1 transition-transform">←</span> Back to Home
      </button>
      
      <h1 className="text-4xl font-bold mb-8 text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-teal-500">
        Privacy Policy
      </h1>

      <div className="space-y-8 text-slate-300 leading-relaxed">
        <section>
          <h2 className="text-2xl font-semibold text-white mb-4">Our Commitment</h2>
          <p>
            This website is designed with a "privacy-first" approach. We believe that your data belongs to you. 
            <strong> We do not track users, store personal information, or maintain any database of visitor activity.</strong>
          </p>
        </section>

        <section className="p-6 bg-slate-800/50 rounded-xl border border-slate-700">
          <h2 className="text-2xl font-semibold text-white mb-4">Third-Party Advertising</h2>
          <p className="mb-4">
            To keep this site free, we use Google AdSense to display advertisements. Google, as a third-party vendor, uses cookies to serve ads on our site.
          </p>
          <p className="mb-4">
            Google's use of advertising cookies enables it and its partners to serve ads to our users based on their visit to our site and/or other sites on the Internet.
          </p>
          <ul className="list-disc pl-6 space-y-2 text-slate-400">
            <li>Users may opt out of personalized advertising by visiting <a href="https://www.google.com/settings/ads" target="_blank" rel="noopener noreferrer" className="text-cyan-400 hover:underline">Ads Settings</a>.</li>
            <li>Alternatively, you can opt out of a third-party vendor's use of cookies for personalized advertising by visiting <a href="https://www.aboutads.info" target="_blank" rel="noopener noreferrer" className="text-cyan-400 hover:underline">www.aboutads.info</a>.</li>
          </ul>
        </section>

        <section>
          <h2 className="text-2xl font-semibold text-white mb-4">Cookies and Analytics</h2>
          <p>
            We do not use any first-party tracking cookies or proprietary analytics scripts. Any cookies present are strictly those required by Google AdSense for its core functionality and compliance requirements as per their <a href="https://policies.google.com/privacy" target="_blank" rel="noopener noreferrer" className="text-cyan-400 hover:underline">Privacy Policy</a>.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold text-white mb-4">Contact</h2>
          <p>
            Since we do not collect any data, there is no personal information for you to request or delete. If you have questions about this policy, please refer to the Google AdSense terms of service.
          </p>
        </section>
      </div>
    </div>
  );
};

export default PrivacyPolicy;