(window.webpackJsonp = window.webpackJsonp || []).push([
  [0],
  {
    22: function (t, e, n) {
      t.exports = n(55);
    },
    27: function (t, e, n) {},
    29: function (t, e, n) {},
    55: function (t, e, n) {
      "use strict";
      n.r(e);
      var a = n(0),
        o = n.n(a),
        r = n(21),
        i = n.n(r),
        c = (n(27), n(3)),
        l = n(4),
        s = n(6),
        u = n(5),
        m = n(7),
        p = (n(29), n(10)),
        d = n.n(p),
        h = (function (t) {
          function e() {
            return (
              Object(c.a)(this, e),
              Object(s.a)(this, Object(u.a)(e).apply(this, arguments))
            );
          }
          return (
            Object(m.a)(e, t),
            Object(l.a)(e, [
              {
                key: "render",
                value: function () {
                  return o.a.createElement(
                    "div",
                    { className: "Border" },
                    this.props.children
                  );
                },
              },
            ]),
            e
          );
        })(a.Component);
      var f = (function (t) {
          function e(t) {
            var n;
            return (
              Object(c.a)(this, e),
              ((n = Object(s.a)(this, Object(u.a)(e).call(this, t))).state = {
                tracks: [],
                status: "loading tracks",
              }),
              d.a
                .get(
                  "https://itunes.apple.com/lookup?collectionId=" +
                    n.props.albumId
                )
                .then(function (t) {
                  return console.log(t), t.data.results.slice(1);
                })
                .then(function (t) {
                  return n.setState({ tracks: t });
                })
                .then(n.setState({ status: "tracks loaded" }))
                .catch(function (t) {
                  n.setState({ status: "" + t }), console.log(t);
                }),
              n
            );
          }
          return (
            Object(m.a)(e, t),
            Object(l.a)(e, [
              {
                key: "render",
                value: function () {
                  var t = this.props;
                  return (
                    console.log("rendering", t.title),
                    o.a.createElement(
                      h,
                      null,
                      o.a.createElement(
                        "a",
                        { className: "AlbumLabel" },
                        o.a.createElement(
                          "p",
                          { className: "AlbumTitle" },
                          t.title,
                          o.a.createElement("br", null),
                          o.a.createElement(
                            "a",
                            { href: t.collectionViewUrl },
                            "$",
                            t.collectionPrice
                          )
                        ),
                        o.a.createElement(
                          "p",
                          { className: "AlbumArtist" },
                          "Tracks: ",
                          t.trackCount,
                          o.a.createElement("br", null),
                          t.year,
                          " - ",
                          t.artist
                        )
                      ),
                      o.a.createElement("img", {
                        src: t.coverArt,
                        className: "CoverArt",
                        alt: "Cover of " + t.title,
                      })
                    )
                  );
                },
              },
            ]),
            e
          );
        })(a.Component),
        b = (function (t) {
          function e(t) {
            var n;
            return (
              Object(c.a)(this, e),
              ((n = Object(s.a)(this, Object(u.a)(e).call(this, t))).state = {
                albums: [],
                status: "loading albums",
                permitSingles: !0,
                permitCollaboration: !0,
              }),
              n
            );
          }
          return (
            Object(m.a)(e, t),
            Object(l.a)(e, [
              {
                key: "componentDidMount",
                value: function () {
                  var t = this;
                  d.a
                    .get(
                      "https://itunes.apple.com/lookup?id=" +
                        this.props.artistId +
                        "&entity=album"
                    )
                    .then(function (t) {
                      return t.data.results.slice(1);
                    })
                    .then(function (e) {
                      t.setState({
                        albums: e,
                        status: e.length + " albums loaded",
                      });
                    })
                    .catch(function (e) {
                      t.setState({ status: "" + e }), console.log(e);
                    });
                },
              },
              {
                key: "render",
                value: function () {
                  var t = this;
                  return (
                    console.log("rendering", this.props.artistName),
                    o.a.createElement(
                      "div",
                      { className: "Artist" },
                      o.a.createElement(
                        "header",
                        { className: "App-header" },
                        o.a.createElement(
                          "h1",
                          { className: "App-title" },
                          this.props.artistName
                        ),
                        o.a.createElement(
                          "p",
                          { className: "contents" },
                          this.props.contents
                        ),
                        o.a.createElement(
                          "p",
                          { key: "status" },
                          "Status: ",
                          this.state.status
                        ),
                        o.a.createElement(
                          "div",
                          { className: "ButtonHolder" },
                          o.a.createElement(
                            "button",
                            {
                              type: "button",
                              onClick: function (e) {
                                return t.setState({
                                  permitSingles: !t.state.permitSingles,
                                });
                              },
                            },
                            this.state.permitSingles ? "Hide" : "Show",
                            " Singles"
                          ),
                          o.a.createElement(
                            "button",
                            {
                              type: "button",
                              onClick: function (e) {
                                return t.setState({
                                  permitCollaboration:
                                    !t.state.permitCollaboration,
                                });
                              },
                            },
                            this.state.permitCollaboration ? "Hide" : "Show",
                            " Collaboration"
                          )
                        )
                      ),
                      o.a.createElement(
                        "div",
                        { className: "AlbumHolder" },
                        this.state.albums.map(function (e) {
                          return (t.state.permitSingles || e.trackCount > 1) &&
                            (t.state.permitCollaboration ||
                              e.artistName === t.props.artistName)
                            ? (function (t) {
                                return o.a.createElement(
                                  "a",
                                  null,
                                  o.a.createElement(f, {
                                    key: t.collectionId,
                                    coverArt:
                                      ((e = t.artworkUrl100),
                                      (n = 350),
                                      e.replace(
                                        /\/100x100/,
                                        "/" + n + "x" + n
                                      )),
                                    title: t.collectionName,
                                    year: t.releaseDate.slice(0, 4),
                                    artist: t.artistName,
                                    trackCount: t.trackCount,
                                    collectionPrice: t.collectionPrice,
                                    collectionViewUrl: t.collectionViewUrl,
                                    albumId: t.collectionId,
                                  })
                                );
                                var e, n;
                              })(e)
                            : void 0;
                        })
                      )
                    )
                  );
                },
              },
            ]),
            e
          );
        })(a.Component),
        g = (function (t) {
          function e() {
            return (
              Object(c.a)(this, e),
              Object(s.a)(this, Object(u.a)(e).apply(this, arguments))
            );
          }
          return (
            Object(m.a)(e, t),
            Object(l.a)(e, [
              {
                key: "render",
                value: function () {
                  return o.a.createElement(
                    "div",
                    { className: "App" },
                    o.a.createElement(b, {
                      artistId: "20006408",
                      artistName: "Regina Spektor",
                      contents: "A list of albums released by Regina Spektor",
                    })
                  );
                },
              },
            ]),
            e
          );
        })(a.Component),
        v = Boolean(
          "localhost" === window.location.hostname ||
            "[::1]" === window.location.hostname ||
            window.location.hostname.match(
              /^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/
            )
        );
      function k(t) {
        navigator.serviceWorker
          .register(t)
          .then(function (t) {
            t.onupdatefound = function () {
              var e = t.installing;
              e.onstatechange = function () {
                "installed" === e.state &&
                  (navigator.serviceWorker.controller
                    ? console.log("New content is available; please refresh.")
                    : console.log("Content is cached for offline use."));
              };
            };
          })
          .catch(function (t) {
            console.error("Error during service worker registration:", t);
          });
      }
      i.a.render(o.a.createElement(g, null), document.getElementById("root")),
        (function () {
          if ("serviceWorker" in navigator) {
            if (new URL("", window.location).origin !== window.location.origin)
              return;
            window.addEventListener("load", function () {
              var t = "".concat("", "/service-worker.js");
              v
                ? (function (t) {
                    fetch(t)
                      .then(function (e) {
                        404 === e.status ||
                        -1 ===
                          e.headers.get("content-type").indexOf("javascript")
                          ? navigator.serviceWorker.ready.then(function (t) {
                              t.unregister().then(function () {
                                window.location.reload();
                              });
                            })
                          : k(t);
                      })
                      .catch(function () {
                        console.log(
                          "No internet connection found. App is running in offline mode."
                        );
                      });
                  })(t)
                : k(t);
            });
          }
        })();
    },
  },
  [[22, 2, 1]],
]);
//# sourceMappingURL=main.50cc1e01.chunk.js.map
