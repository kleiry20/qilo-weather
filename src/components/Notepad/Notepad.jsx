import "./Notepad.css";

const Notepad = () => {
  return (
    <>
      <Header />
      <div className="notepad">
        <h3>Notepad</h3>
        <textarea name="notepad-textarea" id="" cols="30" rows="10"></textarea>
      </div>
    </>
  );
};

export default Notepad;

const Header = () => {
  return (
    <div className="header">
      <a href="/">Home</a>
      <p>Anushka Singh</p>
      <div className="contact">
        <a href="mailto:anushkasingh801@gmail.com">Mail</a>
        <a href="tel:+918707319547">Contact No</a>
      </div>
    </div>
  );
};
