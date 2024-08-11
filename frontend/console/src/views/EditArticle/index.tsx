import { useCallback, useEffect, useState } from "react";
import { Card, message } from "antd";
import { postArticleAPI } from "@/api/article";
import { postArticleReq } from "@/api/article/types";
import MDEditor from "@uiw/react-md-editor";
import ImageUploader from "./ImageUploader";
import TagSelect from "./TagSelect";
import PublicSwitcher from "./PublicSwitcher";
import { tagItem } from "@/api/tag/type";

const EditArticle = () => {
    const [title, setTitle] = useState("");
    const [cover, setCover] = useState("");
    const [mdContent, setMdContent] = useState("");
    const [visible, setVisible] = useState(true);
    const [selectedTags, setSelectedTags] = useState<number[]>([]);
    const [tags, setTags] = useState<tagItem[]>([]);

    const handleSetCover = useCallback((newCover: string) => {
        setCover(newCover);
    }, []);

    const handlePostArtcile = (status: number) => {
        const params: postArticleReq = {
            authorId: 1,
            title: title,
            content: mdContent,
            cover: cover,
            isVisible: visible ? 1 : 0,
            tagIds: tags.map((tag: tagItem) => tag.id),
            status: status,
            description: "这是默认的description", // 后端会自动截取，后续可在此处优化，比如使用 AI 自动生成
        };

        const sendData = async () => {
            const jsonResp = await postArticleAPI(params);

            if (jsonResp.code === 0) {
                if (status === 0) {
                    message.success("保存文章成功", 1);
                } else if (status === 1) {
                    message.success("发布文章成功", 1);
                }
            } else {
                message.error("出现错误", 1);
            }
        };

        sendData();
    };

    const showProps = () => {
        console.log("title: ", title);
        console.log("cover: ", cover);
        console.log("mdContent: ", mdContent);
        console.log("visible: ", visible);
        console.log("selectedTags: ", selectedTags);
        console.log("tags: ", tags);
    };

    return (
        <div className="edit-article h-full text-slate-50">
            <div>
                <button className="btn-green my-4" onClick={() => handlePostArtcile(1)}>
                    发布文章
                </button>
                <button className="btn-orange my-4" onClick={() => handlePostArtcile(0)}>
                    保存文章
                </button>
                <button className="btn-violet my-4" onClick={showProps}>
                    上传本地文件
                </button>
            </div>
            <Card className="bg-[#272E48] border-none font-sans">
                <div className="post-article">
                    <input
                        placeholder="Title of article"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        className="peer h-full w-full border-b-4 border-gray-200 bg-transparent pt-4 pb-1.5 text-lg font-normal 
                text-blue-gray-700 outline outline-0 transition-all placeholder-shown:border-blue-gray-200 focus:border-indigo-300 
                focus:outline-0 disabled:border-0 disabled:bg-blue-gray-50 mb-5 font-mono text-slate-50 pl-2"
                    />
                </div>
                <div className="md-container h-full" data-color-mode="dark">
                    <MDEditor height={590} value={mdContent} onChange={setMdContent} />
                </div>
            </Card>

            <div className="flex">
                <Card className="bg-[#272E48] border-none font-sans mt-4 mr-4 w-1/3 h-[110px]">
                    <ImageUploader onSetCover={handleSetCover} />
                </Card>

                <Card className="bg-[#272E48] border-none font-sans mt-4 text-slate-50 w-1/3 mr-4 h-[110px]">
                    <TagSelect
                        selectedTags={selectedTags}
                        setSelectedTags={setSelectedTags}
                        tags={tags}
                        setTags={setTags}
                    />
                </Card>

                <Card className="bg-[#272E48] border-none font-sans mt-4 text-slate-50 w-1/3 h-[110px]">
                    <PublicSwitcher visible={visible} setVisible={setVisible} />
                </Card>
            </div>
        </div>
    );
};

export default EditArticle;
