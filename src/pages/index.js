import React from "react";
import { Link } from "gatsby";
import Layout from "../components/layout";
import Image from "../components/image";
import SEO from "../components/seo";
import PostCanvas from "../components/postCanvas"

const IndexPage = () => (
  <Layout>
    <SEO title="Home" keywords={[`gatsby`, `application`, `react`]} />
    <h1>Make an IMPACT</h1>
    <p>Inspirational post generator & social media marketing tool</p>
    <div style={{ maxWidth: `800px`, marginBottom: `1.45rem` }}></div>
    <PostCanvas/> 
  </Layout>
);

export default IndexPage;
