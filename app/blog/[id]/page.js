'use client';

import Link from 'next/link';
import parse, { domToReact } from 'html-react-parser';
import { getPost } from '../../lib/wp';

const fixInternalLinks = (html_string) => {
    const pattern = /href="http:\/\/localhost:8080\/wordpress\/\?p=(\d+)"/g;
    const replacement = 'data-internal-link="true" href="/blog/$1"';
    return html_string.replace(pattern, replacement);
};

const parseHtml = (html) => {
    const _content = html.replace(/\n{2,}/g, '<br />');
    const content = fixInternalLinks(_content);

    const options = {
        replace: ({ name, attribs, children }) => {
            if (name === 'a' && attribs['data-internal-link'] === 'true') {
                return (
                    <Link href={attribs.href} {...attribs}>
                        {domToReact(children, options)}
                    </Link>
                );
            } else if (name === 'img') {
                attribs.width = '250';
                attribs.height = '150';
                return <img {...attribs} />;
            }
        },
    };

    return parse(content, options);
};

const Post = async ({ params }) => {
    const post = await getPost(params.id);
    const content = parseHtml(post.content.rendered);

    return (
        <>
            <h1>{post.title.rendered}</h1>
            <div>{content}</div>
        </>
    );
};

export default Post;
