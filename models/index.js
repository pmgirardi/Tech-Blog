const Blog = require('./Blog');
const User = require('./User');
const Comment = require('./Comment');

User.hasMany(Blog, {
  foreignKey: 'user_id',
  onDelete: 'CASCADE'
});

Blog.belongsTo(User, {
  foreignKey: 'user_id'
  onDelete: 'CASCADE'
});


Comment.belongsTo(User, {
    foreignKey: 'user_id',
    onDelete: 'SET NULL',
});

Comment.belongsTo(BlogPost, {
    foreignKey: 'post_id',
    onDelete: 'SET NULL',
});

User.hasMany(Comment, {
    foreignKey: 'user_id',
    onDelete: 'SET NULL',
});

BlogPost.hasMany(Comment, {
    foreignKey: 'post_id',
});

module.exports = { User, Blog };