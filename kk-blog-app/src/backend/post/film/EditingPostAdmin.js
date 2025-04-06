import { jsx as _jsx } from "react/jsx-runtime";
import PostList from "../PostList.tsx";
const EditingPostAdmin = () => {
    return _jsx(PostList, { collectionName: "editing_collection" });
};
export default EditingPostAdmin;
