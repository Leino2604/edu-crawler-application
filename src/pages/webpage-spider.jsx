import { Helmet } from "react-helmet-async";

import { WebpageSpiderView } from "../sections/webpage-spider/view";

// ----------------------------------------------------------------------

export default function CrawlerPage() {
    return (
        <>
            <Helmet>
                <title> Crawl | Minimal UI </title>
            </Helmet>

            <WebpageSpiderView />
        </>
    );
}
