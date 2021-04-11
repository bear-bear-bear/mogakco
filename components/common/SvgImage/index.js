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

export default SvgImage;
