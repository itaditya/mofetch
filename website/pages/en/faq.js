/**
 * Copyright (c) 2017-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

const React = require('react');

const CompLibrary = require('../../core/CompLibrary.js');

const Container = CompLibrary.Container;

function FAQ() {
  return (
    <div className="docMainWrapper wrapper faq-wrapper">
      <Container className="mainContainer documentContainer postContainer">
        <div className="post">
          <header className="postHeader">
            <h1>Frequently Asked Question</h1>
          </header>
          <p>You might get a solution to your problem here. Otherwise you can ask on GitHub or Twitter.</p>
        </div>
        <div>
          <article className="faq-article">
            <h3>What is the need for baseUrl?</h3>
            <p>You need to provide <strong>baseUrl</strong> because node-fetch uses absolute urls so we'll call http://localhost:3000/api/todos if you set baseUrl to http://localhost:3000.</p>
          </article>
          <article className="faq-article">
            <h3>Why we need to set mockFetch to true</h3>
            <p>By default mofetch acts as an ismorphic fetch library which you can keep in your production bundle. But during development you can enable mocking by setting mockFetch to true. This mocking feature doesn't go in the production bundle.</p>
          </article>
        </div>
      </Container>
    </div>
  );
}

module.exports = FAQ;
