(ns www.core
  (:require react-dom))

(def container (.getElementById js/document "app"))
(def root (.createRoot js/ReactDOM container))
(def title (.createElement js/React "h1" nil "Hello, React. This is Clojure"))

(.render root title)
