(ns www.core
  (:require react-dom))

(def container (.createRoot js/ReactDOM
                            (.getElementById js/document "app")))

(def title (.createElement js/React "h1" nil "Hello world"))

(.render container title)
