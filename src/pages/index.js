import React from "react";
import Layout from "@theme/Layout";
import clsx from "clsx";
import useDocusaurusContext from "@docusaurus/useDocusaurusContext";
import Link from "@docusaurus/Link";

import styles from "./index.module.css";
import { Box } from "@mui/system";
import ProjectBox from "../components/ProjectBox";

function HomepageHeader() {
  const { siteConfig } = useDocusaurusContext();
  return (
    <header className={clsx("hero hero--primary", styles.heroBanner)}>
      <div className="container">
        <h1 className="hero__title">{siteConfig.title}</h1>
        <p className="hero__subtitle">{siteConfig.tagline}</p>
      </div>
    </header>
  );
}

export default function Home() {
  return (
    <Layout
      title={`Home`}
      description="An open organization for the technological world."
    >
      <HomepageHeader />
      <main>
        <Box p={5}>
          <div className={styles.parallelogram}>
            <h3>PRINCIPLES</h3>
          </div>
          <ul style={{ marginLeft: "25px" }}>
            <li>Simple APIs.</li>
            <li>Implement only essential features.</li>
            <li>
              Try to support the{" "}
              <a href="https://en.wikipedia.org/wiki/Accessibility">
                Accessibility
              </a>
              .
            </li>
          </ul>
        </Box>

        <Box p={5}>
          <div className={styles.parallelogram}>
            <h3>FEATURED PROJECTS</h3>
          </div>
          <Box sx={{ display: "flex", flexWrap: "wrap" }}>
            <ProjectBox
              title="JS Utils"
              url="https://js-utils.pages.dev/"
              desc="A Collection of JavaScript Utility Functions."
              lang="ts"
            />
            <ProjectBox
              title="React Form"
              url="https://react-form.pages.dev/"
              desc="Build & Manage the State of Forms in React."
              lang={["react", "ts"]}
            />
            <ProjectBox
              title="CLI Progressbar"
              url="https://github.com/open-tech-foundation/cli-progress-bar"
              desc="Node.js CLI progress bar."
              lang={["nodeJS", "ts"]}
            />
            <ProjectBox
              title="React State"
              url="https://react-app-state.pages.dev/"
              desc="A shared state management library for React."
              lang={["react", "ts"]}
            />
            <ProjectBox
              title="Route Matcher"
              url="https://route-matcher.pages.dev/"
              desc="A route pattern matcher using regular expressions."
              lang={["ts"]}
            />
          </Box>
        </Box>
      </main>
    </Layout>
  );
}
