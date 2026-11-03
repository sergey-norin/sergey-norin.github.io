/* Publications page: switch between the topic lists (written in the HTML)
   and a chronological view built from those same lists. No dependencies. */
(function () {
  "use strict";
  var topicView = document.getElementById("by-topic");
  var yearView = document.getElementById("by-year");
  var buttons = document.querySelectorAll(".seg button[data-view]");
  if (!topicView || !yearView) return;

  var items = Array.prototype.slice.call(topicView.querySelectorAll(".pubs > li"));

  // Counts (theses and manuscripts are not counted as papers).
  var nPub = 0, nPre = 0;
  items.forEach(function (li) {
    var y = li.getAttribute("data-y");
    if (y === "preprint") nPre++;
    else if (/^\d{4}$/.test(y) && !li.classList.contains("thesis")) nPub++;
  });
  var count = document.getElementById("pub-count");
  if (count) count.textContent = nPub + " papers · " + nPre + " preprints";

  function arxivKey(li) {
    var a = li.querySelector("a.t");
    var m = a && a.getAttribute("href").match(/abs\/(?:math\/)?(\d{4})\.(\d{4,5})/);
    return m ? parseFloat(m[1] + "." + m[2]) : 0;
  }
  function rank(y) {
    if (y === "preprint") return -1e9;
    if (y === "manuscript") return 1e9;
    return -parseInt(y, 10);
  }

  var built = false;
  function buildYearView() {
    if (built) return;
    var groups = {};
    items.forEach(function (li, i) {
      var y = li.getAttribute("data-y");
      (groups[y] = groups[y] || []).push({ li: li, i: i });
    });
    var host = yearView.querySelector(".year-lists");
    Object.keys(groups).sort(function (a, b) { return rank(a) - rank(b); }).forEach(function (y) {
      var arr = groups[y];
      if (y === "preprint") arr.sort(function (a, b) { return arxivKey(b.li) - arxivKey(a.li) || a.i - b.i; });
      var ol = document.createElement("ol");
      ol.className = "pubs yeargroup";
      arr.forEach(function (it, k) {
        var c = it.li.cloneNode(true);
        var lab = c.querySelector(".y");
        if (lab) lab.textContent = k === 0 ? (y === "preprint" ? "Preprints" : y === "manuscript" ? "Manuscripts" : y) : "";
        ol.appendChild(c);
      });
      host.appendChild(ol);
    });
    built = true;
  }

  function show(view, updateHash) {
    var year = view === "year";
    if (year) buildYearView();
    topicView.hidden = year;
    yearView.hidden = !year;
    Array.prototype.forEach.call(buttons, function (b) {
      b.setAttribute("aria-pressed", String(b.getAttribute("data-view") === view));
    });
    if (updateHash && window.history && history.replaceState) {
      history.replaceState(null, "", year ? "#chronological" : location.pathname + location.search);
    }
  }

  Array.prototype.forEach.call(buttons, function (b) {
    b.addEventListener("click", function () { show(b.getAttribute("data-view"), true); });
  });
  function fromHash() { show(location.hash === "#chronological" ? "year" : "topic", false); }
  window.addEventListener("hashchange", fromHash);
  fromHash();
})();
