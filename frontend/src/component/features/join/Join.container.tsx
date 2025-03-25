import { useState } from "react";

import JoinPresenter from "./Join.presenter";
import { JoinProps } from "./Join.types";

const JoinContainer = () => {
  const [id, setId] = useState<string>("");

  const onChangeId: JoinProps["onChangeId"] = (event) => {
    setId(event.target.value);
    console.log(id);
  };

  return <JoinPresenter onChangeId={onChangeId} />;
};

export default JoinContainer;
