import { useEffect, useRef, useState } from "react";

const Toggle = () => {
  const [opened, setOpened] = useState(false);
  const ref = useRef(null);
  useEffect(() => {
    const handleClick = (event) => {
      if (ref.current && !ref.current.contains(event.target)) {
        setOpened(false);
      }
    };

    document.addEventListener("mouseup", handleClick);
    return () => {
      document.removeEventListener("mouseup", handleClick);
    };
  }, [ref]);

  return { opened, setOpened, ref };
};

export default Toggle;