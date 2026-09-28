(function () {
  "use strict";

  const SECTION_HEADING = /^(sentence\s+\d+|expression\s+\d+)$/i;
  const SENTENCE_HEADING = /^sentence\s+\d+$/i;
  const EXPRESSION_HEADING = /^expression\s+\d+$/i;

  function textOf(element) {
    return (element.textContent || "").replace(/\s+/g, " ").trim();
  }

  function sectionElements(heading) {
    const elements = [heading];
    let current = heading.nextElementSibling;
    while (current && !(current.matches("h1, h2, h3, h4, h5, h6") && SECTION_HEADING.test(textOf(current)))) {
      if (/^h[1-6]$/i.test(current.tagName) && Number(current.tagName.slice(1)) <= Number(heading.tagName.slice(1))) break;
      elements.push(current);
      current = current.nextElementSibling;
    }
    return elements;
  }

  function wrapSection(heading, className) {
    if (heading.parentElement?.classList.contains(className)) return heading.parentElement;
    const elements = sectionElements(heading);
    const wrapper = document.createElement("div");
    wrapper.className = className;
    heading.before(wrapper);
    elements.forEach((element) => wrapper.appendChild(element));
    return wrapper;
  }

  function classifyLabels(wrapper) {
    wrapper.querySelectorAll("p, li").forEach((element) => {
      const label = textOf(element).toLowerCase();
      if (label.startsWith("original:")) element.classList.add("reading-sentence-original");
      if (label.startsWith("中文意思:")) element.classList.add("reading-sentence-meaning");
      if (label.startsWith("key words and expressions:")) element.classList.add("reading-sentence-label");
      if (label.startsWith("sentence structure:")) element.classList.add("reading-sentence-structure");
    });
  }

  function enhance(root) {
    const article = root.querySelector(".md-content__inner") || root.querySelector(".md-typeset");
    if (!article) return;

    const headings = Array.from(article.querySelectorAll("h1, h2, h3, h4, h5, h6"));
    const overviewHeading = headings.find((heading) => /^1\.\s*project overview$/i.test(textOf(heading)));
    const overallHeading = headings.find((heading) => /^2\.\s*overall meaning$/i.test(textOf(heading)));
    if (overviewHeading) wrapSection(overviewHeading, "reading-overview").classList.add("reading-overview");
    if (overallHeading) wrapSection(overallHeading, "reading-overall").classList.add("reading-overall");

    article.querySelectorAll("h3, h4, h5").forEach((heading) => {
      const label = textOf(heading);
      if (SENTENCE_HEADING.test(label)) classifyLabels(wrapSection(heading, "reading-sentence-card"));
      if (EXPRESSION_HEADING.test(label)) {
        const card = wrapSection(heading, "reading-expression-card");
        card.querySelectorAll("p").forEach((paragraph) => {
          if (/^(expression|中文意思|usage):/i.test(textOf(paragraph))) paragraph.classList.add("reading-expression-label");
        });
      }
    });

    article.querySelectorAll("p").forEach((paragraph) => {
      const label = textOf(paragraph).toLowerCase();
      if (/^source repository:/.test(label) || /^read on:/.test(label)) paragraph.classList.add("reading-article-meta");
    });
  }

  function start() {
    enhance(document);
    if (window.document$?.subscribe) window.document$.subscribe(enhance);
  }

  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", start, { once: true });
  else start();
})();
