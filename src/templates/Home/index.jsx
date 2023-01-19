
import './Home.css'
import { Component } from 'react';

import { Posts} from './../../components/Posts'

import {loadPosts} from './../../Utils/load-posts'
import { Button } from '../../components/Buttons/Button';
import { TextInput } from '../../components/Search-input';

class Home extends Component{
  
  state = {
    posts:[ ],
    allPosts:[ ],
    page: 0,
    postsPerPage: 4,
    searchPosts: ''
    };


  async componentDidMount(){
    await this.load_Posts();
  }

  load_Posts = async()=>{ 
    const data = await loadPosts();
    const {page, postsPerPage} = this.state;
    this.setState({
      posts: data.slice(page,postsPerPage),
      allPosts: data
    })
  }

  load_more_posts = ( )=>{
    console.log('load_more_posts foi chamado')
    const {page, postsPerPage, allPosts, posts} = this.state;

    const nextPage = page + postsPerPage;
    const nextPosts = allPosts.slice(nextPage, nextPage + postsPerPage);

    posts.push(...nextPosts);

    this.setState({posts, page: nextPage});
    
  }

  handleSearch = (e) =>{
    const {value} = e.target;
    this.setState({searchPosts: value})

  }


  render(){

    const {posts, page, postsPerPage, allPosts, searchPosts} = this.state;
    const disabled = page + postsPerPage >= allPosts.length;

    const filterPosts = !!searchPosts ?
      allPosts.filter(post =>{
        return post.title.toLowerCase().includes(
          searchPosts.toLowerCase()
        ) 
      })
      : posts;


    return(
      <section className='container'>

        <div className='text-input-container'>

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

          <TextInput 
          searchPosts={searchPosts}
          handleSearch={this.handleSearch} />
        </div>

        

        {!searchPosts && (
          <Button text={"Click Next"}
          eventClick={this.load_more_posts} 
          disabled={disabled} />
        )}

        <Posts posts={filterPosts} />
      </section>
    )
  }

}


export default Home;
