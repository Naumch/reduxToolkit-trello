import Header from "./Header";
import Marks from "./Marks";
import Description from "./Description";
import Cover from "./Cover";

export default function OpenCard() {
  return (
    <>
      <Cover />
      <Header />
      <Marks />
      <Description />
    </>
  );
}
