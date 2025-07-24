"use client";

import styles from "./new-article.module.css";
import { useEffect, useState } from "react";
import { FaImage } from "react-icons/fa6";
import { IoCloseCircleSharp } from "react-icons/io5";
import { doc, setDoc } from "firebase/firestore";
import { auth, db } from "../../firebase/config";
import { useAuthState } from "react-firebase-hooks/auth";
import { useRouter } from "next/navigation";

export default function NewArticle() {
  const [article, setArticle] = useState(``);
  const [title, setTitle] = useState("");
  const [slug, setSlug] = useState("");
  const [selectedImg, setSelectedImg] = useState(null);
  const [isImageSelector, setIsImageSelector] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const [imageList] = useState([
    "blog1.jpg",
    "blog2.jpg",
    "blog3.jpg",
    "blog4.jpg",
    "blog5.jpg",
    "blog6.jpg",
    "blog7.jpg",
    "blog8.jpg",
    "blog9.jpg",
    "blog10.jpg",
    "blog11.jpg",
    "blog12.jpg",
    "blog13.jpg",
    "blog14.jpg",
    "blog15.jpg",
    "blog16.jpg",
    "blog17.jpg",
    "blog18.jpg",
    "blog19.jpg",
    "blog20.jpg",
    "blog21.jpg",
    "blog22.jpg",
  ]);

  const [user, loading] = useAuthState(auth);
  const router = useRouter();

  function slugify(title) {
    return title
      .toLowerCase()
      .replace(/[^a-z0-9\s]/g, "") // Remove special characters
      .trim()
      .replace(/\s+/g, "-"); // Replace spaces with single dash
  }

  useEffect(() => {
    // let slug_temp = title.toLocaleLowerCase().trim();
    let slugish = slugify(title);
    // const withStroke = slug_temp.replace(/\s+/g, "-").trim();
    setSlug(slugish);
  }, [title]);

  const handleImageSelect = (image) => {
    setSelectedImg(image);
    setIsImageSelector(false);
  };

  const handleArticleSubmit = () => {
    if (!user && !loading) {
      setErrorMessage("You must be logged in to save an article.");
      return;
    }
    if (!title) {
      setErrorMessage("Title is required.");
      return;
    } else if (!article) {
      setErrorMessage("Article content is required.");
      return;
    } else if (!selectedImg) {
      setErrorMessage("Please select an image for the article.");
      return;
    } else {
      setErrorMessage("");
      const uid = user ? user.uid : null;
      const email = user ? user.email : null;
      const authorname = user ? user.displayName : "Anonymous";

      saveArticleToFirestore(
        uid,
        email,
        authorname,
        title,
        slug,
        article,
        selectedImg
      );
    }
    setTimeout(() => {
      router.push("/dashboard");
    }, 1000);
  };

  const saveArticleToFirestore = async (
    uid,
    email,
    authorname,
    title,
    slug,
    article
  ) => {
    if (user) {
      const articleData = {
        articleId: slug,
        authorName: authorname,
        authorEmail: email,
        authorId: uid,
        title: title,
        slug: slug,
        article: article,
        image: selectedImg,
        createdAt: new Date().toISOString(),
        category: "Uncategorised",
        isPublished: false,
        isFeatured: false,
        likes: 0,
        view: 0,
        trendingCount: 0,
        comments: [],
        tags: [],
        readTime: Math.ceil(article.split(" ").length / 200), // Assuming average reading speed of 200 words per minute
        isDraft: true, // Initially set to true, can be changed later
        isArchived: false, // Initially set to false, can be changed later
        isDeleted: false, // Initially set to false, can be changed later
      };

      try {
        await setDoc(doc(db, "articles", slug), articleData);
        console.log("Article saved successfully:", articleData);
      } catch (error) {
        // console.error("Error saving article:", error);
        setErrorMessage("Failed to save article. Please try again.");
      }
    } else {
      // console.error("User is not authenticated. Cannot save article.");
      setErrorMessage("You must be logged in to save an article.");
    }
  };

  return (
    <div className={styles.new_article_container}>
      <div className={styles.author_details}>
        <div className={styles.author_details_title}>
          <h4>Author Details</h4>
        </div>
        <input type="text" placeholder={`Name: ${user && user.displayName}`} />
        <input
          type="email"
          placeholder={`Email: ${user && user.email}`}
          disabled
          style={{ fontSize: "0.7rem" }}
        />
        <input
          type="text"
          placeholder={`User ID: ${user && user.uid}`}
          disabled
          style={{ fontSize: "0.7rem" }}
        />
        <button
          className={styles.submit_article_button}
          onClick={handleArticleSubmit}
        >
          Submit and save article
        </button>
      </div>

      <div className={styles.new_article_details}>
        {errorMessage && (
          <div className={styles.error_message_box}>
            <p>{errorMessage}</p>
            <IoCloseCircleSharp size={23} onClick={() => setErrorMessage("")} />
          </div>
        )}
        <div className={styles.article_img}>
          {!selectedImg && (
            <div
              className={styles.article_img_Clickable_container}
              onClick={() => setIsImageSelector(true)}
            >
              <FaImage size={48} />
              <p className={styles.article_img_title1}>
                Upload / Choose an image
              </p>
              <p className={styles.article_img_title2}>
                Must be 1920x1080px and <br /> less than 1MB in size
              </p>
            </div>
          )}
          {selectedImg && (
            <img
              src={`/blog_imgs/${selectedImg}`}
              alt="Blog image"
              className={styles.selected_blog_img}
            />
          )}
        </div>
        {selectedImg && (
          <button
            className={styles.change_image_button}
            onClick={() => setIsImageSelector(true)}
          >
            Change photo
          </button>
        )}
        <div className={styles.article_content}>
          <div className={styles.new_article_title}>
            <p>Title</p>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Provide a title for your article, e.g. 'My First Article'. Don't use special characters."
              autoFocus
            />
          </div>
          <div className={styles.new_article_slug}>
            <p>Slug:</p>
            <input type="text" value={slug} disabled />
          </div>
          <div className={styles.new_article_article_area}>
            <p>Article</p>
            <textarea
              value={article}
              onChange={(e) => setArticle(e.target.value)}
            />
          </div>
        </div>
      </div>
      {isImageSelector && (
        <div className={styles.new_article_img_selector_modal_container}>
          <div className={styles.new_article_img_selector_modal}>
            <h4>Select Article Image</h4>
            <div className={styles.image_preview_container}>
              {imageList.map((image, index) => (
                <div
                  key={index}
                  className={styles.image_preview}
                  onClick={() => handleImageSelect(image)}
                >
                  <img
                    src={`/blog_imgs/${image}`}
                    alt={`Article Image ${index + 1}`}
                    className={styles.image_preview_img}
                  />
                </div>
              ))}
            </div>
          </div>
          <div
            className={styles.close_icon_container}
            onClick={() => setIsImageSelector(false)}
          >
            <IoCloseCircleSharp size={32} />
          </div>
        </div>
      )}
    </div>
  );
}
