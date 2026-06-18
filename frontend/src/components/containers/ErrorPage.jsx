import Header from "../header/Header";
import "./ErrorPage.css"

const ErrorPage = () => {
    let title = "erreur"
    let msg = "blablabla"
  return (
    <>
      <Header />
      <main>
        <div className="error-card">
          <h1>{title}</h1>
          <p>{msg}</p>
        </div>
      </main>
    </>
  );
};

export default ErrorPage;
