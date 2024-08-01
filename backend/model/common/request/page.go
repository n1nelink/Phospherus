package commonreq

// PageRequest 分页请求数据
type PageRequest struct {
	PageNum  int `json:"pageNum" default:"1"`   // 页码
	PageSize int `json:"pageSize" default:"10"` // 每页大小
}
