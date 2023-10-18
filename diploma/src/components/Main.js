import React from "react";
import Lead from "./Lead";
import Technologies from "./Technologies";
import Description from "./Description";
import Student from "./Student";

function Main() {
  return (
    <main className="content">
      <Lead />
      <Description />
      <Technologies />
      <Student />
    </main>
  );
}

export default Main;
