import { Helmet } from "react-helmet-async";

import { ArticleView } from "../sections/article/view";

// ----------------------------------------------------------------------

export default function ArticlePage() {
    return (
        <>
            <Helmet>
                <title> Article | Minimal UI </title>
            </Helmet>

            <ArticleView />
        </>
    );
}
