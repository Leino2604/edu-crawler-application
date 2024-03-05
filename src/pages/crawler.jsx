import { Helmet } from "react-helmet-async";

import { CrawlerView } from "../sections/crawler/view";

// ----------------------------------------------------------------------

export default function CrawlerPage() {
  return (
    <>
      <Helmet>
        <title> Crawl | Minimal UI </title>
      </Helmet>

      <CrawlerView />
    </>
  );
}
