import Proptypes from 'prop-types';

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

SvgImage.propTypes = {
  name: Proptypes.string.isRequired,
  width: Proptypes.string,
  height: Proptypes.string,
};
SvgImage.defaultProps = {
  width: '100%',
  height: '100%',
};

export default SvgImage;
