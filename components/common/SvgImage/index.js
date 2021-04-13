import PropTypes from 'prop-types';

const SvgImage = ({ name, width, height }) => {
  return (
    <img
      src={`/assets/svg/${name}.svg`}
      alt={name}
      width={width}
      height={height}
    />
  );
};

SvgImage.PropTypes = {
  name: PropTypes.string.isRequired,
  width: PropTypes.string,
  height: PropTypes.string,
};
SvgImage.defaultProps = {
  width: '100%',
  height: '100%',
};

export default SvgImage;
