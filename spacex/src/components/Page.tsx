import React from 'react'

type PageProps = {
    title: string;
    description: string;
}

const Page: React.FC<PageProps> = ({title, description}) => {
    return (
        <div>
            <h1>{title}</h1>
            <p>{description}</p>
        </div>
    )
}

export default Page;