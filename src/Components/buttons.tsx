type FilterBtnProps = {
  text: string;
  setFilter: React.Dispatch<React.SetStateAction<string>>;
  activeFilter: string;
};

const FilterBtn = ({text, setFilter, activeFilter}:FilterBtnProps) => {
    const isActive = activeFilter === text;
    return(
        <button
      onClick={() => setFilter(text)}
      className={`font-semibold cursor-pointer px-3 py-1 rounded-md transition
        ${
          isActive
            ? "bg-indigo-600 text-white"
            : "text-gray-600 hover:bg-indigo-100"
        }`}
    >{text}</button>
    )
}

export default FilterBtn;