import React from 'react';

function PageContent({ html }) {
    return (
        <div dangerouslySetInnerHTML={{ __html: html }} />
    );
}

export default PageContent;
