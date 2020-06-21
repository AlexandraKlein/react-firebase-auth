import { useEffect } from "react";
import { withRouter, RouteChildrenProps } from "react-router-dom";

function ScrollToTop({ history }: RouteChildrenProps) {
  useEffect(() => {
    const unlisten = history.listen(() => {
      window.scrollTo(0, 0);
    });
    return () => {
      unlisten();
    };
  }, [history]);

  return null;
}

export default withRouter(ScrollToTop);
