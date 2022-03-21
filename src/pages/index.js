import React from "react";
import clsx from "clsx";
import Layout from "@theme/Layout";
import Link from "@docusaurus/Link";
import useDocusaurusContext from "@docusaurus/useDocusaurusContext";
import styles from "./index.module.css";
import { Box } from "@mui/system";
import ProjectBox from "../components/ProjectBox";

function HomepageHeader() {
  const { siteConfig } = useDocusaurusContext();
  return (
    <header className={clsx("hero hero--primary", styles.heroBanner)}>
      <div className="container">
        <h1 className="hero__title">{siteConfig.title}</h1>
        <div style={{ marginTop: "50px" }}>
          <quote className="quote">
            "To look simple outside, it must be complex inside."
          </quote>
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              fontSize: "14px",
            }}
          >
            - You already know it.
          </div>
        </div>
      </div>
    </header>
  );
}

export default function Home() {
  const { siteConfig } = useDocusaurusContext();
  return (
    <Layout
      title={`Hello from ${siteConfig.title}`}
      description="Description will go into a meta tag in <head />"
    >
      <HomepageHeader />
      <main>
        <Box p={5}>
          <h3>Principles:</h3>
          <ul>
            <li>Simple APIs.</li>
            <li>Only the essential features are to be implemented.</li>
            <li>
              Try to support the{" "}
              <a href="https://en.wikipedia.org/wiki/Accessibility">
                Accessibility
              </a>
              .
            </li>
            <li>The tests should resemble the way the software is used.</li>
            <li>Respect othes.</li>
          </ul>
        </Box>

        <Box p={5}>
          <h3>Featured Projects:</h3>
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
              lang="ts"
            />
            <ProjectBox
              title="CLI Progressbar"
              url="https://github.com/open-tech-world/cli-progress-bar"
              desc="Node.js CLI progress bar."
              lang="ts"
            />
          </Box>
        </Box>
      </main>
    </Layout>
  );
}
