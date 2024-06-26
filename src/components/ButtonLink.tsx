import { Link } from "@mui/material";

type Props = {
  onClick: FunctionVoid;
  text: string;
};

export default function ButtonLink({ onClick, text }: Props) {
  return (
    <Link
      variant="body2"
      component="button"
      underline="hover"
      sx={{
        color: "#000",
        "&:hover": {
          color: "primary.main",
        },
      }}
      onClick={onClick}
    >
      {text}
    </Link>
  );
}
