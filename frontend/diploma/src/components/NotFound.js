import React from "react";

function NotFound() {
  return (
    <main className="content">
      <section className="not-found">
        <h1 className="not-found__err-code">404</h1>
        <p className="not-found__err-message">Страница не найдена</p>
        <a className="not-found__back-link" href="/">
          Назад
        </a>
      </section>
    </main>
  );
}

export default NotFound;
