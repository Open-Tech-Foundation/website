import React from "react";
import Layout from "@theme/Layout";
import clsx from "clsx";
import useDocusaurusContext from "@docusaurus/useDocusaurusContext";
import { Box } from "@mui/system";
import ProjectBox from "../components/ProjectBox";
import { Divider, Typography } from "@mui/material";
import Masonry from "@mui/lab/Masonry";

import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";
import styles from "./index.module.css";

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
          <Typography variant="h5">PRINCIPLES</Typography>
          <Divider />
          <Box mt={2}>
            <ul>
              <li>Simple APIs.</li>
              <li>Implement only the essential features.</li>
              <li>
                Try to support the{" "}
                <a href="https://en.wikipedia.org/wiki/Accessibility">
                  Accessibility
                </a>
                .
              </li>
            </ul>
          </Box>
        </Box>

        <Box p={5}>
          <Typography variant="h5">FEATURED PROJECTS</Typography>
          <Divider />
          <Masonry
            columns={4}
            spacing={2}
            sx={{
              mt: 3,
              display: "flex",
              alignContent: "center",
            }}
          >
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
              imgUrl="https://github.com/Open-Tech-Foundation/cli-progress-bar/raw/main/demo.gif"
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
            <ProjectBox
              title="React Sandbox"
              url="https://github.com/open-tech-foundation/react-sandbox"
              desc="The CodeSandbox sandpack wrapper with tabs layout."
              lang={["ts", "react"]}
              imgUrl="https://raw.githubusercontent.com/open-tech-foundation/react-sandbox/HEAD/Screenshot.png"
            />
          </Masonry>
        </Box>
      </main>
    </Layout>
  );
}
