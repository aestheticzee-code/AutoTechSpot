import { Helmet } from "react-helmet-async";
import Layout from "@/components/layout/Layout";

const GonePage = () => {
  return (
    <Layout>
      <Helmet>
        <title>Page Removed | AutoTechSpot</title>
        <meta name="robots" content="noindex, nofollow" />
      </Helmet>
      <div className="container mx-auto px-4 py-20 text-center">
        <h1 className="text-4xl font-bold mb-4 text-foreground">Page Removed</h1>
        <p className="text-muted-foreground text-lg mb-8">
          The page you're looking for has been permanently removed and is no longer available.
        </p>
        <a href="/" className="text-primary hover:underline text-lg">
          ← Back to Home
        </a>
      </div>
    </Layout>
  );
};

export default GonePage;
