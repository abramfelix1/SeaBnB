import { useSelector } from "react-redux";

import SpotsList from "./SpotsList";

export default function SpotCurrent() {
  const userId = useSelector((state) => state.session.user.id);

  return <SpotsList userId={userId} />;
}
