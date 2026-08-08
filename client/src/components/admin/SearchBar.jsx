import Input from "../ui/Input";

const SearchBar = ({
    value,
    onChange,
    placeholder = "Search..."
}) => {

    return (

        <div className="w-full max-w-sm">

            <Input
                type="text"
                value={value}
                onChange={onChange}
                placeholder={placeholder}
            />

        </div>

    );

};

export default SearchBar;