const assert = require('assert');
const User = require('../src/user.model');
const BlogPost = require('../src/blogPost.model');

describe('Middleware', () => {
  let joe, blogPost;

  beforeEach((done) => {
    joe = new User({ name: 'Joe' });
    blogPost = new BlogPost({
      title: 'JS is Great',
      content: 'yep it really is',
    });

    joe.blogPosts.push(blogPost);

    Promise.all([joe.save(), blogPost.save()]).then(() => done());
  });

  it('users clean up dangling blogposts on remove', (done) => {
    joe
      .remove()
      .then(() => BlogPost.count())
      .then((count) => {
        assert(count === 0);
        done();
      });
  });
});
