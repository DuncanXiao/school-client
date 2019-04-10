const CustomIcon = ({ path, className = '', size = 'md', ...restProps }) => {
  const type = require(`../../statics${path}`);
  const id = `#${type.default.id}`;
  return (
    <svg
      className={`am-icon am-icon-${id.substr(1)} am-icon-${size} ${className}`}
      {...restProps}
    >
      <use xlinkHref={id} /> {/* svg-sprite-loader@0.3.x */}
      {/* <use xlinkHref={#${type.default.id}} /> */} {/* svg-sprite-loader@lastest */}
    </svg>
  )
};

export default CustomIcon;
