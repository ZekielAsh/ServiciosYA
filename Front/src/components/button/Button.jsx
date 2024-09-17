import "./Button.css";

function Button({ children, type, onClick }) {
  const styles = {
    primary: "button-rectangle button-primary",
    user: "button-circle button-primary",
  };

  const className = styles[type] || "";

  return (
    <button className={className} onClick={onClick}>
      {children}
    </button>
  );
}

export default Button;
