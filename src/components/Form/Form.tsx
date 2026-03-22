import { FiSearch } from "react-icons/fi";
import toast from "react-hot-toast";

import style from "./Form.module.css";

interface FormProps {
  onSubmit: (search: string) => void;
}

export default function Form({ onSubmit }: FormProps) {
  const handleSubmit = (data: FormData) => {
    const search = (data.get("search") as string).trim();

    if (search !== "") {
      onSubmit(search);
    } else {
      toast.error("Empty text for search");
    }
  };

  return (
    <form className={style.form} action={handleSubmit}>
      <input
        className={style.input}
        placeholder="What do you want to write?"
        name="search"
        autoFocus
      />

      <button className={style.button} type="submit">
        <FiSearch size="16px" />
      </button>
    </form>
  );
}
