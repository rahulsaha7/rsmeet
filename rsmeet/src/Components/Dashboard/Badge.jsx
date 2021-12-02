const Badge = ({ count }) => {
  return (
    <>
      <span
        class="badge position-relative"
        style={{ background: "red", bottom: "90px", left: "90%" }}
      >
        {count}
      </span>
    </>
  );
};

export default Badge;
