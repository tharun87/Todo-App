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
      className={`font-semibold px-8 cursor-pointer max-sm:px-4 py-1 rounded-md transition
        ${
          isActive
            ? "bg-indigo-600 text-white"
            : "text-gray-600 hover:bg-indigo-100"
        }`}
    >{text}</button>
    )
}

export default FilterBtn;