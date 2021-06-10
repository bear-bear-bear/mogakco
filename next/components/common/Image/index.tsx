import PropTypes from 'prop-types';

const Image = ({ name, width, height }) => {
  const ext = name?.match(/(?<=\.)([a-zA-Z]+)$/)[0];
  return (
    <img
      src={`/assets/${ext}/${name}`}
      alt={name}
      width={width}
      height={height}
    />
  );
};

Image.propTypes = {
  name: PropTypes.string.isRequired,
  width: PropTypes.string,
  height: PropTypes.string,
};
Image.defaultProps = {
  width: '100%',
  height: '100%',
};

export default Image;
