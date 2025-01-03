const Loader = ({ className = "" }) => {
  return (
    <div
      className={`border-2 rounded-full border-primary border-b-transparent animate-rotation ${className}`}
    ></div>
  );
};

export default Loader;
