import "./Contact.scss";

const Contact = () => {
  const openLink = (link: string) => {
    window.open(link, "_blank");
  };

  return (
    <div className="contact-wrapper">
      <p className="wannah-hire">Want to hire me ?</p>

      <p className="reach-out">Feel free to reach me out !</p>
      <br />
      <br />
      <div className="social-hanldes-w">
        <img
          onClick={() => openLink("https://www.linkedin.com/in/hammadahamed/")}
          src="/src/assets/linkedin.svg"
          className="circle-avatars"
          style={{ backgroundColor: "#0078d4" }}
        />
        <img
          onClick={() => openLink("mailto: hammadahamed786@gmail.com")}
          src="/src/assets/gmail.svg"
          className="circle-avatars"
          style={{ padding: "8px", backgroundColor: "white" }}
        />
        <img
          onClick={() => openLink("https://github.com/hammadahamed")}
          src="/src/assets/github.png"
          className="circle-avatars"
          style={{ backgroundColor: "white", padding: "6px" }}
        />
        <img
          onClick={() =>
            openLink("https://www.upwork.com/freelancers/~015b6c83414c827b01")
          }
          src="/src/assets/upwork.svg"
          className="circle-avatars"
          style={{ backgroundColor: "#66bb6a" }}
        />
      </div>
    </div>
  );
};

export default Contact;
