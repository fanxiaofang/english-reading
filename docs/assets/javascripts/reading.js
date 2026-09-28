(function () {
  "use strict";

  // New notes should use this canonical schema: numbered overview/meaning/sentence
  // sections with `### Sentence N` and `### Expression N` headings.
  const SENTENCE_HEADING = /^sentence\s+\d+$/i;
  const EXPRESSION_HEADING = /^expression\s+\d+$/i;
  const OVERVIEW_HEADING = /^(?:1\.\s*)?project overview$/i;
  const OVERALL_HEADING = /^(?:2\.\s*)?overall meaning$/i;
  const OVERALL_LABEL = /^中文概览$/i;
  const EXPRESSIONS_SECTION = /^(?:high[- ]value expressions|useful expressions)$/i;
  const SENTENCE_SECTION = /^(?:sentence[- ]by[- ]sentence explanation|sentence explanation)$/i;

  function textOf(element) { return (element.textContent || "").replace(/¶/g, "").replace(/\s+/g, " ").trim(); }
  function normalizedLabel(element) { return textOf(element).replace(/[：:]\s*$/, "").trim().toLowerCase(); }
  function isHeading(element) { return /^h[1-6]$/i.test(element?.tagName || ""); }
  function isLabel(element, pattern) {
    if (!/^(p|li|div)$/i.test(element?.tagName || "")) return false;
    const label = normalizedLabel(element);
    return pattern.test(label) || pattern.test(label.split(/[：:]/, 1)[0].trim());
  }

  function sectionElements(heading) {
    const elements = [heading];
    let current = heading.nextElementSibling;
    while (current) {
      if (isHeading(current) && Number(current.tagName.slice(1)) <= Number(heading.tagName.slice(1))) break;
      elements.push(current);
      current = current.nextElementSibling;
    }
    return elements;
  }

  function wrapElements(elements, className) {
    if (!elements.length) return null;
    const first = elements[0];
    if (first.parentElement?.classList.contains(className)) return first.parentElement;
    const wrapper = document.createElement("div");
    wrapper.className = className;
    first.before(wrapper);
    elements.forEach((element) => wrapper.appendChild(element));
    return wrapper;
  }

  function wrapSection(heading, className) { return wrapElements(sectionElements(heading), className); }

  function boundaryForRepeatedBlock(element) {
    let current = element.nextElementSibling;
    while (current) {
      if (isLabel(current, /^original$/i) || isLabel(current, /^expression$/i)) return current;
      if (isHeading(current)) {
        const label = textOf(current);
        if (EXPRESSIONS_SECTION.test(label) || SENTENCE_SECTION.test(label) || OVERVIEW_HEADING.test(label) || OVERALL_HEADING.test(label) || SENTENCE_HEADING.test(label) || EXPRESSION_HEADING.test(label)) return current;
        if (Number(current.tagName.slice(1)) <= 3) return current;
      }
      current = current.nextElementSibling;
    }
    return null;
  }

  function wrapRepeatedBlocks(article, labelPattern, className) {
    const starts = Array.from(article.querySelectorAll("p, li, div")).filter((element) => isLabel(element, labelPattern) && !element.closest(`.${className}`));
    starts.forEach((start) => {
      const elements = [start];
      const boundary = boundaryForRepeatedBlock(start);
      let current = start.nextElementSibling;
      while (current && current !== boundary) { elements.push(current); current = current.nextElementSibling; }
      wrapElements(elements, className);
    });
  }

  function classifyLabelAndContent(wrapper) {
    wrapper.querySelectorAll("p, li, div").forEach((element) => {
      const label = normalizedLabel(element);
      const fullText = textOf(element);
      if (/^original(?:\s*[:：].*)?$/i.test(fullText) || label === "original") {
        element.classList.add("reading-label", "reading-original-label");
        if (label === "original" && element.nextElementSibling) element.nextElementSibling.classList.add("reading-original-content");
      } else if (/^中文意思(?:\s*[:：].*)?$/i.test(fullText) || label === "中文意思") {
        element.classList.add("reading-label", "reading-meaning-label");
        if (label === "中文意思" && element.nextElementSibling) element.nextElementSibling.classList.add("reading-meaning-content");
      } else if (/^key words and expressions(?:\s*[:：].*)?$/i.test(fullText) || label === "key words and expressions") {
        element.classList.add("reading-label", "reading-keywords-label");
        if (label === "key words and expressions" && element.nextElementSibling) element.nextElementSibling.classList.add("reading-keywords-content");
      } else if (/^sentence structure(?:\s*[:：].*)?$/i.test(fullText) || label === "sentence structure") {
        element.classList.add("reading-label", "reading-structure-label");
        if (label === "sentence structure" && element.nextElementSibling) element.nextElementSibling.classList.add("reading-structure-content");
      }
    });
  }

  function classifyExpressions(wrapper) {
    wrapper.querySelectorAll("p, li, div").forEach((element) => {
      if (/^(expression|中文意思|usage)\s*[:：]/i.test(textOf(element))) element.classList.add("reading-expression-label");
    });
  }

  function enhance(root) {
    const article = root.querySelector(".md-content__inner") || root.querySelector(".md-typeset");
    if (!article) return;
    if (/\/readings\//i.test(window.location.pathname)) document.body.classList.add("reading-page");
    const headings = Array.from(article.querySelectorAll("h1, h2, h3, h4, h5, h6"));
    const overviewHeading = headings.find((heading) => OVERVIEW_HEADING.test(textOf(heading)));
    const overallHeading = headings.find((heading) => OVERALL_HEADING.test(textOf(heading)));
    const chineseOverview = headings.find((heading) => OVERALL_LABEL.test(textOf(heading)));
    if (overviewHeading) wrapSection(overviewHeading, "reading-overview");
    if (overallHeading) wrapSection(overallHeading, "reading-overall");
    if (chineseOverview && !chineseOverview.closest(".reading-overall")) wrapSection(chineseOverview, "reading-overall");

    article.querySelectorAll("h3, h4, h5").forEach((heading) => {
      const label = textOf(heading);
      if (SENTENCE_HEADING.test(label)) { const card = wrapSection(heading, "reading-sentence-card"); classifyLabelAndContent(card); }
      if (EXPRESSION_HEADING.test(label)) { const card = wrapSection(heading, "reading-expression-card"); classifyExpressions(card); }
    });
    wrapRepeatedBlocks(article, /^original$/i, "reading-sentence-card");
    article.querySelectorAll(".reading-sentence-card").forEach(classifyLabelAndContent);
    wrapRepeatedBlocks(article, /^expression$/i, "reading-expression-card");
    article.querySelectorAll(".reading-expression-card").forEach(classifyExpressions);
    article.querySelectorAll("p").forEach((paragraph) => {
      if (/^(?:source repository|read on)$/i.test(normalizedLabel(paragraph))) paragraph.classList.add("reading-article-meta");
    });
  }

  function start() { enhance(document); if (window.document$?.subscribe) window.document$.subscribe(enhance); }
  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", start, { once: true }); else start();
})();
