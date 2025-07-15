import { getAllPosts } from "@/llib/posts"
import MarkdownIt from "markdown-it"
import { notFound } from "next/navigation"
import styles from "./slug.module.css"

const md = new MarkdownIt()

async function fetchPosts(slug) {
    const posts = getAllPosts()
    return posts.find((post) => post.slug === slug)
}

export default async function Post ({params}) {
    const post = await fetchPosts(params.slug)

    if (!post) notFound()

    const htmlConverter = md.render(post.content)

    return(
        <article className={styles.slug_article_container}>
            <h1 className={styles.article_title}>{post.title}</h1>
            <h4>{post.date}</h4>
            <div dangerouslySetInnerHTML={{ __html: htmlConverter }} />
        </article>
    )
}