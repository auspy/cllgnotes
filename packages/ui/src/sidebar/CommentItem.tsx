import { CommentType } from "@cllgnotes/types";
import Text from "../text/Text";

const CommentItem = ({ page, text, createdAt }: CommentType) => {
  if (!page || !text) {
    return null;
  }
  return (
    <div className="border-b w100 border-dashed border-dark pb-[15px]  ">
      <div className="frcsb">
        <Text type="semi12" color="dark">
          Page #{page}
        </Text>
        <Text type="medi12" color="dGrey">
          {createdAt?.toLocaleTimeString()} - {createdAt?.toLocaleDateString()}
        </Text>
      </div>
      <Text type="medi14" color="dark">
        {text}
      </Text>
    </div>
  );
};

export default CommentItem;
