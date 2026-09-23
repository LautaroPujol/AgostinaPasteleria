import "./Notificacion.css";

const Notificacion = ({ show, text }) => {
  if (!show) return null;

  return (
    <div className="MensajeTexto">{text}</div>
  );
};

export default Notificacion;    