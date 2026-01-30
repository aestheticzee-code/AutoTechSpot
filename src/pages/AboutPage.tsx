import { Helmet } from "react-helmet-async";
import Layout from "@/components/layout/Layout";

const AboutPage = () => {
  return (
    <Layout>
      <Helmet>
        <title>About Us | AutoTechSpot</title>
        <meta
          name="description"
          content="Learn more about AutoTechSpot - your trusted source for car reviews, automotive news, and expert insights."
        />
      </Helmet>

      <div className="container py-12 md:py-16">
        <div className="mx-auto max-w-3xl">
          <h1 className="font-display text-4xl font-bold md:text-5xl">About Us</h1>
          
          <div className="mt-8 space-y-6 text-muted-foreground">
            <p className="text-lg leading-relaxed">
              Welcome to AutoTechSpot, your trusted destination for comprehensive car reviews, 
              automotive news, and expert insights from the world of automobiles.
            </p>
            
            <h2 className="font-display text-2xl font-semibold text-foreground">Our Mission</h2>
            <p>
              We are passionate about cars and dedicated to providing our readers with honest, 
              in-depth reviews and the latest news from the automotive industry. Our goal is to 
              help you make informed decisions about your next vehicle purchase.
            </p>
            
            <h2 className="font-display text-2xl font-semibold text-foreground">What We Offer</h2>
            <ul className="list-inside list-disc space-y-2">
              <li>Comprehensive car reviews covering performance, features, and value</li>
              <li>Latest automotive news and industry updates</li>
              <li>Expert comparisons to help you choose the right vehicle</li>
              <li>Tips and guides for car enthusiasts</li>
            </ul>
            
            <h2 className="font-display text-2xl font-semibold text-foreground">Our Team</h2>
            <p>
              Our team consists of automotive enthusiasts, experienced journalists, and industry 
              experts who share a common passion for cars. We bring years of experience and a 
              commitment to delivering quality content to our readers.
            </p>
            
            <p>
              Thank you for visiting AutoTechSpot. We hope you find our content valuable and 
              informative. If you have any questions or feedback, please don't hesitate to 
              reach out to us.
            </p>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default AboutPage;
