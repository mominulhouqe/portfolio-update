import React, { useEffect, useState } from "react";
import "aos/dist/aos.css";
import "animate.css";
import AOS from "aos";
import clsx from "clsx";
import axios from "axios";

// Define the type for a blog post
interface BlogPost {
  _id: string;
  title: string;
  text: string;
  img: string;
  link: string;
  date: string;
}

const Blogs: React.FC = () => {
  const [blogPosts, setBlogPosts] = useState<BlogPost[]>([]); // Type the state to BlogPost[]
  const [loading, setLoading] = useState<boolean>(true); // Type the loading state

  useEffect(() => {
    AOS.init({
      once: true,
    });

    // Fetch blog posts from API
    const fetchBlogPosts = async () => {
      try {
        const res = await axios.get<BlogPost[]>('/api/blog'); // Specify that the response is an array of BlogPost
        setBlogPosts(res.data);
        setLoading(false);
      } catch (err) {
        console.error('Error fetching blog posts:', err);
        setLoading(false);
      }
    };

    fetchBlogPosts();
  }, []);

  if (loading) {
    return <div className="container text-center py-20">Loading blog posts...</div>;
  }

  return (
    <section className="section section-md bg-right" id="blog">
      <div className="bg-item-1 overflow-hidden hidden md:flex">
        <img
          className="h-full"
          src="images/bg-pattern-1.jpg"
          alt="background"
        />
      </div>
      <div className="bg-item-2 bg-secondary"></div>
      <div className="container">
        <h2
          className="text-decoration text-center text-sm-left animated fadeIn mobile:text-start"
          data-aos="fade-in"
          data-aos-anchor-placement="bottom-bottom"
          data-animate=""
        >
          My Blog
        </h2>

        <div className="post-container">
          {blogPosts.map((post, i) => (
            <div
              key={post._id}
              className="post post-side"
              data-aos={clsx(i % 2 === 0 ? "fade-left" : "fade-right")}
              data-aos-anchor-placement="top-bottom"
              data-aos-offset="220"
              data-animate=""
            >
              <a className="post-media" href={post.link}>
                <img
                  className="post-img"
                  src={post.img.startsWith('http') ? post.img : `http://localhost:5000${post.img}`}
                  alt={post.title}
                  width="287"
                  height="239"
                />
              </a>
              <div className="post-body">
                <div className="post-meta">
                  <div className="post-meta-item">
                    <div className="post-date h5">
                      {new Date(post.date).toLocaleDateString('en-US', {
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric'
                      })}
                    </div>
                  </div>
                </div>
                <div className="post-title h4">
                  <a href={post.link}>{post.title}</a>
                </div>
                <div className="post-text">{post.text}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Blogs;
