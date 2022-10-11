import React, { useState, useEffect } from 'react';
import './App.css';
import Post from './components/Post';

function App() {
  const [posts, setPosts] = useState([]);

  const getPostsFromNode = () => {
    fetch('http://localhost:3001/posts')
      .then(res => res.json())
      .then(data => {
        setPosts(data.data);
      });
  };

  const handlePost = () => {
    const content_element = document.getElementById('post-content');
    fetch('http://localhost:3001/posts', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ content: content_element.value })
    })
      .then(() => {
        getPostsFromNode();
        content_element.value = "";
      });
  }

  // Component Init
  useEffect(() => {
    getPostsFromNode();
  }, [])


  return (
    <div className='react-app-component text-center'>
      <div className="container">
        <div className="row justify-content-md-center">
          <div className="col-6">
            <div className="card">
              <div className="card-body">
                <div className="mb-3">
                  <label className="form-label">Enter your post</label>
                  <textarea className="form-control" id="post-content" rows="3"></textarea>
                  <div className="d-grid gap-2">
                    <button type="button" className="btn btn-primary mt-2" onClick={handlePost}>Post</button>
                  </div>
                </div>
              </div>
            </div>

            {posts.map((post) => {
              return <Post key={post._id} post={post} getPostsFromNode={getPostsFromNode} />
            })}
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;