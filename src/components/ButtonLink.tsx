import { Link } from "@mui/material";

type Props = {
  onClick: () => void;
  text: string;
};

export default function ButtonLink({ onClick, text }: Props) {
  return (
    <Link
      component="button"
      variant="body2"
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
