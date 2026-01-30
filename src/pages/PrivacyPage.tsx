import { Helmet } from "react-helmet-async";
import Layout from "@/components/layout/Layout";

const PrivacyPage = () => {
  return (
    <Layout>
      <Helmet>
        <title>Privacy Policy | AutoTechSpot</title>
        <meta
          name="description"
          content="Read AutoTechSpot's privacy policy to understand how we collect, use, and protect your personal information."
        />
      </Helmet>

      <div className="container py-12 md:py-16">
        <div className="mx-auto max-w-3xl">
          <h1 className="font-display text-4xl font-bold md:text-5xl">Privacy Policy</h1>
          <p className="mt-4 text-sm text-muted-foreground">
            Last updated: {new Date().toLocaleDateString()}
          </p>

          <div className="mt-8 space-y-8 text-muted-foreground">
            <section>
              <h2 className="font-display text-2xl font-semibold text-foreground">
                Introduction
              </h2>
              <p className="mt-3">
                At AutoTechSpot, we respect your privacy and are committed to protecting your 
                personal data. This privacy policy explains how we collect, use, and safeguard 
                your information when you visit our website.
              </p>
            </section>

            <section>
              <h2 className="font-display text-2xl font-semibold text-foreground">
                Information We Collect
              </h2>
              <p className="mt-3">We may collect the following types of information:</p>
              <ul className="mt-3 list-inside list-disc space-y-2">
                <li>
                  <strong>Personal Information:</strong> Name, email address, and other contact 
                  details you provide when subscribing to our newsletter or contacting us.
                </li>
                <li>
                  <strong>Usage Data:</strong> Information about how you use our website, 
                  including pages visited, time spent, and browser type.
                </li>
                <li>
                  <strong>Cookies:</strong> Small data files stored on your device to enhance 
                  your browsing experience.
                </li>
              </ul>
            </section>

            <section>
              <h2 className="font-display text-2xl font-semibold text-foreground">
                How We Use Your Information
              </h2>
              <p className="mt-3">We use the collected information for:</p>
              <ul className="mt-3 list-inside list-disc space-y-2">
                <li>Providing and maintaining our website</li>
                <li>Sending newsletters and updates (with your consent)</li>
                <li>Responding to your inquiries and requests</li>
                <li>Analyzing website usage to improve our content</li>
                <li>Complying with legal obligations</li>
              </ul>
            </section>

            <section>
              <h2 className="font-display text-2xl font-semibold text-foreground">
                Data Sharing
              </h2>
              <p className="mt-3">
                We do not sell your personal information. We may share your data with trusted 
                third-party service providers who assist us in operating our website, conducting 
                our business, or serving our users. These parties are obligated to keep your 
                information confidential.
              </p>
            </section>

            <section>
              <h2 className="font-display text-2xl font-semibold text-foreground">
                Cookies
              </h2>
              <p className="mt-3">
                Our website uses cookies to enhance your experience. You can choose to disable 
                cookies through your browser settings, but this may affect some functionality 
                of the website.
              </p>
            </section>

            <section>
              <h2 className="font-display text-2xl font-semibold text-foreground">
                Your Rights
              </h2>
              <p className="mt-3">You have the right to:</p>
              <ul className="mt-3 list-inside list-disc space-y-2">
                <li>Access the personal data we hold about you</li>
                <li>Request correction of inaccurate data</li>
                <li>Request deletion of your data</li>
                <li>Withdraw consent for data processing</li>
                <li>Opt-out of marketing communications</li>
              </ul>
            </section>

            <section>
              <h2 className="font-display text-2xl font-semibold text-foreground">
                Data Security
              </h2>
              <p className="mt-3">
                We implement appropriate security measures to protect your personal information 
                against unauthorized access, alteration, disclosure, or destruction. However, 
                no method of transmission over the internet is 100% secure.
              </p>
            </section>

            <section>
              <h2 className="font-display text-2xl font-semibold text-foreground">
                Changes to This Policy
              </h2>
              <p className="mt-3">
                We may update this privacy policy from time to time. We will notify you of any 
                changes by posting the new policy on this page and updating the "Last updated" 
                date.
              </p>
            </section>

            <section>
              <h2 className="font-display text-2xl font-semibold text-foreground">
                Contact Us
              </h2>
              <p className="mt-3">
                If you have any questions about this Privacy Policy, please contact us at{" "}
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

export default PrivacyPage;
