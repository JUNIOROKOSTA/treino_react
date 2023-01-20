import P from 'prop-types';
import './styles.css';

export const TextInput = ({ searchPosts, handleSearch }) => {
  return (
    <input
      className="text-input"
      onChange={handleSearch}
      value={searchPosts}
      type="search"
      placeholder="Buscar por titulo"
    />
  );
};

TextInput.propTypes = {
  searchPosts: P.string,
  handleSearch: P.func.isRequired,
};
