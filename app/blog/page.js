'use client';

import Link from 'next/link';
import { getWpPosts } from '../lib/wp';

const Blog = async () => {
    const posts = await getWpPosts();

    return (
        <>
            <h1>Headless Blog</h1>
            <div>
                {posts.map((post) => (
                    <Link href={'/blog/' + post.id} key={post.id}>
                        <h2>
                            {post.title.rendered} <span>&rarr;</span>
                        </h2>
                        <div dangerouslySetInnerHTML={{ __html: post.excerpt.rendered }} />
                    </Link>
                ))}
            </div>
        </>
    );
};

export default Blog;
