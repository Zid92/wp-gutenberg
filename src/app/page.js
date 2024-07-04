import Link from 'next/link';
import { getWpPosts } from '../../app/lib/wp';
import parse, { domToReact } from 'html-react-parser';

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
                attribs['width'] = '250';
                attribs['height'] = '150';
                return <img {...attribs} />;
            }
        },
    };

    return parse(content, options);
};

const page = async () => {
    const posts = await getWpPosts();
    
    console.log(posts);

    return (
        <>
            <h1>Headless Blog</h1>
            <div>
                {posts.map((post) => (
                    <Link href={'/blog/' + post.id} key={post.id}>
                        <h2>
                            {post.title.rendered} <span>&gt;</span>
                        </h2>
                        <div dangerouslySetInnerHTML={{__html: post.excerpt.rendered}}/>
                    </Link>
                ))}
            </div>
        </>
    );
};

export default page;
