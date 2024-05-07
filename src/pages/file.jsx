import { Helmet } from "react-helmet-async";

import { FileView } from "../sections/file/view";

// ----------------------------------------------------------------------

export default function FilePage() {
    return (
        <>
            <Helmet>
                <title> File | Minimal UI </title>
            </Helmet>

            <FileView />
        </>
    );
}
