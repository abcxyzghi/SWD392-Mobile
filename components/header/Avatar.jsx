import React from "react";
import { Avatar } from "tamagui";

const AVT = () => {
  return (
    <Avatar circular size="$3">
      <Avatar.Image src="https://as1.ftcdn.net/v2/jpg/03/91/19/22/1000_F_391192211_2w5pQpFV1aozYQhcIw3FqA35vuTxJKrB.jpg" />
      <Avatar.Fallback bc="red" />
    </Avatar>
  );
};

export default AVT;