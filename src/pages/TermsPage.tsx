import { Helmet } from "react-helmet-async";
import Layout from "@/components/layout/Layout";

const TermsPage = () => {
  return (
    <Layout>
      <Helmet>
        <title>Terms of Service | AutoTechSpot</title>
        <meta
          name="description"
          content="Read AutoTechSpot's terms of service to understand the rules and guidelines for using our website."
        />
      </Helmet>

      <div className="container py-12 md:py-16">
        <div className="mx-auto max-w-3xl">
          <h1 className="font-display text-4xl font-bold md:text-5xl">Terms of Service</h1>
          <p className="mt-4 text-sm text-muted-foreground">
            Last updated: {new Date().toLocaleDateString()}
          </p>

          <div className="mt-8 space-y-8 text-muted-foreground">
            <section>
              <h2 className="font-display text-2xl font-semibold text-foreground">
                Agreement to Terms
              </h2>
              <p className="mt-3">
                By accessing and using AutoTechSpot, you agree to be bound by these Terms of 
                Service. If you disagree with any part of these terms, you may not access our 
                website.
              </p>
            </section>

            <section>
              <h2 className="font-display text-2xl font-semibold text-foreground">
                Intellectual Property
              </h2>
              <p className="mt-3">
                The content on AutoTechSpot, including text, graphics, logos, images, and 
                software, is the property of AutoTechSpot and is protected by copyright and 
                other intellectual property laws. You may not reproduce, distribute, or create 
                derivative works without our express written permission.
              </p>
            </section>

            <section>
              <h2 className="font-display text-2xl font-semibold text-foreground">
                User Conduct
              </h2>
              <p className="mt-3">When using our website, you agree not to:</p>
              <ul className="mt-3 list-inside list-disc space-y-2">
                <li>Use the website for any unlawful purpose</li>
                <li>Attempt to gain unauthorized access to any part of the website</li>
                <li>Interfere with or disrupt the website's functionality</li>
                <li>Upload or transmit viruses or malicious code</li>
                <li>Collect user information without consent</li>
                <li>Post false, misleading, or defamatory content</li>
              </ul>
            </section>

            <section>
              <h2 className="font-display text-2xl font-semibold text-foreground">
                Comments and Submissions
              </h2>
              <p className="mt-3">
                If you submit comments, feedback, or other content to our website, you grant 
                us a non-exclusive, royalty-free, perpetual license to use, reproduce, and 
                publish such content. You are responsible for the content you submit and must 
                ensure it does not violate any third-party rights.
              </p>
            </section>

            <section>
              <h2 className="font-display text-2xl font-semibold text-foreground">
                Third-Party Links
              </h2>
              <p className="mt-3">
                Our website may contain links to third-party websites. We are not responsible 
                for the content, privacy policies, or practices of any third-party sites. 
                Visiting these links is at your own risk.
              </p>
            </section>

            <section>
              <h2 className="font-display text-2xl font-semibold text-foreground">
                Disclaimer of Warranties
              </h2>
              <p className="mt-3">
                AutoTechSpot is provided "as is" without warranties of any kind, either express 
                or implied. We do not warrant that the website will be uninterrupted, secure, 
                or error-free. The information provided is for general purposes and should not 
                be relied upon as professional advice.
              </p>
            </section>

            <section>
              <h2 className="font-display text-2xl font-semibold text-foreground">
                Limitation of Liability
              </h2>
              <p className="mt-3">
                To the fullest extent permitted by law, AutoTechSpot shall not be liable for 
                any indirect, incidental, special, consequential, or punitive damages arising 
                from your use of the website, even if we have been advised of the possibility 
                of such damages.
              </p>
            </section>

            <section>
              <h2 className="font-display text-2xl font-semibold text-foreground">
                Indemnification
              </h2>
              <p className="mt-3">
                You agree to indemnify and hold harmless AutoTechSpot and its affiliates from 
                any claims, damages, or expenses arising from your use of the website or 
                violation of these terms.
              </p>
            </section>

            <section>
              <h2 className="font-display text-2xl font-semibold text-foreground">
                Changes to Terms
              </h2>
              <p className="mt-3">
                We reserve the right to modify these terms at any time. Changes will be 
                effective immediately upon posting to the website. Your continued use of 
                the website after changes constitutes acceptance of the new terms.
              </p>
            </section>

            <section>
              <h2 className="font-display text-2xl font-semibold text-foreground">
                Governing Law
              </h2>
              <p className="mt-3">
                These terms shall be governed by and construed in accordance with applicable 
                laws, without regard to conflict of law principles.
              </p>
            </section>

            <section>
              <h2 className="font-display text-2xl font-semibold text-foreground">
                Contact Us
              </h2>
              <p className="mt-3">
                If you have any questions about these Terms of Service, please contact us at{" "}
                <a href="mailto:contact@autotechspot.com" className="text-primary hover:underline">
                  contact@autotechspot.com
                </a>
                .
              </p>
            </section>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default TermsPage;
