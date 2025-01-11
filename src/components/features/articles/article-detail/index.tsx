import { PrismicRichText } from "@prismicio/react";

import { LatestPosts } from "@/components/features/articles/latestPosts";
import { Action } from "@/components/ui/action";
import { Heading } from "@/components/ui/heading";
import { Tag } from "@/components/ui/tag";

import { ArticleDocument } from "../../../../../prismicio-types";
import { Summary } from "../article-summary";
import { createID, filterHeadings } from "../helpers";
import { Newsletter } from "../newsletter";
import { ArticleShareLinks } from "../share-links";
import styles from "./article-detail.module.scss";
import { CallToAction } from "../../call-to-action";
import TrackingLink from "@/components/ui/tracking-link/tracking-link";
import { ArticlePage } from "@/lib/prismic/format/article";
import { ArrowDownSvg } from "@/svgs/arrow-down";

const components = {
  heading2: ({ text }) => {
    return <h2 id={createID(text)}>{text}</h2>;
  },
  heading3: ({ text }) => {
    return <h3 id={createID(text)}>{text}</h3>;
  },
  heading4: ({ text }) => {
    return <h4 id={createID(text)}>{text}</h4>;
  },
  heading5: ({ text }) => {
    return <h5 id={createID(text)}>{text}</h5>;
  },
  heading6: ({ text }) => {
    return <h6 id={createID(text)}>{text}</h6>;
  },
  embed: ({ node }) => {
    if (node.oembed.provider_name === "YouTube") {
      return (
        <div className="embed-wrapper">
          <p>a</p>
          <div dangerouslySetInnerHTML={{ __html: node.oembed.html ?? "" }} />
        </div>
      );
    }
  },
  paragraph: ({ children, text }) => {
    if (text === "{{ blog_ctas() }}") {
      return (
        <div className={styles.buttonsContainer}>
          <Action href="/book-a-call">Book a call </Action>
          <TrackingLink
            url="https://secure.tutorcruncher.com/start/1/"
            text="Start a free trial"
          />
        </div>
      );
    }

    return <p>{children}</p>;
  },
  hyperlink: ({ children, node }) => {
    const target = node.data.target === "_blank" ? "_blank" : "_self";
    const rel = target === "_blank" ? "noopener noreferrer" : null;

    return (
      <a href={node.data.url} target={target} rel={rel}>
        {children}
      </a>
    );
  },
};

interface ArticleDetailProps {
  article: ArticlePage;
  relatedPosts: ArticleDocument[];
}

export const ArticleDetail = ({
  article,
  relatedPosts,
}: ArticleDetailProps) => {
  const { content } = article;

  const category = content?.category?.title || "";
  const headings = filterHeadings(content.body);

  const publishedDate = new Date(content.publishedDate).toLocaleDateString(
    "en-GB",
    {
      day: "numeric",
      month: "short",
      year: "numeric",
    }
  );
  return (
    <>
      <div className={styles.header}>
        {category ? <Tag title={category} noHoverEffect /> : null}
        <Heading size="large" variant="h1">
          {content.title}
        </Heading>
        <div className={styles.dateAndShareWraper}>
          {publishedDate}
          <div className={styles.hideOnMobile}>
            <ArticleShareLinks title={content.title} variant="white" />
          </div>
        </div>
      </div>
      <div className={styles.divide}>
        <div className={styles.divideInner}>{content.featuredImage}</div>
      </div>
      <div className={styles.contentWrapper}>
        <div className={styles.content}>
          <div>
            <Summary headings={headings} />
            <Newsletter />
            <a href="#related-posts" className={styles.relatedPostsLink}>
              Go to related articles
              <ArrowDownSvg />
            </a>
          </div>
          <div>
            <article className="main-content">
              <PrismicRichText field={content.body} components={components} />
            </article>
            <div className={styles.dateAndShareWraper}>
              <div className={styles.hideOnMobile}>{publishedDate}</div>
              <ArticleShareLinks title={content.title} variant="lightBlue" />
            </div>
          </div>
        </div>
      </div>
      {relatedPosts && relatedPosts.length !== 0 ? (
        <div id="related-posts">
          <LatestPosts
            posts={relatedPosts}
            title="Related articles"
            background="cream"
          />
        </div>
      ) : null}
      <CallToAction background="blue" />
    </>
  );
};
