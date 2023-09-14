import { FavoriteBorderRounded, Checkbox, FavoriteRounded } from "../mui/mui";
import Colors from "@cllgnotes/types/colors";
import Text from "../text/Text";
type ButtonLikeProps = {
  likes?: number;
};
const label = { inputProps: { "aria-label": "Checkbox demo" } };
const ButtonLike = ({ likes }: ButtonLikeProps) => {
  return (
    <>
      <div className="frc" style={{ color: Colors.dGrey, columnGap: 5 }}>
        <Checkbox
          {...label}
          icon={<FavoriteBorderRounded />}
          checkedIcon={
            <FavoriteRounded
              sx={{
                color: Colors.red,
              }}
              color="inherit"
            />
          }
        />
        {/* <IconButton size="small">
          <FavoriteBorderRounded color="inherit" />
        </IconButton> */}
        <Text type="medi12">{String(likes)}</Text>
      </div>
    </>
  );
};

export default ButtonLike;
