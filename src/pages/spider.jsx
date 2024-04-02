import { Helmet } from "react-helmet-async";

import { SpiderView } from "../sections/spider/view";

// ----------------------------------------------------------------------

export default function SpiderPage() {
    return (
        <>
            <Helmet>
                <title> Crawl | Minimal UI </title>
            </Helmet>

            <SpiderView />
        </>
    );
}
