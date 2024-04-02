import { Helmet } from "react-helmet-async";

import { WebsiteSpiderView } from "../sections/website-spider/view";

// ----------------------------------------------------------------------

export default function CrawlerPage() {
    return (
        <>
            <Helmet>
                <title> Crawl | Minimal UI </title>
            </Helmet>

            <WebsiteSpiderView />
        </>
    );
}
