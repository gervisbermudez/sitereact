import { useNavigate } from "react-router-dom";

export default function useContact() {

  const navigate = useNavigate();

  function handleContactBtn(e: React.MouseEvent<HTMLAnchorElement>) {
    e.preventDefault();
    navigate("/contact");
  }

  return {
    handleContactBtn
  }
}