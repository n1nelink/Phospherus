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

func (*TagService) CreateTag(in *input.CreateTag) (out *output.CreateTag, err error) {
	out = &output.CreateTag{}

	err = global.DB.Table("tag").Create(&model.Tag{
		Name:      in.Name,
		IsVisible: in.IsVisible,
	}).Error

	return
}

func (*TagService) DeleteTag(in *input.DeleteTag) (out *output.DeleteTag, err error) {
	out = &output.DeleteTag{}

	err = global.DB.Where("id in (?)", in.Ids).Delete(&model.Tag{}).Error

	return
}

func (*TagService) UpdateTag(in *input.UpdateTag) (out *output.UpdateTag, err error) {
	out = &output.UpdateTag{}

	err = global.DB.Table("tag").Where("id = ?", in.Id).Updates(&model.Tag{
		Name:      in.Name,
		IsVisible: in.IsVisible,
	}).Error

	return
}
