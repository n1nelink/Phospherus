package response

import (
	"phospherus/model"
	commonresp "phospherus/model/common/response"
)

type GetArticleDetail struct {
	model.Article
	Avatar       string   `json:"avatar"`
	AuthorName   string   `json:"author_name"`
	CategoryName string   `json:"category_name"`
	TagNames     []string `json:"tag_names"`
}

type GetArticleList struct {
	commonresp.PageResult
	ArticleList any `json:"article_lsit"`
}

type PostArticle struct{}

type DeleteArticle struct{}

type UpdateArticle struct{}
