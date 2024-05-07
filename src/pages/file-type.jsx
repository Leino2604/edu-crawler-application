import { Helmet } from "react-helmet-async";

import { FileTypeView } from "../sections/file-type/view";

// ----------------------------------------------------------------------

export default function FileTypePage() {
    return (
        <>
            <Helmet>
                <title> File Type | Minimal UI </title>
            </Helmet>

            <FileTypeView />
        </>
    );
}
