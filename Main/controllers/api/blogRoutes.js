const router = require('express').Router();
const { Blog } = require('../../../seeds/models');
const withAuth = require('../../../views/layouts/utils/auth');

router.post('/', withAuth, async (req, res) => {
  try {
    const newBlog = await Blog.create(
      {
      ...req.body,
      title: req.session.title,
      text: req.session.text,
      date_created: req.session.date_created,
      });

    res.status(200).json(newBlog);
  } catch (err) {
    res.status(400).json(err);
  }
});

router.delete('/:id', withAuth, async (req, res) => {
  try {
    const blogData = await Blog.destroy({
      where: {
        id: req.params.id,
        user_id: req.session.user_id,
      },
    });

    if (!projectData) {
      res.status(404).json({ message: 'No blog found with this id!' });
      return;
    }

    res.status(200).json(projectData);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
