import { Helmet } from "react-helmet-async";
import Layout from "@/components/layout/Layout";

const DisclaimerPage = () => {
  return (
    <Layout>
      <Helmet>
        <title>Disclaimer | AutoTechSpot</title>
        <meta
          name="description"
          content="Read the disclaimer for AutoTechSpot regarding our car reviews, content, and affiliate partnerships."
        />
      </Helmet>

      <div className="container py-12 md:py-16">
        <div className="mx-auto max-w-3xl">
          <h1 className="font-display text-4xl font-bold md:text-5xl">Disclaimer</h1>
          <p className="mt-4 text-sm text-muted-foreground">
            Last updated: {new Date().toLocaleDateString()}
          </p>

          <div className="mt-8 space-y-6 text-muted-foreground">
            <section>
              <h2 className="font-display text-2xl font-semibold text-foreground">
                General Information
              </h2>
              <p className="mt-3">
                The information provided on AutoTechSpot is for general informational purposes 
                only. All information on the site is provided in good faith, however, we make 
                no representation or warranty of any kind, express or implied, regarding the 
                accuracy, adequacy, validity, reliability, availability, or completeness of 
                any information on the site.
              </p>
            </section>

            <section>
              <h2 className="font-display text-2xl font-semibold text-foreground">
                Professional Advice
              </h2>
              <p className="mt-3">
                The content on this website does not constitute professional automotive advice. 
                Before making any vehicle purchase or modification decisions, we recommend 
                consulting with qualified automotive professionals.
              </p>
            </section>

            <section>
              <h2 className="font-display text-2xl font-semibold text-foreground">
                External Links
              </h2>
              <p className="mt-3">
                AutoTechSpot may contain links to external websites that are not provided or 
                maintained by us. We do not guarantee the accuracy, relevance, timeliness, 
                or completeness of any information on these external websites.
              </p>
            </section>

            <section>
              <h2 className="font-display text-2xl font-semibold text-foreground">
                Affiliate Disclosure
              </h2>
              <p className="mt-3">
                Some of the links on this website may be affiliate links. This means that 
                we may earn a commission if you click on the link or make a purchase using 
                the link. When you make a purchase, the price you pay will be the same 
                whether you use the affiliate link or go directly to the vendor's website.
              </p>
            </section>

            <section>
              <h2 className="font-display text-2xl font-semibold text-foreground">
                Reviews and Opinions
              </h2>
              <p className="mt-3">
                The reviews and opinions expressed on this website are those of the authors 
                and do not necessarily reflect the views of manufacturers or dealers. We 
                strive to provide honest and unbiased reviews, but all opinions are subjective 
                and should be considered as such.
              </p>
            </section>

            <section>
              <h2 className="font-display text-2xl font-semibold text-foreground">
                Limitation of Liability
              </h2>
              <p className="mt-3">
                In no event shall AutoTechSpot be liable for any indirect, incidental, special, 
                consequential, or punitive damages, including without limitation, loss of 
                profits, data, use, goodwill, or other intangible losses, resulting from your 
                access to or use of or inability to access or use the website.
              </p>
            </section>

            <section>
              <h2 className="font-display text-2xl font-semibold text-foreground">
                Contact Us
              </h2>
              <p className="mt-3">
                If you have any questions about this Disclaimer, please contact us at{" "}
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

export default DisclaimerPage;
