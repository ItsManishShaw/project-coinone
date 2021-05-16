import React from "react";
 const useWindowResize=() => {
  const [dimensions, setDimensions] = React.useState({
    height: null,
    width: null,
  });
  React.useEffect(() => {
    function handleResize() {
      setDimensions({
        height: window?.innerHeight || null,
        width: window?.innerWidth || null,
      });
    }
    if (dimensions.width === null) handleResize();
    window.addEventListener("resize", handleResize);
    return _ => {
      window.removeEventListener("resize", handleResize);
    };
  }, [dimensions.width]);
  return [dimensions.width, dimensions.height];
};
export default useWindowResize ;
