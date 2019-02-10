import React from "react";
import { Link } from "gatsby";

import Layout from "../components/layout";
import Image from "../components/image";
import SEO from "../components/seo";
import PostCanvas from "../components/postCanvas"

const IndexPage = () => (
  <Layout>
    <SEO title="Home" keywords={[`gatsby`, `application`, `react`]} />
    <h1>gogetr</h1>
    <p>Make an IMPACT. Save time and money.</p>
    <p>gogetr - instantly generate inspirational facebook and instagram posts</p>
    <div style={{ maxWidth: `800px`, marginBottom: `1.45rem` }}></div>
    <PostCanvas> 
    </PostCanvas>
  </Layout>
);

export default IndexPage;
