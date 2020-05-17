import Post from '../models/post_model';

export const createPost = (req, res) => {
  const post = new Post();
  post.title = req.body.title;
  post.tags = req.body.tags;
  post.content = req.body.content;
  post.coverUrl = req.body.coverUrl;
  post.comments = req.body.comments;
  post.author = req.user;
  console.log(req.user);
  post.save()
    .then((result) => {
      res.json({ message: 'Post created!' });
    })
    .catch((error) => {
      res.status(500).json({ error });
    });
};
export const getPosts = (req, res) => {
  console.log('getting');
  Post.find().populate('author').sort({ createdAt: -1 }).then((result) => {
    res.json(result);
  })
    .catch((error) => {
      res.status(404).json({ error });
    });
};
export const getPost = (req, res) => {
  Post.findById(req.params.id).populate('author').then((result) => {
    res.json(result);
  }).catch((error) => {
    res.status(404).json({ error });
  });
};
export const deletePost = (req, res) => {
  Post.findById(req.params.id).populate('author').then((result) => {
    if (result.author.email !== req.user.email) {
      console.log(result, req.user.email);
      res.status(403).send('You are not authorized to delete this post.');
    } else {
      Post.findByIdAndDelete(req.params.id).then((result2) => {
        res.json(result2);
      }).catch((error) => {
        res.status(500).json({ error });
      });
    }
  });
};

export const updatePost = (req, res) => {
  Post.findByIdAndUpdate(req.params.id, req.body, { new: true }).populate('author').then((result) => {
    res.json(result);
  }).catch((error) => {
    res.status(500).json({ error });
  });
};
