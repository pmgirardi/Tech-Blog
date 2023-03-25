const Article = require('./Article');
const User = require('./User');
const Comment = require('./Comment');

User.hasMany(Article, {
  foreignKey: 'user_id',
  onDelete: 'CASCADE'
});

User.hasMany(Comment, {
  foreignKey: 'user_id',
  onDelete: 'SET NULL',
});

Article.belongsTo(User, {
  foreignKey: 'user_id'
  onDelete: 'CASCADE'
});

Article.hasMany(Comment, {
  foreignKey: 'post_id',
});

Comment.belongsTo(User, {
    foreignKey: 'user_id',
    onDelete: 'SET NULL',
});

Comment.belongsTo(Article, {
    foreignKey: 'post_id',
    onDelete: 'SET NULL',
});

module.exports = { User, Article, Comment };