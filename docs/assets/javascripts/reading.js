(function () {
  "use strict";

  // New notes use the canonical schema: numbered overview/meaning/sentence
  // sections, `### Sentence N`, and `### Expression N` headings.
  const SENTENCE_HEADING = /^sentence\s+(\d+)$/i;
  const EXPRESSION_HEADING = /^expression\s+(\d+)$/i;
  const OVERVIEW_HEADING = /^1\.\s*project overview$/i;
  const OVERALL_HEADING = /^2\.\s*overall meaning$/i;
  const SENTENCE_SECTION = /^3\.\s*sentence-by-sentence explanation$/i;
  const EXPRESSIONS_SECTION = /^(?:3|4)\.\s*useful expressions$/i;

  function textOf(element) {
    return (element?.textContent || "").replace(/¶/g, "").replace(/\s+/g, " ").trim();
  }

  function isHeading(element) { return /^h[1-6]$/i.test(element?.tagName || ""); }

  function directSection(heading) {
    const elements = [heading];
    let current = heading.nextElementSibling;
    while (current) {
      if (isHeading(current) && Number(current.tagName.slice(1)) <= Number(heading.tagName.slice(1))) break;
      elements.push(current);
      current = current.nextElementSibling;
    }
    return elements;
  }

  function wrap(elements, className) {
    if (!elements.length) return null;
    if (elements[0].parentElement?.classList.contains(className)) return elements[0].parentElement;
    const wrapper = document.createElement("div");
    wrapper.className = className;
    elements[0].before(wrapper);
    elements.forEach((element) => wrapper.appendChild(element));
    return wrapper;
  }

  function wrapFollowingContent(heading, className) {
    const elements = directSection(heading).slice(1);
    if (!elements.length) return null;
    if (heading.nextElementSibling?.classList.contains(className)) return heading.nextElementSibling;
    return wrap(elements, className);
  }

  function labelName(element) {
    return textOf(element).replace(/[：:]$/, "").trim().toLowerCase();
  }

  function isLabel(element, label) {
    return /^(p|div)$/i.test(element?.tagName || "") && labelName(element) === label;
  }

  function classifySentence(card) {
    const children = Array.from(card.children);
    children.forEach((element, index) => {
      const label = labelName(element);
      if (label === "original") {
        element.classList.add("reading-label", "reading-original-label");
        children[index + 1]?.classList.add("reading-original");
      } else if (label === "中文意思") {
        element.classList.add("reading-label", "reading-meaning-label");
        children[index + 1]?.classList.add("reading-meaning");
      } else if (label === "key words and expressions") {
        element.classList.add("reading-label", "reading-keywords-label");
        children[index + 1]?.classList.add("reading-keywords");
        children[index + 1]?.querySelectorAll("li").forEach((item) => item.classList.add("reading-keyword-item"));
      } else if (label === "sentence structure") {
        element.classList.add("reading-label", "reading-structure-label");
        children[index + 1]?.classList.add("reading-structure");
      }
    });
  }

  function classifyExpression(card) {
    const children = Array.from(card.children);
    children.forEach((element, index) => {
      const label = labelName(element);
      if (label === "expression") {
        element.classList.add("reading-label", "reading-expression-label");
        children[index + 1]?.classList.add("reading-expression-value");
      } else if (label === "中文意思") {
        element.classList.add("reading-label", "reading-expression-meaning-label");
        children[index + 1]?.classList.add("reading-expression-meaning");
      } else if (label === "usage") {
        element.classList.add("reading-label", "reading-expression-usage-label");
        children[index + 1]?.classList.add("reading-expression-usage");
      }
    });
  }

  function enhance(root) {
    const article = root.querySelector(".md-content__inner");
    if (!article || !/\/readings\//i.test(window.location.pathname)) return;
    const headings = Array.from(article.querySelectorAll("h1, h2, h3, h4, h5, h6"));
    if (!headings.some((heading) => OVERVIEW_HEADING.test(textOf(heading)))) return;
    document.body.classList.add("reading-page");
    article.classList.add("reading-article");

    const title = article.querySelector(":scope > h1");
    const firstSection = headings.find((heading) => /^h2$/i.test(heading.tagName));
    if (title && firstSection && !title.closest(".reading-header")) {
      const headerElements = [];
      let current = title;
      while (current && current !== firstSection) {
        if (current.tagName !== "HR") headerElements.push(current);
        current = current.nextElementSibling;
      }
      const header = wrap(headerElements, "reading-header");
      header?.querySelectorAll("p").forEach((paragraph) => {
        if (/^source repository$/i.test(labelName(paragraph))) paragraph.classList.add("reading-source");
        if (/^read on(?:\s*[:：]|$)/i.test(textOf(paragraph))) paragraph.classList.add("reading-date");
      });
    }

    const refreshedHeadings = Array.from(article.querySelectorAll("h1, h2, h3, h4, h5, h6"));
    const overview = refreshedHeadings.find((heading) => OVERVIEW_HEADING.test(textOf(heading)));
    const overall = refreshedHeadings.find((heading) => OVERALL_HEADING.test(textOf(heading)));
    if (overview && !overview.parentElement?.classList.contains("reading-overview")) wrap(directSection(overview), "reading-overview");
    if (overall) {
      overall.classList.add("reading-section-heading");
      const card = wrapFollowingContent(overall, "reading-overall");
      if (card && !card.querySelector(".reading-overall-label")) {
        const label = document.createElement("div");
        label.className = "reading-overall-label";
        label.textContent = "整体理解";
        card.prepend(label);
      }
    }

    article.querySelectorAll("h3, h4, h5").forEach((heading) => {
      const sentence = textOf(heading).match(SENTENCE_HEADING);
      const expression = textOf(heading).match(EXPRESSION_HEADING);
      if (sentence && !heading.parentElement?.classList.contains("reading-sentence-card")) {
        heading.classList.add("reading-sentence-number");
        heading.dataset.sentenceNumber = sentence[1].padStart(2, "0");
        const card = wrap(directSection(heading), "reading-sentence-card");
        classifySentence(card);
      } else if (expression && !heading.parentElement?.classList.contains("reading-expression-card")) {
        heading.classList.add("reading-expression-number");
        heading.dataset.expressionNumber = expression[1].padStart(2, "0");
        const card = wrap(directSection(heading), "reading-expression-card");
        classifyExpression(card);
      }
    });

    article.querySelectorAll("h2").forEach((heading) => {
      if (SENTENCE_SECTION.test(textOf(heading))) heading.classList.add("reading-section-heading");
      if (EXPRESSIONS_SECTION.test(textOf(heading))) heading.classList.add("reading-section-heading");
    });
  }

  function start() {
    enhance(document);
    if (window.document$?.subscribe) window.document$.subscribe(enhance);
  }

  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", start, { once: true });
  else start();
})();
