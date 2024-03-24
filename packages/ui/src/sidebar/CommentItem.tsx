import { CommentType } from "@cllgnotes/types";
import Text from "../text/Text";

const CommentItem = ({ page, comment, createdAt }: CommentType) => {
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
        {comment}
      </Text>
    </div>
  );
};

export default CommentItem;
