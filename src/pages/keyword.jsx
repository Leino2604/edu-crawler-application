import { Helmet } from "react-helmet-async";

import { KeywordView } from "../sections/keyword/view";

// ----------------------------------------------------------------------

export default function KeywordPage() {
    return (
        <>
            <Helmet>
                <title> Keyword | Minimal UI </title>
            </Helmet>

            <KeywordView />
        </>
    );
}
