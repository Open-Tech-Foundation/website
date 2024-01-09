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
              <li>Simple APIs</li>
              <li>Implement only essential features</li>
              <li>Respect Developers</li>
              <li>
                Support{" "}
                <a href="https://en.wikipedia.org/wiki/Accessibility">
                  Accessibility
                </a>
              </li>
              <li>
                Beginner-Friendly (Providing 
                <a href="https://en.wikipedia.org/wiki/Mental_model">
                  mental models
                </a>
                , explaining jargon in documents, etc.)
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
              release="BETA"
            />
            <ProjectBox
              title="CLI pbar"
              url="https://github.com/open-tech-foundation/cli-pbar"
              desc="CLI progress bar."
              lang={["nodeJS", "ts"]}
              imgUrl="https://github.com/Open-Tech-Foundation/cli-pbar/raw/main/assets/demo-min.gif"
              release="ALPHA"
            />
            <ProjectBox
              title="React Form"
              url="https://react-form.pages.dev/"
              desc="Build & Manage the State of Forms in React."
              lang={["react", "ts"]}
              release="BETA"
            />
            <ProjectBox
              title="React State"
              url="https://react-app-state.pages.dev/"
              desc="A shared state management library for React."
              lang={["react", "ts"]}
              release="BETA"
            />
            <ProjectBox
              title="React Sandbox"
              url="https://github.com/open-tech-foundation/react-sandbox"
              desc="The CodeSandbox sandpack wrapper with additional features."
              lang={["ts", "react"]}
              imgUrl="https://raw.githubusercontent.com/open-tech-foundation/react-sandbox/HEAD/assets/demo.gif"
              release="BETA"
            />
            <ProjectBox
              title="Vue Input Mask"
              url="https://vue-input-mask.pages.dev/"
              desc="The input mask directive for Vue.js."
              lang={["ts", "vue"]}
              imgUrl="https://raw.githubusercontent.com/Open-Tech-Foundation/vue-input-mask/main/apps/website/public/demo.png"
              release="BETA"
            />
            <ProjectBox
              title="React Code Editor"
              url="https://github.com/Open-Tech-Foundation/react-code-editor"
              desc="A simple code editor for React JS, useful for form code input."
              lang={["react", "ts"]}
              imgUrl="https://raw.githubusercontent.com/open-tech-foundation/react-code-editor/HEAD/demo.gif"
              release="ALPHA"
            />
            <ProjectBox
              title="CLI Styles"
              url="https://github.com/Open-Tech-Foundation/js-cli-styles"
              desc="Style your CLI text using ANSI escape sequences."
              lang={["nodeJS", "ts"]}
              imgUrl="https://raw.githubusercontent.com/open-tech-foundation/js-cli-styles/HEAD/assets/highlight_code.png"
              release="ALPHA"
            />
          </Masonry>
        </Box>
      </main>
    </Layout>
  );
}
