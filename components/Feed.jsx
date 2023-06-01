"use client";

import { useState, useEffect } from "react";
import PropmtCard from "./PropmtCard";

const PropmtCardList = ({ data, handleTagClick }) => {
  return (
    <div className="mt-16 prompt_layout">
      {data.map((post) => (
        <PropmtCard
          key={post._id}
          post={post}
          handleTagClick={handleTagClick}
        />
      ))}
    </div>
  );
};

const Feed = () => {
  const [searchText, setSearchText] = useState("");
  const [posts, setPosts] = useState([]);
  const [searchedPosts, setSearchedPosts] = useState([]);

  useEffect(() => {
    const fetchPosts = async () => {
      const res = await fetch("/api/prompt");
      const data = await res.json();
      setPosts(data);
    };

    fetchPosts();
  }, []);

  const filterPosts = (searchTerm) => {
    const newPosts = posts.filter((post) => {
      return (
        post.prompt.toLowerCase().includes(searchTerm.toLowerCase()) ||
        post.tag.toLowerCase().includes(searchTerm.toLowerCase()) ||
        post.creator.username.toLowerCase().includes(searchTerm.toLowerCase())
      );
    });
    setSearchedPosts(newPosts);
  };

  const handleTagClick = (tagName) => {
    setSearchText(tagName);
    const newPosts = posts.filter((post) => {
      return post.tag.toLowerCase().includes(tagName.toLowerCase());
    });
    setSearchedPosts(newPosts);
  };

  useEffect(() => {
    filterPosts(searchText);
  }, [searchText]);

  return (
    <section className="feed">
      <form className="relative w-full flex-center">
        <input
          type="text"
          placeholder="Search for a tag or a username"
          value={searchText}
          onChange={(e) => setSearchText(e.target.value)}
          required
          className="search_input peer"
        />
      </form>
      <PropmtCardList
        data={searchText ? searchedPosts : posts}
        handleTagClick={handleTagClick}
      />
    </section>
  );
};

export default Feed;
