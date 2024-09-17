import "./Button.css";

function Button({ children, type, onClick }) {
  const styles = {
    primary: "button-rectangle button-primary",
    client: "button-circle button-client",
    pro: "button-circle button-pro",
  };

  const className = styles[type] || "";

  return (
    <button className={className} onClick={onClick}>
      {children}
    </button>
  );
}

export default Button;
