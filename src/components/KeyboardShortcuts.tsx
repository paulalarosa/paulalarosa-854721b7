import { useNavigate } from "react-router-dom";
import { useHotkeys } from "react-hotkeys-hook";

const sectionShortcut = (id: string) => () => {
  const el = document.getElementById(id) || document.querySelector(`#${id}`);
  if (el) el.scrollIntoView({ behavior: "smooth" });
};

const KeyboardShortcuts = () => {
  const navigate = useNavigate();

  useHotkeys("g+h", () => navigate("/"), { enableOnFormTags: false });
  useHotkeys("g+c", sectionShortcut("contact"), { enableOnFormTags: false });
  useHotkeys("g+p", sectionShortcut("portfolio"), { enableOnFormTags: false });
  useHotkeys("g+e", sectionShortcut("expertise"), { enableOnFormTags: false });
  useHotkeys("g+q", sectionShortcut("qualifications"), { enableOnFormTags: false });

  return null;
};

export default KeyboardShortcuts;
