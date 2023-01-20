import './Home.css';
import { useCallback, useEffect, useState } from 'react';

import { Posts } from './../../components/Posts';

import { loadPosts } from './../../Utils/load-posts';
import { Button } from '../../components/Buttons/Button';
import { TextInput } from '../../components/Search-input';

export const Home = () => {
  const [posts, setPosts] = useState([]);
  const [allPosts, setAllPosts] = useState([]);
  const [page, setPage] = useState(0);
  const [postsPerPage] = useState(6);
  const [searchPosts, setSearchPosts] = useState('');

  const filterPosts = searchPosts
    ? allPosts.filter((post) => {
        return post.title.toLowerCase().includes(searchPosts.toLowerCase());
      })
    : posts;

  const disabled = page + postsPerPage >= allPosts.length;

  const load_Posts = useCallback(async (page, postsPerPage) => {
    const data = await loadPosts();
    setPosts(data.slice(page, postsPerPage));
    setAllPosts(data);
  }, []);

  useEffect(() => {
    load_Posts(0, postsPerPage);
  }, [load_Posts, postsPerPage]);

  const load_more_posts = () => {
    console.log('load_more_posts foi chamado');

    const nextPage = page + postsPerPage;
    const nextPosts = allPosts.slice(nextPage, nextPage + postsPerPage);

    posts.push(...nextPosts);

    setPosts(posts);
    setPage(nextPage);
  };

  const handleSearch = (e) => {
    const { value } = e.target;
    setSearchPosts(value);
  };

  return (
    <section className="container">
      <div className="text-input-container">
        {!!searchPosts && (
          <>
            <h2>Search value: {searchPosts}</h2>
          </>
        )}

        {!searchPosts && (
          <>
            <h2>Search value: </h2>
          </>
        )}

        <TextInput searchPosts={searchPosts} handleSearch={handleSearch} />
      </div>

      {!searchPosts && <Button text={'Click Next'} eventClick={load_more_posts} disabled={disabled} />}

      <Posts posts={filterPosts} />
    </section>
  );
};

export default Home;
