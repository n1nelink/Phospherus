package response

type UploadAttachment struct {
	Url string `json:"url"`
}

type GetAttachment struct {
	Id   int    `json:"id"`
	Url  string `json:"url"`
	Name string `json:"name"`
	Ext  string `json:"ext"`
	Type int    `json:"type"`
	Size int    `json:"size"`
}

type DeleteAttachment struct {
}
