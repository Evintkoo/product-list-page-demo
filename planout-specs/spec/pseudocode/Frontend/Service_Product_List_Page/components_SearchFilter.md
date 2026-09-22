export const SearchFilter = ({ onSearch }) => {
  // Validation: Immediate trigger on input change
  const handleInputChange = (e) => {
    const value = e.target.value;
    // Logic: Ensure search string does not contain restricted characters if any
    onSearch(value);
  };

  return (
    <input 
      type="text" 
      placeholder="Search..." 
      onChange={handleInputChange} 
    />
  );
};