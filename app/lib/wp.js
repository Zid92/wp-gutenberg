export async function getWpPosts() {
    const res = await fetch('http://localhost:8080/wordpress/wp-json/wp/v2/posts');
    if (!res.ok) {
        throw new Error('Failed to fetch posts');
    }
    return res.json();
}

export async function getPost(id) {
    const res = await fetch(`http://localhost:8080/wordpress/wp-json/wp/v2/posts/${id}`);
    if (!res.ok) {
        throw new Error('Failed to fetch post');
    }
    return res.json();
}
