const User = require('./User');
const Article = require('./Article');
const Comment = require('./Comment');

// User defined as having many Articles creates a foreign key in the article table
User.hasMany(Article, {
  foreignKey: 'user_id',
  onDelete: 'CASCADE'
});

//  User defined as having many Comments creates a foreign key in the comment table
User.hasMany(Comment, {
  foreignKey: 'user_id',
  onDelete: 'SET NULL',
});

// Association between User and Articles
Article.belongsTo(User, {
  foreignKey: 'user_id',
  onDelete: 'CASCADE',
});

// Article is defined as having many Comments that creates a foreign key in the comment table
Article.hasMany(Comment, {
  foreignKey: 'article_id',
});

// Association between Comment and User
Comment.belongsTo(User, {
    foreignKey: 'user_id',
    onDelete: 'SET NULL',
});

// Association between Comment and Article
Comment.belongsTo(Article, {
    foreignKey: 'article_id',
    onDelete: 'SET NULL',
});

module.exports = { User, Article, Comment };