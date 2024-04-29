package admin

import (
	"phospherus/global"
	"phospherus/model"
	"phospherus/model/admin/input"
	"phospherus/model/admin/output"
	commonresp "phospherus/model/common/response"
)

type TagService struct{}

func (*TagService) GetTagList(in *input.GetTagList) (out *output.GetTagList, err error) {
	out = &output.GetTagList{
		PageResult: commonresp.PageResult{
			PageNum:  in.PageNum,
			PageSize: in.PageSize,
		},
	}

	// 查询标签总数
	err = global.DB.Table("tag").Count(&out.Total).Error
	if err != nil {
		return
	}

	// 查询标签列表
	var tagList []model.Tag
	err = global.DB.Table("tag").Offset(in.PageSize * (in.PageNum - 1)).Limit(in.PageSize).Find(&tagList).Error
	if err != nil {
		return
	}
	out.TagList = tagList

	return
}
